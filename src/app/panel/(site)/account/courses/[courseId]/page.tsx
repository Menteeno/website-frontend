import { CourseLearnPage } from "@/features/panel/account/pages/course-learn-page";
import { getPublishedCourseIdStaticParams } from "@/features/panel/lib/static-params";

export async function generateStaticParams() {
  return getPublishedCourseIdStaticParams();
}

export default function Page() {
  return <CourseLearnPage />;
}
