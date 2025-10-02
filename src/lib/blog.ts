import type {
  BlogAuthor,
  BlogCategory,
  BlogDetailResponse,
  BlogFilters,
  BlogListResponse,
  BlogPagination,
  BlogPost,
  BlogStatus,
  BlogTag,
  Locale,
} from "@/types/blog";
import { BLOG_CONSTANTS } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

// Constants
const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");
const CACHE_DURATION = BLOG_CONSTANTS.CACHE_DURATION;

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Simple in-memory cache
const cache = new Map<string, CacheEntry<any>>();

// Error handling utilities
export class BlogServiceError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "BlogServiceError";
  }
}

// Cache utilities
function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;

  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

// File system utilities
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    throw new BlogServiceError(
      "DIRECTORY_NOT_FOUND",
      `Directory not found: ${dirPath}`,
      { dirPath }
    );
  }
}

function readFileSafely(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    throw new BlogServiceError(
      "FILE_READ_ERROR",
      `Failed to read file: ${filePath}`,
      { filePath, originalError: error }
    );
  }
}

// Markdown processing utilities
async function processMarkdownContent(content: string): Promise<string> {
  try {
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    return processedContent.toString();
  } catch (error) {
    throw new BlogServiceError(
      "MARKDOWN_PROCESSING_ERROR",
      "Failed to process markdown content",
      { originalError: error }
    );
  }
}

function calculateReadingTime(content: string): number {
  try {
    const result = readingTime(content);
    return Math.max(1, Math.ceil(result.minutes));
  } catch (error) {
    console.warn("Failed to calculate reading time:", error);
    return 1;
  }
}

function calculateWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

// Data transformation utilities
function transformFrontMatterToBlogPost(
  slug: string,
  data: any,
  content: string,
  locale: Locale
): BlogPost {
  const readingTime = calculateReadingTime(content);
  const wordCount = calculateWordCount(content);

  return {
    id: `${locale}-${slug}`,
    slug,
    title: data.title || "Untitled",
    excerpt:
      data.excerpt || content.slice(0, BLOG_CONSTANTS.EXCERPT_LENGTH) + "...",
    content,
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt,
    createdAt: data.createdAt || data.publishedAt || new Date().toISOString(),
    status: (data.status as BlogStatus) || "published",
    category: {
      id: `${locale}-${data.category || "uncategorized"}`,
      slug: data.category || "uncategorized",
      name: data.category || "Uncategorized",
      description: "",
      locale,
      postCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    tags: (data.tags || []).map((tag: string) => ({
      id: `${locale}-${tag}`,
      slug: tag,
      name: tag,
      locale,
      postCount: 0,
      createdAt: new Date().toISOString(),
    })),
    author: {
      id: `${locale}-${data.author?.name || "unknown"}`,
      name: data.author?.name || "Menteeno Team",
      email: data.author?.email,
      avatar: data.author?.avatar,
      bio: data.author?.bio,
      social: data.author?.social,
      locale,
    },
    readingTime,
    wordCount,
    featured: Boolean(data.featured),
    locale,
    seo: {
      title: data.seo?.title || data.title || "Untitled",
      description: data.seo?.description || data.excerpt || "",
      keywords: data.seo?.keywords || data.tags || [],
      image: data.seo?.image,
      imageAlt: data.seo?.imageAlt || data.title,
      canonicalUrl: data.seo?.canonicalUrl,
      noIndex: Boolean(data.seo?.noIndex),
      noFollow: Boolean(data.seo?.noFollow),
    },
    relatedPosts: data.relatedPosts || [],
    viewCount: data.viewCount || 0,
    likeCount: data.likeCount || 0,
    commentCount: data.commentCount || 0,
  };
}

// Main API functions
export async function getAllBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const cacheKey = `all-posts-${locale}`;
  const cached = getCached<BlogPost[]>(cacheKey);
  if (cached) return cached;

  try {
    const localeDir = path.join(POSTS_DIRECTORY, locale);
    ensureDirectoryExists(localeDir);

    const fileNames = fs.readdirSync(localeDir);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    if (markdownFiles.length === 0) {
      setCache(cacheKey, []);
      return [];
    }

    const posts = await Promise.all(
      markdownFiles.map(async (fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, "");
          return await getBlogPostBySlug(slug, locale);
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          return null;
        }
      })
    );

    const validPosts = posts.filter((post): post is BlogPost => post !== null);

    // Sort by published date (newest first)
    validPosts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    setCache(cacheKey, validPosts);
    return validPosts;
  } catch (error) {
    if (error instanceof BlogServiceError) throw error;
    throw new BlogServiceError(
      "POSTS_FETCH_ERROR",
      "Failed to fetch blog posts",
      { locale, originalError: error }
    );
  }
}

