"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  axis?: "y" | "x";
  reverse?: boolean;
  scaleOnScroll?: boolean;
}

/**
 * ParallaxLayer component for scroll-based parallax effects
 */
export default function ParallaxLayer({
  children,
  className = "",
  speed = 0.5,
  axis = "y",
  reverse = false,
  scaleOnScroll = false,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const direction = reverse ? -1 : 1;
    const distance = axis === "y" ? "y" : "x";
    const multiplier = speed * 100 * direction;

    const ctx = gsap.context(() => {
      const vars: gsap.TweenVars = {
        [distance]: multiplier,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      };

      if (scaleOnScroll) {
        vars.scale = 1.1;
      }

      gsap.fromTo(element, { [distance]: 0, scale: scaleOnScroll ? 0.9 : undefined }, vars);
    }, element);

    return () => ctx.revert();
  }, [speed, axis, reverse, scaleOnScroll]);

  return (
    <div ref={ref} className={`parallax-layer ${className}`}>
      {children}
    </div>
  );
}
