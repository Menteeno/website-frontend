import { LocaleProvider } from "@/components/locale-provider";
import { ResourceHints } from "@/components/seo/performance";
import { SEOProvider } from "@/components/seo/seo-provider";
import { generateMetadata, generateViewport } from "@/lib/metadata";
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

export const metadata: Metadata = generateMetadata({
  title: "Menteeno - Professional Skill Development Platform",
  description:
    "Transform your professional skills with personalized mentorship, real-world training, and expert guidance. Join thousands of professionals growing their careers with Menteeno.",
});

export const viewport: Viewport = generateViewport();

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
