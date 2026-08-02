import { BlogPageClient } from "@/app/blog/blog-page-client";
import { Footer } from "@/components/footer";
import { getBlogPosts } from "@/lib/blog";
import type { BlogFilters } from "@/types/blog";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "وبلاگ منتینو | مقالات مهارت‌های نرم و رشد حرفه‌ای",
    description:
      "مقالات و راهنماهای مفید برای توسعه مهارت‌های نرم، رشد حرفه‌ای و بهبود مهارت‌های ارتباطی و کار تیمی در برنامه‌نویسی.",
    keywords: [
      "وبلاگ",
      "مهارت‌های نرم",
      "رشد حرفه‌ای",
      "برنامه‌نویسی",
      "ارتباطات",
      "کار تیمی",
    ],
    openGraph: {
      title: "وبلاگ منتینو | مقالات مهارت‌های نرم و رشد حرفه‌ای",
      description:
        "مقالات و راهنماهای مفید برای توسعه مهارت‌های نرم، رشد حرفه‌ای و بهبود مهارت‌های ارتباطی و کار تیمی در برنامه‌نویسی.",
      type: "website",
      locale: "fa_IR",
    },
  };
}

export default async function BlogPage() {
  // Load all posts for static generation - filtering will be handled client-side
  const filters: BlogFilters = {
    locale: "fa",
  };

  const blogData = await getBlogPosts(filters, 1, 50); // Load more posts for client-side filtering

  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <BlogPageClient
          initialData={{
            posts: blogData.posts,
            categories: blogData.categories,
            tags: blogData.tags,
            pagination: blogData.pagination,
            authors: blogData.authors,
            filters: blogData.filters,
          }}
          initialFilters={{
            locale: "fa",
          }}
          locale="fa"
        />
      </Suspense>
      <Footer />
    </>
  );
}
