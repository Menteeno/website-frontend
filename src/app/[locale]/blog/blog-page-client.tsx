"use client";

import { BlogHero } from "@/components/blog/blog-hero";
import { BlogList } from "@/components/blog/blog-list";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
// Remove the server-side import
import type { BlogFilters, BlogListResponse } from "@/types/blog";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface BlogPageClientProps {
  initialData: {
    posts: BlogListResponse["posts"];
    categories: BlogListResponse["categories"];
    tags: BlogListResponse["tags"];
    pagination: BlogListResponse["pagination"];
    featuredPosts: BlogListResponse["posts"];
    recentPosts: BlogListResponse["posts"];
  };
  initialFilters: BlogFilters;
  locale: "en" | "fa";
}

export function BlogPageClient({
  initialData,
  initialFilters,
  locale,
}: BlogPageClientProps) {
  const router = useRouter();

  const [filters, setFilters] = useState(initialFilters);

  // Update filters and navigate to new URL
  const updateFilters = useCallback(
    (newFilters: BlogFilters) => {
      setFilters(newFilters);

      // Update URL
      const params = new URLSearchParams();
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.tag) params.set("tag", newFilters.tag);
      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.page && newFilters.page > 1)
        params.set("page", newFilters.page.toString());

      const queryString = params.toString();
      const newUrl = queryString
        ? `/${locale}/blog?${queryString}`
        : `/${locale}/blog`;
      router.push(newUrl);
    },
    [locale, router]
  );

  // Handle page changes
  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters({ ...filters, page });
    },
    [filters, updateFilters]
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <BlogHero />

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogList
              posts={initialData.posts}
              categories={initialData.categories}
              tags={initialData.tags}
              filters={filters}
              onFiltersChange={updateFilters}
              pagination={{
                page: initialData.pagination.page,
                totalPages: initialData.pagination.totalPages,
                hasNext: initialData.pagination.hasNext,
                hasPrev: initialData.pagination.hasPrev,
              }}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              featuredPosts={initialData.featuredPosts}
              recentPosts={initialData.recentPosts}
              categories={initialData.categories}
              tags={initialData.tags}
              {...(filters.category && { selectedCategory: filters.category })}
              {...(filters.tag && { selectedTag: filters.tag })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
