"use client";

import { BlogAuthorCard } from "@/components/blog/blog-author-card";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogErrorBoundary } from "@/components/blog/blog-error-boundary";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { BlogPostHeader } from "@/components/blog/blog-post-header";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogDetailProps } from "@/types/blog";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

export const BlogDetailOptimized = memo<BlogDetailProps>(({
  post,
  relatedPosts,
  prevPost,
  nextPost,
  isLoading = false,
  error = null,
}) => {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  if (error) {
    return (
      <BlogErrorBoundary>
        <div className="text-center py-12">
          <p className="text-destructive text-lg mb-4">
            {t("blog.error.failed_to_load_post")}
          </p>
          <p className="text-muted-foreground">
            {error}
          </p>
        </div>
      </BlogErrorBoundary>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-full"></div>
            <div className="h-6 bg-muted rounded w-2/3"></div>
            <div className="h-64 bg-muted rounded w-full"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link href={`/${locale}/blog`}>
            {isRTL ? (
              <ArrowRightIcon className="h-4 w-4" />
            ) : (
              <ArrowLeftIcon className="h-4 w-4" />
            )}
            {t("blog.navigation.back_to_blog")}
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <BlogPostHeader post={post} />

        {/* Article Content */}
        <BlogPostContent post={post} />

        {/* Author Bio */}
        <BlogAuthorCard author={post.author} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6" dir={isRTL ? "rtl" : "ltr"}>
              {t("blog.sections.related_posts")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogErrorBoundary key={relatedPost.id}>
                  <BlogCard
                    post={relatedPost}
                    variant="default"
                    showAuthor={false}
                    showTags={false}
                    showExcerpt={true}
                  />
                </BlogErrorBoundary>
              ))}
            </div>
          </section>
        )}

        {/* Navigation to Previous/Next Posts */}
        {(prevPost || nextPost) && (
          <section className="mt-12 pt-8 border-t">
            <div className="flex justify-between items-center gap-4">
              {prevPost ? (
                <Button variant="outline" asChild className="gap-2">
                  <Link href={`/${locale}/blog/${prevPost.slug}`}>
                    {isRTL ? (
                      <ArrowRightIcon className="h-4 w-4" />
                    ) : (
                      <ArrowLeftIcon className="h-4 w-4" />
                    )}
                    <span className="line-clamp-1" dir={isRTL ? "rtl" : "ltr"}>
                      {prevPost.title}
                    </span>
                  </Link>
                </Button>
              ) : (
                <div />
              )}

              {nextPost && (
                <Button variant="outline" asChild className="gap-2">
                  <Link href={`/${locale}/blog/${nextPost.slug}`}>
                    <span className="line-clamp-1" dir={isRTL ? "rtl" : "ltr"}>
                      {nextPost.title}
                    </span>
                    {isRTL ? (
                      <ArrowLeftIcon className="h-4 w-4" />
                    ) : (
                      <ArrowRightIcon className="h-4 w-4" />
                    )}
                  </Link>
                </Button>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

BlogDetailOptimized.displayName = "BlogDetailOptimized";
