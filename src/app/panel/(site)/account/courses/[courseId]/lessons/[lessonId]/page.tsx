import { LessonPlayerPage } from "@/features/panel/account/pages/lesson-player-page";

export function generateStaticParams() {
  return [{ courseId: "_", lessonId: "_" }];
}

export default function Page() {
  return <LessonPlayerPage />;
}
