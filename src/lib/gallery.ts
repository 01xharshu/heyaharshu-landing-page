export interface GalleryImage {
  id: string;
  type?: "image" | "video";
  order?: number;
  src: string;
  width: number;
  height: number;
  alt: string;
  text: string;
  createdAt: string;
  tweetUrl: string;
}

export interface GalleryPage {
  images: GalleryImage[];
  nextCursor?: string;
  collectionComplete?: boolean;
}

/** Source image URLs stay on X's CDN; only public metadata is stored here. */
export function paginateGallery(images: GalleryImage[], offset = 0): GalleryPage {
  const unique = new Map(images.map((image) => [image.id, image]));
  const ordered = [...unique.values()].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    const dateOrder = Date.parse(b.createdAt) - Date.parse(a.createdAt);
    // Stable sorting keeps a post's attachment order when timestamps match.
    return Number.isFinite(dateOrder) ? dateOrder : 0;
  });
  const end = offset + 60;
  return {
    images: ordered.slice(offset, end),
    nextCursor: end < ordered.length ? String(end) : undefined,
  };
}
