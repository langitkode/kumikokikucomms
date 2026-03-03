"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Logic for bento sizes is no longer needed for the dense grid

export default function Gallery() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
          : items.length - 1
        : selectedImage < items.length - 1
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
  }, [selectedImage, items]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          const fetchedItems = data.resources || [];
          setItems(fetchedItems.slice(0, 10));
        }
      } catch (e) {
        console.error("Gallery fetch failed:", e);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title clip-reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: {
              each: 0.06,
              from: "start",
            },
            ease: "cubic-bezier(0.6, 0, 0.4, 1)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[var(--color-studio-dark)] overflow-hidden"
    >
      {/* Background */}
      {/* <div className="noise-overlay opacity-5" />*/}
      <div className="absolute inset-0 bg-grid-fine opacity-8" />
      <div className="absolute inset-0 bg-lantern-glow opacity-20" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Ghost heading */}
      <div className="absolute bottom-8 right-6 lg:right-16 pointer-events-none select-none">
        <p className="text-[10vw] font-black text-[var(--color-text)] opacity-[0.02] tracking-tighter leading-none">
          作品
        </p>
      </div>

      <div className="relative z-10 px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[var(--color-neonblue)]" />
              <p className="text-[var(--color-neonblue)] text-[10px] uppercase tracking-[0.4em] font-mono">
                ギャラリー
              </p>
            </div>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--color-text)] tracking-tighter"
            >
              GALLERY
            </h2>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[var(--color-neonblue)] hover:text-[var(--color-text)] transition-colors text-xs uppercase tracking-[0.15em] font-mono group"
          >
            <span>View All Works</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Dense Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3"
        >
          {items.map((item: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleImageClick(index)}
              className="group relative aspect-video bg-[var(--color-studio-slate)] overflow-hidden border border-hairline border-[var(--color-textdim)]/10 hover:border-[var(--color-neonblue)]/40 transition-all duration-300 rounded-studio cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
              />

              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-[var(--color-nightmid)] animate-pulse" />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-nightdark)]/90 via-[var(--color-nightdark)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                <p className="text-[var(--color-text)] font-bold text-sm uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-[var(--color-neonblue)] text-[10px] uppercase tracking-wider font-mono">
                  {item.category}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[var(--color-neonblue)]/0 border-l-[24px] border-l-transparent group-hover:border-t-[var(--color-neonblue)]/30 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - solid color, no blur for performance */}
      {selectedImage !== null && items[selectedImage] && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[var(--color-studio-dark)]/98"
          onClick={handleLightboxClose}
        >
          <div
            className="relative max-w-3xl w-full mx-4 group/modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleLightboxClose}
              className="absolute -top-12 right-0 text-[var(--color-textdim)] hover:text-[var(--color-text)] transition-colors z-10"
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

            {/* Image Container */}
            <div className="relative aspect-video bg-[var(--color-nightdark)] border border-hairline border-[var(--color-textdim)]/10 rounded-studio overflow-hidden group">
              <Image
                src={items[selectedImage].src}
                alt={items[selectedImage].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 90vw, 1200px"
                priority
              />

              {/* Navigation Overlays */}
              <button
                onClick={() => navigateImage("prev")}
                className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center bg-gradient-to-r from-[var(--color-studio-dark)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text)] hover:text-[var(--color-neonblue)]"
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
                className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center bg-gradient-to-l from-[var(--color-studio-dark)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text)] hover:text-[var(--color-neonblue)]"
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
                  {items[selectedImage].label}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--color-neonblue)] text-[9px] font-mono border border-[var(--color-neonblue)]/20 px-2 py-0.5 uppercase tracking-widest bg-[var(--color-neonblue)]/5">
                    {items[selectedImage].category}
                  </span>
                  <span className="text-[var(--color-textdim)] text-[10px] uppercase tracking-widest font-mono">
                    {selectedImage + 1} / {items.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateImage("prev")}
                  className="text-[var(--color-textdim)] hover:text-[var(--color-neonblue)] transition-colors p-1"
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
                  className="text-[var(--color-textdim)] hover:text-[var(--color-neonblue)] transition-colors p-1"
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
    </section>
  );
}
