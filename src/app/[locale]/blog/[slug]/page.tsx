import { BlogDetail } from "@/components/blog/blog-detail";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { getBlogDetail, getFeaturedPosts, getRecentPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const blogDetail = await getBlogDetail(slug, locale as "en" | "fa");

  if (!blogDetail) {
    return {
      title: "Post Not Found",
    };
  }

  const { post } = blogDetail;

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(", "),
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags.map((tag) => tag.name),
      locale: locale === "fa" ? "fa_IR" : "en_US",
      images: post.seo.image
        ? [
            {
              url: post.seo.image,
              width: 1200,
              height: 630,
              alt: post.seo.imageAlt || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: post.seo.image ? [post.seo.image] : [],
    },
    alternates: {
      canonical: post.seo.canonicalUrl || `/${locale}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        fa: `/fa/blog/${slug}`,
      },
    },
    robots: {
      index: !post.seo.noIndex,
      follow: !post.seo.noFollow,
    },
  };
}

export async function generateStaticParams() {
  // This would typically fetch all blog post slugs from your data source
  // For now, we'll return the known slugs
  const slugs = [
    "soft-skills-for-developers",
    "effective-team-communication",
    "the-knoted-meetings-early-lunch",
    "atomic-habits",
  ];

  const params = [];
  for (const locale of ["en", "fa"]) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!["en", "fa"].includes(locale)) {
    notFound();
  }

  const [blogDetail, featuredPosts, recentPosts] = await Promise.all([
    getBlogDetail(slug, locale as "en" | "fa"),
    getFeaturedPosts(locale as "en" | "fa", 3),
    getRecentPosts(locale as "en" | "fa", 5),
  ]);

  if (!blogDetail) {
    notFound();
  }

  const { post, relatedPosts, prevPost, nextPost } = blogDetail;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <BlogDetail
                post={post}
                relatedPosts={relatedPosts}
                {...(prevPost && { prevPost })}
                {...(nextPost && { nextPost })}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                featuredPosts={featuredPosts}
                recentPosts={recentPosts}
                categories={[]}
                tags={[]}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
