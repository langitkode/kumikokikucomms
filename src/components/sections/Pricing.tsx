"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import ChevronNav from "@/components/ui/ChevronNav";
import { siteConfig } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const { pricing } = siteConfig;
  const [activeTab, setActiveTab] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animate tab indicator on change
  useEffect(() => {
    if (!indicatorRef.current || !tabsContainerRef.current) return;

    const tabs = tabsContainerRef.current.querySelectorAll("button");
    const currentActiveTab = tabs[activeTab] as HTMLElement;
    if (!currentActiveTab) return;

    gsap.to(indicatorRef.current, {
      width: currentActiveTab.offsetWidth,
      x: currentActiveTab.offsetLeft,
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [activeTab]);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setActiveTab(index);
  };

  return (
    <section id="pricing" className="relative py-20 px-4 md:px-6">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #fef6ee 0%, #ffe4c7 30%, #ffb366 70%, #f9963d 100%)",
        }}
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-orange-dark text-xs tracking-ultra uppercase mb-2">
            Commission Rates
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-orange-dark">
            Pricing
          </h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-orange-dark to-transparent mx-auto mt-4" />
        </div>

        {/* Tab Navigation */}
        <div ref={tabsContainerRef} className="relative mb-10">
          {/* Mobile: Horizontal Scroll | Desktop: Centered Flex */}
          <div className="overflow-x-auto md:overflow-visible scrollbar-hide">
            <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-1.5 relative z-10 md:min-w-max">
              {pricing.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleTabChange(pricing.findIndex((x) => x.id === p.id))}
                  className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 relative flex-shrink-0
                    ${
                      activeTab === pricing.findIndex((x) => x.id === p.id)
                        ? "text-white"
                        : "text-charcoal/70 hover:text-charcoal hover:bg-white/50"
                    }`}
                >
                  {p.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Indicator - Hidden on mobile, shown on desktop */}
          <div
            ref={indicatorRef}
            className="hidden md:block absolute top-0 left-0 h-full rounded-xl bg-gradient-to-r from-orange-primary to-orange-dark shadow-lg shadow-orange-primary/40 -z-10"
            style={{ width: 0, x: 0 }}
          />
        </div>

        {/* Pricing Content */}
        {pricing.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => { contentRefs.current[i] = el; }}
            className={`max-w-3xl mx-auto transition-all duration-300 ${
              activeTab === i ? "block opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl shadow-orange-primary/15 border border-white/50">
              <h3
                className="text-2xl md:text-4xl font-bold tracking-tight mb-8 text-center text-gradient-orange"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {p.title}
              </h3>

              <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-orange-primary/40 to-transparent mx-auto mb-8" />

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Price List & Includes */}
                <div>
                  <p className="text-orange-dark text-xs font-bold uppercase tracking-wider mb-3">
                    ✧ Base Pricing
                  </p>
                  <div className="space-y-2 mb-6">
                    {p.priceItems.map((item, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between text-charcoal/80 text-sm border-b border-orange-light/20 pb-2"
                      >
                        <span className="font-medium">{item.label}</span>
                        <span
                          className="text-orange-dark font-bold whitespace-nowrap ml-4 text-sm"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-orange-dark text-xs font-bold uppercase tracking-wider mb-3">
                    ✧ Includes
                  </p>
                  <div className="space-y-1.5">
                    {p.includes.map((item, j) => (
                      <p
                        key={j}
                        className="text-charcoal/70 text-sm flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-orange-primary rounded-full flex-shrink-0 mt-1" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Right Column - Revision Policy & Add-ons */}
                <div>
                  <div className="mb-6 p-4 bg-gradient-to-br from-orange-light/30 to-orange-primary/20 rounded-xl border border-orange-light/40">
                    <p className="text-orange-dark font-bold tracking-widest text-xs uppercase text-center">
                      {p.revisionPolicy}
                    </p>
                  </div>

                  {p.addOns && p.addOns.length > 0 && (
                    <div>
                      <p className="text-orange-dark text-xs font-bold uppercase tracking-wider mb-3">
                        ✧ Add-ons
                      </p>
                      <div className="space-y-1.5">
                        {p.addOns.map((item, j) => (
                          <p
                            key={j}
                            className="text-charcoal/70 text-sm flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-orange-light rounded-full flex-shrink-0 mt-1" />
                            {item.label}:{" "}
                            <span
                              className="text-orange-dark font-medium text-sm"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {item.price}
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  href={p.ctaLink}
                  variant="primary"
                  size="md"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  }
                >
                  {p.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Social Links After Pricing */}
        <div className="text-center mt-12">
          <p className="text-orange-dark/70 text-sm mb-4">
            For commission purposes please contact me on several platforms below
          </p>
        </div>
      </div>

      <ChevronNav targetId="portfolio" />
    </section>
  );
}
