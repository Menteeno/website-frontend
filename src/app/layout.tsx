import { DirectionHandler } from "@/components/direction-handler";
import { LoadingBarWrapper } from "@/components/loading-bar-wrapper";
import { LocaleProvider } from "@/components/locale-provider";
import { OpenReplayProvider } from "@/components/openreplay-provider";
import { ResourceHints } from "@/components/seo/performance";
import { SEOProvider } from "@/components/seo/seo-provider";
import { LoadingProvider } from "@/contexts/loading-context";
import { getAssetUrl } from "@/lib/config";
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
    <html suppressHydrationWarning dir="rtl" lang="fa">
      <head>
        {/* Google Analytics - Hardcoded for immediate loading */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ELCJW5JXCB"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ELCJW5JXCB', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: true,
                allow_ad_personalization_signals: false,
                cookie_flags: 'SameSite=None;Secure'
              });
            `,
          }}
        />

        {/* Google Tag Manager - Hardcoded */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5FDNSG37');
            `,
          }}
        />

        <ResourceHints />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="stylesheet"
          href={getAssetUrl("/assets/css/dana-web-font.css")}
        />
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
                  const segments = pathname.split('/').filter(segment => segment !== '');
                  
                  // Handle GitHub Pages base path
                  let localeIndex = 0;
                  if (segments[0] === 'website-frontend') {
                    localeIndex = 1;
                  }
                  
                  const locale = segments[localeIndex];
                  if (locale === 'en') {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.documentElement.setAttribute('lang', 'en');
                  } else {
                    // Default to RTL for Persian and any other locale
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.setAttribute('lang', 'fa');
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5FDNSG37"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <LoadingProvider>
          <LoadingBarWrapper />
          <OpenReplayProvider>
            <SEOProvider
              googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}
              googleTagManagerId={process.env.NEXT_PUBLIC_GTM_ID}
              facebookPixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID}
              hotjarId={process.env.NEXT_PUBLIC_HOTJAR_ID}
            >
              <LocaleProvider>
                <DirectionHandler />
                {children}
              </LocaleProvider>
            </SEOProvider>
          </OpenReplayProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
