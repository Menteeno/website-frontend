"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogPost } from "@/types/blog";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  ShareIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BlogDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogDetail({ post, relatedPosts }: BlogDetailProps) {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";
  const [isSharing, setIsSharing] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link href={`/${locale}/blog`}>
            {isRTL ? (
              <ArrowRightIcon className="h-4 w-4" />
            ) : (
              <ArrowLeftIcon className="h-4 w-4" />
            )}
            {locale === "fa" ? "بازگشت به وبلاگ" : "Back to Blog"}
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm">
              {post.category}
            </Badge>
            {post.featured && (
              <Badge variant="default" className="bg-yellow-500 text-sm">
                {locale === "fa" ? "ویژه" : "Featured"}
              </Badge>
            )}
          </div>

          <h1
            className="text-4xl font-bold mb-4 leading-tight"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {post.title}
          </h1>

          <p
            className="text-xl text-muted-foreground mb-6 leading-relaxed"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {post.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              <span>
                {post.readingTime}{" "}
                {locale === "fa" ? "دقیقه مطالعه" : "min read"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
            >
              <ShareIcon className="h-4 w-4" />
              {isSharing
                ? locale === "fa"
                  ? "کپی شد!"
                  : "Copied!"
                : locale === "fa"
                  ? "اشتراک‌گذاری"
                  : "Share"}
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article Image */}
        {post.seo?.image && (
          <div className="w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.seo.image}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
        )}

        <Separator className="mb-8" />

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
          dir={isRTL ? "rtl" : "ltr"}
        />

        <Separator className="my-8" />

        {/* Author Bio */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <div className="text-lg">{post.author.name}</div>
                {post.author.bio && (
                  <CardDescription className="mt-1">
                    {post.author.bio}
                  </CardDescription>
                )}
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">
              {locale === "fa" ? "مقالات مرتبط" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.slug}
                  className="h-full hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Related Post Image */}
                  {relatedPost.seo?.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedPost.seo.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {relatedPost.category}
                      </Badge>
                      {relatedPost.featured && (
                        <Badge
                          variant="default"
                          className="bg-yellow-500 text-xs"
                        >
                          {locale === "fa" ? "ویژه" : "Featured"}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">
                      <Link
                        href={`/${locale}/blog/${relatedPost.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {relatedPost.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>
                          {relatedPost.readingTime}{" "}
                          {locale === "fa" ? "دقیقه" : "min"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
