"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogFiltersProps } from "@/types/blog";
import { SearchIcon, XIcon } from "lucide-react";
import { memo, useState } from "react";

export const BlogFilters = memo<BlogFiltersProps>(({
  categories,
  tags,
  filters,
  onFiltersChange,
  isLoading = false,
}) => {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const newFilters = { ...filters, page: 1 };
    if (value.trim() === "") {
      delete newFilters.search;
    } else {
      newFilters.search = value;
    }
    onFiltersChange(newFilters);
  };

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, page: 1 };
    if (category === "all") {
      delete newFilters.category;
    } else {
      newFilters.category = category;
    }
    onFiltersChange(newFilters);
  };

  const handleTagClick = (tag: string) => {
    const newFilters = { ...filters, page: 1 };
    if (tag === filters.tag) {
      delete newFilters.tag;
    } else {
      newFilters.tag = tag;
    }
    onFiltersChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const [field, order] = sortBy.split("-");
    const newFilters = { ...filters, page: 1 };
    newFilters.sortBy = field as any;
    newFilters.sortOrder = order as any;
    onFiltersChange(newFilters);
  };

  const handleFeaturedToggle = () => {
    const newFilters = { ...filters, page: 1 };
    if (filters.featured) {
      delete newFilters.featured;
    } else {
      newFilters.featured = true;
    }
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters: typeof filters = {
      locale: filters.locale,
    };
    setSearchTerm("");
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Boolean(
    filters.search || 
    filters.category || 
    filters.tag || 
    filters.featured ||
    filters.sortBy !== "publishedAt" ||
    filters.sortOrder !== "desc"
  );

  return (
    <div className="space-y-4">
      {/* Search and Category Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t("blog.filters.search_placeholder")}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
            dir={isRTL ? "rtl" : "ltr"}
            disabled={isLoading}
          />
        </div>

        {/* Category Filter */}
        <Select
          value={filters.category || "all"}
          onValueChange={handleCategoryChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t("blog.filters.select_category")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t("blog.filters.all_categories")}
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select
          value={`${filters.sortBy || "publishedAt"}-${filters.sortOrder || "desc"}`}
          onValueChange={handleSortChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t("blog.filters.sort_by")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="publishedAt-desc">
              {t("blog.filters.sort_options.newest")}
            </SelectItem>
            <SelectItem value="publishedAt-asc">
              {t("blog.filters.sort_options.oldest")}
            </SelectItem>
            <SelectItem value="title-asc">
              {t("blog.filters.sort_options.title_asc")}
            </SelectItem>
            <SelectItem value="title-desc">
              {t("blog.filters.sort_options.title_desc")}
            </SelectItem>
            <SelectItem value="readingTime-asc">
              {t("blog.filters.sort_options.reading_time")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tags and Featured Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 flex-1">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={filters.tag === tag.slug ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => !isLoading && handleTagClick(tag.slug)}
            >
              {tag.name}
            </Badge>
          ))}
        </div>

        {/* Featured Toggle */}
        <Button
          variant={filters.featured ? "default" : "outline"}
          size="sm"
          onClick={handleFeaturedToggle}
          disabled={isLoading}
          className="shrink-0"
        >
          {t("blog.filters.show_featured_only")}
        </Button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={isLoading}
            className="gap-2"
          >
            <XIcon className="h-4 w-4" />
            {t("blog.filters.clear_filters")}
          </Button>
        </div>
      )}
    </div>
  );
});

BlogFilters.displayName = "BlogFilters";
