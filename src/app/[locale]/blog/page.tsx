import { BlogPageClient } from "@/app/[locale]/blog/blog-page-client";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { getBlogPosts } from "@/lib/blog";
import type { BlogFilters } from "@/types/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "fa") {
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

  return {
    title: "Menteeno Blog | Soft Skills & Professional Growth Articles",
    description:
      "Helpful articles and guides for developing soft skills, professional growth, and improving communication and teamwork skills in programming.",
    keywords: [
      "blog",
      "soft skills",
      "professional growth",
      "programming",
      "communication",
      "teamwork",
    ],
    openGraph: {
      title: "Menteeno Blog | Soft Skills & Professional Growth Articles",
      description:
        "Helpful articles and guides for developing soft skills, professional growth, and improving communication and teamwork skills in programming.",
      type: "website",
      locale: "en_US",
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  if (!["en", "fa"].includes(locale)) {
    notFound();
  }

  // Load all posts for static generation - filtering will be handled client-side
  const filters: BlogFilters = {
    locale: locale as "en" | "fa",
  };

  const blogData = await getBlogPosts(filters, 1, 50); // Load more posts for client-side filtering

  return (
    <>
      <Navbar />
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
            locale: locale as "en" | "fa",
          }}
          locale={locale as "en" | "fa"}
        />
      </Suspense>
      <Footer />
    </>
  );
}
