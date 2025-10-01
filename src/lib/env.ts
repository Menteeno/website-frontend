// Environment configuration
export const ENV = {
  // Base URLs
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://menteeno.app",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "https://menteeno.app/api",
  
  // App Information
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Menteeno",
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Professional Skill Development Platform",
  
  // Environment
  DEPLOYMENT_ENV: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV || "production",
  IS_PRODUCTION: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "production",
  IS_DEVELOPMENT: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "development",
  
  // Social Media
  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@menteeno",
  LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/menteeno",
  GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/menteeno",
  
  // Analytics (Optional)
  GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
} as const;

// Helper functions
export function getBaseUrl(): string {
  return ENV.BASE_URL;
}

export function getApiUrl(): string {
  return ENV.API_URL;
}

export function getAppName(): string {
  return ENV.APP_NAME;
}

export function getAppDescription(): string {
  return ENV.APP_DESCRIPTION;
}

export function isProduction(): boolean {
  return ENV.IS_PRODUCTION;
}

export function isDevelopment(): boolean {
  return ENV.IS_DEVELOPMENT;
}

export function getSocialLinks() {
  return {
    twitter: ENV.TWITTER_HANDLE,
    linkedin: ENV.LINKEDIN_URL,
    github: ENV.GITHUB_URL,
  };
}

export function getAnalyticsConfig() {
  return {
    gaId: ENV.GA_ID,
    sentryDsn: ENV.SENTRY_DSN,
  };
}

// URL builders
export function buildUrl(path: string): string {
  const baseUrl = getBaseUrl().replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

export function buildApiUrl(endpoint: string): string {
  const apiUrl = getApiUrl().replace(/\/$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${apiUrl}${cleanEndpoint}`;
}

export function buildBlogUrl(slug: string, locale: "en" | "fa" = "en"): string {
  return buildUrl(`/${locale}/blog/${slug}`);
}

export function buildBlogListUrl(locale: "en" | "fa" = "en"): string {
  return buildUrl(`/${locale}/blog`);
}

// Validation
export function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!ENV.BASE_URL) {
    errors.push("NEXT_PUBLIC_BASE_URL is required");
  }
  
  if (!ENV.API_URL) {
    errors.push("NEXT_PUBLIC_API_URL is required");
  }
  
  if (!ENV.APP_NAME) {
    errors.push("NEXT_PUBLIC_APP_NAME is required");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Development helpers
export function logEnvironmentInfo(): void {
  if (isDevelopment()) {
    console.log("🌍 Environment Configuration:", {
      baseUrl: ENV.BASE_URL,
      apiUrl: ENV.API_URL,
      appName: ENV.APP_NAME,
      deploymentEnv: ENV.DEPLOYMENT_ENV,
      isProduction: ENV.IS_PRODUCTION,
    });
  }
}