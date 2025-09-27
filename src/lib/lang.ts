"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Import locale files
import enMessages from "@/locales/en.json";
import faMessages from "@/locales/fa.json";

// Messages object for all locales
const messages = {
  en: enMessages,
  fa: faMessages,
};

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

// Hook for translations
export const useTranslation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState("en");

  // Extract locale from pathname
  useEffect(() => {
    const segments = pathname.split("/");
    const pathLocale = segments[1];
    if (pathLocale && ["en", "fa"].includes(pathLocale)) {
      setLocale(pathLocale);
    } else {
      setLocale("en");
    }
  }, [pathname]);

  const t = useCallback(
    (key: string, replacements: Record<string, any> = {}): string => {
      const localeMessages =
        messages[locale as keyof typeof messages] || messages.en;
      const translation = getNestedValue(localeMessages, key);
      return replacePlaceholders(translation, replacements);
    },
    [locale]
  );

  const changeLanguage = useCallback(
    (newLocale: string) => {
      // Remove current locale from pathname and add new one
      const segments = pathname.split("/");

      // Check if the first segment is a locale
      const isFirstSegmentLocale = ["en", "fa"].includes(segments[1]);

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

// Utility function for server-side translations
export const getTranslation = (
  locale: string,
  key: string,
  replacements: Record<string, any> = {}
): string => {
  const localeMessages =
    messages[locale as keyof typeof messages] || messages.en;
  const translation = getNestedValue(localeMessages, key);
  return replacePlaceholders(translation, replacements);
};

// Available locales
export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];
