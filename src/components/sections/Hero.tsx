"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/config";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Hero() {
  const { hero, about } = siteConfig;
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
    <section id="home" className="relative h-screen w-full overflow-hidden bg-sumi">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
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
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-40" : "opacity-70"
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
        <div className="absolute inset-0 bg-gradient-to-b from-sumi/90 via-sumi/60 to-sumi" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-urban opacity-10" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Main Content Container */}
        <div className="max-w-5xl mx-auto text-center">
          {/* Japanese Decorative Element */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-aka" />
              <p className="text-aka text-xs uppercase tracking-[0.3em]">
                クミコキク
              </p>
              <div className="w-8 h-px bg-aka" />
            </div>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-shiro mb-6 tracking-tighter"
          >
            {hero.title.split(" ").map((word, i) => (
              <span key={i}>
                {word}
                {i < hero.title.split(" ").length - 1 && (
                  <span className="text-aka">.</span>
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-2xl md:text-4xl text-aka font-medium uppercase tracking-widest mb-4"
          >
            {hero.subtitle}
          </p>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-sm md:text-base text-ash-light uppercase tracking-wider max-w-xl mx-auto"
          >
            {hero.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <a
              href="#services"
              className="group relative px-8 py-3.5 bg-aka text-shiro text-sm uppercase tracking-wider font-medium overflow-hidden"
            >
              <span className="relative z-10">View Services</span>
              <div className="absolute inset-0 bg-shiro transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-sumi opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Services
              </span>
            </a>
            <a
              href="/gallery"
              className="px-8 py-3.5 border border-ash text-shiro text-sm uppercase tracking-wider font-medium hover:border-aka hover:text-aka transition-colors duration-200"
            >
              Portfolio
            </a>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-8">
          <div className="max-w-5xl mx-auto flex items-end justify-between">
            {/* Social Links */}
            <div>
              <p className="text-ash text-xs uppercase tracking-wider mb-3">
                Connect
              </p>
              <SocialIcons links={siteConfig.socialLinks} size="sm" />
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-ash text-[10px] uppercase tracking-widest writing-vertical">
                Scroll
              </p>
              <div className="w-px h-16 bg-gradient-to-b from-aka via-aka to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-aka/30" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-aka/30" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-aka/30" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-aka/30" />
    </section>
  );
}
