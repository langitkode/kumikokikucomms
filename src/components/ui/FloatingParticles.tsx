"use client";

import { useEffect, useRef } from "react";
import { createFloatingParticles } from "@/lib/animations";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  color?: string;
}

/**
 * Floating particles background effect
 */
export default function FloatingParticles({
  count = 20,
  className = "",
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing particles
    container.innerHTML = "";

    createFloatingParticles(container, count);

    return () => {
      container.innerHTML = "";
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`particle-container ${className}`}
      aria-hidden="true"
    />
  );
}
