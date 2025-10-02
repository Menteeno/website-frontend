import { generateRobotsTxtContent } from "@/lib/blog-seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/_next/", "/private/"],
    },
    sitemap: [
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://menteeno.com"}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://menteeno.com"}/sitemap-fa.xml`,
    ],
  };
}
