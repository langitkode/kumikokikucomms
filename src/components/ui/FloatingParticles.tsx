"use client";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

/**
 * Minimal dot grid pattern - urban aesthetic
 * More subtle than floating particles
 */
export default function FloatingParticles({
  count = 0,
  className = "",
}: FloatingParticlesProps) {
  // For minimalist design, we use CSS patterns instead of DOM particles
  // This is more performant and fits the aesthetic better
  return (
    <div
      className={`absolute inset-0 bg-dot-minimal opacity-30 ${className}`}
      aria-hidden="true"
    />
  );
}
