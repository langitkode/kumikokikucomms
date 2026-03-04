import { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  hero: {
    title: "KUMIKO",
    titleAccent: "KIKU",
    subtitle: "COMMISSION",
    tagline: "VTuber Artist & Illustrator",
    copyright: "Copyright © KUMIKOKIKUCOMMS. All Rights Reserved.",
    backgroundImage: "/profile.webp",
    backgroundVideo: "/hero-bg.mp4",
  },

  about: {
    heading: "ABOUT",
    headingMain: "CRAFTING AVATARS WITH PERSONALITY",
    headingJP: "アバウト",
    paragraphs: [
      "Hi! I'm Kiku ♡",
      "I'm an illustrator who loves bringing online personas to life through cute and expressive art. I specialize in VTuber models, PNGTubers, stream emotes, custom icons, and character assets crafted with warmth, detail, and a touch of magic.",
      "Whether you're preparing for your VTuber debut, refreshing your stream visuals, or looking for adorable emotes for your community, I am here to help make your character feel charming, lively, and full of personality.",
      "I focus on soft details, expressive faces, and clean, well-organized files so everything looks beautiful and works smoothly for streaming and content creation.",
    ],
    goal: "Let's create something cute and memorable together ♡",
    image: "/profile.webp",
  },

  socialLinks: [
    {
      platform: "Instagram",
      url: "https://instagram.com/kumikokikuwu",
      icon: "instagram",
    },
    { platform: "X", url: "https://x.com/kumikokikuwu", icon: "x" },
    {
      platform: "Discord",
      url: "https://discord.com/users/1303914733576917085",
      icon: "discord",
    },
    { platform: "Vgen", url: "https://vgen.co/KumikoKiku", icon: "vgen" },
  ],

  servicesHeading: {
    title: "PROFESSIONAL",
    titleAccent: "SOLUTIONS",
    description:
      "Everything you need for your VTubing journey — customizable to your needs ♡",
  },

  services: [
    {
      id: "vtuber",
      title: "VTuber Model",
      titleJP: "ブイチューバー",
      description:
        "Want to become a VTuber but unsure where to start? Still developing your character concept? Don't have a reference sheet yet? No worries ♡ I am happy to guide you step by step and help turn your dream character into a polished, stream-ready VTuber.",
      features: [
        "Fully illustrated VTuber Model",
        "3 Expressions (happy, sad, angry)",
        "2 Twitch Emotes",
        "PNG & PSD files ready for rigging",
      ],
      pricing: {
        bustUp: "From $100",
        halfBody: "From $230",
        fullBody: "From $300",
      },
      ctaLabel: "View Details",
    },
    {
      id: "rigging",
      title: "VTuber Rigging",
      titleJP: "リギング",
      description:
        "Already have a model and need professional rigging? I provide smooth, natural, and expressive rigging that makes your character feel alive and responsive on stream.",
      features: [
        "Natural head and body movement",
        "Detailed facial expressions",
        "Physics for hair and accessories",
        "Optimized setup for streaming",
        "3 expression rigging included",
      ],
      pricing: {
        bustUp: "From $150",
        halfBody: "$230",
        fullBody: "$300",
        vbridger: "$300",
        walking: "$50",
        leaning: "$30",
      },
      important: [
        "Please provide complete references for your Live2D model",
        "Designing from scratch without a reference sheet may require an additional fee",
      ],
      ctaLabel: "View Details",
    },
    {
      id: "pngtuber",
      title: "PNGTuber",
      titleJP: "ピーエヌジチューバー",
      description:
        "A simple and budget-friendly way to start streaming. Perfect for beginners or anyone who prefers a lightweight setup.",
      features: [
        "1 Bust-Up Character",
        "Talking / Not Talking expressions",
        "Open Eyes / Closed Eyes expressions",
        "4 PNG files (all combinations)",
        "JPG & PNG files included",
        "2048 x 2048px at 350dpi",
      ],
      pricing: {
        bustUp: "$60",
        halfBody: "$85",
        fullBody: "$100",
      },
      ctaLabel: "View Details",
    },
    {
      id: "pngtuber-plus",
      title: "PNGTuber Plus",
      titleJP: "ピーエヌジチューバー プラス",
      description:
        "Want more personality and expression? Upgrade your PNGTuber with additional expressions, poses, toggles, and optional reactive elements.",
      features: [
        "Multiple expressions",
        "Extra poses available",
        "Toggle expressions",
        "Reactive elements (optional)",
        "More dynamic and expressive",
      ],
      pricing: {
        bustUp: "From $100",
        halfBody: "From $120",
        fullBody: "From $140",
      },
      ctaLabel: "View Details",
    },
    {
      id: "ych",
      title: "YCH Special",
      titleJP: "ワイシーエイチ",
      description:
        "Looking for something cute, fun, and more affordable? YCH (Your Character Here) places your character into a pre-made pose and concept template. Perfect for faster turnaround and budget-friendly commissions.",
      features: [
        "Pre-made pose & concept",
        "Your character in template",
        "Custom hair & accessories",
        "Faster delivery time",
        "Great for gifts & seasonal content",
      ],
      ctaLabel: "View Details",
    },
    {
      id: "reference",
      title: "Reference Sheet",
      titleJP: "リファレンスシート",
      description:
        "Need a clear and professional character reference? A reference sheet ensures consistency and helps artists or riggers understand your design accurately.",
      features: [
        "Front, back & side views available",
        "Color palette included",
        "Close-up details (eyes, accessories)",
        "Expression samples (optional)",
        "Commercial use allowed",
      ],
      pricing: {
        front: "$120",
        frontBack: "$180",
        allViews: "$250",
      },
      ctaLabel: "View Details",
    },
    {
      id: "emotes",
      title: "Emotes",
      titleJP: "エモート",
      description:
        "Custom emotes designed to match your personality and branding. Perfect for Twitch, YouTube, Discord, and VTubers.",
      features: [
        "1 fully rendered static emote",
        "PNG sizes: 1000px, 112px, 56px, 28px",
        "Custom expressions available",
        "Platform-ready",
      ],
      pricing: {
        static: "$15",
        animated: "From +$20",
        customPose: "From +$5",
      },
      ctaLabel: "View Details",
    },
  ],

  pricing: [
    {
      id: "vtuber-full",
      title: "VTuber Full Package",
      titleJP: "フルパッケージ",
      basePrice: {
        bustUp: { label: "Bust-Up Model", price: "From $100" },
        halfBody: { label: "Half Body Model", price: "From $230" },
        fullBody: { label: "Full Body Model", price: "From $300" },
      },
      riggingPrice: {
        bustUp: { label: "Bust-Up Rigging", price: "From $150" },
        halfBody: { label: "Half Body Rigging", price: "$230" },
        fullBody: { label: "Full Body Rigging", price: "$300" },
      },
      includes: [
        "Fully illustrated VTuber Model",
        "3 Expressions (happy, sad, angry)",
        "2 Twitch Emotes",
        "PNG & PSD files (ready to rig)",
        "Professional rigging service",
        "Natural movement & physics",
      ],
      addOns: [
        { label: "Additional Expression (Art)", price: "$20" },
        { label: "Additional Expression (Rig)", price: "$30" },
        { label: "Extra Outfit Pair (Art)", price: "$100" },
        { label: "Extra Outfit Pair (Rig)", price: "$100" },
        { label: "Extra Pet (Art)", price: "From $45" },
        { label: "Extra Pet (Rig)", price: "From $45" },
        { label: "Toggle Feature", price: "From $20" },
        { label: "Base Body Only", price: "$75" },
      ],
      ctaLabel: "Request Commission",
      ctaLink: "#request",
    },
    {
      id: "pngtuber-package",
      title: "PNGTuber Package",
      titleJP: "ピーエヌジチューバー",
      basePrice: {
        bustUp: { label: "Bust-Up PNG", price: "$60" },
        halfBody: { label: "Half Body PNG", price: "$85" },
        fullBody: { label: "Full Body PNG", price: "$100" },
      },
      includes: [
        "1 Character Design",
        "4 PNG Files (talk/no talk × eyes open/closed)",
        "JPG & PNG Formats",
        "2048 × 2048px at 350dpi",
        "Commercial Use Allowed",
      ],
      addOns: [
        { label: "Extra Expressions", price: "+$15" },
        { label: "Extra Hand Pose", price: "+$20" },
        { label: "PSD Source File", price: "+$100" },
      ],
      ctaLabel: "Request Commission",
      ctaLink: "#request",
    },
    {
      id: "pngtuber-plus-package",
      title: "PNGTuber+ Package",
      titleJP: "プラスパッケージ",
      basePrice: {
        bustUp: { label: "Bust-Up", price: "From $100" },
        halfBody: { label: "Half Body", price: "From $120" },
        fullBody: { label: "Full Body", price: "From $140" },
      },
      includes: [
        "1 Character Design",
        "Multiple Expressions",
        "4+ PNG Files",
        "JPG & PNG Formats",
        "2048 × 2048px at 350dpi",
        "Extra Poses Available",
      ],
      addOns: [
        { label: "Extra Expressions", price: "+$20" },
        { label: "Extra Hand Pose", price: "+$30" },
        { label: "Extra Pose", price: "+$50" },
        { label: "PSD Source File", price: "+$100" },
      ],
      ctaLabel: "Request Commission",
      ctaLink: "#request",
    },
    {
      id: "reference-package",
      title: "Reference Sheet",
      titleJP: "リファレンス",
      basePrice: {
        front: { label: "Front View", price: "$120" },
        frontBack: { label: "Front & Back", price: "$180" },
        allViews: { label: "Front, Back & Side", price: "$250" },
      },
      includes: [
        "Artboard 3000-4000px",
        "Color Palette",
        "Detail Close-ups",
        "Commercial Use",
        "PNG Files",
      ],
      addOns: [
        { label: "Extra Expressions", price: "$15 each" },
        { label: "New Outfit", price: "$50/view" },
        { label: "Different Pose", price: "$50/view" },
        { label: "Extra Assets", price: "$25 each" },
      ],
      ctaLabel: "Request Commission",
      ctaLink: "#request",
    },
    {
      id: "emotes-package",
      title: "Emotes",
      titleJP: "エモート",
      basePrice: {
        static: { label: "Static Emote", price: "$15" },
      },
      includes: [
        "1 Fully Rendered Emote",
        "PNG Sizes: 1000px, 112px, 56px, 28px",
        "Platform Ready (Twitch/YouTube/Discord)",
        "Commercial Use Allowed",
      ],
      addOns: [
        { label: "Animated Version", price: "+$20" },
        { label: "Custom Pose", price: "+$5" },
      ],
      ctaLabel: "Request Commission",
      ctaLink: "#request",
    },
    {
      id: "ych-package",
      title: "YCH Commission",
      titleJP: "ワイシーエイチ",
      basePrice: {
        presale: { label: "YCH Presale", price: "TBA" },
      },
      includes: [
        "PNG & JPG Files",
        "Pre-made Pose Template",
        "Custom Hair & Accessories",
        "Background Included",
        "Commercial Use for Content/Streaming",
      ],
      addOns: [
        { label: "Custom Outfit (M/F)", price: "+$30 each" },
        { label: "Custom Expression (M/F)", price: "+$10 each" },
        { label: "Pet Addition", price: "+$20" },
        { label: "Custom Body Type (M/F)", price: "+$30 each" },
      ],
      ctaLabel: "Request Commission",
      ctaLink: "#request",
    },
  ],

  portfolio: [
    {
      src: "/placeholder-1.svg",
      alt: "VTuber Character Design 1",
      label: "Character 01",
      category: "vtuber",
    },
    {
      src: "/placeholder-2.svg",
      alt: "VTuber Character Design 2",
      label: "Character 02",
      category: "vtuber",
    },
    {
      src: "/placeholder-3.svg",
      alt: "VTuber Character Design 3",
      label: "Character 03",
      category: "vtuber",
    },
    {
      src: "/placeholder-4.svg",
      alt: "PNGTuber Design 1",
      label: "PNGTuber 01",
      category: "pngtuber",
    },
    {
      src: "/placeholder-5.svg",
      alt: "Emote Set 1",
      label: "Emote Set 01",
      category: "emotes",
    },
    {
      src: "/placeholder-6.svg",
      alt: "Reference Sheet Example",
      label: "Ref Sheet 01",
      category: "reference",
    },
  ],

  galleryCategories: [
    { id: "all", label: "All", labelJP: "すべて" },
    { id: "vtuber", label: "VTuber", labelJP: "ブイチューバー" },
    { id: "pngtuber", label: "PNGTuber", labelJP: "ピーエヌジチューバー" },
    { id: "emotes", label: "Emotes", labelJP: "エモート" },
    { id: "reference", label: "Reference", labelJP: "リファレンス" },
    { id: "ych", label: "YCH", labelJP: "ワイシーエイチ" },
  ],
};
