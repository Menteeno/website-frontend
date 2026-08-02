import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

function buildClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key || url.includes("placeholder")) {
    return null;
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/** Keep a placeholder so local/export builds never have an empty param list. */
const PLACEHOLDER_SLUG = "_";
const PLACEHOLDER_ID = "_";

export async function getPublishedCourseStaticParams(): Promise<
  Array<{ slug: string }>
> {
  const supabase = buildClient();
  if (!supabase) {
    return [{ slug: PLACEHOLDER_SLUG }];
  }

  const { data, error } = await supabase
    .from("courses")
    .select("slug")
    .eq("status", "published");

  if (error || !data?.length) {
    console.warn(
      "[static-params] published courses:",
      error?.message ?? "none found",
    );
    return [{ slug: PLACEHOLDER_SLUG }];
  }

  const slugs = data
    .map((row) => row.slug)
    .filter((slug): slug is string => Boolean(slug));

  return [...slugs.map((slug) => ({ slug })), { slug: PLACEHOLDER_SLUG }];
}

export async function getPublishedCourseLessonStaticParams(): Promise<
  Array<{ slug: string; lessonId: string }>
> {
  const supabase = buildClient();
  if (!supabase) {
    return [{ slug: PLACEHOLDER_SLUG, lessonId: PLACEHOLDER_ID }];
  }

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("id, slug")
    .eq("status", "published");

  if (coursesError || !courses?.length) {
    console.warn(
      "[static-params] courses for lessons:",
      coursesError?.message ?? "none found",
    );
    return [{ slug: PLACEHOLDER_SLUG, lessonId: PLACEHOLDER_ID }];
  }

  const courseIds = courses.map((course) => course.id);
  const slugById = new Map(courses.map((course) => [course.id, course.slug]));

  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .select("id, course_id")
    .in("course_id", courseIds);

  if (chaptersError || !chapters?.length) {
    console.warn(
      "[static-params] chapters:",
      chaptersError?.message ?? "none found",
    );
    return [{ slug: PLACEHOLDER_SLUG, lessonId: PLACEHOLDER_ID }];
  }

  const chapterIds = chapters.map((chapter) => chapter.id);
  const courseIdByChapter = new Map(
    chapters.map((chapter) => [chapter.id, chapter.course_id]),
  );

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("id, chapter_id")
    .in("chapter_id", chapterIds);

  if (lessonsError || !lessons?.length) {
    console.warn(
      "[static-params] lessons:",
      lessonsError?.message ?? "none found",
    );
    return [{ slug: PLACEHOLDER_SLUG, lessonId: PLACEHOLDER_ID }];
  }

  const params: Array<{ slug: string; lessonId: string }> = [];
  for (const lesson of lessons) {
    const courseId = courseIdByChapter.get(lesson.chapter_id);
    const slug = courseId ? slugById.get(courseId) : undefined;
    if (!slug) {
      continue;
    }
    params.push({ slug, lessonId: lesson.id });
  }

  params.push({ slug: PLACEHOLDER_SLUG, lessonId: PLACEHOLDER_ID });
  return params;
}

export async function getPublishedCourseIdStaticParams(): Promise<
  Array<{ courseId: string }>
> {
  const supabase = buildClient();
  if (!supabase) {
    return [{ courseId: PLACEHOLDER_ID }];
  }

  const { data, error } = await supabase
    .from("courses")
    .select("id")
    .eq("status", "published");

  if (error || !data?.length) {
    console.warn("[static-params] course ids:", error?.message ?? "none found");
    return [{ courseId: PLACEHOLDER_ID }];
  }

  return [
    ...data.map((row) => ({ courseId: row.id })),
    { courseId: PLACEHOLDER_ID },
  ];
}

export async function getPublishedAccountLessonStaticParams(): Promise<
  Array<{ courseId: string; lessonId: string }>
> {
  const courseParams = await getPublishedCourseLessonStaticParams();
  const supabase = buildClient();
  if (!supabase) {
    return [{ courseId: PLACEHOLDER_ID, lessonId: PLACEHOLDER_ID }];
  }

  const { data: courses } = await supabase
    .from("courses")
    .select("id, slug")
    .eq("status", "published");

  const idBySlug = new Map((courses ?? []).map((c) => [c.slug, c.id]));

  return [
    ...courseParams
      .filter((p) => p.slug !== PLACEHOLDER_SLUG)
      .map((p) => ({
        courseId: idBySlug.get(p.slug) ?? PLACEHOLDER_ID,
        lessonId: p.lessonId,
      }))
      .filter((p) => p.courseId !== PLACEHOLDER_ID),
    { courseId: PLACEHOLDER_ID, lessonId: PLACEHOLDER_ID },
  ];
}
