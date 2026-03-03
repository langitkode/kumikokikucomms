"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

export default function LenisClient({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Disable Lenis on mobile for better performance
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Make lenis available globally for GSAP
    (window as any).lenis = lenis;

    // Cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).lenis;
    };
  }, [isMounted, isMobile]);

  // On mobile or during SSR, just render children without Lenis wrapper
  if (!isMounted || isMobile) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
