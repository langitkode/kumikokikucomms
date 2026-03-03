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
    <section id="about" ref={sectionRef} className="relative min-h-screen px-6 py-20 bg-[var(--color-night)] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-fine opacity-10" />
      <div className="absolute inset-0 bg-lantern-glow opacity-30" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p ref={subheadingRef} className="text-[var(--color-neonpink)] text-xs uppercase tracking-widest mb-3">
            {about.headingJP}
          </p>
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-tight">
            {about.heading}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-neonpink)] to-transparent mx-auto mt-6" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Profile */}
          <div ref={imageRef} className="relative order-first lg:order-last">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Profile Image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/profile.jpeg"
                  alt="Kumiko Kiku"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night)]/80 via-transparent to-transparent" />
              </div>
              
              {/* Neon Corner Accents */}
              <div className="absolute -top-3 -left-3 w-24 h-24 border-l-2 border-t-2 border-[var(--color-neon)]" />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-[var(--color-neonpink)]" />
              
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-neon)]/20 to-[var(--color-neonpink)]/20 blur-xl -z-10" />
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
