"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/features/panel/auth/auth-context'
import { supabase } from '@/lib/supabase'
import { createId, slugify } from '@/lib/utils'

export function AdminCoursesPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) {
        throw error
      }
      return data
    },
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      const id = createId()
      const title = t('admin.newCourse')
      const { data, error } = await supabase
        .from('courses')
        .insert({
          id,
          title,
          slug: `${slugify(title) || 'course'}-${id.slice(-6).toLowerCase()}`,
          status: 'draft',
          instructor_id: user?.id ?? null,
          price: 0,
          currency: 'IRT',
        })
        .select('id')
        .single()
      if (error) {
        throw error
      }
      return data
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['admin-courses'] })
      router.push(`/panel/admin/courses/${data.id}`)
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('courses').delete().eq('id', id)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      toast.success(t('common.success'))
      await queryClient.invalidateQueries({ queryKey: ['admin-courses'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  if (isLoading) {
    return <p className="text-[var(--color-muted-foreground)]">{t('common.loading')}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{t('admin.courses')}</h1>
        <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
          {t('admin.newCourse')}
        </Button>
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle className="text-base">{course.title}</CardTitle>
                <p className="mt-1 text-xs text-[var(--color-muted-foreground)]" dir="ltr">
                  /{course.slug}
                </p>
              </div>
              <Badge variant="secondary">{t(`admin.${course.status}`)}</Badge>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button asChild size="sm">
                <Link href={`/panel/admin/courses/${course.id}`}>{t('common.edit')}</Link>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (window.confirm(t('admin.deleteConfirm'))) {
                    deleteMutation.mutate(course.id)
                  }
                }}
              >
                {t('common.delete')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
