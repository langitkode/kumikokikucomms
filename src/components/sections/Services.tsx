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
    <section id="services" className="relative py-24 px-6 bg-charcoal">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-orange-light/70 text-xs tracking-ultra uppercase mb-3">
            ファランド
          </p>
          <p className="text-orange-primary font-bold tracking-wider uppercase text-xs mb-2">
            BEST OFFER WITH
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2">
            Package
          </h2>
          <p className="text-2xl md:text-3xl text-white/80 uppercase font-medium mb-6">
            SERVICE
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-orange-primary to-transparent mx-auto" />
        </div>

        {/* Intro Text */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
            Confused to start your VTubing journey? Too many streaming assets
            need to be done? Don&apos;t sweat no more! I will help you with my
            Package Service, which contains all of the VTuber Branding needs
            such as:
          </p>

          <ul className="text-orange-light text-sm md:text-base space-y-2 mb-6 inline-block text-left">
            <li>• Ready to stream Vtuber Model</li>
            <li>• Character Sheet</li>
            <li>• Overlay</li>
            <li>• Emotes</li>
          </ul>

          <p className="text-orange-primary text-sm md:text-base font-medium">
            And the best part is YOU CAN CUSTOM IT based on your needs!
          </p>
        </div>

        {/* Services Accordion */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <AccordionSection
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              bulletPoints={service.bulletPoints}
              important={service.important}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 flex items-center justify-center gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-orange-primary/40" />
          <div className="w-2 h-2 bg-orange-primary rounded-full" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-orange-primary/40" />
        </div>
      </div>
    </section>
  );
}
