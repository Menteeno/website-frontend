import type {
  BlogCategory,
  BlogFilters,
  BlogListResponse,
  BlogPost,
  BlogTag,
} from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "blog");

// Get all blog posts
export async function getAllBlogPosts(
  locale: "en" | "fa"
): Promise<BlogPost[]> {
  const localeDir = path.join(postsDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  const allPostsData = await Promise.all(
    fileNames
      .filter((name) => name.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        return await getBlogPostBySlug(slug, locale);
      })
  );

  const validPosts = allPostsData.filter(
    (post): post is BlogPost => post !== null
  );

  // Sort posts by date (newest first)
  return validPosts.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
}

// Get a single blog post by slug
export async function getBlogPostBySlug(
  slug: string,
  locale: "en" | "fa"
): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, locale, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown content
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    const readingTimeResult = readingTime(content);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content: processedContent.toString(),
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      category: data.category,
      tags: data.tags || [],
      author: {
        name: data.author?.name || "Menteeno Team",
        avatar: data.author?.avatar,
        bio: data.author?.bio,
      },
      readingTime: Math.ceil(readingTimeResult.minutes),
      featured: data.featured || false,
      locale,
      seo: {
        title: data.seo?.title || data.title,
        description: data.seo?.description || data.excerpt,
        keywords: data.seo?.keywords || data.tags || [],
        image: data.seo?.image,
      },
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

// Get blog posts with filters and pagination
export async function getBlogPosts(
  filters: BlogFilters,
  page: number = 1,
  limit: number = 10
): Promise<BlogListResponse> {
  const allPosts = await getAllBlogPosts(filters.locale);

  let filteredPosts = allPosts;

  // Apply filters
  if (filters.category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters.tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === filters.tag!.toLowerCase())
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.featured) {
    filteredPosts = filteredPosts.filter((post) => post.featured);
  }

  // Pagination
  const total = filteredPosts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = filteredPosts.slice(startIndex, endIndex);

  // Get categories and tags
  const categories = getBlogCategories(filters.locale);
  const tags = getBlogTags(filters.locale);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    categories,
    tags,
  };
}

// Get blog categories
export function getBlogCategories(locale: "en" | "fa"): BlogCategory[] {
  const categories: { [key: string]: BlogCategory } = {};

  // This would typically come from a database or configuration
  // For now, we'll define them statically
  const categoryData = {
    en: [
      {
        slug: "soft-skills",
        name: "Soft Skills",
        description:
          "Articles about developing soft skills and professional growth",
      },
      {
        slug: "programming",
        name: "Programming",
        description: "Technical articles and programming tips",
      },
      {
        slug: "career",
        name: "Career",
        description: "Career advice and professional development",
      },
      {
        slug: "teamwork",
        name: "Teamwork",
        description: "Collaboration and team dynamics",
      },
      {
        slug: "leadership",
        name: "Leadership",
        description: "Leadership skills and management",
      },
    ],
    fa: [
      {
        slug: "soft-skills",
        name: "مهارت‌های نرم",
        description: "مقالاتی درباره توسعه مهارت‌های نرم و رشد حرفه‌ای",
      },
      {
        slug: "programming",
        name: "برنامه‌نویسی",
        description: "مقالات فنی و نکات برنامه‌نویسی",
      },
      {
        slug: "career",
        name: "شغل",
        description: "مشاوره شغلی و توسعه حرفه‌ای",
      },
      {
        slug: "teamwork",
        name: "کار تیمی",
        description: "همکاری و دینامیک تیم",
      },
      {
        slug: "leadership",
        name: "رهبری",
        description: "مهارت‌های رهبری و مدیریت",
      },
    ],
  };

  return categoryData[locale].map((cat) => ({
    ...cat,
    locale,
    postCount: 0, // This would be calculated from actual posts
  }));
}

// Get blog tags
export function getBlogTags(locale: "en" | "fa"): BlogTag[] {
  const tagData = {
    en: [
      { slug: "communication", name: "Communication" },
      { slug: "leadership", name: "Leadership" },
      { slug: "teamwork", name: "Teamwork" },
      { slug: "problem-solving", name: "Problem Solving" },
      { slug: "mentorship", name: "Mentorship" },
      { slug: "career-growth", name: "Career Growth" },
      { slug: "javascript", name: "JavaScript" },
      { slug: "react", name: "React" },
      { slug: "typescript", name: "TypeScript" },
      { slug: "frontend", name: "Frontend" },
    ],
    fa: [
      { slug: "communication", name: "ارتباطات" },
      { slug: "leadership", name: "رهبری" },
      { slug: "teamwork", name: "کار تیمی" },
      { slug: "problem-solving", name: "حل مسئله" },
      { slug: "mentorship", name: "منتورشیپ" },
      { slug: "career-growth", name: "رشد شغلی" },
      { slug: "javascript", name: "جاوااسکریپت" },
      { slug: "react", name: "ریکت" },
      { slug: "typescript", name: "تایپ‌اسکریپت" },
      { slug: "frontend", name: "فرانت‌اند" },
    ],
  };

  return tagData[locale].map((tag) => ({
    ...tag,
    locale,
    postCount: 0, // This would be calculated from actual posts
  }));
}

// Get related posts
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(currentPost.locale);

  return allPosts
    .filter(
      (post) =>
        post.slug !== currentPost.slug &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

// Get featured posts
export async function getFeaturedPosts(
  locale: "en" | "fa",
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(locale);
  return allPosts.filter((post) => post.featured).slice(0, limit);
}

// Get recent posts
export async function getRecentPosts(
  locale: "en" | "fa",
  limit: number = 5
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(locale);
  return allPosts.slice(0, limit);
}
