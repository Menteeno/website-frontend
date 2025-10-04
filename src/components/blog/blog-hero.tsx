"use client";

import { useTranslation } from "@/hooks/use-translation";
import { BookOpenIcon } from "lucide-react";

export function BlogHero() {
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
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {t("blog.title")}
          </h1>

          {/* Description */}
          <p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {t("blog.description")}
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
    </section>
  );
}
