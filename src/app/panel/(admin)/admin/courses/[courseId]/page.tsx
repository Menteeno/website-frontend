import { AdminCourseEditPage } from "@/features/panel/admin/pages/course-edit-page";

export function generateStaticParams() {
  return [{ courseId: "_" }];
}

export default function Page() {
  return <AdminCourseEditPage />;
}
