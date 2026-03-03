"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

const accentColors = [
  {
    border: "border-[var(--color-neon)]",
    text: "text-[var(--color-neon)]",
    bg: "bg-[var(--color-neon)]",
  },
  {
    border: "border-[var(--color-neonpink)]",
    text: "text-[var(--color-neonpink)]",
    bg: "bg-[var(--color-neonpink)]",
  },
  {
    border: "border-[var(--color-neonblue)]",
    text: "text-[var(--color-neonblue)]",
    bg: "bg-[var(--color-neonblue)]",
  },
  {
    border: "border-[var(--color-neonpurple)]",
    text: "text-[var(--color-neonpurple)]",
    bg: "bg-[var(--color-neonpurple)]",
  },
  {
    border: "border-[var(--color-neonyellow)]",
    text: "text-[var(--color-neonyellow)]",
    bg: "bg-[var(--color-neonyellow)]",
  },
];

export default function Pricing() {
  const { pricing } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate table on tab change
  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [selectedIndex]);

  const selectedData = pricing[selectedIndex];
  const accent = accentColors[selectedIndex % accentColors.length];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[var(--color-studio-navy)] overflow-hidden"
    >
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-dot-japanese opacity-15" />
      <div className="absolute inset-0 bg-lantern-glow opacity-20" />

      {/* Ghost heading */}
      <div className="absolute top-6 left-6 lg:left-16 pointer-events-none select-none">
        <p className="text-[8vw] font-black text-[var(--color-text)] opacity-[0.03] tracking-tighter leading-none">
          価格
        </p>
      </div>

      <div className="relative z-10 px-6 lg:px-16 xl:px-24">
        {/* Simple Section Header */}
        <div className="mb-12 lg:mb-16 flex items-center gap-6 max-w-5xl">
          <div className="flex flex-col">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-5xl font-black text-[var(--color-text)] tracking-tighter uppercase leading-none"
            >
              PRICING
            </h2>
            <p className="text-[var(--color-neon)] text-xs uppercase tracking-[0.4em] font-mono mt-2 pl-1">
              料金
            </p>
          </div>
          <div className="flex-1 h-px bg-[var(--color-textdim)]/20" />
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-10 max-w-5xl">
          {pricing.map((item, index) => {
            const isSelected = selectedIndex === index;
            const btnAccent = accentColors[index % accentColors.length];
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIndex(index)}
                className={`px-5 py-2.5 rounded-sm text-[11px] font-mono font-black uppercase tracking-widest transition-all duration-300 border border-hairline ${
                  isSelected
                    ? `bg-[var(--color-studio-slate)] text-[var(--color-text)] ${btnAccent.border}`
                    : `bg-[var(--color-studio-navy)] text-[var(--color-textmuted)] border-[var(--color-textdim)]/20 hover:bg-[var(--color-studio-slate)]`
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Selected Pricing Table */}
        <div
          ref={tableRef}
          className={`relative bg-[var(--color-studio-slate)] rounded-studio border border-hairline border-[var(--color-textdim)]/15 p-8 lg:p-12 transition-all duration-500 max-w-5xl border-l-2 ${accent.border}`}
        >
          {/* New Scattered Emotes */}
          <div
            className="absolute -top-12 left-1/4 w-16 h-16 opacity-70 z-20 pointer-events-none animate-float"
            style={{ animationDelay: "2s" }}
          >
            <Image
              src="/Assets/emotes/sleeping.webp"
              alt="Sleeping Emote"
              fill
              sizes="64px"
              className="object-contain opacity-60"
            />
          </div>
          <div
            className="absolute -top-10 -right-10 w-16 h-16 opacity-80 z-20 pointer-events-none animate-float"
            style={{ animationDelay: "0.3s" }}
          >
            <Image
              src="/Assets/emotes/lovelove.webp"
              alt="Lovelove Emote"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 relative z-10">
            {/* Left Column: Base & Rigging */}
            <div>
              <div className="mb-12">
                <p className="text-[var(--color-textdim)] text-[10px] font-mono uppercase tracking-[0.3em] mb-6">
                  BASE SPECIFICATION
                </p>
                <div className="space-y-0 text-sm">
                  {Object.entries(selectedData.basePrice).map(([key, item]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-4 border-b border-hairline border-[var(--color-textdim)]/10"
                    >
                      <span className="text-[var(--color-text)] font-medium">
                        {item.label}
                      </span>
                      <span
                        className={`font-mono font-black tracking-tighter ${accent.text}`}
                      >
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedData.riggingPrice && (
                <div>
                  <p className="text-[var(--color-textdim)] text-[10px] font-mono uppercase tracking-[0.3em] mb-6">
                    RIGGING SPECIFICATION
                  </p>
                  <div className="space-y-0 text-sm">
                    {Object.entries(selectedData.riggingPrice).map(
                      ([key, item]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between py-4 border-b border-hairline border-[var(--color-textdim)]/10"
                        >
                          <span className="text-[var(--color-text)] font-medium">
                            {item.label}
                          </span>
                          <span
                            className={`font-mono font-black tracking-tighter ${accent.text}`}
                          >
                            {item.price}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Includes & Add-ons */}
            <div>
              <div className="mb-12">
                <p className="text-[var(--color-textdim)] text-[10px] font-mono uppercase tracking-[0.3em] mb-5">
                  INCLUDED FEATURES
                </p>
                <ul className="space-y-4">
                  {selectedData.includes.map((item, i) => (
                    <li
                      key={i}
                      className="text-[var(--color-textmuted)] text-sm flex items-start gap-3"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`mt-0.5 opacity-60 ${accent.text}`}
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedData.addOns && selectedData.addOns.length > 0 && (
                <div className="mb-12">
                  <p className="text-[var(--color-textdim)] text-[10px] font-mono uppercase tracking-[0.3em] mb-5">
                    OPTIONAL ADD-ONS
                  </p>
                  <div className="space-y-0 text-sm border-t border-hairline border-[var(--color-textdim)]/10">
                    {selectedData.addOns.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-4 border-b border-hairline border-[var(--color-textdim)]/10"
                      >
                        <span className="text-[var(--color-textmuted)]">
                          {item.label}
                        </span>
                        <span className="font-mono font-medium text-[var(--color-text)] text-xs">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-hairline border-[var(--color-textdim)]/20">
                <a
                  href={selectedData.ctaLink || "#request"}
                  className={`inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-[var(--color-studio-navy)] text-[11px] uppercase tracking-[0.2em] font-black font-mono transition-all duration-300 border border-hairline border-[var(--color-textdim)]/20 hover:border-transparent rounded-sm hover:-translate-y-1 ${accent.text}`}
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
                >
                  {selectedData.ctaLabel || "COMMISSION THIS TIER"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
