"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogCategory, BlogPost, BlogTag } from "@/types/blog";
import { CalendarIcon, ClockIcon, TagIcon, TrendingUpIcon } from "lucide-react";
import Link from "next/link";

interface BlogSidebarProps {
  featuredPosts: BlogPost[];
  recentPosts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  selectedCategory?: string;
  selectedTag?: string;
}

export function BlogSidebar({
  featuredPosts,
  recentPosts,
  categories,
  tags,
  selectedCategory,
  selectedTag,
}: BlogSidebarProps) {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5" />
              {t("blog.sections.featured_posts")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                    <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                      <ClockIcon className="h-3 w-3 ml-2" />
                      <span>
                        {post.readingTime} {locale === "fa" ? "دقیقه" : "min"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("blog.sections.recent_posts")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                    <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                      <ClockIcon className="h-3 w-3 ml-2" />
                      <span>
                        {post.readingTime} {locale === "fa" ? "دقیقه" : "min"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>{t("blog.sections.categories")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link
              href={`/${locale}/blog`}
              className={`block p-2 rounded-lg transition-colors hover:bg-muted ${
                !selectedCategory ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {t("blog.sections.all")}
                </span>
                <Badge variant="outline" className="text-xs">
                  {categories.reduce((sum, cat) => sum + cat.postCount, 0)}
                </Badge>
              </div>
            </Link>

            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${locale}/blog?category=${category.slug}`}
                className={`block p-2 rounded-lg transition-colors hover:bg-muted ${
                  selectedCategory === category.slug ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {category.name}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {category.postCount}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5" />
            {t("blog.sections.tags")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/${locale}/blog?tag=${tag.slug}`}
                className="inline-block"
              >
                <Badge
                  variant={selectedTag === tag.slug ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                >
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
