"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowRightIcon, BookOpenIcon } from "lucide-react";
import Link from "next/link";

interface BlogHeroProps {
  featuredPostsCount?: number;
  totalPostsCount?: number;
}

export function BlogHero({
  featuredPostsCount = 0,
  totalPostsCount = 0,
}: BlogHeroProps) {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <BookOpenIcon className="w-8 h-8 text-primary" />
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {locale === "fa" ? "وبلاگ منتینو" : "Menteeno Blog"}
          </h1>

          {/* Description */}
          <p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {locale === "fa"
              ? "مقالات و راهنماهای مفید برای توسعه مهارت‌های نرم و رشد حرفه‌ای. بیاموزید که چگونه مهارت‌های ارتباطی، کار تیمی و رهبری خود را بهبود بخشید."
              : "Helpful articles and guides for developing soft skills and professional growth. Learn how to improve your communication, teamwork, and leadership skills."}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {totalPostsCount}
              </div>
              <div className="text-sm text-muted-foreground">
                {locale === "fa" ? "مقاله" : "Articles"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {featuredPostsCount}
              </div>
              <div className="text-sm text-muted-foreground">
                {locale === "fa" ? "مقاله ویژه" : "Featured"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">
                {locale === "fa" ? "زبان" : "Languages"}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${locale}/blog`}>
                {locale === "fa" ? "مشاهده مقالات" : "Browse Articles"}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href={`/${locale}/contact-us`}>
                {locale === "fa" ? "پیشنهاد مقاله" : "Suggest Article"}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
    </section>
  );
}
