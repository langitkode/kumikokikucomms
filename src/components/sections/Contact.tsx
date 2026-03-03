"use client";

import SocialIcons from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/config";

export default function Contact() {
  const { socialLinks, hero } = siteConfig;

  return (
    <section id="request" className="relative py-24 px-6 bg-sumi-light">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-minimal opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <p className="text-aka text-xs uppercase tracking-widest mb-2">
          お問い合わせ
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-shiro tracking-tight mb-6">
          COMMISSION REQUEST
        </h2>
        <div className="w-16 h-px bg-aka mx-auto mb-8" />

        {/* Description */}
        <p className="text-ash-light text-sm leading-relaxed mb-10">
          For commission inquiries, please reach out through any of the platforms
          below. I typically respond within 24-48 hours ♡
        </p>

        {/* Social Links */}
        <div className="mb-12">
          <SocialIcons links={socialLinks} size="lg" color="#c41e3a" />
        </div>

        {/* Email CTA */}
        <a
          href="mailto:example@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 bg-aka text-shiro hover:bg-aka-dark transition-colors duration-200 uppercase tracking-wider text-sm font-medium"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="4" width="20" height="16" rx="0" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span>Send Email</span>
        </a>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-ash-light">
          <p className="text-ash text-xs uppercase tracking-wider">
            {hero.copyright}
          </p>
        </div>
      </div>
    </section>
  );
}
