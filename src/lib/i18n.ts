import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateLocalizedMetadata as generateSEO } from "./seo";

// Import locale files
import enMessages from "@/locales/en.json";
import faMessages from "@/locales/fa.json";

// Available locales
export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

// Messages object for all locales
const messages = {
  en: enMessages,
  fa: faMessages,
} as const;

// Type for the messages structure
export type Messages = typeof enMessages;

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

// Server-side translation function
export const getTranslation = (
  locale: string,
  key: string,
  replacements: Record<string, any> = {}
): string => {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const localeMessages = messages[locale as Locale] || messages.fa;
  const translation = getNestedValue(localeMessages, key);
  return replacePlaceholders(translation, replacements);
};

// Client-side translation hook
export const useTranslation = () => {
  const t = (key: string, replacements: Record<string, any> = {}): string => {
    // This will be replaced by the actual implementation in the client component
    return key;
  };

  const changeLanguage = (newLocale: string) => {
    // This will be replaced by the actual implementation in the client component
    console.log("Change language to:", newLocale);
  };

  return {
    t,
    locale: "fa" as Locale,
    changeLanguage,
  };
};

// Utility function to get all available translations for a key
export const getAllTranslations = (key: string) => {
  const result: Record<Locale, string> = {} as Record<Locale, string>;

  locales.forEach((locale) => {
    result[locale] = getTranslation(locale, key);
  });

  return result;
};

// Utility function to validate if a locale is supported
export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

// Utility function to get the default locale
export const getDefaultLocale = (): Locale => "fa";

// Utility function to get locale from pathname
export const getLocaleFromPathname = (pathname: string): Locale => {
  const segments = pathname.split("/");
  const locale = segments[1];

  if (locale && isValidLocale(locale)) {
    return locale;
  }

  return getDefaultLocale();
};

// Generate localized metadata for SEO
export const generateLocalizedMetadata = (locale: string): Metadata => {
  return generateSEO(locale);
};
