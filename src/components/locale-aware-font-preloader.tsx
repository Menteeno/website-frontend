"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface LocaleAwareFontPreloaderProps {
  initialLocale?: string;
}

export function LocaleAwareFontPreloader({
  initialLocale,
}: LocaleAwareFontPreloaderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Determine locale from pathname or initial locale
    const segments = pathname.split("/");
    const locale = segments[1] || initialLocale || "fa";

    console.log(`🌍 Loading fonts for locale: ${locale}`);

    // Remove any existing font stylesheets to avoid conflicts
    const existingFontSheets = document.querySelectorAll(
      'link[href*="font"], link[href*="dana-web-font"]'
    );
    existingFontSheets.forEach((sheet) => sheet.remove());

    // Load appropriate font based on locale
    if (locale === "fa") {
      loadPersianFont();
    } else {
      loadEnglishFont();
    }
  }, [pathname, initialLocale]);

  const loadPersianFont = () => {
    console.log("📝 Loading Persian font (Dana)");

    // Preload Dana font file
    const fontPreload = document.createElement("link");
    fontPreload.rel = "preload";
    fontPreload.href = "/assets/fonts/dana/DanaVF.woff2";
    fontPreload.as = "font";
    fontPreload.type = "font/woff2";
    fontPreload.crossOrigin = "anonymous";
    document.head.appendChild(fontPreload);

    // Load Dana CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/dana-web-font.css";
    link.media = "print";
    link.onload = () => {
      link.media = "all";
      console.log("✅ Persian font (Dana) loaded successfully");
    };
    document.head.appendChild(link);
  };

  const loadEnglishFont = () => {
    console.log("📝 Loading English font (Instrument Sans)");

    // Load Instrument Sans CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.bunny.net/css?family=instrument-sans:400,500,600";
    link.media = "print";
    link.onload = () => {
      link.media = "all";
      console.log("✅ English font (Instrument Sans) loaded successfully");
    };
    document.head.appendChild(link);
  };

  return null;
}

// Font switching utility for language changes
export function FontSwitcher() {
  const pathname = usePathname();

  useEffect(() => {
    // This component handles font switching when locale changes
    const segments = pathname.split("/");
    const locale = segments[1] || "fa";

    // Update font family in CSS custom properties
    const root = document.documentElement;
    if (locale === "fa") {
      root.style.setProperty("--font-primary", "var(--font-dana)");
      root.style.setProperty("--font-fallback", "system-ui, sans-serif");
    } else {
      root.style.setProperty("--font-primary", "var(--font-sans)");
      root.style.setProperty("--font-fallback", "system-ui, sans-serif");
    }

    console.log(`🔄 Font switched for locale: ${locale}`);
  }, [pathname]);

  return null;
}
