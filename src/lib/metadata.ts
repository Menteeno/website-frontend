import type { Metadata } from "next";
import { getAppConfig, getLocalizedUrl, getUrl } from "./config";

/**
 * Generate SEO metadata based on environment and page data
 */
export function generateMetadata({
  title,
  description,
  path = "",
  locale = "en",
  image = "/og-image.jpg",
}: {
  title?: string;
  description?: string;
  path?: string;
  locale?: string;
  image?: string;
} = {}): Metadata {
  const config = getAppConfig();
  const pageTitle = title ? `${title} | ${config.appName}` : config.appName;
  const pageDescription = description || config.appDescription;
  const pageUrl = path ? getLocalizedUrl(locale, path) : getUrl();
  const imageUrl = getUrl(image);

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "professional development",
      "skill development",
      "mentorship",
      "career growth",
      "soft skills",
      "leadership training",
      "teamwork skills",
      "networking",
      "personal growth",
      "professional training",
      "career advancement",
      "skill enhancement",
      "mentor program",
      "professional coaching",
      "workplace skills",
    ],
    authors: [{ name: `${config.appName} Team` }],
    creator: `${config.appName} Team`,
    publisher: config.appName,
    applicationName: config.appName,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      telephone: false,
      date: false,
      address: false,
      email: false,
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
      canonical: pageUrl,
      languages: {
        en: getLocalizedUrl("en", path),
        fa: getLocalizedUrl("fa", path),
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: config.appName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@menteeno",
      creator: "@menteeno",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
    verification: {
      google:
        process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
        "your-google-verification-code",
      yandex:
        process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ||
        "your-yandex-verification-code",
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": config.appName,
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#3b82f6",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

/**
 * Generate viewport configuration
 */
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    colorScheme: "light dark" as const,
    themeColor: "#3b82f6",
  };
}
