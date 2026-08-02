import { CoursesPage } from "@/features/panel/courses/pages/courses-page";
import { getPublishedCourses } from "@/features/panel/lib/course-static-data";
import { getTranslation } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const title = getTranslation("fa", "panel.courses.title");
  const description = getTranslation("fa", "panel.home.subheadline");
  const url = absoluteUrl("/panel/courses");

  return {
    title: {
      absolute: `${title} | منتینو`,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | منتینو`,
      description,
      url,
      locale: "fa_IR",
      type: "website",
    },
  };
}

export default async function Page() {
  const courses = await getPublishedCourses();
  return <CoursesPage courses={courses} />;
}
