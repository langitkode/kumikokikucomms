"use client";

import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "#request" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[var(--color-studio-dark)]/95 py-3 border-b border-hairline border-[var(--color-textdim)]/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-lg font-black text-[var(--color-text)] tracking-tighter">
                KK
                <span className="text-[var(--color-neon)] animate-neon-pulse">
                  .
                </span>
              </span>
              <span className="text-[var(--color-neon)] text-[10px] opacity-40 font-mono hidden lg:inline">
                菊
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className="relative px-4 py-2 text-[11px] text-[var(--color-textmuted)] uppercase tracking-[0.2em] hover:text-[var(--color-text)] transition-colors duration-200 group font-mono font-medium"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--color-neon)] group-hover:w-3/4 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#request"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#request");
                }}
                className="px-5 py-2.5 bg-[var(--color-neon)] text-[var(--color-studio-dark)] text-[10px] uppercase tracking-[0.15em] font-black font-mono hover:brightness-110 transition-all duration-300 rounded-sm"
              >
                Commission
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 text-[var(--color-text)]"
              aria-label="Toggle menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {isMobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="16" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - solid color, no blur for performance */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-nightdark)]/98 md:hidden">
          <div className="flex flex-col items-center justify-center h-full px-6">
            {/* Decorative kanji */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
              <p className="text-[30vw] font-black text-[var(--color-neon)] opacity-[0.03]">
                菊
              </p>
            </div>

            <div className="space-y-8 text-center relative z-10">
              {navItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    } else {
                      setIsMobileOpen(false);
                    }
                  }}
                  className="block text-3xl font-black text-[var(--color-text)] uppercase tracking-widest hover:text-[var(--color-neon)] transition-colors duration-200"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {item.label}
                </a>
              ))}

              {/* Commission CTA in mobile */}
              <a
                href="#request"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#request");
                }}
                className="inline-block mt-4 px-8 py-4 bg-gradient-to-r from-[var(--color-neon)] to-[var(--color-neonpink)] text-[var(--color-nightdark)] text-sm uppercase tracking-wider font-bold"
              >
                Commission
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--color-textmuted)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
