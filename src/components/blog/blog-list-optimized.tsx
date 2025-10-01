"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogErrorBoundary } from "@/components/blog/blog-error-boundary";
import { BlogFilters } from "@/components/blog/blog-filters";
import { BlogLoadingSkeleton } from "@/components/blog/blog-loading-skeleton";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogListProps } from "@/types/blog";
import { memo } from "react";

export const BlogListOptimized = memo<BlogListProps>(
  ({
    posts,
    categories,
    tags,
    filters,
    pagination,
    onFiltersChange,
    onPageChange,
    isLoading = false,
    error = null,
  }) => {
    const { t, locale } = useTranslation();

    if (error) {
      return (
        <BlogErrorBoundary>
          <div className="text-center py-12">
            <p className="text-destructive text-lg mb-4">
              {t("blog.error.failed_to_load")}
            </p>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </BlogErrorBoundary>
      );
    }

    return (
      <div className="space-y-8">
        {/* Filters */}
        <BlogFilters
          categories={categories}
          tags={tags}
          filters={filters}
          onFiltersChange={onFiltersChange}
          isLoading={isLoading}
        />

        {/* Loading State */}
        {isLoading ? (
          <BlogLoadingSkeleton count={6} />
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              dir={locale === "fa" ? "rtl" : "ltr"}
            >
              {t("blog.empty.no_posts_found")}
            </h3>
            <p
              className="text-muted-foreground"
              dir={locale === "fa" ? "rtl" : "ltr"}
            >
              {t("blog.empty.no_posts_description")}
            </p>
          </div>
        ) : (
          /* Posts Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <BlogErrorBoundary key={post.id}>
                <BlogCard
                  post={post}
                  variant={post.featured ? "featured" : "default"}
                  showAuthor={true}
                  showTags={true}
                  showExcerpt={true}
                />
              </BlogErrorBoundary>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && posts.length > 0 && (
          <BlogPagination
            pagination={pagination}
            onPageChange={onPageChange}
            isLoading={isLoading}
          />
        )}
      </div>
    );
  }
);

BlogListOptimized.displayName = "BlogListOptimized";