export async function getBlogPostBySlug(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  const cacheKey = `post-${locale}-${slug}`;
  const cached = getCached<BlogPost>(cacheKey);
  if (cached) return cached;

  try {
    const filePath = path.join(POSTS_DIRECTORY, locale, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = readFileSafely(filePath);
    const { data, content } = matter(fileContents);

    const processedContent = await processMarkdownContent(content);
    const post = transformFrontMatterToBlogPost(
      slug,
      data,
      processedContent,
      locale
    );

    setCache(cacheKey, post);
    return post;
  } catch (error) {
    if (error instanceof BlogServiceError) throw error;
    throw new BlogServiceError(
      "POST_FETCH_ERROR",
      `Failed to fetch blog post: ${slug}`,
      { slug, locale, originalError: error }
    );
  }
}

export async function getBlogPosts(
  filters: BlogFilters,
  page: number = 1,
  limit: number = BLOG_CONSTANTS.DEFAULT_PAGE_SIZE
): Promise<BlogListResponse> {
  try {
    const allPosts = await getAllBlogPosts(filters.locale);

    let filteredPosts = [...allPosts];

    // Apply filters
    if (filters.category) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.category.slug.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.tag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags.some(
          (tag) => tag.slug.toLowerCase() === filters.tag!.toLowerCase()
        )
      );
    }

    if (filters.author) {
      filteredPosts = filteredPosts.filter(
        (post) => post.author.id === filters.author
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.featured !== undefined) {
      filteredPosts = filteredPosts.filter(
        (post) => post.featured === filters.featured
      );
    }

    if (filters.status) {
      filteredPosts = filteredPosts.filter(
        (post) => post.status === filters.status
      );
    }

    if (filters.dateFrom) {
      filteredPosts = filteredPosts.filter(
        (post) => new Date(post.publishedAt) >= new Date(filters.dateFrom!)
      );
    }

    if (filters.dateTo) {
      filteredPosts = filteredPosts.filter(
        (post) => new Date(post.publishedAt) <= new Date(filters.dateTo!)
      );
    }

    // Apply sorting
    const sortBy = filters.sortBy || BLOG_CONSTANTS.DEFAULT_SORT_BY;
    const sortOrder = filters.sortOrder || BLOG_CONSTANTS.DEFAULT_SORT_ORDER;

    filteredPosts.sort((a, b) => {
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

    // Apply pagination
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const posts = filteredPosts.slice(startIndex, endIndex);

    // Get related data
    const categories = getBlogCategories(filters.locale);
    const tags = getBlogTags(filters.locale);
    const authors = getBlogAuthors(filters.locale);

    const pagination: BlogPagination = {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      ...(page < totalPages && { nextPage: page + 1 }),
      ...(page > 1 && { prevPage: page - 1 }),
    };

    return {
      posts,
      pagination,
      categories,
      tags,
      authors,
      filters,
    };
  } catch (error) {
    if (error instanceof BlogServiceError) throw error;
    throw new BlogServiceError(
      "POSTS_FILTER_ERROR",
      "Failed to filter blog posts",
      { filters, originalError: error }
    );
  }
}

export async function getBlogDetail(
  slug: string,
  locale: Locale
): Promise<BlogDetailResponse | null> {
  try {
    const post = await getBlogPostBySlug(slug, locale);
    if (!post) return null;

    const allPosts = await getAllBlogPosts(locale);

    // Get related posts
    const relatedPosts = allPosts
      .filter(
        (p) =>
          p.id !== post.id &&
          (p.category.slug === post.category.slug ||
            p.tags.some((tag) => post.tags.some((pt) => pt.slug === tag.slug)))
      )
      .slice(0, BLOG_CONSTANTS.MAX_RELATED_POSTS);

    // Get previous and next posts
    const currentIndex = allPosts.findIndex((p) => p.id === post.id);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;
    const nextPost =
      currentIndex < allPosts.length - 1
        ? allPosts[currentIndex + 1]
        : undefined;

    return {
      post,
      relatedPosts,
      ...(prevPost && { prevPost }),
      ...(nextPost && { nextPost }),
    };
  } catch (error) {
    if (error instanceof BlogServiceError) throw error;
    throw new BlogServiceError(
      "POST_DETAIL_ERROR",
      `Failed to fetch blog post detail: ${slug}`,
      { slug, locale, originalError: error }
    );
  }
}

// Static data functions
export function getBlogCategories(locale: Locale): BlogCategory[] {
  const cacheKey = `categories-${locale}`;
  const cached = getCached<BlogCategory[]>(cacheKey);
  if (cached) return cached;

  const categoryData = {
    en: [
      {
        id: "en-soft-skills",
        slug: "soft-skills",
        name: "Soft Skills",
        description:
          "Articles about developing soft skills and professional growth",
        color: "#3b82f6",
        icon: "users",
      },
      {
        id: "en-programming",
        slug: "programming",
        name: "Programming",
        description: "Technical articles and programming tips",
        color: "#10b981",
        icon: "code",
      },
      {
        id: "en-career",
        slug: "career",
        name: "Career",
        description: "Career advice and professional development",
        color: "#f59e0b",
        icon: "briefcase",
      },
      {
        id: "en-teamwork",
        slug: "teamwork",
        name: "Teamwork",
        description: "Collaboration and team dynamics",
        color: "#8b5cf6",
        icon: "users-2",
      },
      {
        id: "en-leadership",
        slug: "leadership",
        name: "Leadership",
        description: "Leadership skills and management",
        color: "#ef4444",
        icon: "crown",
      },
    ],
    fa: [
      {
        id: "fa-soft-skills",
        slug: "soft-skills",
        name: "مهارت‌های نرم",
        description: "مقالاتی درباره توسعه مهارت‌های نرم و رشد حرفه‌ای",
        color: "#3b82f6",
        icon: "users",
      },
      {
        id: "fa-programming",
        slug: "programming",
        name: "برنامه‌نویسی",
        description: "مقالات فنی و نکات برنامه‌نویسی",
        color: "#10b981",
        icon: "code",
      },
      {
        id: "fa-career",
        slug: "career",
        name: "شغل",
        description: "مشاوره شغلی و توسعه حرفه‌ای",
        color: "#f59e0b",
        icon: "briefcase",
      },
      {
        id: "fa-teamwork",
        slug: "teamwork",
        name: "کار تیمی",
        description: "همکاری و دینامیک تیم",
        color: "#8b5cf6",
        icon: "users-2",
      },
      {
        id: "fa-leadership",
        slug: "leadership",
        name: "رهبری",
        description: "مهارت‌های رهبری و مدیریت",
        color: "#ef4444",
        icon: "crown",
      },
    ],
  };

  const categories = categoryData[locale].map((cat) => ({
    ...cat,
    locale,
    postCount: 0, // This would be calculated from actual posts
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  setCache(cacheKey, categories);
  return categories;
}

export function getBlogTags(locale: Locale): BlogTag[] {
  const cacheKey = `tags-${locale}`;
  const cached = getCached<BlogTag[]>(cacheKey);
  if (cached) return cached;

  const tagData = {
    en: [
      { slug: "communication", name: "Communication", color: "#3b82f6" },
      { slug: "leadership", name: "Leadership", color: "#8b5cf6" },
      { slug: "teamwork", name: "Teamwork", color: "#10b981" },
      { slug: "problem-solving", name: "Problem Solving", color: "#f59e0b" },
      { slug: "mentorship", name: "Mentorship", color: "#ef4444" },
      { slug: "career-growth", name: "Career Growth", color: "#06b6d4" },
      { slug: "javascript", name: "JavaScript", color: "#f7df1e" },
      { slug: "react", name: "React", color: "#61dafb" },
      { slug: "typescript", name: "TypeScript", color: "#3178c6" },
      { slug: "frontend", name: "Frontend", color: "#ff6b6b" },
    ],
    fa: [
      { slug: "communication", name: "ارتباطات", color: "#3b82f6" },
      { slug: "leadership", name: "رهبری", color: "#8b5cf6" },
      { slug: "teamwork", name: "کار تیمی", color: "#10b981" },
      { slug: "problem-solving", name: "حل مسئله", color: "#f59e0b" },
      { slug: "mentorship", name: "منتورشیپ", color: "#ef4444" },
      { slug: "career-growth", name: "رشد شغلی", color: "#06b6d4" },
      { slug: "javascript", name: "جاوااسکریپت", color: "#f7df1e" },
      { slug: "react", name: "ریکت", color: "#61dafb" },
      { slug: "typescript", name: "تایپ‌اسکریپت", color: "#3178c6" },
      { slug: "frontend", name: "فرانت‌اند", color: "#ff6b6b" },
    ],
  };

  const tags = tagData[locale].map((tag) => ({
    id: `${locale}-${tag.slug}`,
    ...tag,
    locale,
    postCount: 0, // This would be calculated from actual posts
    createdAt: new Date().toISOString(),
  }));

  setCache(cacheKey, tags);
  return tags;
}

export function getBlogAuthors(locale: Locale): BlogAuthor[] {
  const cacheKey = `authors-${locale}`;
  const cached = getCached<BlogAuthor[]>(cacheKey);
  if (cached) return cached;

  const authors: BlogAuthor[] = [
    {
      id: `${locale}-saleh-shojaei`,
      name: locale === "fa" ? "صالح شجاعی" : "Saleh Shojaei",
      email: "saleh@menteeno.com",
      bio:
        locale === "fa"
          ? "بنیان‌گذار منتینو و توسعه‌دهنده فرانت‌اند"
          : "Founder of Menteeno and Frontend Developer",
      locale,
    },
    {
      id: `${locale}-menteeno-team`,
      name: locale === "fa" ? "تیم منتینو" : "Menteeno Team",
      bio: locale === "fa" ? "تیم متخصص در منتینو" : "Expert team at Menteeno",
      locale,
    },
  ];

  setCache(cacheKey, authors);
  return authors;
}

// Utility functions
export function getFeaturedPosts(
  locale: Locale,
  limit: number = BLOG_CONSTANTS.MAX_RELATED_POSTS
): Promise<BlogPost[]> {
  return getAllBlogPosts(locale).then((posts) =>
    posts.filter((post) => post.featured).slice(0, limit)
  );
}

export function getRecentPosts(
  locale: Locale,
  limit: number = 5
): Promise<BlogPost[]> {
  return getAllBlogPosts(locale).then((posts) => posts.slice(0, limit));
}

export function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = BLOG_CONSTANTS.MAX_RELATED_POSTS
): Promise<BlogPost[]> {
  return getAllBlogPosts(currentPost.locale).then((posts) =>
    posts
      .filter(
        (post) =>
          post.id !== currentPost.id &&
          (post.category.slug === currentPost.category.slug ||
            post.tags.some((tag) =>
              currentPost.tags.some((pt) => pt.slug === tag.slug)
            ))
      )
      .slice(0, limit)
  );
}

// Cache management
export function clearBlogCache(): void {
  cache.clear();
}

export function clearBlogCacheForLocale(locale: Locale): void {
  const keysToDelete = Array.from(cache.keys()).filter(
    (key) => key.includes(`-${locale}-`) || key.endsWith(`-${locale}`)
  );
  keysToDelete.forEach((key) => cache.delete(key));
}

// Error handling
export function handleBlogError(error: unknown): BlogServiceError {
  if (error instanceof BlogServiceError) {
    return error;
  }

  if (error instanceof Error) {
    return new BlogServiceError("UNKNOWN_ERROR", error.message, {
      originalError: error,
    });
  }

  return new BlogServiceError("UNKNOWN_ERROR", "An unknown error occurred", {
    originalError: error,
  });
}
