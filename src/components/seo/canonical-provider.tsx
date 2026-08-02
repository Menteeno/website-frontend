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

  return (
    <>
      <Head>
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

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
