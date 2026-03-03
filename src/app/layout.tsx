import type { Metadata } from "next";
import "./globals.css";
import LenisClient from "@/components/LenisClient";

export const metadata: Metadata = {
  title: "Kumiko Kiku Commission — VTuber Artist & Illustrator",
  description:
    "Professional VTuber artist specializing in VTuber models, PNGtubers, stream emotes, and custom illustrations. Commissions open!",
  keywords: [
    "VTuber",
    "VTuber artist",
    "VTuber commission",
    "PNGtuber",
    "emotes",
    "illustration",
    "anime art",
    "Live2D",
    "character design",
    "Kumiko Kiku",
    "kumikokikucomms",
  ],
  openGraph: {
    title: "Kumiko Kiku Commission — VTuber Artist & Illustrator",
    description:
      "Professional VTuber artist specializing in VTuber models, PNGtubers, stream emotes, and custom illustrations.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Kumiko Kiku Commission Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumiko Kiku Commission — VTuber Artist & Illustrator",
    description:
      "Professional VTuber artist. Commissions open for VTuber models, PNGtubers, emotes & illustrations.",
    images: ["/profile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LenisClient>{children}</LenisClient>
      </body>
    </html>
  );
}
