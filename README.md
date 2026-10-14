This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## X gallery

Modern Designer, Builder, and Content Creator portfolios link to `/gallery`.
The gallery displays images without captions in a responsive masonry grid.
Opening an image displays its original post text and date, with a link to X.
Arrow keys navigate; Escape closes the viewer. Older images load on scroll.

The gallery uses `src/data/twitter-gallery.json` for public image URLs and post
metadata collected from `https://x.com/heyaharshu/media`. Images are served
directly from X's CDN, rather than uploaded into this project. Each entry has
`id`, `src`, `width`, `height`, `alt`, `text`, `createdAt` (ISO date), and
`tweetUrl`. Preserve attachment order for images from the same post.

**Current status:** the gallery contains 35 entries: two photos collected in
Arc, plus 31 image links and two video links provided by the owner. Explicit
`order` values preserve the owner's sequence. Images load directly from X;
video cards link to their original X video pages. Captions and post dates are
shown only where known. The full historical collection is still incomplete.
No X API credentials are required.

Nine entries have confirmed original captions and post links. Run
`python3 scripts/match-gallery-posts.py <post-id> ...` to match more public
posts against exact gallery image filenames. The helper accepts only posts
authored by @heyaharshu and preserves the supplied gallery order. Bare image
URLs without a confirmed source post retain blank caption/reference fields.

A browser collection is a snapshot. Newly posted photos will require another
collection; unattended synchronization is not implemented. Full historical
coverage must be verified by scrolling the accessible Media tab to its end.

Gallery data checks: `node --test tests/gallery.test.mjs` (Node 23.6+).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
