import { absoluteUrl } from "@/lib/site";

/**
 * OAuth / magic-link return URL.
 * Uses the current browser origin so local and production both work,
 * and falls back to NEXT_PUBLIC_BASE_URL / menteeno.ir when origin is unavailable.
 *
 * Supabase Dashboard must allow these URLs:
 * - Site URL: https://menteeno.ir
 * - Redirect URLs: https://menteeno.ir/panel/auth/callback
 *                  http://localhost:3000/panel/auth/callback
 */
export function authRedirectTo(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${normalized}`;
  }

  return absoluteUrl(normalized);
}
