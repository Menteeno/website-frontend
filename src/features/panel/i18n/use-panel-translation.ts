"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import fa from "./locales/fa.json";

export type PanelLocale = "fa" | "en";

const dictionaries: Record<PanelLocale, Record<string, unknown>> = {
  fa: fa as Record<string, unknown>,
  en: en as Record<string, unknown>,
};

const STORAGE_KEY = "menteeno-panel-locale";

function getNestedValue(obj: unknown, path: string): string {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object") {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof value === "string" ? value : path;
}

function replacePlaceholders(
  str: string,
  replacements: Record<string, string | number> = {},
): string {
  return str.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = replacements[key];
    return value === undefined || value === null ? match : String(value);
  });
}

function applyDocumentDirection(locale: PanelLocale): void {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
}

export function usePanelTranslation() {
  const [locale, setLocale] = useState<PanelLocale>("fa");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = stored === "en" || stored === "fa" ? stored : "fa";
    setLocale(next);
    applyDocumentDirection(next);
  }, []);

  const t = useCallback(
    (
      key: string,
      replacements: Record<string, string | number> = {},
    ): string => {
      const translation = getNestedValue(dictionaries[locale], key);
      return replacePlaceholders(translation, replacements);
    },
    [locale],
  );

  const changeLanguage = useCallback((next: string) => {
    if (next !== "fa" && next !== "en") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, next);
    setLocale(next);
    applyDocumentDirection(next);
  }, []);

  const i18n = useMemo(
    () => ({
      language: locale,
      changeLanguage: (next: string) => {
        changeLanguage(next);
        return Promise.resolve();
      },
    }),
    [locale, changeLanguage],
  );

  return { t, locale, changeLanguage, i18n };
}

/** Compatibility alias used by ported LMS pages. */
export function useTranslation() {
  return usePanelTranslation();
}

export function applyDocumentDirectionExport(locale: string): void {
  if (locale === "fa" || locale === "en") {
    applyDocumentDirection(locale);
  }
}
