/**
 * Cache configuration for different file types
 */
export const cacheConfig = {
  static: "public, max-age=31536000, immutable",
  dynamic: "public, max-age=0, s-maxage=86400",
  api: "public, max-age=0, s-maxage=86400",
};

/**
 * Redirects configuration
 */
export const redirects = [
  // Root redirects
  {
    source: "/",
    destination: "/fa",
    permanent: false,
  },
  {
    source: "/home",
    destination: "/",
    permanent: true,
  },
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

  // Common 404 patterns - redirect to closest valid page
  {
    source: "/about",
    destination: "/fa",
    permanent: true,
  },
  {
    source: "/contact",
    destination: "/fa/contact-us",
    permanent: true,
  },
  {
    source: "/courses",
    destination: "/fa",
    permanent: true,
  },
  {
    source: "/mentorship",
    destination: "/fa",
    permanent: true,
  },
  {
    source: "/events",
    destination: "/fa/event",
    permanent: true,
  },
  {
    source: "/events/:path*",
    destination: "/fa/event",
    permanent: true,
  },
  {
    source: "/surveys",
    destination: "/fa/dashboard/surveys",
    permanent: true,
  },
  {
    source: "/analytics",
    destination: "/fa/dashboard/analytics",
    permanent: true,
  },
  {
    source: "/settings",
    destination: "/fa/dashboard/settings",
    permanent: true,
  },
  {
    source: "/responses",
    destination: "/fa/dashboard/responses",
    permanent: true,
  },

  // Redirect common routes to Persian versions
  {
    source: "/event",
    destination: "/fa/event",
    permanent: false,
  },
  {
    source: "/auth",
    destination: "/fa/auth",
    permanent: false,
  },
  {
    source: "/dashboard",
    destination: "/fa/dashboard",
    permanent: false,
  },
  {
    source: "/blog",
    destination: "/fa/blog",
    permanent: false,
  },
  {
    source: "/contact-us",
    destination: "/fa/contact-us",
    permanent: false,
  },
  {
    source: "/privacy",
    destination: "/fa/privacy",
    permanent: false,
  },
  {
    source: "/terms",
    destination: "/fa/terms",
    permanent: false,
  },
  {
    source: "/cookies",
    destination: "/fa/cookies",
    permanent: false,
  },
  {
    source: "/survey",
    destination: "/fa/survey",
    permanent: false,
  },

  // Persian-specific redirects
  {
    source: "/fa/home",
    destination: "/fa",
    permanent: true,
  },
  {
    source: "/fa/login",
    destination: "/fa/auth",
    permanent: true,
  },
  {
    source: "/fa/signup",
    destination: "/fa/auth",
    permanent: true,
  },

  // English-specific redirects
  {
    source: "/en/home",
    destination: "/en",
    permanent: true,
  },
  {
    source: "/en/login",
    destination: "/en/auth",
    permanent: true,
  },
  {
    source: "/en/signup",
    destination: "/en/auth",
    permanent: true,
  },

  // Legacy URL patterns
  {
    source: "/old/:path*",
    destination: "/fa",
    permanent: true,
  },
  {
    source: "/legacy/:path*",
    destination: "/fa",
    permanent: true,
  },
  {
    source: "/v1/:path*",
    destination: "/fa",
    permanent: true,
  },
  {
    source: "/beta/:path*",
    destination: "/fa",
    permanent: true,
  },

  // Common typos and variations
  {
    source: "/contatc-us",
    destination: "/fa/contact-us",
    permanent: true,
  },
  {
    source: "/contatc",
    destination: "/fa/contact-us",
    permanent: true,
  },
  {
    source: "/dashbord",
    destination: "/fa/dashboard",
    permanent: true,
  },
  {
    source: "/dash",
    destination: "/fa/dashboard",
    permanent: true,
  },
  {
    source: "/blg",
    destination: "/fa/blog",
    permanent: true,
  },
  {
    source: "/blgo",
    destination: "/fa/blog",
    permanent: true,
  },

  // API and system redirects
  {
    source: "/api/old/:path*",
    destination: "/api",
    permanent: true,
  },
  {
    source: "/admin/old/:path*",
    destination: "/fa",
    permanent: true,
  },
];
