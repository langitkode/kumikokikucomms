"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  axis?: "y" | "x";
  reverse?: boolean;
  className?: string;
}

/**
 * Performance-optimized parallax component
 * Uses CSS transforms with GPU acceleration
 */
export default function ParallaxLayer({
  children,
  speed = 0.5,
  axis = "y",
  reverse = false,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const direction = reverse ? -1 : 1;
    const property = axis === "y" ? "translateY" : "translateX";
    const multiplier = speed * direction;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const rect = element.parentElement?.getBoundingClientRect();

      if (rect) {
        const offset = (scrollY - (rect.top + scrollY)) * multiplier;
        element.style.transform = `${property}(${offset}px) translate3d(0, 0, 0)`;
      }

      rafId.current = null;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Throttle updates - only update if scroll changed significantly
      if (Math.abs(currentScrollY - lastScrollY.current) < 2) return;

      lastScrollY.current = currentScrollY;

      // Use requestAnimationFrame for smooth updates
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateParallax);
      }
    };

    // Initial position
    updateParallax();

    // Listen to scroll with passive option for performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, axis, reverse]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Simple fade-in on scroll hook
 */
export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("animate-sharp-fade");
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
