"use client";

import type { BlogFilters, UseBlogFiltersReturn } from "@/types/blog";
import { useCallback, useMemo, useState } from "react";

export function useBlogFilters(
  initialFilters: BlogFilters
): UseBlogFiltersReturn {
  const [filters, setFilters] = useState<BlogFilters>(initialFilters);

  const updateFilters = useCallback((newFilters: BlogFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      locale: filters.locale,
    });
  }, [filters.locale]);

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.search || 
      filters.category || 
      filters.tag || 
      filters.author ||
      filters.featured ||
      filters.status ||
      filters.dateFrom ||
      filters.dateTo ||
      filters.sortBy !== "publishedAt" ||
      filters.sortOrder !== "desc"
    );
  }, [filters]);

  return {
    filters,
    setFilters: updateFilters,
    resetFilters,
    hasActiveFilters,
  };
}
