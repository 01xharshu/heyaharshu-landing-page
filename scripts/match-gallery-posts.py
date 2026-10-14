"""Match supplied post IDs against gallery media using public X embed data.
No credentials or browser session data are used. Only exact filenames match.
"""
import argparse
import concurrent.futures
import html
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]

def fetch_post(post_id):
    if not re.fullmatch(r'\d{1,20}', post_id):
        raise ValueError('Expected a numeric post ID')
    url = f'https://cdn.syndication.twimg.com/tweet-result?id={post_id}&lang=en&token=1'
    with urllib.request.urlopen(url, timeout=15) as response:
        post = json.load(response)
    if post.get('user', {}).get('screen_name', '').lower() != 'heyaharshu':
        return None
    return post

def apply_posts(data, posts):
    changed = set()
    for post in posts:
        if not post:
            continue
        post_id = post['id_str']
        photos = {}
        for media in post.get('mediaDetails', []):
            if media.get('type') != 'photo':
                continue
            url = media.get('media_url_https', '')
            key = Path(urllib.parse.urlparse(url).path).stem
            photos[key] = media
        text = html.unescape(post.get('text', ''))
        # Remove the attachment's short link; retain links elsewhere in the post.
        for media in post.get('mediaDetails', []):
            if media.get('url'):
                text = text.replace(media['url'], '')
        text = text.strip()
        for entry in data['images']:
            key = Path(urllib.parse.urlparse(entry['src']).path).stem
            video_match = entry.get('type') == 'video' and entry.get('tweetUrl', '').endswith('/' + post_id)
            if key not in photos and not video_match:
                continue
            # Embed data can truncate long posts. Keep a longer caption already
            # collected from the same post rather than replacing it with a preview.
            existing = entry.get('text', '')
            entry['text'] = existing if post.get('note_tweet') and len(existing) > len(text) else text
            entry['createdAt'] = post.get('created_at', '')
            entry['tweetUrl'] = f'https://x.com/heyaharshu/status/{post_id}'
            entry['matchedBy'] = 'exact-media-filename' if not video_match else 'supplied-post-id'
            if key in photos:
                info = photos[key].get('original_info', {})
                entry['width'] = info.get('width', entry['width'])
                entry['height'] = info.get('height', entry['height'])
            changed.add(entry['id'])
    return changed

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('post_ids', nargs='+')
    args = parser.parse_args()
    path = ROOT / 'src/data/twitter-gallery.json'
    data = json.loads(path.read_text())
    posts = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(fetch_post, value): value for value in dict.fromkeys(args.post_ids)}
        for future in concurrent.futures.as_completed(futures):
            try:
                posts.append(future.result())
            except Exception as error:
                print(f'Post {futures[future]} unavailable: {type(error).__name__}')
    changed = apply_posts(data, posts)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    print(f'Updated {len(changed)} entries; {sum(bool(e.get("tweetUrl")) for e in data["images"])} / {len(data["images"])} have source posts.')
