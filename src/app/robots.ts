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
          "/tmp/",
          "/out/",
          "/node_modules/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/tmp/",
          "/out/",
          "/node_modules/",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/tmp/",
          "/out/",
          "/node_modules/",
        ],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/tmp/",
          "/out/",
          "/node_modules/",
        ],
      },
      {
        userAgent: "ParsijooBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/tmp/",
          "/out/",
          "/node_modules/",
        ],
      },
      {
        userAgent: "YoozBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/tmp/",
          "/out/",
          "/node_modules/",
        ],
      },
    ],
    sitemap: [
      `${config.baseUrl}/sitemap.xml`,
      `${config.baseUrl}/sitemap-blog.xml`,
      `${config.baseUrl}/sitemap-fa.xml`,
      `${config.baseUrl}/en/sitemap.xml`,
      `${config.baseUrl}/fa/sitemap.xml`,
    ],
    host: config.baseUrl,
  };
}
