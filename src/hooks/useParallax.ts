"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxOptions {
  speed?: number;
  axis?: "y" | "x";
  reverse?: boolean;
}

/**
 * Custom hook for parallax scroll effects using GSAP
 * @param options - Parallax configuration options
 * @returns Ref to attach to the element
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({
  speed = 0.5,
  axis = "y",
  reverse = false,
}: UseParallaxOptions = {}): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const direction = reverse ? -1 : 1;
    const distance = axis === "y" ? "y" : "x";
    const multiplier = speed * 100 * direction;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { [distance]: 0 },
        {
          [distance]: multiplier,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [speed, axis, reverse]);

  return ref;
}

/**
 * Hook for fade-in animations on scroll
 */
export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [threshold]);

  return ref;
}

/**
 * Hook for stagger animations on multiple elements
 */
export function useStagger<T extends HTMLElement = HTMLDivElement>(
  options?: {
    delay?: number;
    distance?: number;
    axis?: "y" | "x";
  }
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { delay = 0.1, distance = 30, axis = "y" } = options || {};

    const ctx = gsap.context(() => {
      const children = element.children;
      gsap.fromTo(
        children,
        { opacity: 0, [axis]: distance },
        {
          opacity: 1,
          [axis]: 0,
          duration: 0.8,
          stagger: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [options]);

  return ref;
}

/**
 * Hook for scale animations on scroll
 */
export function useScaleIn<T extends HTMLElement = HTMLDivElement>(
  options?: {
    from?: number;
    duration?: number;
  }
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { from = 0.8, duration = 1 } = options || {};

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { scale: from, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [options]);

  return ref;
}
