import { CourseLearnPage } from "@/features/panel/account/pages/course-learn-page";

export function generateStaticParams() {
  return [{ courseId: "_" }];
}

export default function Page() {
  return <CourseLearnPage />;
}
