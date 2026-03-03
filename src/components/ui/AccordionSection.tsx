"use client";

import { useState, useRef, useEffect } from "react";
import { animateAccordion } from "@/lib/animations";
import { ServicePricing } from "@/lib/types";

interface AccordionSectionProps {
  title: string;
  titleJP?: string;
  description: string;
  features?: string[];
  important?: string[];
  pricing?: ServicePricing;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function AccordionSection({
  title,
  titleJP,
  description,
  features = [],
  important = [],
  pricing,
  isOpen = false,
  onToggle,
}: AccordionSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(isOpen);

  useEffect(() => {
    if (!contentRef.current) return;
    animateAccordion(contentRef.current, isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle?.();
  };

  return (
    <div className="border border-[var(--color-nightlight)] bg-[var(--color-night)]">
      {/* Header */}
      <button
        onClick={handleToggle}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 hover:bg-[var(--color-nightmid)] transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <span
            className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[var(--color-neon)]"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
          <div>
            <h3 className="text-base md:text-lg font-bold text-[var(--color-text)] uppercase tracking-wider">
              {title}
            </h3>
            {titleJP && (
              <p className="text-[var(--color-neon)] text-xs font-medium">{titleJP}</p>
            )}
          </div>
        </div>
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 pb-6 pt-2">
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-neon)]/30 to-transparent mb-6" />

          {/* Description */}
          <p className="text-[var(--color-textmuted)] text-sm leading-relaxed mb-6">
            {description}
          </p>

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-6">
              <p className="text-[var(--color-text)] text-xs font-bold uppercase tracking-wider mb-3">
                ✧ Features
              </p>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-[var(--color-textmuted)] text-sm flex items-start gap-3"
                  >
                    <span className="w-1 h-1 bg-[var(--color-neon)] flex-shrink-0 mt-1.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pricing */}
          {pricing && (
            <div className="mb-6">
              <p className="text-[var(--color-text)] text-xs font-bold uppercase tracking-wider mb-3">
                ✧ Pricing
              </p>
              <div className="space-y-2">
                {(Object.entries(pricing) as [string, string][])
                  .filter(([_, value]) => value !== undefined)
                  .map(([key, value], i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm border-b border-[var(--color-nightlight)] pb-2"
                    >
                      <span className="text-[var(--color-textmuted)] capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-[var(--color-text)] font-mono font-medium">
                        {value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Important Notes */}
          {important.length > 0 && (
            <div className="border border-[var(--color-neon)]/30 bg-[var(--color-neon)]/5 p-4">
              <p className="text-[var(--color-neon)] font-bold text-xs uppercase tracking-wider mb-2">
                ⚠ Important
              </p>
              <ul className="space-y-1">
                {important.map((item, i) => (
                  <li key={i} className="text-[var(--color-textmuted)] text-sm">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
