import { getSiteOrigin } from "@/lib/site";
import { generateBlogSitemapData } from "@/lib/blog-seo";
import { getAllBlogPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteOrigin();

  // Get all blog posts for the Persian locale
  const faPosts = await getAllBlogPosts("fa");

  // Generate sitemap data for all posts
  const blogSitemapData = generateBlogSitemapData(faPosts);

  // Add main blog page
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  return [...blogPages, ...blogSitemapData];
}
