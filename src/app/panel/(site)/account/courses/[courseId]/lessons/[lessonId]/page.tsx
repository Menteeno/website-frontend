import { LessonPlayerPage } from "@/features/panel/account/pages/lesson-player-page";
import { getPublishedAccountLessonStaticParams } from "@/features/panel/lib/static-params";

export async function generateStaticParams() {
  return getPublishedAccountLessonStaticParams();
}

export default function Page() {
  return <LessonPlayerPage />;
}
