import { getBuildTimeSupabase } from "@/features/panel/lib/static-params";
import type { Chapter, Course } from "@/types/database";

export type LessonSummary = {
  id: string;
  chapter_id: string;
  title: string;
  duration: number | null;
  order: number;
  is_free: boolean;
};

export type ChapterWithLessons = Chapter & { lessons: LessonSummary[] };

export type PublicCourseDetail = {
  course: Course;
  chapters: ChapterWithLessons[];
};

/** Published courses for the public catalog (build-time / SSG). */
export async function getPublishedCourses(): Promise<Course[]> {
  const supabase = getBuildTimeSupabase();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[course-static-data] published courses:", error.message);
    return [];
  }

  return data ?? [];
}

/** Full public course detail for SSG (no user/enrollment data). */
export async function getPublishedCourseBySlug(
  slug: string,
): Promise<PublicCourseDetail | null> {
  if (!slug || slug === "_") {
    return null;
  }

  const supabase = getBuildTimeSupabase();
  if (!supabase) {
    return null;
  }

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.warn("[course-static-data] course:", slug, error.message);
    return null;
  }
  if (!course) {
    return null;
  }

  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .select("*")
    .eq("course_id", course.id)
    .order("order", { ascending: true });

  if (chaptersError) {
    console.warn("[course-static-data] chapters:", slug, chaptersError.message);
    return { course, chapters: [] };
  }

  const { data: summaries, error: summaryError } = await supabase
    .from("lesson_summaries")
    .select("*")
    .eq("course_id", course.id)
    .order("order", { ascending: true });

  if (summaryError) {
    console.warn(
      "[course-static-data] lesson_summaries:",
      slug,
      summaryError.message,
    );
  }

  const lessons: LessonSummary[] = (summaries ?? []).map((row) => ({
    id: row.id,
    chapter_id: row.chapter_id,
    title: row.title,
    duration: row.duration,
    order: row.order,
    is_free: row.is_free,
  }));

  const chaptersWithLessons: ChapterWithLessons[] = (chapters ?? []).map(
    (chapter) => ({
      ...chapter,
      lessons: lessons
        .filter((lesson) => lesson.chapter_id === chapter.id)
        .sort((a, b) => a.order - b.order),
    }),
  );

  return { course, chapters: chaptersWithLessons };
}
