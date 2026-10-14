import archive from "@/data/twitter-gallery.json";
import { paginateGallery, type GalleryImage } from "@/lib/gallery";

export async function GET(request: Request) {
  const cursor = new URL(request.url).searchParams.get("cursor");
  if (cursor && (!/^\d{1,8}$/.test(cursor) || Number(cursor) % 60 !== 0)) {
    return Response.json({ error: "Invalid gallery page." }, { status: 400 });
  }

  const images = archive.images as GalleryImage[];
  if (!images.length) {
    return Response.json(
      { error: "The gallery is getting its first frames. In the meantime, explore my photos on X." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json({
    ...paginateGallery(images, Number(cursor || 0)),
    collectionComplete: archive.collectionComplete,
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
