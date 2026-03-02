"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "rotateIn";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * AnimatedSection wrapper component for scroll-triggered animations
 */
export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Animation variants
    const animations = {
      fadeUp: { y: 60, opacity: 0 },
      fadeLeft: { x: 60, opacity: 0 },
      fadeRight: { x: -60, opacity: 0 },
      scaleUp: { scale: 0.8, opacity: 0 },
      rotateIn: { scale: 0.8, rotation: 5, opacity: 0 },
    };

    const fromValues = animations[animation];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        fromValues,
        {
          y: animation === "fadeUp" ? 0 : undefined,
          x:
            animation === "fadeLeft"
              ? 0
              : animation === "fadeRight"
                ? 0
                : undefined,
          scale: animation === "scaleUp" || animation === "rotateIn" ? 1 : undefined,
          rotation: animation === "rotateIn" ? 0 : undefined,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [animation, delay, duration, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
