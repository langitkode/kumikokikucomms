"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AccordionSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  bulletPoints?: string[];
  important?: string[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function AccordionSection({
  title,
  subtitle,
  description,
  bulletPoints,
  important,
  isOpen = false,
  onToggle,
}: AccordionSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(isOpen);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle?.();
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={handleToggle}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span
            className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-orange-primary"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
          <div className="text-left">
            <h3 className="text-lg md:text-xl font-bold text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-orange-light text-sm font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </button>

      {/* Content - Expandable */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 pb-6 pt-2">
          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-orange-primary/40 to-transparent mb-6" />

          {/* Description */}
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
            {description}
          </p>

          {/* Bullet Points */}
          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="space-y-2 mb-6">
              {bulletPoints.map((point, i) => (
                <li
                  key={i}
                  className="text-white/60 text-sm md:text-base flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-orange-primary rounded-full flex-shrink-0 mt-1.5" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          {/* Important Notes */}
          {important && important.length > 0 && (
            <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-xl p-4 mb-6">
              <p className="text-orange-light font-semibold mb-2 text-xs uppercase tracking-wider">
                ⚠ Important
              </p>
              <ul className="space-y-1">
                {important.map((item, i) => (
                  <li key={i} className="text-white/60 text-sm">
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
