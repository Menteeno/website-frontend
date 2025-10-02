import { getAppConfig } from "@/lib/config";
import { locales } from "@/lib/i18n";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getAppConfig();
  
  // Debug logging
  console.log('Sitemap config:', {
    baseUrl: config.baseUrl,
    environment: config.environment,
    isGitHubPages: config.isGitHubPages
  });

  // Static pages
  const staticPages = [
    {
      url: config.baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${config.baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${config.baseUrl}/fa`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
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
  ];

  // Generate pages for each locale
  const localizedPages = locales.flatMap((locale) => [
    {
      url: `${config.baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${config.baseUrl}/${locale}/auth`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/${locale}/i18n-demo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${config.baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticPages, ...localizedPages];
}
