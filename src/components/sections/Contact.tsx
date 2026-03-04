"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialIcons from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { socialLinks, hero } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Toggle float animations when in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        const floatElements = sectionRef.current?.querySelectorAll('.animate-float');
        floatElements?.forEach(el => {
          el.classList.toggle('running', entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      const contactSpans = headingRef.current?.querySelectorAll("span");
      if (contactSpans && contactSpans.length > 0) {
        tl.fromTo(
          contactSpans,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "expo.out",
          },
        );
      }

      tl.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "cubic-bezier(0.6, 0, 0.4, 1)",
        },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Fallback: Ensure text is visible if GSAP fails
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (headingRef.current) {
        headingRef.current.style.opacity = '1';
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = '1';
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="request"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-[var(--color-studio-dark)] overflow-hidden min-h-[60vh] flex items-center"
    >
      <div className="noise-overlay" />
      {/* Background — full gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-studio-slate)] via-[var(--color-studio-dark)] to-[var(--color-studio-dark)]" />
      <div className="absolute inset-0 bg-dot-japanese opacity-10" />
      <div className="absolute inset-0 bg-lantern-glow opacity-40" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute inset-0 scanline opacity-20" />

      {/* Decorative kanji */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <p className="text-[25vw] font-black text-[var(--color-neonpink)] opacity-[0.03] leading-none">
          依頼
        </p>
      </div>

      <div className="relative z-10 px-6 lg:px-16 xl:px-24 w-full">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Floating Emote Decor */}
          <div className="absolute -top-20 -left-10 w-24 h-24 opacity-90 pointer-events-none animate-float z-20">
            <Image
              src="/Assets/emotes/shocked.webp"
              alt="Shocked Emote"
              fill
              sizes="100px"
              className="object-contain"
            />
          </div>
          <div
            className="absolute top-0 -right-12 w-20 h-20 opacity-90 pointer-events-none animate-float z-20"
            style={{ animationDelay: "0.7s" }}
          >
            <Image
              src="/Assets/emotes/sad.webp"
              alt="Sad Emote"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>

          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[var(--color-neonpink)]/50" />
            <p className="text-[var(--color-neonpink)] text-[10px] uppercase tracking-[0.4em] font-mono">
              お問い合わせ
            </p>
            <div className="w-12 h-px bg-[var(--color-neonpink)]/50" />
          </div>

          {/* Neon Sign Heading */}
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--color-neonpink)] tracking-tighter mb-6 animate-neon-flicker"
            style={{
              textShadow:
                "0 0 20px rgba(255,77,122,0.6), 0 0 60px rgba(255,77,122,0.3), 0 0 100px rgba(255,77,122,0.15)",
            }}
          >
            <span className="block italic">LET&apos;S WORK</span>
            <span
              className="block text-[var(--color-text)]"
              style={{ textShadow: "none" }}
            >
              TOGETHER
            </span>
          </h2>

          {/* Description */}
          <div ref={contentRef} className="relative">
            {/* Easter Egg Emote */}
            <div
              className="absolute -bottom-10 -right-20 w-16 h-16 opacity-40 hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-float z-20"
              style={{ animationDelay: "1.4s" }}
            >
              <Image
                src="/Assets/emotes/patpat.webp"
                alt="Patpat Emote"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>

            <p className="text-[var(--color-textmuted)] text-sm leading-relaxed mb-10 max-w-md mx-auto">
              For commission inquiries, reach out through any platform below. I
              typically respond within 24-48 hours ♡
            </p>

            {/* Social Links */}
            <div className="mb-12">
              <SocialIcons links={socialLinks} size="lg" color="#ff4d7a" />
            </div>

            {/* Email CTA */}
            <a
              href="mailto:example@gmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--color-neonpink)] to-[var(--color-neon)] text-[var(--color-studio-dark)] text-[11px] uppercase tracking-[0.2em] font-black font-mono transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,122,0.4)] hover:-translate-y-1 rounded-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mb-0.5"
              >
                <rect x="2" y="4" width="20" height="16" rx="0" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-hairline border-[var(--color-textdim)]/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 lg:px-16 py-6">
          <p className="text-[var(--color-textdim)] text-[10px] uppercase tracking-[0.2em] font-mono opacity-50">
            {hero.copyright}
          </p>
          <div className="flex items-center gap-3 text-[var(--color-textdim)] text-[10px] font-mono tracking-wider opacity-50">
            <span>菊</span>
            <span className="w-4 h-px bg-[var(--color-textdim)]/20" />
            <span>Studio Specifications</span>
            <span className="w-4 h-px bg-[var(--color-textdim)]/20" />
            <span>2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}
