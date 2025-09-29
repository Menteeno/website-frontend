import type { NextConfig } from "next";
import { cacheConfig, redirects } from "./config/routing";
import { cspHeader, securityHeaders } from "./config/security";
import { webpackConfig } from "./config/webpack";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Experimental features
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    scrollRestoration: true,
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
    removeConsole: isProduction,
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: cacheConfig.dynamic,
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: cacheConfig.dynamic,
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: cacheConfig.static,
          },
        ],
      },
      {
        source: "/(.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot))",
        headers: [
          {
            key: "Cache-Control",
            value: cacheConfig.static,
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return redirects;
  },

  // Webpack configuration
  webpack: webpackConfig,

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Output configuration
  output: "standalone",

  // Trailing slash configuration
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
