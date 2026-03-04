"use client";

import { SocialLink } from "@/lib/types";

interface SocialIconsProps {
  links: SocialLink[];
  size?: "sm" | "md" | "lg";
  color?: string;
}

function SocialIcon({ icon, size }: { icon: string; size: number }) {
  switch (icon) {
    case "email":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="4" width="20" height="16" rx="0" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "x":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="6" width="20" height="12" rx="0" />
          <path d="m10 15 5-3-5-3z" fill="currentColor" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect width="20" height="20" x="2" y="2" rx="0" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="18" cy="6" r="1" fill="currentColor" />
        </svg>
      );
    case "discord":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
        </svg>
      );
    case "vgen":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M5.5 2a.5.5 0 00-.5.5v19a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-19a.5.5 0 00-.5-.5h-13zm6.875 3.5c.368 0 .695.068.982.205.286.136.51.33.67.58.162.25.243.54.243.87 0 .365-.09.675-.27.932-.18.256-.42.455-.72.595l1.03 1.818h-1.24l-.885-1.64h-.635v1.64h-1.13V5.5h1.955zm-.145.915v1.09h.735c.23 0 .415-.052.555-.155.14-.104.21-.245.21-.425 0-.17-.067-.3-.2-.395-.133-.095-.31-.143-.53-.143h-.77zM12 12.5h1.13v5H12v-5zm-3.5 0h1.13v5H8.5v-5z" />
        </svg>
      );
    default:
      return null;
  }
}

const sizeMap = { sm: 18, md: 24, lg: 32 };

export default function SocialIcons({
  links,
  size = "md",
  color,
}: SocialIconsProps) {
  const iconColor = color || "currentColor";

  return (
    <div className="flex items-center justify-center gap-6 flex-wrap">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 border border-[var(--color-nightlight)] hover:border-[var(--color-neonpink)] transition-all duration-200"
          style={{ color: iconColor }}
          aria-label={link.platform}
        >
          <SocialIcon icon={link.icon} size={sizeMap[size]} />
          <div className="absolute inset-0 border border-[var(--color-neonpink)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </a>
      ))}
    </div>
  );
}
