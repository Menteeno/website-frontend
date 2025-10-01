"use client";

import type { BlogPagination, UseBlogPaginationReturn } from "@/types/blog";
import { useCallback, useMemo } from "react";

export function useBlogPagination(
  pagination: BlogPagination,
  onPageChange: (page: number) => void
): UseBlogPaginationReturn {
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      onPageChange(page);
    }
  }, [pagination.totalPages, onPageChange]);

  const goToNext = useCallback(() => {
    if (pagination.hasNext) {
      onPageChange(pagination.page + 1);
    }
  }, [pagination.hasNext, pagination.page, onPageChange]);

  const goToPrev = useCallback(() => {
    if (pagination.hasPrev) {
      onPageChange(pagination.page - 1);
    }
  }, [pagination.hasPrev, pagination.page, onPageChange]);

  const canGoNext = useMemo(() => pagination.hasNext, [pagination.hasNext]);
  const canGoPrev = useMemo(() => pagination.hasPrev, [pagination.hasPrev]);

  return {
    pagination,
    goToPage,
    goToNext,
    goToPrev,
    canGoNext,
    canGoPrev,
  };
}
