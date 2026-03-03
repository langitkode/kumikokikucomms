export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PriceItem {
  label: string;
  price: string;
}

export interface ServicePricing {
  bustUp?: string;
  halfBody?: string;
  fullBody?: string;
  front?: string;
  frontBack?: string;
  allViews?: string;
  static?: string;
  animated?: string;
  customPose?: string;
  vbridger?: string;
  walking?: string;
  leaning?: string;
  presale?: string;
}

export interface ServiceSection {
  id: string;
  title: string;
  titleJP: string;
  description: string;
  features?: string[];
  important?: string[];
  pricing?: ServicePricing;
  ctaLabel: string;
}

export interface PricingBaseItem {
  label: string;
  price: string;
}

export interface PricingSection {
  id: string;
  title: string;
  titleJP: string;
  basePrice: Record<string, PricingBaseItem>;
  riggingPrice?: Record<string, PricingBaseItem>;
  includes: string[];
  addOns?: PriceItem[];
  ctaLabel: string;
  ctaLink: string;
}

export interface PortfolioItem {
  src: string;
  alt: string;
  label: string;
  category: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
  labelJP: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  tagline: string;
  copyright: string;
  backgroundImage: string;
  backgroundVideo: string;
}

export interface AboutContent {
  heading: string;
  headingJP: string;
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
  galleryCategories: GalleryCategory[];
}
