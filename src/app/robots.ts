import { getAppConfig } from "@/lib/config";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const config = getAppConfig();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/*.json$",
          "/*?*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],
    sitemap: [
      `${config.baseUrl}/sitemap.xml`,
      `${config.baseUrl}/sitemap-blog.xml`,
      `${config.baseUrl}/sitemap-fa.xml`,
    ],
    host: config.baseUrl,
  };
}
