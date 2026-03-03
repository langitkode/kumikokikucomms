"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { animateGalleryReveal } from "@/lib/animations";

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
  category: string;
}

export default function GalleryPage() {
  const { portfolio, galleryCategories } = siteConfig;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return portfolio;
    return portfolio.filter((img) => img.category === selectedCategory);
  }, [selectedCategory, portfolio]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (items.length > 0) {
      animateGalleryReveal(items);
    }
  }, [filteredImages]);

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
          : filteredImages.length - 1
        : selectedImage < filteredImages.length - 1
          ? selectedImage + 1
          : 0;
    setSelectedImage(newIndex);
  };

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

  return (
    <div className="min-h-screen bg-[var(--color-night)]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-night)]/95 backdrop-blur-sm border-b border-[var(--color-nightlight)]">
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

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleImageClick(index)}
              className="group relative aspect-square bg-[var(--color-nightmid)] border border-[var(--color-nightlight)] cursor-pointer overflow-hidden"
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
                <p className="text-[var(--color-text)] font-medium text-sm">{image.label}</p>
                <p className="text-[var(--color-neonblue)] text-xs uppercase tracking-wider">
                  {image.category}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--color-neonblue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--color-textdim)] text-sm uppercase tracking-wider">
              No images in this category
            </p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-night)]/95 backdrop-blur-sm"
          onClick={handleLightboxClose}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleLightboxClose}
              className="absolute -top-12 right-0 text-[var(--color-textmuted)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Close lightbox"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="relative aspect-square border border-[var(--color-nightlight)]">
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[var(--color-text)] font-medium">
                  {filteredImages[selectedImage].label}
                </p>
                <p className="text-[var(--color-textmuted)] text-xs uppercase tracking-wider mt-1">
                  {filteredImages[selectedImage].category}
                </p>
              </div>
              <p className="text-[var(--color-textmuted)] text-xs font-mono">
                {selectedImage + 1} / {filteredImages.length}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => navigateImage("prev")}
                className="p-3 border border-[var(--color-nightlight)] text-[var(--color-textmuted)] hover:text-[var(--color-text)] hover:border-[var(--color-neon)] transition-colors"
                aria-label="Previous image"
              >
                <svg
                  width="20"
                  height="20"
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
                className="p-3 border border-[var(--color-nightlight)] text-[var(--color-textmuted)] hover:text-[var(--color-text)] hover:border-[var(--color-neon)] transition-colors"
                aria-label="Next image"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--color-nightlight)] mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-[var(--color-textdim)] text-xs uppercase tracking-wider">
            {siteConfig.hero.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
