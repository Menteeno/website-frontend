"use client";

import Link from "next/link";
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/features/panel/auth/auth-context'
import { getPublicStorageUrl, supabase } from '@/lib/supabase'
import type { Course, UserCourse } from '@/types/database'

type EnrollmentWithCourse = UserCourse & { courses: Course | null }

export function AccountDashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ['my-courses', user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user!.id)
        .neq('status', 'dropped')
        .order('created_at', { ascending: false })
      if (error) {
        throw error
      }

      const courseIds = rows.map((row) => row.course_id)
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds.length ? courseIds : ['__none__'])
      if (coursesError) {
        throw coursesError
      }

      const courseMap = new Map((courses ?? []).map((course) => [course.id, course]))
      return rows.map(
        (row): EnrollmentWithCourse => ({
          ...row,
          courses: courseMap.get(row.course_id) ?? null,
        }),
      )
    },
  })

  if (isLoading) {
    return <p className="text-[var(--color-muted-foreground)]">{t('common.loading')}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{t('account.title')}</h1>
        <Button asChild variant="outline">
          <Link href="/panel/account/profile">{t('nav.profile')}</Link>
        </Button>
      </div>

      <h2 className="text-xl font-semibold">{t('account.myCourses')}</h2>
      {enrollments.length === 0 ? (
        <p className="text-[var(--color-muted-foreground)]">
          {t('account.noCourses')}{' '}
          <Link className="text-[var(--color-primary)] hover:underline" href="/panel/courses">
            {t('nav.courses')}
          </Link>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {enrollments.map((item) => {
            const course = item.courses
            if (!course) {
              return null
            }
            const cover = getPublicStorageUrl('course-covers', course.cover_path)
            return (
              <Card key={item.id} className="overflow-hidden">
                {cover ? (
                  <img src={cover} alt={course.title} className="h-36 w-full object-cover" />
                ) : null}
                <CardHeader>
                  <CardTitle className="text-base">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href={`/panel/account/courses/${course.id}`}>{t('account.continue')}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
