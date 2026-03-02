"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingParticles from "@/components/ui/FloatingParticles";
import SocialIcons from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { hero, about, socialLinks } = siteConfig;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    ).fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    ).fromTo(
      aboutCardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Parallax on image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 80,
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen py-20 px-6 flex items-center">
      {/* Background */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src={hero.backgroundImage}
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-charcoal" />
      </div>

      <FloatingParticles count={12} />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header Brand */}
        <div className="text-center mb-8">
          <p className="text-white/60 text-xs tracking-widest uppercase">
            {hero.copyright}
          </p>
        </div>

        {/* Main Title */}
        <div className="text-center mb-10">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {hero.title}
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-orange-light font-medium"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {hero.subtitle}
          </p>
        </div>

        {/* About Me Card */}
        <div
          ref={aboutCardRef}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
        >
          <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 text-center">
            About Me
          </h2>

          <div className="space-y-4 text-white/80 text-sm md:text-base leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="text-orange-light text-sm md:text-base mt-6 font-medium italic">
            {about.goal}
          </p>

          {/* Social Links */}
          <div className="mt-8">
            <SocialIcons links={socialLinks} size="md" color="#f9963d" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-10">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
            Services
          </p>
          <div className="animate-bounce-down inline-block">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-orange-primary"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
