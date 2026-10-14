import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';

const source = await readFile(new URL('../src/lib/gallery.ts', import.meta.url), 'utf8');
const { paginateGallery } = await import(`data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString('base64')}`);
const photo = (id, createdAt) => ({ id, createdAt, src: 'https://pbs.twimg.com/media/test.jpg', width: 100, height: 200, text: 'Original caption', tweetUrl: 'https://x.com/heyaharshu/status/123', alt: 'Test image' });

test('user-provided order survives missing dates and mixed images and videos', () => {
  const first = { ...photo('first', ''), order: 0 };
  const video = { ...photo('video', '2026-01-01T00:00:00Z'), type: 'video', order: 1 };
  const last = { ...photo('last', ''), order: 2 };
  assert.deepEqual(paginateGallery([last, video, first]).images, [first, video, last]);
});

test('newest images come first, duplicate captures disappear, captions stay with their images', () => {
  const older = photo('123-1', '2020-01-01T00:00:00Z');
  const newer = photo('456-1', '2025-01-01T00:00:00Z');
  const result = paginateGallery([older, newer, older]);
  assert.deepEqual(result.images, [newer, older]);
  assert.equal(result.nextCursor, undefined);
});

test('all images in multi-photo posts survive and remain in attachment order', () => {
  const first = photo('456-1', '2025-01-01T00:00:00Z');
  const second = photo('456-2', '2025-01-01T00:00:00Z');
  const result = paginateGallery([first, second]);
  assert.deepEqual(result.images, [first, second]);
});

test('older pages retain every image without overlaps or truncation', () => {
  const input = Array.from({ length: 137 }, (_, i) => photo(`${i}-1`, new Date(1700000000000 + i * 1000).toISOString()));
  const all = [];
  let offset = 0;
  do {
    const page = paginateGallery(input, offset);
    all.push(...page.images);
    if (!page.nextCursor) break;
    offset = Number(page.nextCursor);
  } while (true);
  assert.equal(all.length, input.length);
  assert.equal(new Set(all.map(item => item.id)).size, input.length);
  assert.equal(all[0].id, '136-1');
  assert.equal(all.at(-1).id, '0-1');
});
