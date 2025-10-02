import { generateBlogSitemapData } from "@/lib/blog-seo";
import { getAllBlogPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://menteeno.com";
  
  // Get all blog posts for both locales
  const [enPosts, faPosts] = await Promise.all([
    getAllBlogPosts("en"),
    getAllBlogPosts("fa"),
  ]);
  
  // Generate sitemap data for all posts
  const allPosts = [...enPosts, ...faPosts];
  const blogSitemapData = generateBlogSitemapData(allPosts);
  
  // Add main blog pages
  const blogPages = [
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fa/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];
  
  return [...blogPages, ...blogSitemapData];
}
