import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "fa"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Skip static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_static") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Get locale from Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    let locale = defaultLocale;

    if (acceptLanguage) {
      const preferredLocale = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim())
        .find((lang) => locales.includes(lang.split("-")[0]));

      if (preferredLocale) {
        locale = preferredLocale.split("-")[0];
      }
    }

    // Redirect to the pathname with the locale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, _static, favicon.ico)
    "/((?!_next|api|_static|favicon.ico).*)",
  ],
};
