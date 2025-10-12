"use client";

import { getAppConfig } from "@/lib/config";
import Head from "next/head";
import { usePathname } from "next/navigation";

interface CanonicalProviderProps {
  children: React.ReactNode;
}

export function CanonicalProvider({ children }: CanonicalProviderProps) {
  const pathname = usePathname();
  const config = getAppConfig();

  // Generate canonical URL
  const canonicalUrl = `${config.baseUrl}${pathname}`;

  // Generate alternate language URLs
  const alternateUrls = {
    fa: `${config.baseUrl}/fa${pathname.replace(/^\/[a-z]{2}/, "")}`,
    en: `${config.baseUrl}/en${pathname.replace(/^\/[a-z]{2}/, "")}`,
  };

  return (
    <>
      <Head>
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Alternate language versions */}
        <link rel="alternate" hrefLang="fa" href={alternateUrls.fa} />
        <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
        <link rel="alternate" hrefLang="x-default" href={alternateUrls.fa} />

        {/* Prevent duplicate content */}
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      </Head>
      {children}
    </>
  );
}
