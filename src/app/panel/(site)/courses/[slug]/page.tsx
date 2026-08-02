import { CourseDetailPage } from "@/features/panel/courses/pages/course-detail-page";
import { getPublishedCourseStaticParams } from "@/features/panel/lib/static-params";

export async function generateStaticParams() {
  return getPublishedCourseStaticParams();
}

export default function Page() {
  return <CourseDetailPage />;
}
