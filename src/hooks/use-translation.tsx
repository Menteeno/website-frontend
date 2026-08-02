"use client";

import { getTranslation, type Locale } from "@/lib/i18n";
import { useCallback } from "react";

const replacePlaceholders = (
  str: string,
  replacements: Record<string, any> = {}
): string => {
  return str
    .replace(/:(\w+)/g, (match, key) => replacements[key] ?? match)
    .replace(/\{(\w+)\}/g, (match, key) => replacements[key] ?? match);
};

export const useTranslation = () => {
  // Persian-only site - always loads fa.json
  const locale: Locale = "fa";

  const t = useCallback(
    (key: string, replacements: Record<string, any> = {}): string => {
      try {
        const translation = getTranslation(locale, key);
        return replacePlaceholders(translation, replacements);
      } catch (error) {
        console.warn(`Translation not found for key: ${key}`, error);
        return key;
      }
    },
    [locale]
  );

  // No-op for API compatibility - language switching is disabled
  const changeLanguage = useCallback(() => {
    // Persian-only site - language switching is disabled
  }, []);

  return {
    t,
    locale,
    changeLanguage,
  };
};
