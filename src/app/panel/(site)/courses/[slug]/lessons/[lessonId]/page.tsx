import { PublicLessonPage } from "@/features/panel/courses/pages/public-lesson-page";
import { getPublishedCourseLessonStaticParams } from "@/features/panel/lib/static-params";

export async function generateStaticParams() {
  return getPublishedCourseLessonStaticParams();
}

export default function Page() {
  return <PublicLessonPage />;
}
