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
    destination: "/about-us",
    permanent: true,
  },
  {
    source: "/contact",
    destination: "/contact-us",
    permanent: true,
  },
  {
    source: "/courses",
    destination: "/",
    permanent: true,
  },
  {
    source: "/mentorship",
    destination: "/",
    permanent: true,
  },
  {
    source: "/events",
    destination: "/event",
    permanent: true,
  },
  {
    source: "/events/:path*",
    destination: "/event",
    permanent: true,
  },
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

  // Legacy locale-prefixed URLs now served at root
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
  {
    source: "/fa/:path*",
    destination: "/:path*",
    permanent: true,
  },

  // Legacy URL patterns
  {
    source: "/old/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/legacy/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/v1/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/beta/:path*",
    destination: "/",
    permanent: true,
  },

  // Common typos and variations
  {
    source: "/contatc-us",
    destination: "/contact-us",
    permanent: true,
  },
  {
    source: "/contatc",
    destination: "/contact-us",
    permanent: true,
  },
  {
    source: "/dashbord",
    destination: "/dashboard",
    permanent: true,
  },
  {
    source: "/dash",
    destination: "/dashboard",
    permanent: true,
  },
  {
    source: "/blg",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/blgo",
    destination: "/blog",
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
    destination: "/",
    permanent: true,
  },

  // 404 URL redirects - Author pages (redirect to blog)
  {
    source: "/authors/:author",
    destination: "/blog",
    permanent: true,
  },

  // 404 URL redirects - Category pages (redirect to blog)
  {
    source: "/categories/:category",
    destination: "/blog",
    permanent: true,
  },

  // 404 URL redirects - Tag pages (redirect to blog)
  {
    source: "/tags/:tag",
    destination: "/blog",
    permanent: true,
  },

  // 404 URL redirects - Blog posts (redirect to blog)
  {
    source: "/blog/post-:slug",
    destination: "/blog",
    permanent: true,
  },

  // 404 URL redirects - Section pages (redirect to main page)
  {
    source: "/sections",
    destination: "/",
    permanent: true,
  },
  {
    source: "/sections/",
    destination: "/",
    permanent: true,
  },

  // 404 URL redirects - Specific page redirects
  {
    source: "/privacy-policy",
    destination: "/privacy",
    permanent: true,
  },
  {
    source: "/privacy-policy/",
    destination: "/privacy",
    permanent: true,
  },
  {
    source: "/contract",
    destination: "/terms",
    permanent: true,
  },
  {
    source: "/contract/",
    destination: "/terms",
    permanent: true,
  },

  // Search functionality redirects
  {
    source: "/search",
    destination: "/",
    permanent: true,
  },
  {
    source: "/searchindex.json",
    destination: "/",
    permanent: true,
  },

  // GitHub-related redirects
  {
    source: "/blob/master/LICENSE",
    destination: "/",
    permanent: true,
  },

  // CDN and external service redirects
  {
    source: "/cdn-cgi/l/email-protection",
    destination: "/",
    permanent: true,
  },

  // Font file redirects
  {
    source: "/_next/static/media/:path*",
    destination: "/",
    permanent: true,
  },
];
