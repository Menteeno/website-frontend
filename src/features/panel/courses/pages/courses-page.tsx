"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Seo } from "@/components/panel/seo";
import { useTranslation } from "@/hooks/use-translation";
import { getPublicStorageUrl } from "@/lib/supabase";
import { courseFinalPrice, formatPrice } from "@/lib/utils";
import type { Course } from "@/types/database";

type CoursesPageProps = {
  /** Build-time / SSG catalog — no client fetch needed for first paint. */
  courses: Course[];
};

export function CoursesPage({ courses }: CoursesPageProps) {
  const { t, locale } = useTranslation();

  return (
    <div className="space-y-6">
      <Seo
        title={t("panel.courses.title")}
        description={t("panel.home.subheadline")}
        path="/panel/courses"
        locale={locale === "fa" ? "fa_IR" : "en_US"}
      />
      <h1 className="text-3xl font-bold">{t("panel.courses.title")}</h1>
      {courses.length === 0 ? (
        <p className="text-[var(--color-muted-foreground)]">
          {t("panel.courses.empty")}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const cover = getPublicStorageUrl("course-covers", course.cover_path);
            const price = courseFinalPrice(course.price, course.sale_price);
            return (
              <Link key={course.id} href={`/panel/courses/${course.slug}`}>
                <Card className="h-full overflow-hidden transition hover:shadow-md">
                  {cover ? (
                    <img
                      src={cover}
                      alt={t("panel.courses.coverAlt", { title: course.title })}
                      className="h-40 w-full object-cover"
                      width={480}
                      height={160}
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
                      {t("panel.common.appName")}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-base">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.short_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">
                      {formatPrice(
                        price,
                        course.currency,
                        locale === "fa" ? "fa-IR" : "en-US",
                      )}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
