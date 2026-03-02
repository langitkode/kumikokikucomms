/**
 * GSAP Animation Presets and Utilities
 * Centralized animation configurations for consistent feel
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ===== Easing Presets =====
export const easings = {
  smooth: "power3.out",
  bounce: "elastic.out(1, 0.5)",
  snap: "power4.out",
  gentle: "power2.out",
  expo: "expo.out",
} as const;

// ===== Duration Presets =====
export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  slower: 1.5,
} as const;

// ===== Text Reveal Animation =====
export function animateTextReveal(element: HTMLElement) {
  const text = element.textContent;
  if (!text) return;

  element.innerHTML = "";
  const words = text.split(" ");

  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.display = "inline-block";
    span.style.transform = "translateY(100%)";
    span.style.opacity = "0";
    element.appendChild(span);

    gsap.to(span, {
      y: 0,
      opacity: 1,
      duration: durations.normal,
      ease: easings.snap,
      delay: i * 0.05,
    });
  });
}

// ===== Hero Title Animation =====
export function animateHeroTitle(
  title: HTMLElement,
  subtitle?: HTMLElement,
  copyright?: HTMLElement
) {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.fromTo(
    title,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: durations.slow,
      ease: easings.expo,
    }
  );

  if (subtitle) {
    tl.fromTo(
      subtitle,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: durations.normal,
        ease: easings.gentle,
      },
      "-=0.5"
    );
  }

  if (copyright) {
    tl.fromTo(
      copyright,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: durations.normal,
        ease: easings.gentle,
      },
      "-=0.4"
    );
  }

  return tl;
}

// ===== Section Header Animation =====
export function animateSectionHeader(
  container: HTMLElement,
  options?: { delay?: number }
) {
  const { delay = 0 } = options || {};

  const elements = container.querySelectorAll<HTMLElement>(
    "h2, p, .divider-orange"
  );

  gsap.fromTo(
    elements,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: durations.normal,
      stagger: 0.1,
      ease: easings.smooth,
      delay,
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Card Stagger Animation =====
export function animateCardStagger(container: HTMLElement) {
  const cards = container.querySelectorAll<HTMLElement>(".card");

  gsap.fromTo(
    cards,
    { y: 60, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: durations.normal,
      stagger: 0.1,
      ease: easings.smooth,
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Floating Particles Animation =====
export function createFloatingParticles(
  container: HTMLElement,
  count = 20
) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random properties - only add non-empty classes
    if (Math.random() > 0.8) {
      particle.classList.add("particle--large");
    }
    if (Math.random() > 0.9) {
      particle.classList.add("particle--sparkle");
    }

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random animation properties
    const duration = 10 + Math.random() * 20;
    const delay = Math.random() * 5;
    const driftX = (Math.random() - 0.5) * 200;
    const driftY = -100 - Math.random() * 100;

    particle.style.setProperty("--duration", `${duration}s`);
    particle.style.setProperty("--delay", `${delay}s`);
    particle.style.setProperty("--drift-x", `${driftX}px`);
    particle.style.setProperty("--drift-y", `${driftY}px`);

    container.appendChild(particle);
  }
}

// ===== Image Parallax on Hover =====
export function initImageParallax(images: NodeListOf<Element>) {
  images.forEach((img) => {
    img.addEventListener("mousemove", ((e: MouseEvent) => {
      const rect = (img as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to((img.querySelector("img") || img) as Element, {
        x: x * 20,
        y: y * 20,
        duration: 0.5,
        ease: easings.gentle,
      });
    }) as EventListener);

    img.addEventListener("mouseleave", (() => {
      gsap.to((img.querySelector("img") || img) as Element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: easings.gentle,
      });
    }) as EventListener);
  });
}

// ===== Magnetic Button Effect =====
export function initMagneticButtons(buttons: NodeListOf<Element>) {
  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", ((e: MouseEvent) => {
      const rect = (btn as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(btn, {
        x: x * 10,
        y: y * 10,
        duration: 0.3,
        ease: easings.gentle,
      });
    }) as EventListener);

    btn.addEventListener("mouseleave", (() => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }) as EventListener);
  });
}

// ===== Pricing Tab Transition =====
export function animatePricingTab(
  fromElement: HTMLElement,
  toElement: HTMLElement
) {
  const tl = gsap.timeline();

  tl.to(fromElement, {
    opacity: 0,
    scale: 0.95,
    duration: durations.fast,
    ease: easings.smooth,
  })
    .set(fromElement, { display: "none" })
    .set(toElement, { display: "block" })
    .fromTo(
      toElement,
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        duration: durations.normal,
        ease: easings.expo,
      }
    );

  return tl;
}

// ===== Gallery Item Reveal =====
export function animateGalleryReveal(items: HTMLElement[]) {
  gsap.fromTo(
    items,
    { y: 80, opacity: 0, rotate: 2 },
    {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: durations.slow,
      stagger: 0.08,
      ease: easings.expo,
      scrollTrigger: {
        trigger: items[0]?.parentElement,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Smooth Scroll to Element =====
export function scrollToElement(elementId: string, offset = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const y = element.getBoundingClientRect().top + window.scrollY - offset;

  gsap.to(window, {
    scrollTo: y,
    duration: durations.slower,
    ease: easings.expo,
  });
}
