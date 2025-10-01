"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogCardProps } from "@/types/blog";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const BlogCard = memo<BlogCardProps>(
  ({
    post,
    variant = "default",
    showAuthor = true,
    showTags = true,
    showExcerpt = true,
    className = "",
  }) => {
    const { t, locale } = useTranslation();
    const isRTL = locale === "fa";

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const getCardClasses = () => {
      const baseClasses =
        "group h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200";

      switch (variant) {
        case "featured":
          return `${baseClasses} ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-white`;
        case "compact":
          return baseClasses;
        default:
          return baseClasses;
      }
    };

    return (
      <Card className={`${getCardClasses()} ${className} !pt-0`}>
        {/* Post Image */}
        {post.seo?.image && (
          <div className={`relative w-full h-48 overflow-hidden`}>
            <Image
              src={post.seo.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Category Badge on Image */}
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="text-xs bg-white/90 backdrop-blur-sm"
              >
                {post.category.name}
              </Badge>
            </div>
            {post.featured && (
              <div className="absolute top-3 right-3">
                <Badge variant="default" className="text-xs bg-yellow-500">
                  {t("blog.post.featured")}
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardHeader className="p-4 pb-2">
          {/* Title */}
          <CardTitle className="line-clamp-2 text-lg font-semibold leading-tight mb-2">
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="hover:text-primary transition-colors group-hover:text-primary"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {post.title}
            </Link>
          </CardTitle>

          {/* Excerpt */}
          {showExcerpt && (
            <CardDescription
              className="line-clamp-2 text-sm text-gray-600 leading-relaxed"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>

        {/* Tags */}
        {showTags && post.tags.length > 0 && (
          <CardContent className="px-4 py-2">
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="text-xs px-2 py-1"
                >
                  {tag.name}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
        )}

        {/* Footer */}
        <CardFooter className="px-4 py-3 pt-2 mt-auto">
          <div className="flex items-center justify-between w-full text-xs text-gray-500">
            <div className="flex items-center gap-4">
              {showAuthor && (
                <div className="flex items-center gap-1">
                  <UserIcon className="h-3 w-3" />
                  <span>{post.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              <span>
                {post.readingTime} {t("blog.post.read_time")}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

BlogCard.displayName = "BlogCard";
