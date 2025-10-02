/**
 * Centralized configuration for different deployment environments
 */

export type DeploymentEnvironment =
  | "development"
  | "production"
  | "github-pages"
  | "custom";

export interface AppConfig {
  baseUrl: string;
  apiUrl: string;
  appName: string;
  appDescription: string;
  isGitHubPages: boolean;
  isProduction: boolean;
  environment: DeploymentEnvironment;
  basePath: string;
  assetPrefix: string;
}

/**
 * Environment configuration mapping
 */
export const ENVIRONMENT_CONFIGS = {
  development: {
    baseUrl: "http://localhost:3000",
    basePath: "",
    assetPrefix: "",
  },
  production: {
    baseUrl: "https://menteeno.app",
    basePath: "",
    assetPrefix: "",
  },
  "github-pages": {
    baseUrl: "https://menteeno.github.io/website-frontend",
    basePath: "/website-frontend",
    assetPrefix: "/website-frontend",
  },
  custom: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://menteeno.app",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  },
} as const;

/**
 * Get the current deployment environment
 */
export function getDeploymentEnvironment(): DeploymentEnvironment {
  // Check for custom environment first
  if (process.env.NEXT_PUBLIC_DEPLOYMENT_ENV) {
    return process.env.NEXT_PUBLIC_DEPLOYMENT_ENV as DeploymentEnvironment;
  }

  // Check for GitHub Pages
  if (process.env.GITHUB_PAGES === "true" || process.env.GITHUB_PAGES === "1") {
    return "github-pages";
  }

  // Check for production
  if (process.env.NODE_ENV === "production") {
    return "production";
  }

  return "development";
}

/**
 * Get application configuration based on environment
 */
export function getAppConfig(): AppConfig {
  const environment = getDeploymentEnvironment();
  const envConfig = ENVIRONMENT_CONFIGS[environment];
  const isGitHubPages = environment === "github-pages";
  const isProduction = environment === "production" || isGitHubPages;

  return {
    baseUrl: envConfig.baseUrl,
    apiUrl: process.env.NEXT_PUBLIC_API_URL || `${envConfig.baseUrl}/api`,
    appName: process.env.NEXT_PUBLIC_APP_NAME || "Menteeno",
    appDescription:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "Professional Skill Development Platform",
    isGitHubPages,
    isProduction,
    environment,
    basePath: envConfig.basePath,
    assetPrefix: envConfig.assetPrefix,
  };
}

/**
 * Get URL with proper base path
 */
export function getUrl(path: string = ""): string {
  const config = getAppConfig();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${config.baseUrl}${cleanPath}`;
}

/**
 * Get localized URL
 */
export function getLocalizedUrl(locale: string, path: string = ""): string {
  const config = getAppConfig();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${config.baseUrl}/${locale}${cleanPath}`;
}

/**
 * Get asset URL with proper prefix
 */
export function getAssetUrl(path: string): string {
  const config = getAppConfig();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (config.assetPrefix) {
    return `${config.baseUrl}${cleanPath}`;
  }

  return cleanPath;
}

/**
 * Get Next.js configuration for the current environment
 */
export function getNextConfig() {
  const config = getAppConfig();

  if (config.isGitHubPages) {
    return {
      output: "export" as const,
      distDir: "out",
      trailingSlash: true,
      images: {
        unoptimized: true,
      },
      assetPrefix: config.assetPrefix,
      basePath: config.basePath,
      skipMiddlewareUrlNormalize: true,
    };
  }

  return {
    output: "standalone" as const,
    trailingSlash: false,
    skipTrailingSlashRedirect: true,
    images: {
      formats: ["image/webp", "image/avif"] as const,
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 31536000,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
  };
}
