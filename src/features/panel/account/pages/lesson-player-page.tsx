"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { routeParam } from "@/features/panel/lib/params";
import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/features/panel/auth/auth-context'
import { supabase } from '@/lib/supabase'
import { createId, embedVideo } from '@/lib/utils'

export function LessonPlayerPage() {
    const params = useParams()
  const courseId = routeParam(params.courseId)
  const lessonId = routeParam(params.lessonId)
  const { t } = useTranslation()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [note, setNote] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['lesson', lessonId, user?.id],
    enabled: Boolean(lessonId && user?.id),
    queryFn: async () => {
      const { data: lesson, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single()
      if (error) {
        throw error
      }

      const { data: chapter } = await supabase
        .from('chapters')
        .select('*')
        .eq('id', lesson.chapter_id)
        .single()

      const { data: enrollment } = await supabase
        .from('user_courses')
        .select('*')
        .eq('course_id', courseId)
        .eq('user_id', user!.id)
        .neq('status', 'dropped')
        .maybeSingle()

      const { data: progress } = await supabase
        .from('user_lessons')
        .select('*')
        .eq('user_id', user!.id)
        .eq('lesson_id', lessonId)
        .maybeSingle()

      const { data: notes } = await supabase
        .from('lesson_notes')
        .select('*')
        .eq('user_id', user!.id)
        .eq('lesson_id', lessonId)
        .order('created_at', { ascending: false })

      return {
        lesson,
        chapter,
        enrollment,
        progress,
        notes: notes ?? [],
        canAccess: Boolean(lesson.is_free || enrollment),
      }
    },
  })

  const media = useMemo(() => embedVideo(data?.lesson.video_url ?? null), [data?.lesson.video_url])

  const completeMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('user_lessons').upsert({
        user_id: user!.id,
        lesson_id: lessonId,
        is_completed: true,
        watched_duration: data?.progress?.watched_duration ?? 0,
      })
      if (error) {
        throw error
      }
      await supabase
        .from('user_courses')
        .update({ current_lesson_id: lessonId })
        .eq('course_id', courseId)
        .eq('user_id', user!.id)
    },
    onSuccess: async () => {
      toast.success(t('common.success'))
      await queryClient.invalidateQueries({ queryKey: ['lesson', lessonId, user?.id] })
      await queryClient.invalidateQueries({ queryKey: ['learn-course', courseId, user?.id] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const noteMutation = useMutation({
    mutationFn: async () => {
      if (!note.trim()) {
        return
      }
      const { error } = await supabase.from('lesson_notes').insert({
        id: createId(),
        user_id: user!.id,
        lesson_id: lessonId,
        content: note.trim(),
        timestamp: 0,
      })
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      setNote('')
      toast.success(t('common.success'))
      await queryClient.invalidateQueries({ queryKey: ['lesson', lessonId, user?.id] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  if (isLoading || !data) {
    return <p className="text-[var(--color-muted-foreground)]">{t('common.loading')}</p>
  }

  if (!data.canAccess) {
    return (
      <div className="space-y-4">
        <p>{t('account.lockedLesson')}</p>
        <Button asChild>
          <Link href={`/panel/courses`}>{t('nav.courses')}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--color-muted-foreground)]">{data.chapter?.title}</p>
          <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/panel/account/courses/${courseId}`}>{t('common.back')}</Link>
          </Button>
          <Button
            onClick={() => completeMutation.mutate()}
            disabled={completeMutation.isPending || data.progress?.is_completed}
          >
            {data.progress?.is_completed ? t('account.completed') : t('account.markComplete')}
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {media.kind === 'iframe' ? (
            <div className="aspect-video w-full">
              <iframe
                title={data.lesson.title}
                src={media.src}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          ) : media.kind === 'video' ? (
            <video controls className="aspect-video w-full bg-black" src={media.src} />
          ) : (
            <div className="flex aspect-video items-center justify-center bg-[var(--color-muted)] text-sm text-[var(--color-muted-foreground)]">
              No video
            </div>
          )}
        </CardContent>
      </Card>

      {data.lesson.content ? (
        <Card>
          <CardContent className="whitespace-pre-wrap p-6 text-sm leading-7">
            {data.lesson.content}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('account.notes')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
          <Button onClick={() => noteMutation.mutate()} disabled={noteMutation.isPending}>
            {t('account.addNote')}
          </Button>
          <ul className="space-y-2">
            {data.notes.map((item) => (
              <li key={item.id} className="rounded-md border p-3 text-sm">
                {item.content}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
