import { Metadata, Viewport } from "next";
import { getTranslation } from "./i18n";
import { absoluteUrl, getSiteOrigin } from "./site";

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  locale: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    locale: string;
    type: string;
  };
  twitter?: {
    card: string;
    site: string;
    creator: string;
    title: string;
    description: string;
    images: string[];
  };
  robots?: {
    index: boolean;
    follow: boolean;
    googleBot?: {
      index: boolean;
      follow: boolean;
      "max-video-preview"?: number;
      "max-image-preview"?: string;
      "max-snippet"?: number;
    };
  };
  alternates?: {
    canonical: string;
    languages: Record<string, string>;
  };
  verification?: {
    google?: string;
    yandex?: string;
    yahoo?: string;
    other?: Record<string, string>;
  };
  category?: string;
  classification?: string;
  author?: string;
  publisher?: string;
  copyright?: string;
  applicationName?: string;
  generator?: string;
  referrer?: string;
  formatDetection?: {
    telephone?: boolean;
    date?: boolean;
    address?: boolean;
    email?: boolean;
  };
  other?: Record<string, string> | undefined;
}

export function getDefaultSEOConfig(): SEOConfig {
  const origin = getSiteOrigin();
  return {
  title: "منتینو - پلتفرم توسعه مهارت‌های حرفه‌ای",
  description:
    "مهارت‌های حرفه‌ای خود را با منتورشیپ شخصی‌سازی‌شده، آموزش عملی و راهنمایی متخصصان متحول کنید.",
  keywords: [
    "توسعه مهارت‌های حرفه‌ای",
    "رشد شغلی",
    "منتورشیپ",
    "مهارت‌های نرم",
    "آموزش حرفه‌ای",
    "توسعه فردی",
    "رهبری",
    "کار تیمی",
    "شبکه‌سازی",
    "مربیگری حرفه‌ای",
    "professional development",
    "skill development",
    "mentorship",
    "career growth",
    "soft skills",
  ],
  canonical: origin,
  locale: "fa",
  openGraph: {
    title: "منتینو - پلتفرم توسعه مهارت‌های حرفه‌ای",
    description:
      "مهارت‌های حرفه‌ای خود را با منتورشیپ شخصی‌سازی‌شده، آموزش عملی و راهنمایی متخصصان متحول کنید.",
    url: origin,
    siteName: "Menteeno",
    images: [
      {
        url: `${origin}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "منتینو - پلتفرم توسعه مهارت‌های حرفه‌ای",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@menteeno",
    creator: "@menteeno",
    title: "منتینو - پلتفرم توسعه مهارت‌های حرفه‌ای",
    description:
      "مهارت‌های حرفه‌ای خود را با منتورشیپ شخصی‌سازی‌شده، آموزش عملی و راهنمایی متخصصان متحول کنید.",
    images: [`${origin}/twitter-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: origin,
    languages: {
      en: `${origin}/en`,
      fa: `${origin}/fa`,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Education",
  classification: "Professional Development Platform",
  author: "Menteeno Team",
  publisher: "Menteeno",
  copyright: "© 2024 Menteeno. All rights reserved.",
  applicationName: "Menteeno",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};
}

/** @deprecated Use getDefaultSEOConfig() */
export const defaultSEOConfig = getDefaultSEOConfig();

export function generateViewport(config: Partial<SEOConfig> = {}): Viewport {
  const seoConfig = { ...getDefaultSEOConfig(), ...config };

  return {
    width: "device-width",
    initialScale: 1,
    colorScheme: "light dark",
    themeColor: "#3b82f6",
  };
}

export function generateMetadata(config: Partial<SEOConfig> = {}): Metadata {
  const seoConfig = { ...getDefaultSEOConfig(), ...config };

  return {
    title: {
      template: `%s | ${seoConfig.title}`,
      default: seoConfig.title,
    },
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author! }],
    creator: seoConfig.author,
    publisher: seoConfig.publisher,
    applicationName: seoConfig.applicationName,
    generator: seoConfig.generator,
    referrer: seoConfig.referrer as any,
    formatDetection: seoConfig.formatDetection,
    robots: seoConfig.robots as any,
    alternates: seoConfig.alternates,
    verification: seoConfig.verification,
    openGraph: seoConfig.openGraph,
    twitter: seoConfig.twitter,
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": seoConfig.title,
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#3b82f6",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

export function generateLocalizedMetadata(
  locale: string,
  config: Partial<SEOConfig> = {}
): Metadata {
  const origin = getSiteOrigin();
  const baseConfig = { ...getDefaultSEOConfig(), ...config };

  // Get localized content
  const title = getTranslation(locale, "messages.home-header.title");
  const description = getTranslation(
    locale,
    "messages.home-header.description"
  );

  // Persian-specific SEO enhancements
  const isPersian = locale === "fa";
  const persianKeywords = isPersian
    ? [
        ...seoKeywords.persian.primary,
        ...seoKeywords.persian.secondary,
        ...seoKeywords.persian.longTail,
      ]
    : baseConfig.keywords;

  const pageUrl = absoluteUrl(`/${locale}`);

  const localizedConfig: SEOConfig = {
    ...baseConfig,
    title: isPersian
      ? `${title} - پلتفرم توسعه مهارت‌های حرفه‌ای`
      : `${title} - Professional Skill Development Platform`,
    description,
    keywords: persianKeywords,
    locale,
    canonical: pageUrl,
    openGraph: {
      ...baseConfig.openGraph!,
      title: isPersian
        ? `${title} - پلتفرم توسعه مهارت‌های حرفه‌ای`
        : `${title} - Professional Skill Development Platform`,
      description,
      url: pageUrl,
      locale: locale === "fa" ? "fa_IR" : "en_US",
    },
    twitter: {
      ...baseConfig.twitter!,
      title: isPersian
        ? `${title} - پلتفرم توسعه مهارت‌های حرفه‌ای`
        : `${title} - Professional Skill Development Platform`,
      description,
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: absoluteUrl("/en"),
        fa: absoluteUrl("/fa"),
      },
    },
    // Persian-specific meta tags
    other: isPersian
      ? {
          ...baseConfig.other,
          language: "fa",
          "content-language": "fa-IR",
          "geo.region": "IR",
          "geo.country": "Iran",
          "DC.language": "fa",
          "DC.language.iso": "fa-IR",
          "DC.title": title,
          "DC.description": description,
          "DC.creator": "Menteeno Team",
          "DC.publisher": "Menteeno",
          "DC.date.created": new Date().toISOString(),
          "DC.date.modified": new Date().toISOString(),
          "DC.subject": persianKeywords.join(", "),
          "DC.type": "Text",
          "DC.format": "text/html",
          "DC.identifier": pageUrl,
          "DC.source": origin,
          "DC.relation": absoluteUrl("/fa"),
          "DC.coverage": "Iran",
          "DC.rights": "© 2024 Menteeno. All rights reserved.",
        }
      : baseConfig.other || undefined,
  };

  return generateMetadata(localizedConfig);
}

export function generatePageMetadata(
  pageTitle: string,
  pageDescription: string,
  locale: string = "fa",
  config: Partial<SEOConfig> = {}
): Metadata {
  const baseConfig = { ...getDefaultSEOConfig(), ...config };

  return generateMetadata({
    ...baseConfig,
    title: `${pageTitle} | ${baseConfig.title}`,
    description: pageDescription,
    canonical: absoluteUrl(`/${locale}/${pageTitle
      .toLowerCase()
      .replace(/\s+/g, "-")}`),
    openGraph: {
      ...baseConfig.openGraph!,
      title: `${pageTitle} | ${baseConfig.title}`,
      description: pageDescription,
      url: absoluteUrl(`/${locale}/${pageTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`),
    },
    twitter: {
      ...baseConfig.twitter!,
      title: `${pageTitle} | ${baseConfig.title}`,
      description: pageDescription,
    },
  });
}

export const seoKeywords = {
  primary: [
    "professional development",
    "skill development",
    "mentorship",
    "career growth",
    "soft skills training",
  ],
  secondary: [
    "leadership development",
    "teamwork skills",
    "networking",
    "personal growth",
    "professional coaching",
    "workplace skills",
    "career advancement",
    "skill enhancement",
    "mentor program",
    "professional training",
  ],
  longTail: [
    "professional skill development platform",
    "personalized mentorship program",
    "real-world professional training",
    "expert career guidance",
    "professional growth community",
    "soft skills development course",
    "leadership training program",
    "teamwork skills workshop",
    "networking skills development",
    "career advancement training",
  ],
  // Persian keywords
  persian: {
    primary: [
      "توسعه مهارت‌های حرفه‌ای",
      "رشد شغلی",
      "منتورشیپ",
      "مهارت‌های نرم",
      "آموزش حرفه‌ای",
      "توسعه فردی",
      "رهبری",
      "کار تیمی",
      "شبکه‌سازی",
      "مربیگری حرفه‌ای",
    ],
    secondary: [
      "ارتقای شغلی",
      "مهارت‌های کاری",
      "آموزش مهارت‌های نرم",
      "برنامه منتورشیپ",
      "مربی شخصی",
      "توسعه مهارت‌های رهبری",
      "مهارت‌های ارتباطی",
      "حل مسئله",
      "مدیریت زمان",
      "هوش هیجانی",
    ],
    longTail: [
      "پلتفرم توسعه مهارت‌های حرفه‌ای",
      "برنامه منتورشیپ شخصی‌سازی‌شده",
      "آموزش عملی مهارت‌های کاری",
      "راهنمایی متخصصان شغلی",
      "جامعه رشد حرفه‌ای",
      "دوره توسعه مهارت‌های نرم",
      "برنامه آموزش رهبری",
      "کارگاه مهارت‌های تیمی",
      "توسعه مهارت‌های شبکه‌سازی",
      "آموزش پیشرفت شغلی",
    ],
  },
};

export function getStructuredData() {
  const origin = getSiteOrigin();
  return {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Menteeno",
      url: origin,
      logo: `${origin}/logo.png`,
      description:
        "Professional skill development platform with personalized mentorship and real-world training",
      foundingDate: "2024",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-555-0123",
        contactType: "customer service",
        availableLanguage: ["English", "Persian"],
      },
      sameAs: [
        "https://twitter.com/menteeno",
        "https://linkedin.com/company/menteeno",
        "https://facebook.com/menteeno",
      ],
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Menteeno",
      url: origin,
      description: "Professional skill development platform",
      potentialAction: {
        "@type": "SearchAction",
        target: `${origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    course: {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Professional Skill Development Program",
      description:
        "Comprehensive professional skill development with personalized mentorship",
      provider: {
        "@type": "Organization",
        name: "Menteeno",
        url: origin,
      },
      courseMode: "online",
      educationalLevel: "beginner to advanced",
      teaches: [
        "Leadership skills",
        "Teamwork and collaboration",
        "Communication skills",
        "Networking",
        "Professional development",
      ],
    },
    // Persian-specific structured data
    persian: {
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "منتینو",
        alternateName: "Menteeno",
        url: `${origin}/fa`,
        logo: `${origin}/logo.png`,
        description:
          "پلتفرم توسعه مهارت‌های حرفه‌ای با منتورشیپ شخصی‌سازی‌شده و آموزش عملی",
        foundingDate: "2024",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-555-0123",
          contactType: "customer service",
          availableLanguage: ["Persian", "English"],
        },
        sameAs: [
          "https://twitter.com/menteeno",
          "https://linkedin.com/company/menteeno",
          "https://facebook.com/menteeno",
        ],
      },
      course: {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "برنامه توسعه مهارت‌های حرفه‌ای",
        description: "توسعه جامع مهارت‌های حرفه‌ای با منتورشیپ شخصی‌سازی‌شده",
        provider: {
          "@type": "Organization",
          name: "منتینو",
          url: `${origin}/fa`,
        },
        courseMode: "online",
        educationalLevel: "مبتدی تا پیشرفته",
        teaches: [
          "مهارت‌های رهبری",
          "کار تیمی و همکاری",
          "مهارت‌های ارتباطی",
          "شبکه‌سازی",
          "توسعه حرفه‌ای",
        ],
      },
      faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "منتینو چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "منتینو پلتفرمی برای توسعه مهارت‌های حرفه‌ای است که منتورشیپ شخصی‌سازی‌شده، آموزش عملی و راهنمایی متخصصان را ارائه می‌دهد.",
            },
          },
          {
            "@type": "Question",
            name: "برنامه منتورشیپ منتینو چگونه کار می‌کند؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "برنامه منتورشیپ ما شما را با متخصصان باتجربه متصل می‌کند که از طریق سه جلسه منتورشیپ خصوصی، راهنمایی شخصی‌سازی‌شده ارائه می‌دهند.",
            },
          },
          {
            "@type": "Question",
            name: "چه نوع مهارت‌هایی می‌توانم در منتینو توسعه دهم؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "منتینو بر توسعه مهارت‌های نرم از جمله رهبری، کار تیمی، ارتباطات، شبکه‌سازی و حل مسئله تمرکز دارد.",
            },
          },
        ],
      },
    },
  };
}

/** Lazy accessor so existing imports keep working with a live origin. */
export const structuredData = new Proxy({} as ReturnType<typeof getStructuredData>, {
  get(_target, prop, receiver) {
    return Reflect.get(getStructuredData(), prop, receiver);
  },
});
