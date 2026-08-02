"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { routeParam } from "@/features/panel/lib/params";
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from '@/hooks/use-translation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Seo } from '@/components/panel/seo'
import { useAuth } from '@/features/panel/auth/auth-context'
import { supabase } from '@/lib/supabase'
import { embedVideo } from '@/lib/utils'

export function PublicLessonPage() {
    const params = useParams()
  const slug = routeParam(params.slug)
  const lessonId = routeParam(params.lessonId)
  const { t } = useTranslation()
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['public-lesson', slug, lessonId, user?.id],
    enabled: Boolean(slug && lessonId),
    queryFn: async () => {
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('id, title, slug, status')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()
      if (courseError) {
        throw courseError
      }
      if (!course) {
        return null
      }

      const { data: lesson, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .maybeSingle()
      if (lessonError) {
        throw lessonError
      }
      if (!lesson) {
        return null
      }

      const { data: chapter } = await supabase
        .from('chapters')
        .select('*')
        .eq('id', lesson.chapter_id)
        .maybeSingle()

      if (!chapter || chapter.course_id !== course.id) {
        return null
      }

      let enrollment = null
      if (user) {
        const { data: enrollmentData } = await supabase
          .from('user_courses')
          .select('id')
          .eq('course_id', course.id)
          .eq('user_id', user.id)
          .neq('status', 'dropped')
          .maybeSingle()
        enrollment = enrollmentData
      }

      const canAccess = Boolean(lesson.is_free || enrollment)

      return { course, lesson, chapter, enrollment, canAccess }
    },
  })

  const media = useMemo(() => embedVideo(data?.lesson.video_url ?? null), [data?.lesson.video_url])

  if (isLoading) {
    return <p className="text-[var(--color-muted-foreground)]">{t('panel.common.loading')}</p>
  }

  if (!data) {
    return <p>{t('panel.common.notFound')}</p>
  }

  const { course, lesson, chapter, canAccess } = data
  const description =
    lesson.content?.slice(0, 160) ||
    t('panel.courses.freePreviewSeo', { lesson: lesson.title, course: course.title })

  return (
    <article className="space-y-6">
      <Seo
        title={`${lesson.title} — ${course.title}`}
        description={description}
        path={`/panel/courses/${course.slug}/lessons/${lesson.id}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: lesson.title,
          description,
          isAccessibleForFree: lesson.is_free,
          isPartOf: {
            '@type': 'Course',
            name: course.title,
            url: `${window.location.origin}${''}/courses/${course.slug}`,
          },
          inLanguage: 'fa',
        }}
      />

      <nav className="text-sm text-[var(--color-muted-foreground)]" aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="hover:text-[var(--color-primary)]" href="/panel">
              {t('panel.nav.home')}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link className="hover:text-[var(--color-primary)]" href="/panel/courses">
              {t('panel.nav.courses')}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link className="hover:text-[var(--color-primary)]" href={`/panel/courses/${course.slug}`}>
              {course.title}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-[var(--color-foreground)]">{lesson.title}</li>
        </ol>
      </nav>

      <header className="space-y-2">
        <p className="text-sm text-[var(--color-muted-foreground)]">{chapter?.title}</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          {lesson.is_free ? <Badge variant="secondary">{t('panel.courses.freePreview')}</Badge> : null}
        </div>
      </header>

      {!canAccess ? (
        <Card>
          <CardContent className="space-y-4 p-6">
            <p>{t('panel.account.lockedLesson')}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/panel/courses/${course.slug}`}>{t('panel.courses.details')}</Link>
              </Button>
              {!user ? (
                <Button asChild variant="outline">
                  <Link href="/panel/login">{t('panel.nav.login')}</Link>
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {media.kind === 'iframe' ? (
                <div className="aspect-video w-full">
                  <iframe
                    title={lesson.title}
                    src={media.src}
                    className="h-full w-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              ) : media.kind === 'video' ? (
                <video controls className="aspect-video w-full bg-black" src={media.src} />
              ) : (
                <div className="flex aspect-video items-center justify-center bg-[var(--color-muted)] text-sm text-[var(--color-muted-foreground)]">
                  {t('panel.courses.noVideo')}
                </div>
              )}
            </CardContent>
          </Card>

          {lesson.content ? (
            <div className="whitespace-pre-wrap rounded-lg border bg-[var(--color-card)] p-6 text-sm leading-7">
              {lesson.content}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={`/panel/courses/${course.slug}`}>{t('panel.common.back')}</Link>
            </Button>
            {user ? (
              <Button asChild>
                <Link href={`/panel/account/courses/${course.id}/lessons/${lesson.id}`}>
                  {t('panel.account.continue')}
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href={`/panel/courses/${course.slug}`}>{t('panel.courses.enroll')}</Link>
              </Button>
            )}
          </div>
        </>
      )}
    </article>
  )
}
