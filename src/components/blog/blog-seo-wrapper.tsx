"use client";

import { generateBlogStructuredData, generateBreadcrumbStructuredData, generateSocialMetaTags } from "@/lib/blog-seo";
import type { BlogPost, Locale } from "@/types/blog";
import Head from "next/head";
import { memo } from "react";

interface BlogSEOWrapperProps {
  post: BlogPost;
  locale: Locale;
  children: React.ReactNode;
}

export const BlogSEOWrapper = memo<BlogSEOWrapperProps>(({
  post,
  locale,
  children,
}) => {
  const structuredData = generateBlogStructuredData(post);
  const breadcrumbData = generateBreadcrumbStructuredData(locale, post);
  const socialMeta = generateSocialMetaTags(post);

  return (
    <>
      <Head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />

        {/* Social Meta Tags */}
        {Object.entries(socialMeta).map(([key, value]) => (
          <meta key={key} property={key} content={value} />
        ))}

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Article specific meta */}
        <meta name="article:author" content={post.author.name} />
        <meta name="article:published_time" content={post.publishedAt} />
        {post.updatedAt && (
          <meta name="article:modified_time" content={post.updatedAt} />
        )}
        <meta name="article:section" content={post.category.name} />
        {post.tags.map((tag, index) => (
          <meta key={index} name="article:tag" content={tag.name} />
        ))}

        {/* Reading time */}
        <meta name="reading-time" content={`${post.readingTime} minutes`} />
        <meta name="word-count" content={post.wordCount.toString()} />

        {/* Language and direction */}
        <meta httpEquiv="content-language" content={locale === "fa" ? "fa-IR" : "en-US"} />
        <meta name="language" content={locale === "fa" ? "fa-IR" : "en-US"} />
        
        {/* Theme color */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </Head>
      {children}
    </>
  );
});

BlogSEOWrapper.displayName = "BlogSEOWrapper";
