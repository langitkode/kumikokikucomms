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
    <section id="about" ref={sectionRef} className="relative py-24 px-6 bg-sumi">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-urban opacity-10" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p ref={subheadingRef} className="text-aka text-xs uppercase tracking-widest mb-3">
            {about.headingJP}
          </p>
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold text-shiro tracking-tight">
            {about.heading}
          </h2>
          <div className="w-16 h-px bg-aka mx-auto mt-6" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div ref={contentRef} className="space-y-6">
            {/* Intro */}
            <div className="border-l-2 border-aka pl-6">
              <p className="text-xl md:text-2xl text-shiro font-light leading-relaxed">
                {about.paragraphs[0]}
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              {about.paragraphs.slice(1).map((paragraph, i) => (
                <p key={i} className="text-ash-light text-sm md:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Goal Statement */}
            <div className="pt-6">
              <p className="text-aka text-sm uppercase tracking-wider font-medium italic">
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

          {/* Image/Visual */}
          <div ref={imageRef} className="relative">
            <div className="aspect-[3/4] bg-charcoal border border-ash relative overflow-hidden">
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-aka text-6xl font-bold mb-2">K</p>
                  <p className="text-ash text-xs uppercase tracking-widest">Kumiko Kiku</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l border-t border-aka/50" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-aka/50" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-charcoal border border-ash">
                <p className="text-2xl font-bold text-shiro">100+</p>
                <p className="text-ash text-xs uppercase tracking-wider mt-1">Projects</p>
              </div>
              <div className="text-center p-4 bg-charcoal border border-ash">
                <p className="text-2xl font-bold text-shiro">50+</p>
                <p className="text-ash text-xs uppercase tracking-wider mt-1">Clients</p>
              </div>
              <div className="text-center p-4 bg-charcoal border border-ash">
                <p className="text-2xl font-bold text-shiro">5+</p>
                <p className="text-ash text-xs uppercase tracking-wider mt-1">Years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Strip */}
        <div className="mt-20 pt-8 border-t border-ash-light">
          <div className="flex items-center justify-between text-ash text-xs uppercase tracking-wider">
            <span>Based in Japan</span>
            <span>•</span>
            <span>Available Worldwide</span>
            <span>•</span>
            <span>Commissions Open</span>
          </div>
        </div>
      </div>
    </section>
  );
}
