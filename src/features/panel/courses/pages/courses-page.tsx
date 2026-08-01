"use client";

import Link from "next/link";
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Seo } from '@/components/panel/seo'
import { getPublicStorageUrl, supabase } from '@/lib/supabase'
import { courseFinalPrice, formatPrice } from '@/lib/utils'

export function CoursesPage() {
  const { t, i18n } = useTranslation()

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
      if (error) {
        throw error
      }
      return data
    },
  })

  if (isLoading) {
    return <p className="text-[var(--color-muted-foreground)]">{t('common.loading')}</p>
  }

  return (
    <div className="space-y-6">
      <Seo
        title={t('courses.title')}
        description={t('home.subheadline')}
        path="/panel/courses"
        locale={i18n.language === 'fa' ? 'fa_IR' : 'en_US'}
      />
      <h1 className="text-3xl font-bold">{t('courses.title')}</h1>
      {courses.length === 0 ? (
        <p className="text-[var(--color-muted-foreground)]">{t('courses.empty')}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const cover = getPublicStorageUrl('course-covers', course.cover_path)
            const price = courseFinalPrice(course.price, course.sale_price)
            return (
              <Link key={course.id} href={`/panel/courses/${course.slug}`}>
                <Card className="h-full overflow-hidden transition hover:shadow-md">
                  {cover ? (
                    <img
                      src={cover}
                      alt={t('courses.coverAlt', { title: course.title })}
                      className="h-40 w-full object-cover"
                      width={480}
                      height={160}
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
                      {t('common.appName')}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-base">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.short_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">
                      {formatPrice(price, course.currency, i18n.language === 'fa' ? 'fa-IR' : 'en-US')}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
