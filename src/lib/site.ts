/**
 * Single source of truth for the site domain.
 *
 * Change DEFAULT_SITE_ORIGIN here (or set NEXT_PUBLIC_BASE_URL in .env).
 * Everything else (SEO URLs, emails, console links) is derived from it.
 *
 * Also keep in sync:
 * - public/CNAME  → hostname only (e.g. menteeno.ir)
 * - .env / .env.example → NEXT_PUBLIC_BASE_URL
 */

/** Production site origin — the one constant to change for a domain move. */
export const DEFAULT_SITE_ORIGIN = "https://menteeno.ir";

export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  const origin = (fromEnv || DEFAULT_SITE_ORIGIN).replace(/\/$/, "");
  return origin;
}

export function getSiteHostname(): string {
  try {
    return new URL(getSiteOrigin()).hostname;
  } catch {
    return DEFAULT_SITE_ORIGIN.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

/** Absolute URL for a path on the main site (e.g. `/blog`). */
export function absoluteUrl(path: string = ""): string {
  const origin = getSiteOrigin();
  if (!path || path === "/") return origin;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${cleanPath}`;
}

/** Console / app panel origin (`console.<hostname>`). Override with NEXT_PUBLIC_CONSOLE_URL. */
export function getConsoleOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_CONSOLE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return `https://console.${getSiteHostname()}`;
}

export function getConsoleUrl(path: string = "/"): string {
  const origin = getConsoleOrigin();
  if (!path || path === "/") return `${origin}/`;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${cleanPath}`;
}

/** Email on the site domain, e.g. getSiteEmail("hi") → hi@menteeno.ir */
export function getSiteEmail(localPart: string): string {
  return `${localPart}@${getSiteHostname()}`;
}

export const siteEmails = {
  hi: () => getSiteEmail("hi"),
  hello: () => getSiteEmail("hello"),
  privacy: () => getSiteEmail("privacy"),
  saleh: () => getSiteEmail("saleh"),
} as const;

/** Default API URL derived from the site origin (overridable via NEXT_PUBLIC_API_URL). */
export function getDefaultApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL?.trim() || `${getSiteOrigin()}/api`;
}

/** Replace `{siteDomain}` in translation strings with the live hostname. */
export function interpolateSiteDomain(value: string): string {
  if (!value.includes("{siteDomain}")) return value;
  return value.replaceAll("{siteDomain}", getSiteHostname());
}
