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
];
