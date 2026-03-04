"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/config";
import ServiceModal from "@/components/ui/ServiceModal";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { services, servicesHeading } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [selectedAccent, setSelectedAccent] = useState<string>("#ff8800");

  // Toggle float animations when in viewport
  useEffect(() => {
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

  const accentColors = [
    { hex: "#ff8800", text: "text-[var(--color-neon)]" },
    { hex: "#ff6b00", text: "text-[var(--color-neonpink)]" },
    { hex: "#3dccff", text: "text-[var(--color-neonblue)]" },
    { hex: "#fbbf24", text: "text-[var(--color-neonyellow)]" },
    { hex: "#a855f7", text: "text-[var(--color-neonpurple)]" },
    { hex: "#ff3355", text: "text-[var(--color-neonred)]" },
  ];

  useGSAP(
    () => {
      // Title reveal — very smooth clip path
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(100% 0 0 0)", y: 50 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Cards staggered entry — refined scale & fade
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-[var(--color-studio-dark)] overflow-hidden"
    >
      <div className="noise-overlay" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Simple Section Header */}
        <div className="mb-16 lg:mb-24 flex items-center gap-6 relative">
          <div className="flex flex-col relative">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-5xl font-black text-[var(--color-text)] tracking-tighter uppercase leading-none relative z-10"
            >
              SERVICES
            </h2>
            <p className="text-[var(--color-neon)] text-xs uppercase tracking-[0.4em] font-mono mt-2 pl-1">
              サービス
            </p>
          </div>
          <div className="flex-1 h-px bg-[var(--color-textdim)]/20 relative"></div>
        </div>

        {/* Catalog Cards — Balanced 4-3 Position */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
          {services.map((service, index) => {
            const accent = accentColors[index % accentColors.length];
            return (
              <button
                key={service.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => {
                  setSelectedService(service);
                  setSelectedAccent(accent.hex);
                }}
                className="group relative bg-[var(--color-studio-slate)] p-6 lg:p-8 text-left transition-all duration-500 hover:bg-[var(--color-studio-navy)] border border-hairline border-[var(--color-textdim)]/15 rounded-studio w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] min-w-[260px] flex flex-col justify-between min-h-[160px] hover:z-50"
              >
                {/* Subtle Hover Reveal Grain */}
                <div className="absolute inset-0 bg-grainy opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 rounded-studio" />

                {/* Scattered Card Emotes */}
                {index === 1 && (
                  <div className="absolute -top-6 -right-4 w-16 h-16 opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none animate-float">
                    <Image
                      src="/Assets/emotes/pistol.webp"
                      alt="Emote"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                )}
                {index === 4 && (
                  <div
                    className="absolute -bottom-4 -left-4 w-20 h-20 opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none animate-float"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <Image
                      src="/Assets/emotes/hype!.webp"
                      alt="Emote"
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                )}
                {index === 2 && (
                  <div
                    className="absolute top-1/2 -right-6 w-14 h-14 opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none animate-float"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <Image
                      src="/Assets/emotes/angry.webp"
                      alt="Emote"
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="relative z-20 w-full">
                  {/* Card Title */}
                  <div className="mb-6">
                    <h3 className="text-xl lg:text-2xl font-black text-[var(--color-text)] leading-tight tracking-tighter uppercase mb-1">
                      {service.title}
                    </h3>
                    <p className="text-[var(--color-textdim)] font-mono text-[9px] tracking-[0.2em] uppercase">
                      {service.titleJP}
                    </p>
                  </div>

                  {/* Preview Pricing */}
                  <div className="pt-5 border-t border-hairline border-[var(--color-textdim)]/20 flex items-center justify-between w-full">
                    <p
                      className={`text-lg font-black font-mono tracking-tighter ${accent.text}`}
                    >
                      {service.pricing &&
                        (Object.values(service.pricing) as string[])[0]}
                    </p>

                    {/* Hover Interaction Arrow */}
                    <div className="opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={accent.text}
                      >
                        <path
                          d="M7 17L17 7M17 7H8M17 7V16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="square"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        accentColor={selectedAccent}
      />
    </section>
  );
}
