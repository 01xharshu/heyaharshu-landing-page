"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { GalleryImage, GalleryPage } from "@/lib/gallery";
import styles from "./TwitterGallery.module.css";

function Photo({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      // Grid rows are 4px with a 12px gap. Preserve the original image ratio.
      const loadedImage = element.querySelector("img");
      const ratio = loadedImage?.naturalWidth
        ? loadedImage.naturalHeight / loadedImage.naturalWidth
        : image.height / image.width;
      const height = entry.contentRect.width * ratio;
      element.style.gridRowEnd = `span ${Math.ceil((height + 12) / 16)}`;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [image.width, image.height]);

  return (
    <button ref={ref} className={styles.photo} onClick={onClick} aria-label={`Open ${image.alt}`}>
      {image.type === "video" ? (
        <span className={styles.videoTile}><Play size={36} fill="currentColor" aria-hidden="true" /></span>
      ) : (
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
          onLoad={(event) => {
            const img = event.currentTarget;
            const element = ref.current;
            if (element && img.naturalWidth) {
              const height = element.clientWidth * img.naturalHeight / img.naturalWidth;
              element.style.gridRowEnd = `span ${Math.ceil((height + 12) / 16)}`;
            }
          }}
          sizes="(max-width: 600px) 48vw, (max-width: 1000px) 32vw, 24vw" unoptimized />
      )}
    </button>
  );
}

function Viewer({ images, index, setIndex, onClose, hasMore, loading, loadMore }: {
  images: GalleryImage[];
  index: number;
  setIndex: (index: number) => void;
  onClose: () => void;
  hasMore: boolean;
  loading: boolean;
  loadMore: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = images[index];
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setIndex(Math.max(0, Math.min(images.length - 1, index + (event.key === "ArrowLeft" ? -1 : 1))));
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [images.length, index, setIndex]);

  return (
    <dialog ref={dialog} className={styles.viewer} aria-label="Photo gallery" onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={styles.viewerBar}>
        <span aria-live="polite">{index + 1} / {images.length}{hasMore ? "+" : ""}</span>
        <span className={styles.keyboardHint}>← → to explore · Esc to close</span>
        <button className={styles.iconButton} onClick={onClose} aria-label="Close gallery" autoFocus><X /></button>
      </div>
      <div className={styles.viewerBody}>
        <div className={styles.stage}>
          {photo.type === "video" ? (
            <a className={styles.videoPlayer} href={`${photo.tweetUrl}/video/1`} target="_blank" rel="noopener noreferrer">
              <Play size={48} fill="currentColor" aria-hidden="true" />
              <span>Watch this video on X <ArrowUpRight size={18} /></span>
            </a>
          ) : (
            <Image key={photo.id} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} unoptimized priority />
          )}
          <button className={`${styles.iconButton} ${styles.previous}`} disabled={index === 0}
            onClick={() => setIndex(index - 1)} aria-label="Previous photo"><ChevronLeft /></button>
          <button className={`${styles.iconButton} ${styles.next}`} disabled={index === images.length - 1}
            onClick={() => setIndex(index + 1)} aria-label="Next photo"><ChevronRight /></button>
        </div>
        <aside className={styles.caption}>
          <span className={styles.account}>@heyaharshu</span>
          {photo.createdAt && <time dateTime={photo.createdAt}>{new Date(photo.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}</time>}
          {photo.text && <p>{photo.text}</p>}
          {photo.tweetUrl && <a href={photo.tweetUrl} target="_blank" rel="noopener noreferrer">{photo.type === "video" ? "Watch on X" : "Read the original post"} <ArrowUpRight size={17} /></a>}
          {index === images.length - 1 && hasMore && <button className={styles.pill} onClick={loadMore} disabled={loading}>{loading ? "Loading…" : "Load older photos"}</button>}
        </aside>
      </div>
    </dialog>
  );
}

export default function TwitterGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [cursor, setCursor] = useState<string>();
  const [collectionComplete, setCollectionComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState<number | null>(null);
  const [backHref, setBackHref] = useState("/?view=modern");
  const inFlight = useRef(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const load = useCallback(async (nextCursor?: string, signal?: AbortSignal) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/gallery${nextCursor ? `?cursor=${encodeURIComponent(nextCursor)}` : ""}`, { signal, cache: "no-store" });
      const page: GalleryPage & { error?: string } = await response.json();
      if (!response.ok) throw new Error(page.error || "Photos couldn’t load. Please try again.");
      if (signal?.aborted) return;
      setImages((previous) => {
        const unique = new Map(previous.map((image) => [image.id, image]));
        for (const image of page.images) unique.set(image.id, image);
        return [...unique.values()];
      });
      setCursor(page.nextCursor);
      setCollectionComplete(page.collectionComplete === true);
    } catch (err) {
      if (!signal?.aborted) setError(err instanceof Error ? err.message : "Photos couldn’t load. Please try again.");
    } finally {
      inFlight.current = false;
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Defer one tick so Strict Mode cleanup cannot leave the initial request locked.
    const controller = new AbortController();
    const timer = setTimeout(() => {
      const from = new URLSearchParams(window.location.search).get("from");
      if (from && ["designer", "builder", "contentcreator"].includes(from)) {
        setBackHref(`/portfolio/${from}?view=modern`);
      }
      void load(undefined, controller.signal);
    }, 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [load]);

  useEffect(() => {
    const element = sentinel.current;
    if (!element || !cursor || loading || error) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void load(cursor);
    }, { rootMargin: "600px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [cursor, loading, error, load]);

  return (
    <main className={styles.gallery}>
      <nav className={styles.nav} aria-label="Gallery navigation">
        <Link href={backHref}><ArrowLeft size={18} /> Back to portfolio</Link>
        <a href="https://x.com/heyaharshu/media" target="_blank" rel="noopener noreferrer">@heyaharshu <ArrowUpRight size={16} /></a>
      </nav>
      <header className={styles.header}>
        <span>A visual journal</span>
        <h1>Gallery<span>.</span></h1>
        <p>Through my lens, from X. Latest moments first.</p>
      </header>
      <div className={styles.grid} aria-label="Photos, newest first" aria-busy={loading}>
        {images.map((image, index) => <Photo key={image.id} image={image} onClick={() => setActive(index)} />)}
        {loading && Array.from({ length: images.length ? 4 : 12 }, (_, i) => <div key={`skeleton-${i}`} className={styles.skeleton} style={{ gridRowEnd: `span ${[18, 25, 15, 22][i % 4]}` }} />)}
      </div>
      <div ref={sentinel} className={styles.status} aria-live="polite">
        {error ? <><p>{error}</p><button className={styles.pill} onClick={() => void load(cursor)}>Try again</button><a href="https://x.com/heyaharshu/media" target="_blank" rel="noopener noreferrer">Explore my media on X <ArrowUpRight size={16} /></a></>
          : loading ? <p>Bringing moments into frame…</p>
          : cursor ? <button className={styles.pill} onClick={() => void load(cursor)}>Load older photos</button>
          : <p>{images.length ? (collectionComplete ? "You’ve reached the first frame." : "More moments are coming into frame.") : "No photos to show just yet."}</p>}
      </div>
      {active !== null && <Viewer images={images} index={active} setIndex={setActive} onClose={() => setActive(null)} hasMore={!!cursor} loading={loading} loadMore={() => void load(cursor)} />}
    </main>
  );
}
