"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogCategory } from "@/types/blog";
import { FolderIcon } from "lucide-react";
import Link from "next/link";

interface BlogCategoriesProps {
  categories: BlogCategory[];
  selectedCategory?: string;
}

export function BlogCategories({
  categories,
  selectedCategory,
}: BlogCategoriesProps) {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderIcon className="h-5 w-5" />
          {locale === "fa" ? "دسته‌بندی‌ها" : "Categories"}
        </CardTitle>
        <CardDescription>
          {locale === "fa"
            ? "مقالات را بر اساس موضوع دسته‌بندی کنید"
            : "Browse articles by topic"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Link
            href={`/${locale}/blog`}
            className={`block p-3 rounded-lg transition-colors hover:bg-muted ${
              !selectedCategory ? "bg-muted" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {locale === "fa" ? "همه مقالات" : "All Articles"}
              </span>
              <Badge variant="outline">
                {categories.reduce((sum, cat) => sum + cat.postCount, 0)}
              </Badge>
            </div>
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${locale}/blog?category=${category.slug}`}
              className={`block p-3 rounded-lg transition-colors hover:bg-muted ${
                selectedCategory === category.slug ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </div>
                </div>
                <Badge variant="outline">{category.postCount}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
