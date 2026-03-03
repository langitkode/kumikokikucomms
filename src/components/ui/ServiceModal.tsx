"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ServiceSection } from "@/lib/types";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";

interface ServiceModalProps {
  service: ServiceSection | null;
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export default function ServiceModal({
  service,
  isOpen,
  onClose,
  accentColor,
}: ServiceModalProps) {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setPortfolioItems(data);
          } else {
            setPortfolioItems(siteConfig.portfolio);
          }
        }
      } catch (e) {
        setPortfolioItems(siteConfig.portfolio);
      }
    }
    if (isOpen) fetchItems();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.fromTo(
        modalRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.6, ease: "expo.out" },
        "-=0.3",
      );

      tl.fromTo(
        contentRef.current?.children || [],
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
        "-=0.4",
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(modalRef.current, { x: "100%", duration: 0.4, ease: "expo.in" });
    }
  }, [isOpen]);

  if (!isOpen || !service) return null;

  // Filter portfolio images for the active service category
  const galleryItems = (
    portfolioItems.length > 0 ? portfolioItems : siteConfig.portfolio
  ).filter((item) => item.category === service.id || item.category === "all");

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-stretch justify-end opacity-0"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Side Drawer Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl h-[100dvh] bg-[var(--color-studio-dark)] border-l border-hairline border-[var(--color-textdim)]/20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col"
      >
        <div className="noise-overlay opacity-5 pointer-events-none" />

        {/* Drawer Content */}
        <div
          className="flex-1 overflow-y-auto custom-scrollbar bg-grainy overscroll-contain"
          data-lenis-prevent="true"
        >
          <div
            ref={contentRef}
            className="p-8 lg:p-12 relative h-full flex flex-col"
          >
            {/* Close Button Top Right */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-[var(--color-textmuted)] hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header Section */}
            <div className="mb-10 pt-4">
              <h2 className="text-3xl lg:text-4xl font-black text-[var(--color-text)] tracking-tighter uppercase leading-none mb-3">
                {service.title}
              </h2>
              <div className="flex items-center gap-4">
                <div
                  className="w-6 h-px"
                  style={{ backgroundColor: accentColor }}
                />
                <p className="text-[var(--color-textmuted)] font-mono text-[10px] uppercase tracking-[0.3em]">
                  {service.titleJP}
                </p>
              </div>
            </div>

            {/* Main Description */}
            <div className="mb-12">
              <p className="text-[var(--color-textmuted)] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Features List */}
            {service.features && service.features.length > 0 && (
              <div className="mb-12">
                <h4 className="text-[10px] font-mono text-[var(--color-textdim)] uppercase tracking-[0.3em] mb-6">
                  FEATURES
                </h4>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs font-medium text-[var(--color-text)] uppercase tracking-tight"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-textdim)] opacity-40 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Notes */}
            {service.important && (
              <div
                className="mb-12 p-6 border-l-2"
                style={{ borderColor: accentColor }}
              >
                <h5 className="text-[9px] font-mono text-[var(--color-textdim)] uppercase tracking-widest mb-4">
                  IMPORTANT NOTES
                </h5>
                <ul className="space-y-2">
                  {service.important.map((note, i) => (
                    <li
                      key={i}
                      className="text-[10px] text-[var(--color-textdim)] uppercase leading-relaxed font-medium"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery Grid Showcase */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[10px] font-mono text-[var(--color-textdim)] uppercase tracking-[0.3em]">
                  GALLERY SHOWCASE
                </h4>
                <Link
                  href={`/gallery?category=${service.id}`}
                  className="text-[9px] font-mono text-[var(--color-textdim)] hover:text-white transition-colors uppercase gap-2 flex items-center group"
                  style={{ color: accentColor }}
                >
                  VIEW ALL
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                </Link>
              </div>

              {galleryItems.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {galleryItems.slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-sm overflow-hidden bg-[var(--color-studio-navy)] border border-hairline border-[var(--color-textdim)]/10 group"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-[var(--color-textdim)]/20 rounded-sm">
                  <p className="text-[10px] font-mono text-[var(--color-textdim)] uppercase tracking-widest text-center">
                    No showcase items available for this category yet.
                  </p>
                </div>
              )}
            </div>

            {/* Drawer Bottom CTA */}
            <div className="mt-12 pt-8 border-t border-hairline border-[var(--color-textdim)]/10 flex justify-end">
              <Button
                href="/#request"
                className="w-full text-center"
                style={{
                  backgroundColor: accentColor,
                  color: "var(--color-studio-dark)",
                }}
              >
                REQUEST COMMISSION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline fallback for simple CTA button since we removed Pricing details where Button was imported.
function Button({ children, href, className = "", style = {} }: any) {
  return (
    <Link
      href={href}
      className={`block px-6 py-4 text-[10px] font-mono uppercase tracking-[0.3em] font-black hover:opacity-90 transition-opacity ${className}`}
      style={style}
    >
      {children}
    </Link>
  );
}
