import { LocaleProvider } from "@/components/locale-provider";
import { ResourceHints } from "@/components/seo/performance";
import { SEOProvider } from "@/components/seo/seo-provider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Menteeno - Professional Skill Development Platform",
    default: "Menteeno - Professional Skill Development Platform",
  },
  description:
    "Transform your professional skills with personalized mentorship, real-world training, and expert guidance. Join thousands of professionals growing their careers with Menteeno.",
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
  authors: [{ name: "Menteeno Team" }],
  creator: "Menteeno Team",
  publisher: "Menteeno",
  applicationName: "Menteeno",
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
    canonical: "https://menteeno.app",
    languages: {
      en: "https://menteeno.app/en",
      fa: "https://menteeno.app/fa",
    },
  },
  openGraph: {
    title: "Menteeno - Professional Skill Development Platform",
    description:
      "Transform your professional skills with personalized mentorship, real-world training, and expert guidance.",
    url: "https://menteeno.app",
    siteName: "Menteeno",
    images: [
      {
        url: "https://menteeno.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Menteeno - Professional Skill Development Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@menteeno",
    creator: "@menteeno",
    title: "Menteeno - Professional Skill Development Platform",
    description:
      "Transform your professional skills with personalized mentorship, real-world training, and expert guidance.",
    images: ["https://menteeno.app/twitter-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Menteeno",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ResourceHints />
        <link rel="stylesheet" href="/assets/css/dana-web-font.css" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const appearance = localStorage.getItem('appearance') || 'system';
                  const isDark = appearance === 'dark' || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('dark', isDark);
                  
                  // Set direction based on locale
                  const pathname = window.location.pathname;
                  const segments = pathname.split('/');
                  const locale = segments[1];
                  if (locale === 'fa') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.setAttribute('lang', 'fa');
                  } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.documentElement.setAttribute('lang', 'en');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SEOProvider
          googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}
          googleTagManagerId={process.env.NEXT_PUBLIC_GTM_ID}
          facebookPixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID}
          hotjarId={process.env.NEXT_PUBLIC_HOTJAR_ID}
        >
          <LocaleProvider>{children}</LocaleProvider>
        </SEOProvider>
      </body>
    </html>
  );
}
