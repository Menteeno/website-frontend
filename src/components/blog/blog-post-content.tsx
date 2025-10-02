"use client";

import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";
import { getAssetUrl } from "@/lib/config";
import type { BlogPost } from "@/types/blog";
import Image from "next/image";
import { memo } from "react";

interface BlogPostContentProps {
  post: BlogPost;
}

export const BlogPostContent = memo<BlogPostContentProps>(({ post }) => {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Image */}
      {post.seo?.image && (
        <div className="w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={getAssetUrl(post.seo.image)}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </div>
      )}

      <Separator className="mb-8" />

      {/* Article Content */}
      <div
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:rounded-r-md"
        dangerouslySetInnerHTML={{ __html: post.content }}
        dir={isRTL ? "rtl" : "ltr"}
      />
    </article>
  );
});

BlogPostContent.displayName = "BlogPostContent";
