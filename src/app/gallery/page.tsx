"use client";

import {
  useState,
  useRef,
  useEffect,
  Suspense,
  useCallback,
} from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { animateGalleryReveal } from "@/lib/animations";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface GalleryImage {
  src: string;
  lightboxSrc: string;
  alt: string;
  label: string;
  category: string;
}

function GalleryContent() {
  const { galleryCategories } = siteConfig;
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  // Validate if the category from URL actually exists in our config, otherwise default to "all"
  const isValidCategory = galleryCategories.some((c) => c.id === urlCategory);
  const initialCategory = isValidCategory && urlCategory ? urlCategory : "all";

  const [portfolioItems, setPortfolioItems] = useState<GalleryImage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const fetchItems = useCallback(
    async (category: string, cursor: string | null = null) => {
      try {
        if (cursor) setIsMoreLoading(true);
        else setIsLoading(true);

        const url = new URL("/api/gallery", window.location.origin);
        url.searchParams.set("category", category);
        url.searchParams.set("limit", "20");
        if (cursor) url.searchParams.set("next_cursor", cursor);

        const res = await fetch(url.toString());
        
        if (res.ok) {
          const data = await res.json();
          const newItems = data.resources || [];

          if (cursor) {
            setPortfolioItems((prev) => [...prev, ...newItems]);
          } else {
            setPortfolioItems(newItems);
          }
          setNextCursor(data.next_cursor);
        }
      } catch (e) {
        console.error("Gallery fetch failed:", e);
        setPortfolioItems([]);
      } finally {
        setIsLoading(false);
        setIsMoreLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchItems(selectedCategory, null);
  }, [selectedCategory, fetchItems]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (items.length > 0) {
      animateGalleryReveal(items);
    }
  }, [portfolioItems]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleLightboxClose = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const newIndex =
      direction === "prev"
        ? selectedImage > 0
          ? selectedImage - 1
          : portfolioItems.length - 1
        : selectedImage < portfolioItems.length - 1
          ? selectedImage + 1
          : 0;
    setSelectedImage(newIndex);
  };

  // Preload adjacent images for smoother navigation
  useEffect(() => {
    if (selectedImage === null || portfolioItems.length === 0) return;

    const preloadImage = (index: number) => {
      if (typeof window !== 'undefined') {
        const img = new window.Image();
        img.src = portfolioItems[index].lightboxSrc;
      }
    };

    // Preload next and previous images
    const nextIndex = (selectedImage + 1) % portfolioItems.length;
    const prevIndex = selectedImage > 0 ? selectedImage - 1 : portfolioItems.length - 1;
    
    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [selectedImage, portfolioItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") handleLightboxClose();
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Update URL when category changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedCategory !== "all") {
      url.searchParams.set("category", selectedCategory);
    } else {
      url.searchParams.delete("category");
    }
    window.history.replaceState({}, "", url.toString());
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[var(--color-night)] flex flex-col">
      {/* Header - solid color, no blur for performance */}
      <header className="sticky top-0 z-40 bg-[var(--color-night)]/95 border-b border-[var(--color-nightlight)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[var(--color-text)] tracking-tight">
                GALLERY
              </h1>
              <p className="text-xs text-[var(--color-textmuted)] tracking-wide uppercase">
                ギャラリー
              </p>
            </div>
            <a
              href="/"
              className="text-xs text-[var(--color-textmuted)] hover:text-[var(--color-neon)] transition-colors uppercase tracking-wider"
            >
              ← Back
            </a>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <nav className="border-b border-[var(--color-nightlight)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedCategory === category.id
                    ? "bg-[var(--color-neon)] text-[var(--color-nightdark)] border-[var(--color-neon)]"
                    : "bg-transparent text-[var(--color-textmuted)] border-[var(--color-nightlight)] hover:border-[var(--color-neon)] hover:text-[var(--color-text)]"
                }`}
              >
                {category.label}
                <span className="ml-2 opacity-60">{category.labelJP}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[var(--color-neon)] animate-spin" />
          </div>
        ) : (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 w-full max-w-5xl mx-auto"
            >
              {portfolioItems.map((image, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onClick={() => handleImageClick(index)}
                  className="group relative w-full aspect-video bg-[var(--color-nightmid)] border border-[var(--color-nightlight)] cursor-pointer overflow-hidden rounded-sm"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-transform duration-400 ${
                      loadedImages.has(index) ? "opacity-100" : "opacity-0"
                    } group-hover:scale-105`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                  />

                  {!loadedImages.has(index) && (
                    <div className="absolute inset-0 bg-[var(--color-nightmid)] animate-pulse" />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[var(--color-night)]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                    <p className="text-[var(--color-text)] font-medium text-sm">
                      {image.label}
                    </p>
                    <p className="text-[var(--color-neonblue)] text-xs uppercase tracking-wider">
                      {image.category}
                    </p>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--color-neonblue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {portfolioItems.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <p className="text-[var(--color-textdim)] text-sm uppercase tracking-wider">
                  No images in this category
                </p>
              </div>
            )}

            {/* Load More Button */}
            {nextCursor && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => fetchItems(selectedCategory, nextCursor)}
                  disabled={isMoreLoading}
                  className="px-8 py-4 bg-transparent border border-[var(--color-nightlight)] text-[var(--color-text)] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[var(--color-neon)] hover:text-[var(--color-nightdark)] hover:border-[var(--color-neon)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isMoreLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="animate-spin h-3 w-3 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    "Load More Works"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Lightbox Modal - solid color, no blur for performance */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-night)]/98"
          onClick={handleLightboxClose}
        >
          <div
            className="relative max-w-3xl w-full mx-4 group/modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleLightboxClose}
              className="absolute -top-12 right-0 text-[var(--color-textmuted)] hover:text-[var(--color-text)] transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image Container - Original aspect ratio */}
            <div className="relative bg-[var(--color-nightdark)] border border-[var(--color-nightlight)] rounded-sm overflow-hidden group flex items-center justify-center" style={{ minHeight: '300px', maxHeight: '70vh' }}>
              <Image
                src={portfolioItems[selectedImage].lightboxSrc}
                alt={portfolioItems[selectedImage].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 90vw, 1200px"
                priority
              />

              {/* Navigation Overlays */}
              <button
                onClick={() => navigateImage("prev")}
                className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center bg-gradient-to-r from-[var(--color-nightdark)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text)] hover:text-[var(--color-neon)]"
                aria-label="Previous image"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={() => navigateImage("next")}
                className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center bg-gradient-to-l from-[var(--color-nightdark)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text)] hover:text-[var(--color-neon)]"
                aria-label="Next image"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Metadata Footer */}
            <div className="mt-4 flex items-end justify-between px-1">
              <div>
                <h3 className="text-[var(--color-text)] font-black text-lg tracking-tighter uppercase leading-none mb-1">
                  {portfolioItems[selectedImage].label}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--color-neonblue)] text-[9px] font-mono border border-[var(--color-neonblue)]/20 px-2 py-0.5 uppercase tracking-widest bg-[var(--color-neonblue)]/5">
                    {portfolioItems[selectedImage].category}
                  </span>
                  <span className="text-[var(--color-textdim)] text-[10px] uppercase tracking-widest font-mono">
                    {selectedImage + 1} / {portfolioItems.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateImage("prev")}
                  className="text-[var(--color-textdim)] hover:text-[var(--color-neon)] transition-colors p-1"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={() => navigateImage("next")}
                  className="text-[var(--color-textdim)] hover:text-[var(--color-neon)] transition-colors p-1"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--color-nightlight)]">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-[var(--color-textdim)] text-xs uppercase tracking-wider">
            {siteConfig.hero.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-[var(--color-night)]" />}
    >
      <GalleryContent />
    </Suspense>
  );
}
