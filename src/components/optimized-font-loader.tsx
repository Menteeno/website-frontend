"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function OptimizedFontLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // Determine locale from pathname
    const segments = pathname.split("/");
    const locale = segments[1] || "fa"; // Default to Persian

    // Load fonts based on locale
    if (locale === "fa") {
      // Load Persian font (Dana) for Persian locale
      loadPersianFont();
    } else {
      // Load English font (Instrument Sans) for English locale
      loadEnglishFont();
    }
  }, [pathname]);

  const loadPersianFont = () => {
    // Load Dana font for Persian
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/dana-web-font.css";
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  };

  const loadEnglishFont = () => {
    // Load Instrument Sans font for English
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.bunny.net/css?family=instrument-sans:400,500,600";
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  };

  return null;
}

// Font display optimization
export function FontDisplayOptimizer() {
  useEffect(() => {
    // Add font-display: swap to existing font stylesheets
    const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
    styleSheets.forEach((sheet) => {
      const linkElement = sheet as HTMLLinkElement;
      if (
        linkElement.href?.includes("fonts.bunny.net") ||
        linkElement.href?.includes("dana-web-font.css")
      ) {
        const newSheet = sheet.cloneNode(true) as HTMLLinkElement;
        newSheet.setAttribute("data-font-display", "swap");
        sheet.parentNode?.replaceChild(newSheet, sheet);
      }
    });
  }, []);

  return null;
}
