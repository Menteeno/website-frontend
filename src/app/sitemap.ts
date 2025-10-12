import { getAppConfig } from "@/lib/config";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getAppConfig();

  // Debug logging
  console.log("Sitemap config:", {
    baseUrl: config.baseUrl,
    environment: config.environment,
    isGitHubPages: config.isGitHubPages,
  });

  // All valid pages with proper canonical URLs
  const allPages = [
    // Root pages
    {
      url: config.baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${config.baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${config.baseUrl}/fa`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },

    // Authentication pages
    {
      url: `${config.baseUrl}/en/auth`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/fa/auth`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },

    // Demo pages
    {
      url: `${config.baseUrl}/en/i18n-demo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${config.baseUrl}/fa/i18n-demo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },

    // Legal pages
    {
      url: `${config.baseUrl}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/fa/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/en/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/fa/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/en/cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${config.baseUrl}/fa/cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },

    // Contact pages
    {
      url: `${config.baseUrl}/en/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/fa/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },

    // Blog pages
    {
      url: `${config.baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${config.baseUrl}/fa/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },

    // Dashboard pages
    {
      url: `${config.baseUrl}/en/dashboard`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/fa/dashboard`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/en/dashboard/surveys`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/fa/dashboard/surveys`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/en/dashboard/responses`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/fa/dashboard/responses`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/en/dashboard/analytics`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/fa/dashboard/analytics`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/en/dashboard/settings`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${config.baseUrl}/fa/dashboard/settings`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },

    // Event pages
    {
      url: `${config.baseUrl}/en/event`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/fa/event`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },

    // Survey pages
    {
      url: `${config.baseUrl}/en/survey`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${config.baseUrl}/fa/survey`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  return allPages;
}
