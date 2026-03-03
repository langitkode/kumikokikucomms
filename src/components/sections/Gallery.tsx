"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { animateGridReveal } from "@/lib/animations";

export default function Gallery() {
  const { portfolio } = siteConfig;
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const previewItems = useMemo(() => portfolio.slice(0, 6), [portfolio]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (items.length > 0) {
      animateGridReveal(items);
    }
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <section id="portfolio" className="relative py-24 px-6 bg-[var(--color-night)]">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-fine opacity-10" />
      <div className="absolute inset-0 bg-lantern-glow opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--color-neonblue)] text-xs uppercase tracking-widest mb-2">
            ギャラリー
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text)] tracking-tight mb-4">
            GALLERY
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-neonblue)] to-transparent mx-auto" />
        </div>

        {/* Preview Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {previewItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="group relative aspect-square bg-[var(--color-nightmid)] border border-[var(--color-nightlight)] overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={`object-cover transition-transform duration-400 group-hover:scale-105 ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
              />

              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-[var(--color-nightmid)] animate-pulse" />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[var(--color-night)]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <p className="text-[var(--color-text)] font-medium text-sm">{item.label}</p>
                <p className="text-[var(--color-neonblue)] text-xs uppercase tracking-wider">
                  {item.category}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[var(--color-neonblue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-neonblue)] text-[var(--color-neonblue)] hover:bg-[var(--color-neonblue)]/10 hover:text-[var(--color-text)] transition-all duration-200 uppercase tracking-wider text-sm"
          >
            <span>View Full Gallery</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
