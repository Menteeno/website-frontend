"use client";

import { BlogHero } from "@/components/blog/blog-hero";
import { BlogList } from "@/components/blog/blog-list";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { useBlogFilters } from "@/hooks/use-blog-filters";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogFilters, BlogListResponse } from "@/types/blog";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

interface BlogPageClientProps {
  initialData: BlogListResponse;
  initialFilters: BlogFilters;
  locale: "en" | "fa";
}

export function BlogPageClient({
  initialData,
  initialFilters,
  locale,
}: BlogPageClientProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filters, setFilters, hasActiveFilters } =
    useBlogFilters(initialFilters);

  const updateURL = useCallback(
    (newFilters: BlogFilters) => {
      const params = new URLSearchParams();

      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.tag) params.set("tag", newFilters.tag);
      if (newFilters.author) params.set("author", newFilters.author);
      if (newFilters.featured) params.set("featured", "true");
      if (newFilters.status) params.set("status", newFilters.status);
      if (newFilters.dateFrom) params.set("dateFrom", newFilters.dateFrom);
      if (newFilters.dateTo) params.set("dateTo", newFilters.dateTo);
      if (newFilters.sortBy && newFilters.sortBy !== "publishedAt")
        params.set("sortBy", newFilters.sortBy);
      if (newFilters.sortOrder && newFilters.sortOrder !== "desc")
        params.set("sortOrder", newFilters.sortOrder);
      if (newFilters.page && newFilters.page > 1)
        params.set("page", newFilters.page.toString());

      const queryString = params.toString();
      const url = queryString
        ? `/${locale}/blog?${queryString}`
        : `/${locale}/blog`;
      router.push(url);
    },
    [locale, router]
  );

  const handleFiltersChange = useCallback(
    (newFilters: BlogFilters) => {
      setFilters(newFilters);
      updateURL(newFilters);
    },
    [setFilters, updateURL]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const newFilters = { ...filters, page };
      setFilters(newFilters);
      updateURL(newFilters);
    },
    [filters, setFilters, updateURL]
  );

  // Sync URL params with filters on mount
  useEffect(() => {
    const urlFilters: Partial<BlogFilters> = {};

    if (searchParams.get("search"))
      urlFilters.search = searchParams.get("search")!;
    if (searchParams.get("category"))
      urlFilters.category = searchParams.get("category")!;
    if (searchParams.get("tag")) urlFilters.tag = searchParams.get("tag")!;
    if (searchParams.get("author"))
      urlFilters.author = searchParams.get("author")!;
    if (searchParams.get("featured")) urlFilters.featured = true;
    if (searchParams.get("status"))
      urlFilters.status = searchParams.get("status") as any;
    if (searchParams.get("dateFrom"))
      urlFilters.dateFrom = searchParams.get("dateFrom")!;
    if (searchParams.get("dateTo"))
      urlFilters.dateTo = searchParams.get("dateTo")!;
    if (searchParams.get("sortBy"))
      urlFilters.sortBy = searchParams.get("sortBy") as any;
    if (searchParams.get("sortOrder"))
      urlFilters.sortOrder = searchParams.get("sortOrder") as any;
    if (searchParams.get("page"))
      urlFilters.page = parseInt(searchParams.get("page")!);

    if (Object.keys(urlFilters).length > 0) {
      setFilters({ ...initialFilters, ...urlFilters });
    }
  }, [searchParams, initialFilters, setFilters]);

  const featuredPosts = useMemo(
    () => initialData.posts.filter((post) => post.featured).slice(0, 3),
    [initialData.posts]
  );

  const recentPosts = useMemo(
    () => initialData.posts.slice(0, 5),
    [initialData.posts]
  );

  // Client-side filtering of posts
  const filteredPosts = useMemo(() => {
    let posts = [...initialData.posts];

    // Apply filters
    if (filters.category) {
      posts = posts.filter(
        (post) =>
          post.category.slug.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.tag) {
      posts = posts.filter((post) =>
        post.tags.some(
          (tag) => tag.slug.toLowerCase() === filters.tag!.toLowerCase()
        )
      );
    }

    if (filters.author) {
      posts = posts.filter((post) => post.author.id === filters.author);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.featured !== undefined) {
      posts = posts.filter((post) => post.featured === filters.featured);
    }

    if (filters.status) {
      posts = posts.filter((post) => post.status === filters.status);
    }

    if (filters.dateFrom) {
      posts = posts.filter(
        (post) => new Date(post.publishedAt) >= new Date(filters.dateFrom!)
      );
    }

    if (filters.dateTo) {
      posts = posts.filter(
        (post) => new Date(post.publishedAt) <= new Date(filters.dateTo!)
      );
    }

    // Apply sorting
    const sortBy = filters.sortBy || "publishedAt";
    const sortOrder = filters.sortOrder || "desc";

    posts.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "publishedAt":
          comparison =
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime();
          break;
        case "updatedAt":
          comparison =
            new Date(a.updatedAt || a.publishedAt).getTime() -
            new Date(b.updatedAt || b.publishedAt).getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "readingTime":
          comparison = a.readingTime - b.readingTime;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return posts;
  }, [initialData.posts, filters]);

  // Client-side pagination
  const paginatedPosts = useMemo(() => {
    const page = filters.page || 1;
    const limit = 9;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, filters.page]);

  const clientPagination = useMemo(() => {
    const page = filters.page || 1;
    const limit = 9;
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      ...(page < totalPages && { nextPage: page + 1 }),
      ...(page > 1 && { prevPage: page - 1 }),
    };
  }, [filteredPosts, filters.page]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog List */}
          <div className="lg:col-span-3">
            <BlogList
              posts={paginatedPosts}
              categories={initialData.categories}
              tags={initialData.tags}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              pagination={clientPagination}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              featuredPosts={featuredPosts}
              recentPosts={recentPosts}
              categories={initialData.categories}
              tags={initialData.tags}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
