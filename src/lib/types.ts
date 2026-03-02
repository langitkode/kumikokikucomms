export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PriceItem {
  label: string;
  price: string;
}

export interface ServiceSection {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  bulletPoints?: string[];
  important?: string[];
  ctaLabel: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface PricingSection {
  id: string;
  title: string;
  priceItems: PriceItem[];
  revisionPolicy: string;
  includes: string[];
  addOns?: PriceItem[];
  ctaLabel: string;
  ctaLink: string;
}

export interface PortfolioItem {
  src: string;
  alt: string;
  label?: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  copyright: string;
  backgroundImage: string;
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  goal: string;
}

export interface SiteConfig {
  hero: HeroContent;
  about: AboutContent;
  socialLinks: SocialLink[];
  services: ServiceSection[];
  pricing: PricingSection[];
  portfolio: PortfolioItem[];
}
