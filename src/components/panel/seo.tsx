"use client";

import { useEffect } from "react";
import { absoluteUrl } from "@/lib/utils";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article" | "product";
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  locale?: string;
};

export function Seo({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
  jsonLd,
  locale = "fa_IR",
}: SeoProps) {
  const url = absoluteUrl(path.startsWith("/panel") ? path : `/panel${path}`);
  const fullTitle =
    title.includes("Menteeno") || title.includes("منتینو")
      ? title
      : `${title} | منتینو`;
  const imageUrl = image || absoluteUrl("/favicon.svg");
  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];
  const isFa = locale.startsWith("fa");

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = isFa ? "fa" : "en";
    document.documentElement.dir = isFa ? "rtl" : "ltr";

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (selector.startsWith('meta[name="')) {
          el.setAttribute("name", selector.slice(11, -2));
        } else if (selector.startsWith('meta[property="')) {
          el.setAttribute("property", selector.slice(15, -2));
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta(
      'meta[name="robots"]',
      "content",
      noIndex
        ? "noindex,nofollow"
        : "index,follow,max-image-preview:large",
    );
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", imageUrl);
  }, [description, fullTitle, imageUrl, isFa, noIndex, type, url]);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          // eslint-disable-next-line react/no-danger
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
