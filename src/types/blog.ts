// Base types
export type Locale = "en" | "fa";
export type BlogStatus = "draft" | "published" | "archived";
export type BlogSortBy = "publishedAt" | "updatedAt" | "title" | "readingTime";
export type BlogSortOrder = "asc" | "desc";

// Author interface
export interface BlogAuthor {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    blog?: string;
  };
  locale: Locale;
}

// SEO interface
export interface BlogSEO {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  imageAlt?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// Category interface
export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  color?: string;
  icon?: string;
  locale: Locale;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

// Tag interface
export interface BlogTag {
  id: string;
  slug: string;
  name: string;
  color?: string;
  locale: Locale;
  postCount: number;
  createdAt: string;
}

// Main blog post interface
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  createdAt: string;
  status: BlogStatus;
  category: BlogCategory;
  tags: BlogTag[];
  author: BlogAuthor;
  readingTime: number; // in minutes
  wordCount: number;
  featured: boolean;
  locale: Locale;
  seo: BlogSEO;
  relatedPosts?: string[]; // Array of post IDs
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
}

// Filters interface
export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  featured?: boolean;
  status?: BlogStatus;
  dateFrom?: string;
  dateTo?: string;
  locale: Locale;
  page?: number;
  limit?: number;
  sortBy?: BlogSortBy;
  sortOrder?: BlogSortOrder;
}

// Pagination interface
export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
}

// API Response interfaces
export interface BlogListResponse {
  posts: BlogPost[];
  pagination: BlogPagination;
  categories: BlogCategory[];
  tags: BlogTag[];
  authors: BlogAuthor[];
  filters: BlogFilters;
}

export interface BlogDetailResponse {
  post: BlogPost;
  relatedPosts: BlogPost[];
  prevPost?: BlogPost;
  nextPost?: BlogPost;
}

// Component Props interfaces
export interface BlogListProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  filters: BlogFilters;
  pagination: BlogPagination;
  onFiltersChange: (filters: BlogFilters) => void;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  error?: string | null;
}

export interface BlogDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  prevPost?: BlogPost;
  nextPost?: BlogPost;
  isLoading?: boolean;
  error?: string | null;
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  showAuthor?: boolean;
  showTags?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

export interface BlogFiltersProps {
  categories: BlogCategory[];
  tags: BlogTag[];
  filters: BlogFilters;
  onFiltersChange: (filters: BlogFilters) => void;
  isLoading?: boolean;
}

export interface BlogPaginationProps {
  pagination: BlogPagination;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

// Error interfaces
export interface BlogError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Hook return types
export interface UseBlogFiltersReturn {
  filters: BlogFilters;
  setFilters: (filters: BlogFilters) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export interface UseBlogPaginationReturn {
  pagination: BlogPagination;
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

// Utility types
export type BlogPostPreview = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "publishedAt"
  | "category"
  | "tags"
  | "author"
  | "readingTime"
  | "featured"
  | "locale"
  | "seo"
>;

export type BlogPostSummary = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "publishedAt"
  | "category"
  | "author"
  | "readingTime"
  | "featured"
  | "locale"
  | "seo"
>;

// Constants
export const BLOG_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  MIN_PAGE_SIZE: 1,
  DEFAULT_SORT_BY: "publishedAt" as BlogSortBy,
  DEFAULT_SORT_ORDER: "desc" as BlogSortOrder,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_RELATED_POSTS: 3,
  MAX_TAGS_DISPLAY: 5,
  EXCERPT_LENGTH: 160,
} as const;

// Type guards
export const isBlogPost = (obj: unknown): obj is BlogPost => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "slug" in obj &&
    "title" in obj &&
    "content" in obj
  );
};

export const isBlogCategory = (obj: unknown): obj is BlogCategory => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "slug" in obj &&
    "name" in obj
  );
};

export const isBlogTag = (obj: unknown): obj is BlogTag => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "slug" in obj &&
    "name" in obj
  );
};
