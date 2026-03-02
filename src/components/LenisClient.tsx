"use client";

import { useEffect } from "react";

export default function LenisClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");

      const lenis = new Lenis();

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        window.dispatchEvent(
          new CustomEvent("scroll", { detail: { scroll } })
        );
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Make lenis available globally for GSAP
      (window as unknown as { lenis: typeof lenis }).lenis = lenis;

      // Cleanup
      return () => {
        lenis.destroy();
      };
    };

    initLenis();
  }, []);

  return <>{children}</>;
}
