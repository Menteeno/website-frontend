"use client";

import { getTranslation, isValidLocale, type Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "menteeno-locale";

const getNestedValue = (obj: any, path: string): string => {
  return path.split(".").reduce((current, key) => current?.[key], obj) || path;
};

const replacePlaceholders = (
  str: string,
  replacements: Record<string, any> = {}
): string => {
  return str
    .replace(/:(\w+)/g, (match, key) => replacements[key] ?? match)
    .replace(/\{(\w+)\}/g, (match, key) => replacements[key] ?? match);
};

function applyDocumentDirection(locale: string): void {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
}

export const useTranslation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("fa");

  useEffect(() => {
    const segments = pathname.split("/");
    const pathLocale = segments[1];

    if (pathLocale && isValidLocale(pathLocale)) {
      setLocale(pathLocale);
      applyDocumentDirection(pathLocale);
    } else {
      setLocale("fa");
      applyDocumentDirection("fa");
    }
  }, [pathname]);

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

  const changeLanguage = useCallback(
    (newLocale: string) => {
      if (!isValidLocale(newLocale)) {
        console.warn(`Invalid locale: ${newLocale}`);
        return;
      }

      try {
        window.localStorage.setItem(STORAGE_KEY, newLocale);
      } catch {
        // localStorage may be unavailable
      }

      applyDocumentDirection(newLocale);

      const segments = pathname.split("/");
      const isFirstSegmentLocale =
        segments[1] && isValidLocale(segments[1]);
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
