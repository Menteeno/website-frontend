"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { routeParam } from "@/features/panel/lib/params";
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from '@/hooks/use-translation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { createId, slugify } from '@/lib/utils'
import type { CourseStatus, Lesson } from '@/types/database'

interface CourseForm {
  title: string
  slug: string
  short_description: string
  description: string
  status: CourseStatus
  price: number
  sale_price: string
  currency: string
}

export function AdminCourseEditPage() {
    const params = useParams()
  const courseId = routeParam(params.courseId)
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form, setForm] = useState<CourseForm | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-course', courseId],
    enabled: Boolean(courseId),
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

      return {
        course,
        chapters: chapters.map((chapter) => ({
          ...chapter,
          lessons: lessons.filter((lesson) => lesson.chapter_id === chapter.id),
        })),
      }
    },
  })

  useEffect(() => {
    if (data?.course) {
      setForm({
        title: data.course.title,
        slug: data.course.slug,
        short_description: data.course.short_description ?? '',
        description: data.course.description ?? '',
        status: data.course.status,
        price: data.course.price,
        sale_price: data.course.sale_price?.toString() ?? '',
        currency: data.course.currency,
      })
    }
  }, [data?.course])

  const saveCourse = useMutation({
    mutationFn: async () => {
      if (!form) {
        return
      }
      let cover_path = data?.course.cover_path ?? null
      if (coverFile) {
        const path = `${courseId}/${coverFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('course-covers')
          .upload(path, coverFile, { upsert: true })
        if (uploadError) {
          throw uploadError
        }
        cover_path = path
      }

      const { error } = await supabase
        .from('courses')
        .update({
          title: form.title,
          slug: form.slug || slugify(form.title),
          short_description: form.short_description || null,
          description: form.description || null,
          status: form.status,
          price: Number(form.price) || 0,
          sale_price: form.sale_price === '' ? null : Number(form.sale_price),
          currency: form.currency,
          cover_path,
        })
        .eq('id', courseId)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      toast.success(t('panel.common.success'))
      await queryClient.invalidateQueries({ queryKey: ['admin-course', courseId] })
      await queryClient.invalidateQueries({ queryKey: ['admin-courses'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const addChapter = useMutation({
    mutationFn: async () => {
      const order = data?.chapters.length ?? 0
      const { error } = await supabase.from('chapters').insert({
        id: createId(),
        course_id: courseId,
        title: `${t('panel.admin.chapters')} ${order + 1}`,
        order,
      })
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-course', courseId] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const updateChapter = useMutation({
    mutationFn: async (payload: { id: string; title: string; order: number }) => {
      const { error } = await supabase
        .from('chapters')
        .update({ title: payload.title, order: payload.order })
        .eq('id', payload.id)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-course', courseId] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const deleteChapter = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('chapters').delete().eq('id', id)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-course', courseId] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const addLesson = useMutation({
    mutationFn: async (chapterId: string) => {
      const chapter = data?.chapters.find((c) => c.id === chapterId)
      const order = chapter?.lessons.length ?? 0
      const { error } = await supabase.from('lessons').insert({
        id: createId(),
        chapter_id: chapterId,
        title: `${t('panel.admin.lessons')} ${order + 1}`,
        order,
        is_free: false,
      })
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-course', courseId] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const updateLesson = useMutation({
    mutationFn: async (lesson: Pick<Lesson, 'id' | 'title' | 'video_url' | 'order' | 'is_free' | 'content'>) => {
      const { error } = await supabase
        .from('lessons')
        .update({
          title: lesson.title,
          video_url: lesson.video_url,
          order: lesson.order,
          is_free: lesson.is_free,
          content: lesson.content,
        })
        .eq('id', lesson.id)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      toast.success(t('panel.common.success'))
      await queryClient.invalidateQueries({ queryKey: ['admin-course', courseId] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const deleteLesson = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('lessons').delete().eq('id', id)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-course', courseId] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  if (isLoading || !form || !data) {
    return <p className="text-[var(--color-muted-foreground)]">{t('panel.common.loading')}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{t('panel.admin.editCourse')}</h1>
        <Button asChild variant="outline">
          <Link href="/panel/admin/courses">{t('panel.common.back')}</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('panel.admin.editCourse')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                dir="ltr"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t('panel.courses.details')}</Label>
            <Input
              value={form.short_description}
              onChange={(e) => setForm({ ...form, short_description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={5}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>{t('panel.admin.status')}</Label>
              <Select
                value={form.status}
                onValueChange={(value: CourseStatus) => setForm({ ...form, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t('panel.admin.draft')}</SelectItem>
                  <SelectItem value="published">{t('panel.admin.published')}</SelectItem>
                  <SelectItem value="archived">{t('panel.admin.archived')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('panel.courses.price')}</Label>
              <Input
                type="number"
                dir="ltr"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Sale price</Label>
              <Input
                type="number"
                dir="ltr"
                value={form.sale_price}
                onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t('panel.admin.cover')}</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <Button onClick={() => saveCourse.mutate()} disabled={saveCourse.isPending}>
            {t('panel.common.save')}
          </Button>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('panel.admin.chapters')}</h2>
        <Button onClick={() => addChapter.mutate()}>{t('panel.admin.addChapter')}</Button>
      </div>

      {data.chapters.map((chapter) => (
        <ChapterEditor
          key={chapter.id}
          chapter={chapter}
          t={t}
          onSaveChapter={(payload) => updateChapter.mutate(payload)}
          onDeleteChapter={() => {
            if (window.confirm(t('panel.admin.deleteConfirm'))) {
              deleteChapter.mutate(chapter.id)
            }
          }}
          onAddLesson={() => addLesson.mutate(chapter.id)}
          onSaveLesson={(lesson) => updateLesson.mutate(lesson)}
          onDeleteLesson={(id) => {
            if (window.confirm(t('panel.admin.deleteConfirm'))) {
              deleteLesson.mutate(id)
            }
          }}
        />
      ))}
    </div>
  )
}

function ChapterEditor({
  chapter,
  t,
  onSaveChapter,
  onDeleteChapter,
  onAddLesson,
  onSaveLesson,
  onDeleteLesson,
}: {
  chapter: {
    id: string
    title: string
    order: number
    lessons: Lesson[]
  }
  t: (key: string) => string
  onSaveChapter: (payload: { id: string; title: string; order: number }) => void
  onDeleteChapter: () => void
  onAddLesson: () => void
  onSaveLesson: (
    lesson: Pick<Lesson, 'id' | 'title' | 'video_url' | 'order' | 'is_free' | 'content'>,
  ) => void
  onDeleteLesson: (id: string) => void
}) {
  const [title, setTitle] = useState(chapter.title)
  const [order, setOrder] = useState(chapter.order)

  useEffect(() => {
    setTitle(chapter.title)
    setOrder(chapter.order)
  }, [chapter.title, chapter.order])

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="text-base">{t('panel.admin.chapters')}</CardTitle>
        <div className="grid gap-3 sm:grid-cols-[1fr_120px_auto_auto]">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input
            type="number"
            dir="ltr"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
          <Button
            size="sm"
            onClick={() => onSaveChapter({ id: chapter.id, title, order })}
          >
            {t('panel.common.save')}
          </Button>
          <Button size="sm" variant="destructive" onClick={onDeleteChapter}>
            {t('panel.common.delete')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <h3 className="font-medium">{t('panel.admin.lessons')}</h3>
          <Button size="sm" variant="secondary" onClick={onAddLesson}>
            {t('panel.admin.addLesson')}
          </Button>
        </div>
        {chapter.lessons.map((lesson) => (
          <LessonEditor
            key={lesson.id}
            lesson={lesson}
            t={t}
            onSave={onSaveLesson}
            onDelete={() => onDeleteLesson(lesson.id)}
          />
        ))}
      </CardContent>
    </Card>
  )
}

function LessonEditor({
  lesson,
  t,
  onSave,
  onDelete,
}: {
  lesson: Lesson
  t: (key: string) => string
  onSave: (
    lesson: Pick<Lesson, 'id' | 'title' | 'video_url' | 'order' | 'is_free' | 'content'>,
  ) => void
  onDelete: () => void
}) {
  const [state, setState] = useState({
    title: lesson.title,
    video_url: lesson.video_url ?? '',
    order: lesson.order,
    is_free: lesson.is_free,
    content: lesson.content ?? '',
  })

  useEffect(() => {
    setState({
      title: lesson.title,
      video_url: lesson.video_url ?? '',
      order: lesson.order,
      is_free: lesson.is_free,
      content: lesson.content ?? '',
    })
  }, [lesson])

  return (
    <div className="space-y-3 rounded-md border p-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          value={state.title}
          onChange={(e) => setState((s) => ({ ...s, title: e.target.value }))}
        />
        <Input
          type="number"
          dir="ltr"
          value={state.order}
          onChange={(e) => setState((s) => ({ ...s, order: Number(e.target.value) }))}
        />
      </div>
      <Input
        dir="ltr"
        placeholder={t('panel.admin.videoUrl')}
        value={state.video_url}
        onChange={(e) => setState((s) => ({ ...s, video_url: e.target.value }))}
      />
      <Textarea
        value={state.content}
        onChange={(e) => setState((s) => ({ ...s, content: e.target.value }))}
        rows={3}
      />
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={state.is_free}
            onCheckedChange={(checked) => setState((s) => ({ ...s, is_free: checked }))}
          />
          {t('panel.admin.isFree')}
        </label>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              onSave({
                id: lesson.id,
                title: state.title,
                video_url: state.video_url || null,
                order: state.order,
                is_free: state.is_free,
                content: state.content || null,
              })
            }
          >
            {t('panel.common.save')}
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            {t('panel.common.delete')}
          </Button>
        </div>
      </div>
    </div>
  )
}
