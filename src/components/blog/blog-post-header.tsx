"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogPost } from "@/types/blog";
import { CalendarIcon, ClockIcon, ShareIcon, UserIcon } from "lucide-react";
import { memo, useState } from "react";

interface BlogPostHeaderProps {
  post: BlogPost;
  onShare?: () => void;
}

export const BlogPostHeader = memo<BlogPostHeaderProps>(({
  post,
  onShare,
}) => {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";
  const [isSharing, setIsSharing] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
    onShare?.();
  };

  return (
    <header className="mb-8">
      {/* Category and Featured Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary" className="text-sm">
          {post.category.name}
        </Badge>
        {post.featured && (
          <Badge variant="default" className="bg-yellow-500 text-sm">
            {t("blog.post.featured")}
          </Badge>
        )}
      </div>

      {/* Title */}
      <h1
        className="text-4xl font-bold mb-4 leading-tight"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {post.title}
      </h1>

      {/* Excerpt */}
      <p
        className="text-xl text-muted-foreground mb-6 leading-relaxed"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {post.excerpt}
      </p>

      {/* Article Meta */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span>{post.author.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>
            {post.readingTime} {t("blog.post.reading_time")}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2"
        >
          <ShareIcon className="h-4 w-4" />
          {isSharing ? t("blog.post.copied") : t("blog.post.share")}
        </Button>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag.id} variant="outline" className="text-sm">
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
    </header>
  );
});

BlogPostHeader.displayName = "BlogPostHeader";
