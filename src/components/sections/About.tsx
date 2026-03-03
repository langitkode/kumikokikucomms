"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/config";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { about } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Background Text Reveal
      if (bgTextRef.current) {
        tl.fromTo(
          bgTextRef.current.querySelectorAll("span"),
          { y: 100, opacity: 0, rotateX: -30 },
          {
            y: 0,
            opacity: 0.1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
          },
        );
      }

      // Portrait Reveal & Parallax
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { x: 50, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "cubic-bezier(0.6, 0, 0.4, 1)",
          },
          "-=0.8",
        );

        // Parallax effect on image
        gsap.to(imageRef.current, {
          y: -80,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Parallax on BG Text (different speed for depth)
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: 40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Content Reveal
      if (textContentRef.current) {
        const lines = textContentRef.current.querySelectorAll(".reveal-line");
        tl.fromTo(
          lines,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.6",
        );
      }

      // Quote / Goal Box Reveal
      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.4",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-[var(--color-studio-slate)] overflow-hidden"
    >
      <div className="noise-overlay" />
      {/* Background Decorative Layers */}
      <div className="absolute inset-0 bg-grid-fine opacity-5" />
      <div className="absolute inset-0 bg-lantern-glow opacity-30" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-[1400px] px-6 lg:px-16 flex flex-col items-center"
      >
        {/* Layer 1: Background Oversized Text */}
        <div
          ref={bgTextRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0"
        >
          <div className="flex flex-col items-center">
            <span className="text-[20vw] font-black leading-none text-[var(--color-text)] opacity-0 tracking-tighter block">
              KUMIKO
            </span>
            <span className="text-[20vw] font-black leading-none text-gradient-neon opacity-0 tracking-tighter block -mt-[4vw]">
              KIKU
            </span>
          </div>
        </div>

        {/* Layout Content */}
        <div className="grid lg:grid-cols-12 gap-10 items-center w-full">
          {/* Layer 3: Left Content (Text) */}
          <div
            ref={textContentRef}
            className="lg:col-span-6 z-20 order-2 lg:order-1 lg:pr-10"
          >
            {/* Small Japanese Subtitle */}
            <p className="reveal-line text-[var(--color-neon)] text-[10px] uppercase tracking-[0.5em] font-mono mb-4">
              {about.headingJP} — 自画像
            </p>

            {/* Intro Paragraph — larger & bold typography */}
            <div className="reveal-line border-l-3 border-[var(--color-neon)] pl-8 mb-10">
              <h2 className="text-3xl md:text-5xl font-black text-[var(--color-text)] leading-[1.1] mb-4 tracking-tighter uppercase">
                {about.headingMain}
              </h2>
              <p className="text-[var(--color-textmuted)] text-base md:text-lg leading-relaxed max-w-lg">
                {about.paragraphs[0]}
              </p>
            </div>

            {/* Paragraphs — high contrast typography */}
            <div className="space-y-6 mb-12 max-w-lg">
              {about.paragraphs.slice(1).map((paragraph, i) => (
                <p
                  key={i}
                  className="reveal-line text-[var(--color-textmuted)] text-sm md:text-base leading-[1.8]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Goal statement / Featured Label overlap */}
            <div
              ref={quoteRef}
              className="relative p-6 bg-[var(--color-nightmid)] border-l-4 border-[var(--color-neonpink)] mb-10 max-w-md group overflow-hidden"
            >
              {/* Scanline pattern for the box */}
              <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
              <p className="relative z-10 text-[var(--color-text)] text-sm md:text-base font-medium italic leading-relaxed">
                <span className="text-[var(--color-neonpink)] font-bold non-italic mr-2">
                  ✦
                </span>
                {about.goal}
              </p>
              {/* Decorative corner label */}
              <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-[var(--color-textdim)] uppercase tracking-wider">
                Mission
              </div>
            </div>

            {/* Button */}
            <div className="reveal-line">
              <Button href="#services" variant="primary" size="md">
                COMMISSION SERVICES
              </Button>
            </div>
          </div>

          {/* Layer 2: Right Content (Portrait Overlap) */}
          <div className="lg:col-span-6 z-10 order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-full max-w-[600px] aspect-[4/5] lg:aspect-auto h-auto lg:h-[80vh] flex items-end justify-center"
            >
              {/* Giant Portrait (no-bg) */}
              <div className="relative w-full h-full lg:h-[110%] lg:-mb-10 group">
                {/* Floating Emote Decor */}
                <div className="absolute top-10 -right-6 lg:-right-12 w-24 h-24 opacity-90 pointer-events-none animate-float z-20">
                  <Image
                    src="/Assets/emotes/mesmerized.png"
                    alt="Mesmerized Emote"
                    fill
                    sizes="100px"
                    className="object-contain"
                  />
                </div>

                <Image
                  src={about.image}
                  alt="Kumiko Kiku"
                  fill
                  className="object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />

                {/* Visual Depth Accents — Glowing aura behind portrait */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[var(--color-neon)]/5 blur-[100px] rounded-full z-[-1] animate-neon-pulse" />

                {/* Floating Katakana Label */}
                <div className="absolute top-1/4 -left-4 lg:-left-12 vertical-text">
                  <span className="text-[var(--color-neonpink)] text-[8px] md:text-[10px] font-mono tracking-[0.8em] opacity-40 uppercase">
                    アーティスト
                  </span>
                </div>

                {/* Vertical spine label on mobile */}
                <div className="absolute bottom-10 right-0 vertical-text lg:hidden">
                  <span className="text-[var(--color-neon)] text-[8px] font-mono tracking-[0.5em] opacity-30 uppercase">
                    KUMIKO KIKU 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Spine Label on Desktop — Fixed feel */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block overflow-hidden">
        <div className="vertical-text text-[var(--color-textdim)] opacity-20 text-[10px] tracking-[0.6em] uppercase font-mono">
          KUMIKO KIKU // ARTIST PORTFOLIO // COMMISSION OPEN
        </div>
      </div>
    </section>
  );
}
