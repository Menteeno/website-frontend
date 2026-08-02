"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { routeParam } from "@/features/panel/lib/params";
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from '@/hooks/use-translation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/features/panel/auth/auth-context'
import { supabase } from '@/lib/supabase'
import type { Chapter, Lesson } from '@/types/database'

type ChapterWithLessons = Chapter & { lessons: Lesson[] }

export function CourseLearnPage() {
    const params = useParams()
  const courseId = routeParam(params.courseId)
  const { t } = useTranslation()
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['learn-course', courseId, user?.id],
    enabled: Boolean(courseId && user?.id),
    queryFn: async () => {
      const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single()
      if (error) {
        throw error
      }

      const { data: chapters, error: chaptersError } = await supabase
        .from('chapters')
        .select('*')
        .eq('course_id', courseId)
        .order('order', { ascending: true })
      if (chaptersError) {
        throw chaptersError
      }

      const chapterIds = chapters.map((c) => c.id)
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .in('chapter_id', chapterIds.length ? chapterIds : ['__none__'])
        .order('order', { ascending: true })
      if (lessonsError) {
        throw lessonsError
      }

      const { data: progress } = await supabase
        .from('user_lessons')
        .select('*')
        .eq('user_id', user!.id)

      const chaptersWithLessons: ChapterWithLessons[] = chapters.map((chapter) => ({
        ...chapter,
        lessons: lessons.filter((lesson) => lesson.chapter_id === chapter.id),
      }))

      return { course, chapters: chaptersWithLessons, progress: progress ?? [] }
    },
  })

  if (isLoading || !data) {
    return <p className="text-[var(--color-muted-foreground)]">{t('panel.common.loading')}</p>
  }

  const completed = new Set(data.progress.filter((p) => p.is_completed).map((p) => p.lesson_id))
  const totalLessons = data.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)
  const progressPct = totalLessons === 0 ? 0 : Math.round((completed.size / totalLessons) * 100)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{data.course.title}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          {t('panel.account.progress')}: {progressPct}%
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-muted)]">
          <div
            className="h-full bg-[var(--color-primary)] transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {data.chapters.map((chapter) => (
        <Card key={chapter.id}>
          <CardHeader>
            <CardTitle className="text-base">{chapter.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {chapter.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/panel/account/courses/${courseId}/lessons/${lesson.id}`}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-[var(--color-muted)]"
              >
                <span>{lesson.title}</span>
                <div className="flex items-center gap-2">
                  {lesson.is_free ? <Badge variant="outline">{t('panel.common.free')}</Badge> : null}
                  {completed.has(lesson.id) ? (
                    <Badge variant="secondary">{t('panel.account.completed')}</Badge>
                  ) : null}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
