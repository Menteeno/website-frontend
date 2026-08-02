import { CourseDetailPage } from "@/features/panel/courses/pages/course-detail-page";
import { getPublishedCourseBySlug } from "@/features/panel/lib/course-static-data";
import { getPublishedCourseStaticParams } from "@/features/panel/lib/static-params";
import { getTranslation } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { getPublicStorageUrl } from "@/lib/supabase";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getPublishedCourseStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublishedCourseBySlug(slug);

  if (!data) {
    return {
      title: getTranslation("fa", "panel.common.notFound"),
      robots: { index: false, follow: false },
    };
  }

  const { course } = data;
  const description =
    course.short_description ||
    course.description?.slice(0, 160) ||
    getTranslation("fa", "panel.courses.seoFallback", { title: course.title });
  const url = absoluteUrl(`/panel/courses/${course.slug}`);
  const image = getPublicStorageUrl("course-covers", course.cover_path);

  return {
    title: {
      absolute: `${course.title} | منتینو`,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${course.title} | منتینو`,
      description,
      url,
      locale: "fa_IR",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "_") {
    notFound();
  }

  const data = await getPublishedCourseBySlug(slug);
  if (!data) {
    notFound();
  }

  return <CourseDetailPage initialData={data} />;
}
