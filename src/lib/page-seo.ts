import type { Metadata } from "next";
import { absoluteUrl } from "./site";

export type SeoPageKey = "home" | "event";

const PAGE_SEO: Record<SeoPageKey, { title: string; description: string; path: string }> =
  {
    home: {
      title: "منتینو | پلتفرم رشد مهارت‌های حرفه‌ای",
      description:
        "منتینو به شما کمک می‌کند مهارت‌های حرفه‌ای خود را توسعه دهید، از منتورها یاد بگیرید و مسیر رشد شغلی خود را بهتر بسازید.",
      path: "/",
    },
    event: {
      title: "رویدادهای منتینو | وبینارها و برنامه‌های آموزشی",
      description:
        "در رویدادهای منتینو شرکت کنید؛ وبینارها، جلسات آموزشی و برنامه‌های تخصصی برای توسعه مهارت‌های نرم، رشد شغلی و یادگیری از متخصصان.",
      path: "/event",
    },
  };

export function getPageSeo(page: SeoPageKey) {
  return PAGE_SEO[page];
}

/** Persian-only page metadata (no locale-prefix routes). */
export function buildPageMetadata(page: SeoPageKey): Metadata {
  const { title, description, path } = PAGE_SEO[page];
  const canonicalUrl = absoluteUrl(path === "/" ? "" : path);

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fa: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Menteeno",
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
