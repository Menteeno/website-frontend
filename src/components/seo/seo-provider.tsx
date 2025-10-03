"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "./analytics";
import { BreadcrumbStructuredData } from "./breadcrumb-structured-data";
import { FAQStructuredData } from "./faq-structured-data";
import { HydrationSafe } from "./hydration-safe";
import { PersianFAQStructuredData } from "./persian-faq-structured-data";
import { StructuredData } from "./structured-data";

interface SEOProviderProps {
  children: React.ReactNode;
  googleAnalyticsId?: string | undefined;
  googleTagManagerId?: string | undefined;
  facebookPixelId?: string | undefined;
  hotjarId?: string | undefined;
  showFAQ?: boolean;
  showBreadcrumbs?: boolean;
  customBreadcrumbs?: Array<{ name: string; url: string }> | undefined;
}

export function SEOProvider({
  children,
  googleAnalyticsId,
  googleTagManagerId,
  facebookPixelId,
  hotjarId,
  showFAQ = true,
  showBreadcrumbs = true,
  customBreadcrumbs,
}: SEOProviderProps) {
  return (
    <HydrationSafe>
      <SEOProviderContent
        googleAnalyticsId={googleAnalyticsId}
        googleTagManagerId={googleTagManagerId}
        facebookPixelId={facebookPixelId}
        hotjarId={hotjarId}
        showFAQ={showFAQ}
        showBreadcrumbs={showBreadcrumbs}
        customBreadcrumbs={customBreadcrumbs}
      >
        {children}
      </SEOProviderContent>
    </HydrationSafe>
  );
}

function SEOProviderContent({
  children,
  googleAnalyticsId,
  googleTagManagerId,
  facebookPixelId,
  hotjarId,
  showFAQ = true,
  showBreadcrumbs = true,
  customBreadcrumbs,
}: SEOProviderProps) {
  const pathname = usePathname();
  const isPersian = pathname.startsWith("/fa");

  return (
    <>
      {/* Analytics */}
      <Analytics
        googleAnalyticsId={googleAnalyticsId}
        googleTagManagerId={googleTagManagerId}
        facebookPixelId={facebookPixelId}
        hotjarId={hotjarId}
      />

      {/* Structured Data */}
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <StructuredData type="course" />

      {/* FAQ Structured Data - Language Specific */}
      {showFAQ &&
        (isPersian ? <PersianFAQStructuredData /> : <FAQStructuredData />)}

      {/* Breadcrumb Structured Data */}
      {showBreadcrumbs && (
        <BreadcrumbStructuredData customItems={customBreadcrumbs} />
      )}

      {children}
    </>
  );
}
