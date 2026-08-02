import type { Metadata, Viewport } from "next";
import {
  generateLocalizedMetadata as generateSEO,
  generateViewport,
} from "./seo";
import { interpolateSiteDomain } from "./site";

// Import locale files
import faMessages from "@/locales/fa.json";

// Available locales - Persian only
export const locales = ["fa"] as const;
export type Locale = (typeof locales)[number];

// Messages object
const messages = {
  fa: faMessages,
} as const;

// Type for the messages structure
export type Messages = typeof faMessages;

// Get nested value from object using dot notation
const getNestedValue = (obj: any, path: string): string => {
  const result = path.split(".").reduce((current, key) => current?.[key], obj);
  // Return the result if it exists (including empty strings), otherwise return the key
  return result !== undefined && result !== null ? result : path;
};

// Replace placeholders in string (supports :key and {key} formats)
const replacePlaceholders = (
  str: string,
  replacements: Record<string, any> = {}
): string => {
  return str
    .replace(/:(\w+)/g, (match, key) => replacements[key] ?? match)
    .replace(/\{(\w+)\}/g, (match, key) => replacements[key] ?? match);
};

// Server-side translation function - always loads Persian (fa.json)
export const getTranslation = (
  locale: string = "fa",
  key: string,
  replacements: Record<string, any> = {}
): string => {
  const localeMessages = messages.fa;
  const translation = getNestedValue(localeMessages, key);
  return interpolateSiteDomain(replacePlaceholders(translation, replacements));
};

// Utility function to validate if a locale is supported
export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

// Utility function to get the default locale (Persian)
export const getDefaultLocale = (): Locale => {
  return "fa";
};

// Utility function to get locale from pathname - always Persian
export const getLocaleFromPathname = (_pathname: string): Locale => {
  return "fa";
};

// Generate localized metadata for SEO
export const generateLocalizedMetadata = (locale: string): Metadata => {
  return generateSEO(locale);
};

// Generate viewport configuration
export const generateLocalizedViewport = (locale: string): Viewport => {
  return generateViewport();
};
