import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().default("Menteeno"),
  NEXT_PUBLIC_APP_DESCRIPTION: z
    .string()
    .default("A place to grow your skills"),
  NEXT_PUBLIC_APP_VERSION: z.string().default("1.0.0"),
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

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
