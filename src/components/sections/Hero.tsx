"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/config";

export default function Hero() {
  const { hero } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const kanjiRef = useRef<HTMLParagraphElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Kanji fades in with scale
      tl.fromTo(
        kanjiRef.current,
        { scale: 1.3, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 0.06,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
        },
      );

      // Title line 1 — clip reveal from left
      tl.fromTo(
        titleLine1Ref.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1,
          ease: "expo.out",
        },
        "-=1",
      );

      // Title line 2 — clip reveal with slight delay
      tl.fromTo(
        titleLine2Ref.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.7",
      );

      // Line draws in
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "expo.out" },
        "-=0.5",
      );

      // Tagline slides up
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "cubic-bezier(0.6, 0, 0.4, 1)",
        },
        "-=0.3",
      );

      // CTA fades in
      tl.fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "cubic-bezier(0.6, 0, 0.4, 1)",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[var(--color-studio-dark)]"
    >
      {/* Ambient layers — subtle */}
      <div className="absolute inset-0 bg-night-gradient opacity-40" />
      <div className="absolute inset-0 bg-grid-japanese opacity-5" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Giant kanji watermark — center */}
      <p
        ref={kanjiRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[30vw] font-black text-[var(--color-text)] opacity-0 leading-none select-none pointer-events-none"
      >
        菊
      </p>

      {/* Main Content — centered, clean */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center">
          {/* Title */}
          <h1 className="mb-6">
            <span
              ref={titleLine1Ref}
              className="block text-[clamp(4rem,14vw,11rem)] font-black text-[var(--color-text)] leading-[0.8] tracking-[-0.05em] uppercase"
            >
              {hero.title}
            </span>
            <span
              ref={titleLine2Ref}
              className="block text-[clamp(4rem,14vw,11rem)] font-black leading-[0.8] tracking-[-0.05em] text-gradient-neon uppercase"
            >
              {hero.titleAccent}
            </span>
          </h1>

          {/* Accent line */}
          <div
            ref={lineRef}
            className="w-24 h-[2px] bg-gradient-to-r from-[var(--color-neon)] to-[var(--color-neonpink)] mx-auto mb-6"
          />

          {/* Tagline — minimal */}
          <p
            ref={taglineRef}
            className="text-[var(--color-textmuted)] text-sm md:text-base tracking-[0.15em] uppercase font-mono mb-10"
          >
            {hero.tagline}
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center gap-4 relative"
          >
            {/* Floating Emote Decor */}
            <div className="absolute -top-16 -right-12 w-20 h-20 opacity-90 pointer-events-none animate-float z-20">
              <Image
                src="/Assets/emotes/hi.png"
                alt="Hi Emote"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>

            <a
              href="#services"
              className="group relative px-8 py-4 bg-[var(--color-neon)] text-[var(--color-studio-dark)] text-[11px] uppercase tracking-[0.2em] font-black font-mono overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,76,255,0.4)] rounded-sm"
            >
              <span className="relative z-10">View Services</span>
              <div className="absolute inset-0 bg-[var(--color-neonpink)] transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-[var(--color-nightdark)] text-xs uppercase tracking-[0.15em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                View Services
              </span>
            </a>
            <a
              href="/gallery"
              className="px-8 py-4 border border-[var(--color-text)]/20 text-[var(--color-text)] text-xs uppercase tracking-[0.15em] font-medium hover:border-[var(--color-neon)] hover:text-[var(--color-neon)] transition-all duration-300"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip — very minimal */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between px-6 lg:px-16 py-4 text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--color-textdim)]">
          <span>菊 Kumiko Kiku</span>
          <span className="animate-float">↓</span>
          <span className="hidden md:inline">Commission Open</span>
        </div>
      </div>
    </section>
  );
}
