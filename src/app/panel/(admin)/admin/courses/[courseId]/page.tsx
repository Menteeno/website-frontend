import { AdminCourseEditPage } from "@/features/panel/admin/pages/course-edit-page";
import { getPublishedCourseIdStaticParams } from "@/features/panel/lib/static-params";

export async function generateStaticParams() {
  return getPublishedCourseIdStaticParams();
}

export default function Page() {
  return <AdminCourseEditPage />;
}
