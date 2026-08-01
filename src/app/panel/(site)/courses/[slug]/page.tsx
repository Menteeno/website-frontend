import { CourseDetailPage } from "@/features/panel/courses/pages/course-detail-page";

export function generateStaticParams() {
  return [{ slug: "_" }];
}

export default function Page() {
  return <CourseDetailPage />;
}
