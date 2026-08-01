import { PublicLessonPage } from "@/features/panel/courses/pages/public-lesson-page";

export function generateStaticParams() {
  return [{ slug: "_", lessonId: "_" }];
}

export default function Page() {
  return <PublicLessonPage />;
}
