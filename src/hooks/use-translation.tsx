"use client";

import { getTranslation, isValidLocale, type Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Get nested value from object using dot notation
const getNestedValue = (obj: any, path: string): string => {
  return path.split(".").reduce((current, key) => current?.[key], obj) || path;
};

// Replace placeholders in string
const replacePlaceholders = (
  str: string,
  replacements: Record<string, any> = {}
): string => {
  return str.replace(/:(\w+)/g, (match, key) => replacements[key] || match);
};

// Hook for client-side translations
export const useTranslation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("fa");

  // Extract locale from pathname
  useEffect(() => {
    const segments = pathname.split("/");
    const pathLocale = segments[1];

    if (pathLocale && isValidLocale(pathLocale)) {
      setLocale(pathLocale);
    } else {
      setLocale("fa");
    }
  }, [pathname]);

  const t = useCallback(
    (key: string, replacements: Record<string, any> = {}): string => {
      const translation = getTranslation(locale, key);
      return replacePlaceholders(translation, replacements);
    },
    [locale]
  );

  const changeLanguage = useCallback(
    (newLocale: string) => {
      if (!isValidLocale(newLocale)) {
        console.warn(`Invalid locale: ${newLocale}`);
        return;
      }

      // Remove current locale from pathname and add new one
      const segments = pathname.split("/");

      // Check if the first segment is a locale
      const isFirstSegmentLocale = segments[1] && isValidLocale(segments[1]);

      // If first segment is a locale, remove it; otherwise keep all segments
      const pathWithoutLocale = isFirstSegmentLocale
        ? segments.slice(2).join("/")
        : segments.slice(1).join("/");

      const newPath = `/${newLocale}${
        pathWithoutLocale ? `/${pathWithoutLocale}` : ""
      }`;

      router.push(newPath);
    },
    [router, pathname]
  );

  return {
    t,
    locale,
    changeLanguage,
  };
};
