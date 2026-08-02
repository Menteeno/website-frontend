"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { routeParam } from "@/features/panel/lib/params";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from '@/hooks/use-translation'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Seo } from '@/components/panel/seo'
import { useAuth } from '@/features/panel/auth/auth-context'
import { getPublicStorageUrl, supabase } from '@/lib/supabase'
import { absoluteUrl, courseFinalPrice, createId, formatPrice, priceForSchema } from '@/lib/utils'
import type { Chapter } from '@/types/database'

type LessonSummary = {
  id: string
  chapter_id: string
  title: string
  duration: number | null
  order: number
  is_free: boolean
}

type ChapterWithLessons = Chapter & { lessons: LessonSummary[] }

export function CourseDetailPage() {
    const params = useParams()
  const slug = routeParam(params.slug)
  const { t, locale: lang } = useTranslation()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const locale = lang === 'fa' ? 'fa-IR' : 'en-US'

  const { data, isLoading } = useQuery({
    queryKey: ['course', slug, user?.id],
    queryFn: async () => {
      const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()
      if (error) {
        throw error
      }
      if (!course) {
        return null
      }

      const { data: chapters, error: chaptersError } = await supabase
        .from('chapters')
        .select('*')
        .eq('course_id', course.id)
        .order('order', { ascending: true })
      if (chaptersError) {
        throw chaptersError
      }

      let enrollment = null
      if (user) {
        const { data: enrollmentData } = await supabase
          .from('user_courses')
          .select('*')
          .eq('course_id', course.id)
          .eq('user_id', user.id)
          .neq('status', 'dropped')
          .maybeSingle()
        enrollment = enrollmentData
      }

      const { data: summaries, error: summaryError } = await supabase
        .from('lesson_summaries')
        .select('*')
        .eq('course_id', course.id)
        .order('order', { ascending: true })
      if (summaryError) {
        throw summaryError
      }

      const lessons: LessonSummary[] = (summaries ?? []).map((row) => ({
        id: row.id,
        chapter_id: row.chapter_id,
        title: row.title,
        duration: row.duration,
        order: row.order,
        is_free: row.is_free,
      }))

      const chaptersWithLessons: ChapterWithLessons[] = chapters.map((chapter) => ({
        ...chapter,
        lessons: lessons
          .filter((lesson) => lesson.chapter_id === chapter.id)
          .sort((a, b) => a.order - b.order),
      }))

      return { course, chapters: chaptersWithLessons, enrollment }
    },
    enabled: Boolean(slug),
  })

  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!user || !data?.course) {
        throw new Error('auth required')
      }
      const { error } = await supabase.from('user_courses').insert({
        id: createId(),
        course_id: data.course.id,
        user_id: user.id,
        status: 'enrolled',
      })
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      toast.success(t('panel.common.success'))
      await queryClient.invalidateQueries({ queryKey: ['course', slug] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  if (isLoading) {
    return <p className="text-[var(--color-muted-foreground)]">{t('panel.common.loading')}</p>
  }

  if (!data?.course) {
    return (
      <>
        <Seo title={t('panel.common.notFound')} description={t('panel.common.notFound')} path={`/panel/courses/${slug}`} noIndex />
        <p>{t('panel.common.notFound')}</p>
      </>
    )
  }

  const { course, chapters, enrollment } = data
  const cover = getPublicStorageUrl('course-covers', course.cover_path)
  const price = courseFinalPrice(course.price, course.sale_price)
  const firstFreeLesson = chapters.flatMap((ch) => ch.lessons).find((lesson) => lesson.is_free)
  const firstLesson = chapters.flatMap((ch) => ch.lessons).at(0)
  const seoDescription =
    course.short_description ||
    course.description?.slice(0, 160) ||
    t('panel.courses.seoFallback', { title: course.title })
  const schemaPrice = priceForSchema(price, course.currency)
  const courseUrl = absoluteUrl(`/courses/${course.slug}`)
  const hasSale = course.sale_price !== null && course.sale_price >= 0 && course.sale_price < course.price

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('panel.nav.home'), item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: t('panel.nav.courses'), item: absoluteUrl('/courses') },
        { '@type': 'ListItem', position: 3, name: course.title, item: courseUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.title,
      description: seoDescription,
      url: courseUrl,
      image: cover || undefined,
      inLanguage: 'fa',
      provider: {
        '@type': 'Organization',
        name: 'Menteeno',
        url: absoluteUrl('/'),
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT2H',
      },
      offers: {
        '@type': 'Offer',
        category: price <= 0 ? 'Free' : 'Paid',
        price: schemaPrice.price,
        priceCurrency: schemaPrice.priceCurrency,
        availability: 'https://schema.org/InStock',
        url: courseUrl,
      },
      ...(firstFreeLesson
        ? {
            hasPart: {
              '@type': 'LearningResource',
              name: firstFreeLesson.title,
              isAccessibleForFree: true,
              url: absoluteUrl(`/courses/${course.slug}/lessons/${firstFreeLesson.id}`),
            },
          }
        : {}),
    },
  ]

  return (
    <article className="space-y-8">
      <Seo
        title={course.title}
        description={seoDescription}
        path={`/panel/courses/${course.slug}`}
        image={cover}
        type="product"
        locale={lang === 'fa' ? 'fa_IR' : 'en_US'}
        jsonLd={jsonLd}
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
          <li className="text-[var(--color-foreground)]">{course.title}</li>
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{course.title}</h1>
          {course.short_description ? (
            <p className="text-lg text-[var(--color-muted-foreground)]">{course.short_description}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <Badge>
              {formatPrice(price, course.currency, locale)}
            </Badge>
            {hasSale ? (
              <span className="text-sm text-[var(--color-muted-foreground)] line-through">
                {formatPrice(course.price, course.currency, locale)}
              </span>
            ) : null}
            {enrollment ? <Badge variant="secondary">{t('panel.courses.enrolled')}</Badge> : null}
            {firstFreeLesson ? <Badge variant="outline">{t('panel.courses.hasFreePreview')}</Badge> : null}
          </div>
          <div className="flex flex-wrap gap-3">
            {firstFreeLesson ? (
              <Button asChild>
                <Link href={`/panel/courses/${course.slug}/lessons/${firstFreeLesson.id}`}>
                  {t('panel.courses.watchFree')}
                </Link>
              </Button>
            ) : null}
            {enrollment && firstLesson ? (
              <Button asChild variant={firstFreeLesson ? 'outline' : 'default'}>
                <Link href={`/panel/account/courses/${course.id}/lessons/${firstLesson.id}`}>
                  {t('panel.courses.startLearning')}
                </Link>
              </Button>
            ) : null}
            {!enrollment && user ? (
              <Button
                variant={firstFreeLesson ? 'outline' : 'default'}
                onClick={() => enrollMutation.mutate()}
                disabled={enrollMutation.isPending}
              >
                {t('panel.courses.enroll')}
              </Button>
            ) : null}
            {!enrollment && !user ? (
              <Button asChild variant="outline">
                <Link href="/panel/login">{t('panel.courses.enroll')}</Link>
              </Button>
            ) : null}
          </div>
          {course.description ? (
            <div className="max-w-none whitespace-pre-wrap text-sm leading-7">{course.description}</div>
          ) : null}
        </div>
        <Card className="overflow-hidden">
          {cover ? (
            <img
              src={cover}
              alt={t('panel.courses.coverAlt', { title: course.title })}
              className="h-56 w-full object-cover"
              width={640}
              height={224}
            />
          ) : (
            <div className="flex h-56 items-center justify-center bg-[var(--color-muted)]">
              {t('panel.common.appName')}
            </div>
          )}
        </Card>
      </div>

      <Separator />

      <section className="space-y-4" aria-labelledby="syllabus-heading">
        <h2 id="syllabus-heading" className="text-2xl font-semibold">
          {t('panel.courses.chapters')}
        </h2>
        {chapters.map((chapter) => (
          <Card key={chapter.id}>
            <CardHeader>
              <CardTitle className="text-base">{chapter.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {chapter.lessons.length === 0 ? (
                <p className="text-sm text-[var(--color-muted-foreground)]">{t('panel.courses.empty')}</p>
              ) : (
                chapter.lessons.map((lesson) => {
                  const lessonPath = lesson.is_free
                    ? `/courses/${course.slug}/lessons/${lesson.id}`
                    : enrollment
                      ? `/account/courses/${course.id}/lessons/${lesson.id}`
                      : null

                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm"
                    >
                      <div className="min-w-0">
                        {lessonPath ? (
                          <Link className="font-medium hover:text-[var(--color-primary)]" href={lessonPath}>
                            {lesson.title}
                          </Link>
                        ) : (
                          <span>{lesson.title}</span>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {lesson.is_free ? <Badge variant="outline">{t('panel.common.free')}</Badge> : null}
                        {lesson.is_free ? (
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/panel/courses/${course.slug}/lessons/${lesson.id}`}>
                              {t('panel.courses.watchFree')}
                            </Link>
                          </Button>
                        ) : enrollment && user ? (
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/panel/account/courses/${course.id}/lessons/${lesson.id}`}>
                              {t('panel.courses.startLearning')}
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        ))}
      </section>
    </article>
  )
}
