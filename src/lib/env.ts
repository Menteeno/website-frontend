// Environment variables configuration
const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Menteeno",
  NEXT_PUBLIC_APP_DESCRIPTION:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A place to grow your skills",
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

// Export validated environment variables
export const envConfig = {
  NODE_ENV: env.NODE_ENV,
  API_URL: env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  APP_URL: env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  APP_NAME: env.NEXT_PUBLIC_APP_NAME,
  APP_DESCRIPTION: env.NEXT_PUBLIC_APP_DESCRIPTION,
  APP_VERSION: env.NEXT_PUBLIC_APP_VERSION,
  ANALYTICS_ID: env.NEXT_PUBLIC_ANALYTICS_ID,
  GOOGLE_ANALYTICS_ID: env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  SENTRY_DSN: env.NEXT_PUBLIC_SENTRY_DSN,
  DATABASE_URL: env.DATABASE_URL,
  NEXTAUTH_SECRET: env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: env.NEXTAUTH_URL,
} as const;

// Type for environment configuration
export type EnvConfig = typeof envConfig;

// Helper function to check if we're in development
export const isDevelopment = envConfig.NODE_ENV === "development";

// Helper function to check if we're in production
export const isProduction = envConfig.NODE_ENV === "production";

// Helper function to check if we're in test
export const isTest = envConfig.NODE_ENV === "test";
