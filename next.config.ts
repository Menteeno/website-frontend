import type { NextConfig } from "next";
import { cacheConfig, redirects } from "./config/routing";
import { cspHeader, securityHeaders } from "./config/security";
// import { webpackConfig } from "./config/webpack";
import { getAppConfig, getNextConfig } from "./src/lib/config";

/**
 * Get environment-specific configuration
 */
const config = getAppConfig();
const environmentConfig = getNextConfig();

/**
 * Common configuration shared across all environments
 */
const commonConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: config.isProduction,
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  // Webpack config disabled for GitHub Pages compatibility
};

/**
 * Headers configuration
 */
const headersConfig = {
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
};

/**
 * Redirects configuration
 */
const redirectsConfig = {
  async redirects() {
    return redirects;
  },
};

/**
 * Main Next.js configuration
 */
const nextConfig: NextConfig = {
  ...commonConfig,
  ...environmentConfig,
  // Only apply headers and redirects for non-static exports
  ...(config.isGitHubPages ? {} : headersConfig),
  ...(config.isGitHubPages ? {} : redirectsConfig),
} as NextConfig;

export default nextConfig;
