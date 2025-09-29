import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
    ],
    scrollRestoration: true,
    // optimizeCss: true, // Disabled due to critters dependency issue
    webVitalsAttribution: ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"],
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Source maps configuration
  productionBrowserSourceMaps: true,

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
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
  },

  // Note: Webpack configuration removed for Turbopack compatibility
  // Turbopack handles bundle optimization automatically

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Optimize for production
  ...(process.env.NODE_ENV === "production" && {
    // Disable source maps in production for better performance
    productionBrowserSourceMaps: false,
  }),

  // Output configuration
  output: "standalone",

  // Trailing slash configuration
  trailingSlash: false,

  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
