"use client";

import { useQuery } from '@tanstack/react-query'
import { useTranslation } from '@/hooks/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

export function AdminDashboardPage() {
  const { t } = useTranslation()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [courses, published, users] = await Promise.all([
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase
          .from('courses')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'published'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
      ])
      return {
        courses: courses.count ?? 0,
        published: published.count ?? 0,
        users: users.count ?? 0,
      }
    },
  })

  if (isLoading || !data) {
    return <p className="text-[var(--color-muted-foreground)]">{t('panel.common.loading')}</p>
  }

  const stats = [
    { label: t('panel.admin.statsCourses'), value: data.courses },
    { label: t('panel.admin.statsPublished'), value: data.published },
    { label: t('panel.admin.statsUsers'), value: data.users },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('panel.admin.dashboard')}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="text-sm text-[var(--color-muted-foreground)]">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
