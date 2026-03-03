/**
 * GSAP Animation Presets - Japanese Urban Minimalist
 * Sharp, precise, performance-optimized animations
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ===== Easing Presets (Urban Minimalist) =====
export const easings = {
  sharp: "cubic-bezier(0.6, 0, 0.4, 1)",
  snap: "cubic-bezier(0.7, 0, 0.3, 1)",
  gentle: "cubic-bezier(0.5, 0, 0.3, 1)",
  expo: "cubic-bezier(0.8, 0, 0.2, 1)",
  linear: "linear",
} as const;

// ===== Duration Presets =====
export const durations = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  slower: 1,
} as const;

// ===== Text Reveal Animation (Sharp) =====
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
      delay: i * 0.03,
    });
  });
}

// ===== Hero Title Animation (Minimal) =====
export function animateHeroTitle(
  title: HTMLElement,
  subtitle?: HTMLElement,
  tagline?: HTMLElement
) {
  const tl = gsap.timeline({ delay: 0.1 });

  tl.fromTo(
    title,
    { y: 40, opacity: 0 },
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
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: durations.normal,
        ease: easings.gentle,
      },
      "-=0.3"
    );
  }

  if (tagline) {
    tl.fromTo(
      tagline,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: durations.fast,
        ease: easings.gentle,
      },
      "-=0.2"
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
    "h2, p, .divider-sharp, .divider-accent"
  );

  gsap.fromTo(
    elements,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: durations.normal,
      stagger: 0.08,
      ease: easings.sharp,
      delay,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Card Stagger Animation (Sharp) =====
export function animateCardStagger(container: HTMLElement) {
  const cards = container.querySelectorAll<HTMLElement>(".card-sharp");

  gsap.fromTo(
    cards,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: durations.normal,
      stagger: 0.06,
      ease: easings.sharp,
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Grid Reveal Animation =====
export function animateGridReveal(items: HTMLElement[]) {
  gsap.fromTo(
    items,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: durations.normal,
      stagger: {
        each: 0.05,
        from: "start",
        grid: [3, 2],
      },
      ease: easings.snap,
      scrollTrigger: {
        trigger: items[0]?.parentElement,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Line Draw Animation =====
export function animateLineDraw(element: HTMLElement) {
  gsap.fromTo(
    element,
    { width: 0 },
    {
      width: "100%",
      duration: durations.slow,
      ease: easings.expo,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Fade In Up (Minimal) =====
export function animateFadeInUp(
  element: HTMLElement,
  distance = 30,
  duration = durations.normal
) {
  gsap.fromTo(
    element,
    { y: distance, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      ease: easings.sharp,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Slide In From Side =====
export function animateSlideIn(
  element: HTMLElement,
  direction: "left" | "right" = "left"
) {
  const x = direction === "left" ? -40 : 40;

  gsap.fromTo(
    element,
    { x, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: durations.normal,
      ease: easings.sharp,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Image Parallax on Hover (Performance Optimized) =====
export function initImageParallax(images: NodeListOf<Element>) {
  images.forEach((img) => {
    img.addEventListener("mousemove", ((e: MouseEvent) => {
      const rect = (img as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img.querySelector("img"), {
        x: x * 15,
        y: y * 15,
        duration: 0.3,
        ease: easings.gentle,
        overwrite: true,
      });
    }) as EventListener);

    img.addEventListener("mouseleave", (() => {
      gsap.to(img.querySelector("img"), {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: easings.gentle,
      });
    }) as EventListener);
  });
}

// ===== Pricing Tab Transition (Sharp) =====
export function animatePricingTab(
  fromElement: HTMLElement,
  toElement: HTMLElement
) {
  const tl = gsap.timeline();

  tl.to(fromElement, {
    opacity: 0,
    scale: 0.98,
    duration: durations.fast,
    ease: easings.snap,
  })
    .set(fromElement, { display: "none" })
    .set(toElement, { display: "block" })
    .fromTo(
      toElement,
      { opacity: 0, scale: 1.02 },
      {
        opacity: 1,
        scale: 1,
        duration: durations.normal,
        ease: easings.expo,
      }
    );

  return tl;
}

// ===== Accordion Reveal (Sharp) =====
export function animateAccordion(
  content: HTMLElement,
  isOpen: boolean
) {
  if (isOpen) {
    gsap.to(content, {
      height: "auto",
      opacity: 1,
      duration: durations.normal,
      ease: easings.sharp,
    });
  } else {
    gsap.to(content, {
      height: 0,
      opacity: 0,
      duration: durations.fast,
      ease: easings.snap,
    });
  }
}

// ===== Button Hover Magnetic (Subtle) =====
export function initMagneticButtons(buttons: NodeListOf<Element>) {
  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", ((e: MouseEvent) => {
      const rect = (btn as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(btn, {
        x: x * 5,
        y: y * 5,
        duration: 0.2,
        ease: easings.gentle,
      });
    }) as EventListener);

    btn.addEventListener("mouseleave", (() => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: easings.sharp,
      });
    }) as EventListener);
  });
}

// ===== Gallery Image Reveal =====
export function animateGalleryReveal(items: HTMLElement[]) {
  gsap.fromTo(
    items,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: durations.normal,
      stagger: 0.06,
      ease: easings.snap,
      scrollTrigger: {
        trigger: items[0]?.parentElement,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// ===== Lightbox Open Animation =====
export function animateLightboxOpen(element: HTMLElement) {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.95 },
    {
      opacity: 1,
      scale: 1,
      duration: durations.normal,
      ease: easings.expo,
    }
  );
}

// ===== Lightbox Close Animation =====
export function animateLightboxClose(
  element: HTMLElement,
  onComplete: () => void
) {
  gsap.to(element, {
    opacity: 0,
    scale: 0.95,
    duration: durations.fast,
    ease: easings.snap,
    onComplete,
  });
}

// ===== Scroll Progress Indicator =====
export function initScrollProgress(indicator: HTMLElement) {
  gsap.to(indicator, {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
}

// ===== Counter Animation =====
export function animateCounter(
  element: HTMLElement,
  end: number,
  duration = 2
) {
  gsap.to(element, {
    innerText: end,
    duration,
    ease: easings.gentle,
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    onUpdate: function () {
      element.innerText = Math.ceil(this.targets()[0].innerText);
    },
  });
}

// ===== Stagger List Items =====
export function animateStaggerList(container: HTMLElement) {
  const items = container.querySelectorAll<HTMLElement>("li, .list-item");

  gsap.fromTo(
    items,
    { x: -20, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: durations.fast,
      stagger: 0.04,
      ease: easings.sharp,
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}
