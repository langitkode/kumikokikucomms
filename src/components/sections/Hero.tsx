"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/config";
import SocialIcons from "@/components/ui/SocialIcons";
import ParallaxLayer from "@/components/ui/ParallaxLayer";

export default function Hero() {
  const { hero, about, socialLinks } = siteConfig;
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate content on mount
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "cubic-bezier(0.8, 0, 0.2, 1)",
      }
    ).fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "cubic-bezier(0.6, 0, 0.4, 1)",
      },
      "-=0.4"
    ).fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "cubic-bezier(0.6, 0, 0.4, 1)",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background - Video (future) or Image */}
      <div className="absolute inset-0 bg-sumi">
        {/* Video Background (for future use) */}
        {hero.backgroundVideo && (
          <video
            src={hero.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadedData={() => setIsVideoLoaded(true)}
          />
        )}

        {/* Fallback Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-30" : "opacity-60"
          }`}
        >
          <Image
            src={hero.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sumi/80 via-sumi/50 to-sumi" />
      </div>

      {/* Scanline Effect (subtle) */}
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
      >
        {/* Parallax Content Container */}
        <ParallaxLayer speed={0.3} axis="y">
          <div className="text-center max-w-4xl mx-auto">
            {/* Copyright Top */}
            <p className="text-ash text-xs uppercase tracking-widest mb-8">
              {hero.copyright}
            </p>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-shiro mb-4 tracking-tight"
            >
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-aka font-medium uppercase tracking-wider mb-2"
            >
              {hero.subtitle}
            </p>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-sm md:text-base text-ash-light uppercase tracking-widest"
            >
              {hero.tagline}
            </p>
          </div>
        </ParallaxLayer>

        {/* About Section - Bottom */}
        <div className="absolute bottom-32 left-0 right-0 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="border-l-2 border-aka pl-6 py-4">
              <p className="text-shiro text-sm leading-relaxed mb-4">
                {about.paragraphs[0]}
              </p>
              <p className="text-aka text-xs uppercase tracking-wider italic">
                {about.goal}
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <SocialIcons links={socialLinks} size="sm" color="#c41e3a" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-ash text-xs uppercase tracking-widest mb-2 text-center">
            {about.heading} <span className="opacity-60">{about.headingJP}</span>
          </p>
          <div className="w-px h-12 bg-gradient-to-b from-aka to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
}
