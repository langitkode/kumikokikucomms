"use client";

import { useState } from "react";
import AccordionSection from "@/components/ui/AccordionSection";
import { siteConfig } from "@/lib/config";

export default function Services() {
  const { services } = siteConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="services" className="relative py-24 px-6 bg-[var(--color-night)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-fine opacity-10" />
      <div className="absolute inset-0 bg-lantern-glow opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[var(--color-neonpink)] text-xs uppercase tracking-widest mb-2">
            サービス
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text)] tracking-tight mb-4">
            SERVICES
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-neonpink)] to-transparent mx-auto" />
        </div>

        {/* Intro Text */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-[var(--color-textmuted)] text-sm leading-relaxed mb-6">
            Confused about starting your VTubing journey? Too many assets to
            prepare? Let me help you with my Package Service — everything you
            need for VTuber branding in one place.
          </p>
          <p className="text-[var(--color-neon)] text-sm font-medium">
            And the best part? Everything is customizable to your needs ♡
          </p>
        </div>

        {/* Services Accordion */}
        <div className="space-y-2">
          {services.map((service, index) => (
            <AccordionSection
              key={service.id}
              title={service.title}
              titleJP={service.titleJP}
              description={service.description}
              features={service.features}
              important={service.important}
              pricing={service.pricing}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 text-[var(--color-neon)] hover:text-[var(--color-neonpink)] transition-colors text-sm uppercase tracking-wider"
          >
            <span>View Portfolio</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
