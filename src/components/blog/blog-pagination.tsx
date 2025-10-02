"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogPaginationProps } from "@/types/blog";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { memo } from "react";

export const BlogPagination = memo<BlogPaginationProps>(({
  pagination,
  onPageChange,
  isLoading = false,
}) => {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  if (pagination.totalPages <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const current = pagination.page;
    const total = pagination.totalPages;
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (current + delta < total - 1) {
      rangeWithDots.push("...", total);
    } else {
      rangeWithDots.push(total);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      {/* Results Info */}
      <div className="text-sm text-muted-foreground">
        {t("blog.pagination.showing")} {((pagination.page - 1) * pagination.limit) + 1} {t("blog.pagination.to")}{" "}
        {Math.min(pagination.page * pagination.limit, pagination.total)} {t("blog.pagination.of_total")}{" "}
        {pagination.total} {t("blog.pagination.results")}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!pagination.hasPrev || isLoading}
          className="gap-2"
        >
          {isRTL ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
          {t("blog.pagination.previous")}
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={page === pagination.page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  disabled={isLoading}
                  className="w-10"
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!pagination.hasNext || isLoading}
          className="gap-2"
        >
          {t("blog.pagination.next")}
          {isRTL ? (
            <ChevronLeftIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
});

BlogPagination.displayName = "BlogPagination";
