"use client";

import { useTranslation } from "@/hooks/use-translation";
import { useEffect } from "react";

export function DirectionHandler() {
  const { locale } = useTranslation();

  useEffect(() => {
    // Update HTML direction and language attributes when locale changes
    if (locale === "en") {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    } else {
      // Default to RTL for Persian and any other locale
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "fa");
    }
  }, [locale]);

  return null; // This component doesn't render anything
}
