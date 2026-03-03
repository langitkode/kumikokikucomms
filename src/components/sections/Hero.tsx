"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/config";

export default function Hero() {
  const { hero } = siteConfig;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "cubic-bezier(0.8, 0, 0.2, 1)",
      }
    ).fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "cubic-bezier(0.6, 0, 0.4, 1)",
      },
      "-=0.6"
    ).fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "cubic-bezier(0.6, 0, 0.4, 1)",
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-night-base">
      {/* Night Gradient Background */}
      <div className="absolute inset-0 bg-night-gradient" />

      {/* Japanese Aesthetic Grid Overlay */}
      <div className="absolute inset-0 bg-grid-japanese opacity-20" />

      {/* Lantern Glow Effects (corner ambient lighting) */}
      <div className="absolute inset-0 bg-lantern-glow opacity-50" />

      {/* Vertical Light Beams (like street light rays) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-orange/10 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-neon-pink/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Japanese Decorative Element */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent" />
              <p className="text-neon-orange text-xs uppercase tracking-[0.5em]">
                クミコキク
              </p>
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-neon-orange to-transparent" />
            </div>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 tracking-tighter"
          >
            {hero.title.split(" ").map((word, i) => (
              <span key={i} className="relative inline-block">
                {word}
                {i < hero.title.split(" ").length - 1 && (
                  <span className="text-neon-orange text-glow-orange">.</span>
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-3xl text-neon-orange font-medium uppercase tracking-widest mb-4 text-glow-orange"
          >
            {hero.subtitle}
          </p>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-sm md:text-base text-text-secondary uppercase tracking-wider max-w-xl mx-auto"
          >
            {hero.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <a
              href="#services"
              className="group relative px-10 py-4 bg-gradient-to-r from-neon-orange to-neon-pink text-night-dark text-sm uppercase tracking-wider font-medium overflow-hidden shadow-lg"
            >
              <span className="relative z-10">View Services</span>
              <div className="absolute inset-0 bg-text-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-night-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Services
              </span>
            </a>
            <a
              href="/gallery"
              className="px-10 py-4 border border-neon-orange/50 text-text-primary text-sm uppercase tracking-wider font-medium hover:bg-neon-orange/10 hover:border-neon-orange hover:text-glow-orange transition-all duration-200"
            >
              Portfolio
            </a>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="text-text-muted text-[10px] uppercase tracking-widest">
            Scroll
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-neon-orange via-neon-orange/50 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Minimal Corner Accents (neon lines) */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-neon-orange/40" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-neon-pink/40" />
      <div className="absolute bottom-32 left-8 w-20 h-20 border-l border-b border-neon-pink/40" />
      <div className="absolute bottom-32 right-8 w-20 h-20 border-r border-b border-neon-orange/40" />
    </section>
  );
}
