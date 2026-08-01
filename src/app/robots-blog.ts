import { getSiteOrigin } from "@/lib/site";
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
      `${getSiteOrigin()}/sitemap.xml`,
      `${getSiteOrigin()}/sitemap-fa.xml`,
    ],
  };
}
