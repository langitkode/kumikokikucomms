"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

// Generate random particle data once
function generateParticles(count: number) {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    isLarge: Math.random() > 0.8,
    isGold: Math.random() > 0.9,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
    driftX: (Math.random() - 0.5) * 200,
    driftY: -100 - Math.random() * 100,
  }));
}

export default function Gallery() {
  const { portfolio } = siteConfig;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Memoize particles to avoid recalculation on re-renders
  const particles = useMemo(() => generateParticles(20), []);

  // Mount effect for client-side only rendering
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const item = itemsRef.current[index];
    if (!item) return;

    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(item.querySelector("img"), {
      x: x * 20,
      y: y * 20,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    const item = itemsRef.current[index];
    if (!item) return;

    gsap.to(item.querySelector("img"), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <>
      <section
        id="portfolio"
        className="relative py-24 px-6 bg-charcoal"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-dark to-charcoal z-0" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />

        {/* Floating Particles */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: particle.isLarge ? "8px" : "4px",
                  height: particle.isLarge ? "8px" : "4px",
                  background: particle.isGold ? "#ffd700" : "#f9963d",
                  boxShadow: particle.isGold
                    ? "0 0 15px #ffd700"
                    : "0 0 10px #f9963d",
                  animation: `drift ${particle.duration}s linear infinite`,
                  animationDelay: `${particle.delay}s`,
                  "--drift-x": `${particle.driftX}px`,
                  "--drift-y": `${particle.driftY}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ファランド
            </h2>
            <p className="text-orange-light/60 text-xs tracking-wider uppercase">
              Portfolio
            </p>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-orange-primary to-transparent mx-auto mt-6" />
          </div>

          {/* Portfolio Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.map((item, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-charcoal-light border border-white/5 cursor-pointer"
                onClick={() => setSelectedImage(i)}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <p className="text-white text-sm font-medium">
                    {item.label || item.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio Link */}
          <div className="text-center mt-10">
            <a
              href="#request"
              className="inline-flex items-center gap-2 text-orange-primary hover:text-orange-light transition-colors text-sm font-medium"
            >
              <span>→</span>
              <span>Art Portfolio</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={portfolio[selectedImage].src}
                alt={portfolio[selectedImage].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Caption */}
            <p className="text-white/80 text-center mt-4">
              {portfolio[selectedImage].label || portfolio[selectedImage].alt}
            </p>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage > 0 ? selectedImage - 1 : portfolio.length - 1
                  )
                }
                className="p-3 rounded-full bg-white/10 hover:bg-orange-primary/30 transition-colors"
                aria-label="Previous image"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <span className="text-white/60 text-sm">
                {selectedImage + 1} / {portfolio.length}
              </span>

              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage < portfolio.length - 1 ? selectedImage + 1 : 0
                  )
                }
                className="p-3 rounded-full bg-white/10 hover:bg-orange-primary/30 transition-colors"
                aria-label="Next image"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
