import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ulid } from "ulid";

/**
 * Utility function to merge Tailwind CSS classes
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string
 * @param date - Date to format
 * @param locale - Locale for formatting
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale: string = "en"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a number with thousand separators
 * @param num - Number to format
 * @param locale - Locale for formatting
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = "en"): string {
  return num.toLocaleString(locale);
}

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add if truncated
 * @returns Truncated text
 */
export function truncateText(
  text: string,
  length: number,
  suffix: string = "..."
): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + suffix;
}

/**
 * Generate a random string of specified length
 * @param length - Length of the string
 * @returns Random string
 */
export function generateRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Debounce function to limit the rate of function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function to limit the rate of function calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns True if empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any;
  if (typeof obj === "object") {
    const clonedObj = {} as any;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}


export function createId(): string {
  return ulid();
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Format stored amounts. App currency is تومان (IRT). */
export function formatPrice(
  amount: number,
  currency = "IRT",
  locale = "fa-IR",
): string {
  if (amount <= 0) {
    return locale.startsWith("fa") ? "رایگان" : "Free";
  }

  const normalized = currency.toUpperCase();
  const isToman =
    normalized === "IRT" || normalized === "TOMAN" || normalized === "TMN";
  const formatted = amount.toLocaleString(locale, { maximumFractionDigits: 0 });

  if (isToman) {
    return locale.startsWith("fa")
      ? `${formatted} تومان`
      : `${formatted} Tomans`;
  }

  if (normalized === "IRR") {
    return locale.startsWith("fa") ? `${formatted} ریال` : `${formatted} Rials`;
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: normalized,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${formatted} ${normalized}`;
  }
}

export function courseFinalPrice(
  price: number,
  salePrice: number | null,
): number {
  if (salePrice !== null && salePrice >= 0) {
    return salePrice;
  }
  return price;
}

/** Schema.org expects ISO 4217; convert تومان → ریال when needed. */
export function priceForSchema(
  amount: number,
  currency = "IRT",
): { price: number; priceCurrency: string } {
  const normalized = currency.toUpperCase();
  if (normalized === "IRT" || normalized === "TOMAN" || normalized === "TMN") {
    return { price: amount * 10, priceCurrency: "IRR" };
  }
  return { price: amount, priceCurrency: normalized || "IRR" };
}

export function absoluteUrl(path: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}

export function embedVideo(
  url: string | null,
): { kind: "iframe" | "video" | "none"; src: string } {
  if (!url) {
    return { kind: "none", src: "" };
  }
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
    return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
  }
  if (url.includes("aparat.com/v/")) {
    const id = url.split("/v/")[1]?.split(/[?/]/)[0];
    return {
      kind: "iframe",
      src: `https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame`,
    };
  }
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
    return { kind: "video", src: url };
  }
  return { kind: "iframe", src: url };
}
