"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/use-translation";
import type {
  BlogCategory,
  BlogFilters,
  BlogPost,
  BlogTag,
} from "@/types/blog";
import { CalendarIcon, ClockIcon, SearchIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface BlogListProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  filters: BlogFilters;
  onFiltersChange: (filters: BlogFilters) => void;
  pagination: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function BlogList({
  posts,
  categories,
  tags,
  filters,
  onFiltersChange,
  pagination,
  onPageChange,
  isLoading = false,
}: BlogListProps) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={
                locale === "fa" ? "جستجو در مقالات..." : "Search articles..."
              }
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

          {/* Category Filter */}
          <Select
            value={filters.category || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue
                placeholder={
                  locale === "fa" ? "انتخاب دسته‌بندی" : "Select Category"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {locale === "fa" ? "همه دسته‌ها" : "All Categories"}
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.slug}
              variant={filters.tag === tag.slug ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => handleTagClick(tag.slug)}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-full flex flex-col animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-20 bg-muted rounded"></div>
                </div>
                <div className="h-6 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-5 w-16 bg-muted rounded"></div>
                  <div className="h-5 w-20 bg-muted rounded"></div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-4 w-16 bg-muted rounded"></div>
                  <div className="h-4 w-12 bg-muted rounded"></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {locale === "fa" ? "مقاله‌ای یافت نشد" : "No articles found"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="h-full flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.featured && (
                    <Badge variant="default" className="bg-yellow-500">
                      {locale === "fa" ? "ویژه" : "Featured"}
                    </Badge>
                  )}
                </div>
                <CardTitle className="line-clamp-2">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <UserIcon className="h-4 w-4" />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>
                        {post.readingTime} {locale === "fa" ? "دقیقه" : "min"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={!pagination.hasPrev}
          >
            {locale === "fa" ? "قبلی" : "Previous"}
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={page === pagination.page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              )
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={!pagination.hasNext}
          >
            {locale === "fa" ? "بعدی" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}
