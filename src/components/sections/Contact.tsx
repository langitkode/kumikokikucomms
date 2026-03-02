"use client";

import SocialIcons from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/config";

export default function Contact() {
  const { socialLinks } = siteConfig;

  return (
    <section id="request" className="relative py-24 px-6">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #fef6ee 0%, #ffe4c7 40%, #ffb366 70%, #f9963d 100%)",
        }}
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <h2
          className="text-4xl md:text-6xl font-bold tracking-tight text-orange-dark mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Commission Request
        </h2>

        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-orange-dark to-transparent mx-auto mb-8" />

        <p className="text-charcoal/70 text-sm md:text-base mb-10">
          For commission purposes please contact me on several platforms below
          ^^
        </p>

        {/* Social Links */}
        <div className="mb-10">
          <SocialIcons links={socialLinks} size="lg" color="#d9772e" />
        </div>

        {/* Footer Copyright */}
        <div className="mt-16 pt-8 border-t border-orange-dark/20">
          <p className="text-charcoal/50 text-sm">
            {siteConfig.hero.copyright}
          </p>
        </div>
      </div>
    </section>
  );
}
