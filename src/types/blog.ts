export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  readingTime: number; // in minutes
  featured?: boolean;
  locale: "en" | "fa";
  seo: {
    title: string;
    description: string;
    keywords: string[];
    image?: string;
  };
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  locale: "en" | "fa";
  postCount: number;
}

export interface BlogTag {
  slug: string;
  name: string;
  locale: "en" | "fa";
  postCount: number;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  locale: "en" | "fa";
  page?: number;
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BlogListResponse {
  posts: BlogPost[];
  pagination: BlogPagination;
  categories: BlogCategory[];
  tags: BlogTag[];
}
