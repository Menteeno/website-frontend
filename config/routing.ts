/**
 * Cache configuration for different file types
 */
export const cacheConfig = {
  static: "public, max-age=31536000, immutable",
  dynamic: "public, max-age=0, s-maxage=86400",
  api: "public, max-age=0, s-maxage=86400",
};

/**
 * Minimal SEO migration redirects (Persian-only site, no locale architecture).
 *
 * Keep only:
 * - URLs that likely exist in Google / old bookmarks
 * - Real path renames to current pages
 *
 * Do NOT add:
 * - Guessed soft-404 → homepage dumps
 * - Typo redirects
 * - English locale routes
 * - Internal /_next asset redirects
 */
export const redirects = [
  // --- Homepage alias ---
  // Old/marketing "home" path → current root.
  {
    source: "/home",
    destination: "/",
    permanent: true,
  },

  // --- Auth path renames ---
  // Former auth entrypoints now live at /auth.
  {
    source: "/login",
    destination: "/auth",
    permanent: true,
  },
  {
    source: "/signup",
    destination: "/auth",
    permanent: true,
  },

  // --- Public page slug renames ---
  {
    source: "/about",
    destination: "/about-us",
    permanent: true,
  },
  {
    source: "/contact",
    destination: "/contact-us",
    permanent: true,
  },
  {
    source: "/privacy-policy",
    destination: "/privacy",
    permanent: true,
  },
  {
    source: "/contract",
    destination: "/terms",
    permanent: true,
  },

  // --- Event plural → singular ---
  // Current page is /event; old /events URLs may be indexed.
  {
    source: "/events",
    destination: "/event",
    permanent: true,
  },
  {
    source: "/events/:path+",
    destination: "/event",
    permanent: true,
  },

  // --- Dashboard path nesting ---
  // Former flat dashboard URLs → nested /dashboard/* routes that still exist.
  {
    source: "/surveys",
    destination: "/dashboard/surveys",
    permanent: true,
  },
  {
    source: "/analytics",
    destination: "/dashboard/analytics",
    permanent: true,
  },
  {
    source: "/settings",
    destination: "/dashboard/settings",
    permanent: true,
  },
  {
    source: "/responses",
    destination: "/dashboard/responses",
    permanent: true,
  },

  // --- Legacy /fa prefix strip (SEO migration only) ---
  // Site used to expose /fa/*; those URLs may still be in the index.
  // There is no /fa locale app route anymore — strip the prefix to the
  // current unprefixed Persian URLs. Special-case auth so /fa/login and
  // /fa/signup land on /auth in one hop (not /login → /auth).
  {
    source: "/fa",
    destination: "/",
    permanent: true,
  },
  {
    source: "/fa/home",
    destination: "/",
    permanent: true,
  },
  {
    source: "/fa/login",
    destination: "/auth",
    permanent: true,
  },
  {
    source: "/fa/signup",
    destination: "/auth",
    permanent: true,
  },
  // :path+ avoids matching bare /fa (empty capture previously caused
  // Location: "" and an infinite reload loop).
  {
    source: "/fa/:path+",
    destination: "/:path+",
    permanent: true,
  },
];
