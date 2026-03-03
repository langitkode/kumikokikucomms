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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "cubic-bezier(0.6, 0, 0.4, 1)" }
      ).fromTo(
        subheadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "cubic-bezier(0.6, 0, 0.4, 1)" },
        "-=0.3"
      ).fromTo(
        contentRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "cubic-bezier(0.6, 0, 0.4, 1)" },
        "-=0.4"
      ).fromTo(
        imageRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "cubic-bezier(0.6, 0, 0.4, 1)" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative min-h-screen px-6 py-20 bg-[var(--color-night)] flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-fine opacity-10" />
      <div className="absolute inset-0 bg-lantern-glow opacity-30" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p ref={subheadingRef} className="text-[var(--color-neonpink)] text-xs uppercase tracking-widest mb-3">
            {about.headingJP}
          </p>
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-tight">
            {about.heading}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-neonpink)] to-transparent mx-auto mt-6" />
        </div>

        {/* Content Grid - Fixed Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image/Profile - Order first on mobile, last on desktop */}
          <div ref={imageRef} className="relative lg:order-last">
            <div className="relative w-full max-w-md mx-auto aspect-[3/4]">
              {/* Profile Image Container */}
              <div className="relative w-full h-full overflow-hidden bg-[var(--color-nightmid)]">
                <Image
                  src="/profile.jpeg"
                  alt="Kumiko Kiku"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night)]/80 via-transparent to-transparent" />
              </div>
              
              {/* Neon Corner Accents - Positioned absolutely relative to container */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[var(--color-neon)] -translate-x-1 -translate-y-1" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[var(--color-neonpink)] translate-x-1 translate-y-1" />
              
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-neon)]/10 to-[var(--color-neonpink)]/10 blur-2xl -z-10" />
            </div>
          </div>

          {/* Text Content */}
          <div ref={contentRef} className="space-y-6">
            {/* Intro */}
            <div className="border-l-2 border-[var(--color-neon)] pl-6">
              <p className="text-xl md:text-2xl text-[var(--color-text)] font-light leading-relaxed">
                {about.paragraphs[0]}
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              {about.paragraphs.slice(1).map((paragraph, i) => (
                <p key={i} className="text-[var(--color-textmuted)] text-sm md:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Goal Statement */}
            <div className="pt-6">
              <p className="text-[var(--color-neonpink)] text-sm uppercase tracking-wider font-medium italic">
                {about.goal}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button href="#services" variant="outline" size="md">
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
