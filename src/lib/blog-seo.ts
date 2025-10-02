import type { BlogPost, Locale } from "@/types/blog";

import { getAssetUrl } from "./config";
import { getBaseUrl } from "./env";

// Generate structured data for blog posts
export function generateBlogStructuredData(post: BlogPost) {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.seo?.image ? getAssetUrl(post.seo.image) : undefined,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: post.author.social?.linkedin
        ? `https://linkedin.com/in/${post.author.social.linkedin}`
        : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Menteeno",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${post.locale}/blog/${post.slug}`,
    },
    articleSection: post.category.name,
    keywords: post.seo.keywords.join(", "),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: post.locale === "fa" ? "fa-IR" : "en-US",
    isPartOf: {
      "@type": "Blog",
      name: "Menteeno Blog",
      description:
        "Helpful articles and guides for developing soft skills, professional growth, and improving communication and teamwork skills in programming.",
    },
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(
  locale: Locale,
  post?: BlogPost
) {
  const baseUrl = getBaseUrl();

  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "fa" ? "خانه" : "Home",
      item: `${baseUrl}/${locale}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: locale === "fa" ? "وبلاگ" : "Blog",
      item: `${baseUrl}/${locale}/blog`,
    },
  ];

  if (post) {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 3,
      name: post.category.name,
      item: `${baseUrl}/${locale}/blog?category=${post.category.slug}`,
    });
    breadcrumbs.push({
      "@type": "ListItem",
      position: 4,
      name: post.title,
      item: `${baseUrl}/${locale}/blog/${post.slug}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };
}

// Generate organization structured data
export function generateOrganizationStructuredData() {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Menteeno",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Platform for developing soft skills, professional growth, and improving communication and teamwork skills in programming.",
    sameAs: [
      "https://twitter.com/menteeno",
      "https://linkedin.com/company/menteeno",
      "https://github.com/menteeno",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@menteeno.com",
    },
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate sitemap data for blog posts
export function generateBlogSitemapData(posts: BlogPost[]) {
  const baseUrl = getBaseUrl();

  return posts.map((post) => ({
    url: `${baseUrl}/${post.locale}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.6,
    alternates: {
      languages: {
        en: `${baseUrl}/en/blog/${post.slug}`,
        fa: `${baseUrl}/fa/blog/${post.slug}`,
      },
    },
  }));
}

// Generate robots.txt content
export function generateRobotsTxtContent() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://menteeno.com";

  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-fa.xml

# Blog specific rules
Allow: /blog/
Allow: /en/blog/
Allow: /fa/blog/

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/`;
}

// Generate meta tags for social sharing
export function generateSocialMetaTags(post: BlogPost) {
  const baseUrl = getBaseUrl();
  const imageUrl = post.seo?.image
    ? `${baseUrl}${post.seo.image}`
    : `${baseUrl}/og-default.jpg`;

  return {
    "og:title": post.seo.title,
    "og:description": post.seo.description,
    "og:image": imageUrl,
    "og:url": `${baseUrl}/${post.locale}/blog/${post.slug}`,
    "og:type": "article",
    "og:site_name": "Menteeno",
    "og:locale": post.locale === "fa" ? "fa_IR" : "en_US",
    "article:author": post.author.name,
    "article:published_time": post.publishedAt,
    "article:modified_time": post.updatedAt || post.publishedAt,
    "article:section": post.category.name,
    "article:tag": post.tags.map((tag) => tag.name).join(", "),
    "twitter:card": "summary_large_image",
    "twitter:title": post.seo.title,
    "twitter:description": post.seo.description,
    "twitter:image": imageUrl,
    "twitter:creator": "@menteeno",
    "twitter:site": "@menteeno",
  };
}

// Generate canonical URL
export function generateCanonicalUrl(post: BlogPost) {
  const baseUrl = getBaseUrl();
  return post.seo.canonicalUrl || `${baseUrl}/${post.locale}/blog/${post.slug}`;
}

// Generate hreflang tags
export function generateHreflangTags(slug: string) {
  const baseUrl = getBaseUrl();

  return [
    {
      rel: "alternate",
      hreflang: "en",
      href: `${baseUrl}/en/blog/${slug}`,
    },
    {
      rel: "alternate",
      hreflang: "fa",
      href: `${baseUrl}/fa/blog/${slug}`,
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: `${baseUrl}/en/blog/${slug}`,
    },
  ];
}

// Generate reading time estimation
export function estimateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Generate excerpt from content
export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, "");

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + "...";
  }

  return truncated + "...";
}

// Validate SEO data
export function validateBlogSEO(post: BlogPost): string[] {
  const errors: string[] = [];

  if (!post.seo.title || post.seo.title.length < 30) {
    errors.push("Title should be at least 30 characters long");
  }

  if (post.seo.title && post.seo.title.length > 60) {
    errors.push("Title should be less than 60 characters long");
  }

  if (!post.seo.description || post.seo.description.length < 120) {
    errors.push("Description should be at least 120 characters long");
  }

  if (post.seo.description && post.seo.description.length > 160) {
    errors.push("Description should be less than 160 characters long");
  }

  if (!post.seo.keywords || post.seo.keywords.length === 0) {
    errors.push("At least one keyword should be provided");
  }

  if (post.seo.keywords && post.seo.keywords.length > 10) {
    errors.push("Too many keywords (max 10 recommended)");
  }

  if (!post.seo.image) {
    errors.push("Featured image is recommended for better social sharing");
  }

  return errors;
}
