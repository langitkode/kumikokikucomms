"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/config";
import Button from "@/components/ui/Button";

export default function Pricing() {
  const { pricing } = siteConfig;
  const [activeTab, setActiveTab] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Animate tab indicator
  useEffect(() => {
    if (!indicatorRef.current || !tabsContainerRef.current) return;

    const tabs = tabsContainerRef.current.querySelectorAll("button");
    const currentTab = tabs[activeTab] as HTMLElement;
    if (!currentTab) return;

    gsap.to(indicatorRef.current, {
      width: currentTab.offsetWidth,
      x: currentTab.offsetLeft,
      duration: 0.3,
      ease: "cubic-bezier(0.6, 0, 0.4, 1)",
    });
  }, [activeTab]);

  return (
    <section id="pricing" className="relative py-24 px-6 bg-night-mid">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-japanese opacity-20" />
      <div className="absolute inset-0 bg-lantern-glow opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-neon-orange text-xs uppercase tracking-widest mb-2">
            料金
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight mb-4">
            PRICING
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent mx-auto" />
        </div>

        {/* Tab Navigation */}
        <div ref={tabsContainerRef} className="relative mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 min-w-max mx-auto justify-center">
            {pricing.map((p, index) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-3 text-xs uppercase tracking-wider transition-all duration-200 border ${
                  activeTab === index
                    ? "text-text-primary border-neon-orange bg-neon-orange/10"
                    : "text-text-secondary border-transparent hover:text-text-primary hover:border-night-light"
                }`}
              >
                {p.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Animated Indicator */}
          <div
            ref={indicatorRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-orange to-neon-pink -z-10"
            style={{ width: 0, x: 0 }}
          />
        </div>

        {/* Pricing Content */}
        {pricing.map((p, index) => (
          <div
            key={p.id}
            className={`max-w-3xl mx-auto transition-all duration-300 ${
              activeTab === index ? "block" : "hidden"
            }`}
          >
            <div className="border border-night-light bg-night-base">
              {/* Header */}
              <div className="px-6 py-5 border-b border-night-light">
                <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                  {p.title}
                </h3>
                <p className="text-neon-orange text-xs uppercase tracking-wider mt-1">
                  {p.titleJP}
                </p>
              </div>

              {/* Content Grid */}
              <div className="p-6 grid md:grid-cols-2 gap-8">
                {/* Left Column - Base Pricing */}
                <div>
                  <p className="text-text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    ✧ Base Pricing
                  </p>
                  <div className="space-y-3">
                    {Object.entries(p.basePrice).map(([key, item]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between pb-3 border-b border-night-light"
                      >
                        <span className="text-text-secondary text-sm">
                          {item.label}
                        </span>
                        <span className="text-text-primary font-mono font-medium text-sm">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Rigging Price (if applicable) */}
                  {p.riggingPrice && (
                    <>
                      <p className="text-text-primary text-xs font-bold uppercase tracking-wider mb-4 mt-6">
                        ✧ Rigging
                      </p>
                      <div className="space-y-3">
                        {Object.entries(p.riggingPrice).map(([key, item]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between pb-3 border-b border-night-light"
                          >
                            <span className="text-text-secondary text-sm">
                              {item.label}
                            </span>
                            <span className="text-text-primary font-mono font-medium text-sm">
                              {item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Right Column - Includes & Add-ons */}
                <div>
                  <p className="text-text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    ✧ Includes
                  </p>
                  <ul className="space-y-2 mb-6">
                    {p.includes.map((item, i) => (
                      <li
                        key={i}
                        className="text-text-secondary text-sm flex items-start gap-2"
                      >
                        <span className="w-1 h-1 bg-neon-orange flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Add-ons */}
                  {p.addOns && p.addOns.length > 0 && (
                    <>
                      <p className="text-text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        ✧ Add-ons
                      </p>
                      <ul className="space-y-2">
                        {p.addOns.map((item, i) => (
                          <li
                            key={i}
                            className="text-text-secondary text-sm flex items-start gap-2"
                          >
                            <span className="w-1 h-1 bg-neon-pink flex-shrink-0 mt-1.5" />
                            {item.label}:{" "}
                            <span className="text-text-primary font-mono font-medium">
                              {item.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 py-5 border-t border-night-light text-center">
                <Button href={p.ctaLink} variant="primary" size="md">
                  {p.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-text-muted text-xs uppercase tracking-wider">
            All prices in USD • Unlimited revisions included
          </p>
        </div>
      </div>
    </section>
  );
}
