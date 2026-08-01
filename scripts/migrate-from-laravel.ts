/**
 * Migrate LMS data from a Laravel JSON export into Supabase.
 *
 * 1) On Laravel:
 *    php artisan tinker
 *    Or dump via SQL / custom command into export.json
 *
 * Expected export shape (see ExportPayload below).
 *
 * 2) Create users in Supabase Auth first (Dashboard or Admin API) and fill
 *    userMap: { "<laravel-ulid>": "<supabase-auth-uuid>" }
 *
 * 3) Run:
 *    cd frontend
 *    SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/migrate-from-laravel.ts ./export.json ./user-map.json
 *
 * Requires service role key (server-side only — never ship to the browser).
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type ExportPayload = {
  courses: Array<{
    id: string
    title: string
    short_description: string | null
    description: string | null
    slug: string
    user_id: string
    status: 'draft' | 'published' | 'archived'
    price: number
    sale_price: number | null
    currency: string
    created_at?: string
    updated_at?: string
  }>
  chapters: Array<{
    id: string
    course_id: string
    title: string
    description: string | null
    order: number
  }>
  lessons: Array<{
    id: string
    chapter_id: string
    title: string
    content: string | null
    video_url: string | null
    duration: number | null
    order: number
    is_free: boolean
  }>
  user_courses: Array<{
    id: string
    course_id: string
    user_id: string
    status: 'enrolled' | 'completed' | 'dropped'
    current_lesson_id: string | null
  }>
  user_lessons?: Array<{
    user_id: string
    lesson_id: string
    watched_duration: number
    is_completed: boolean
  }>
  lesson_notes?: Array<{
    id: string
    user_id: string
    lesson_id: string
    content: string
    timestamp: number
  }>
}

async function main(): Promise<void> {
  const exportPath = resolve(process.argv[2] || './export.json')
  const mapPath = resolve(process.argv[3] || './user-map.json')
  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  }

  const payload = JSON.parse(readFileSync(exportPath, 'utf8')) as ExportPayload
  const userMap = JSON.parse(readFileSync(mapPath, 'utf8')) as Record<string, string>
  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const mapUser = (legacyId: string): string | null => userMap[legacyId] ?? null

  // Stamp legacy_ulid on profiles when mapping exists
  for (const [legacy, uuid] of Object.entries(userMap)) {
    const { error } = await supabase
      .from('profiles')
      .update({ legacy_ulid: legacy })
      .eq('id', uuid)
    if (error) {
      console.warn(`profile legacy_ulid ${legacy}:`, error.message)
    }
  }

  for (const course of payload.courses) {
    const instructorId = mapUser(course.user_id)
    const { error } = await supabase.from('courses').upsert({
      id: course.id,
      title: course.title,
      short_description: course.short_description,
      description: course.description,
      slug: course.slug,
      instructor_id: instructorId,
      status: course.status,
      price: course.price,
      sale_price: course.sale_price,
      currency: course.currency,
    })
    if (error) {
      throw new Error(`course ${course.id}: ${error.message}`)
    }
  }
  console.log(`courses: ${payload.courses.length}`)

  for (const chapter of payload.chapters) {
    const { error } = await supabase.from('chapters').upsert({
      id: chapter.id,
      course_id: chapter.course_id,
      title: chapter.title,
      description: chapter.description,
      order: chapter.order,
    })
    if (error) {
      throw new Error(`chapter ${chapter.id}: ${error.message}`)
    }
  }
  console.log(`chapters: ${payload.chapters.length}`)

  for (const lesson of payload.lessons) {
    const { error } = await supabase.from('lessons').upsert({
      id: lesson.id,
      chapter_id: lesson.chapter_id,
      title: lesson.title,
      content: lesson.content,
      video_url: lesson.video_url,
      duration: lesson.duration,
      order: lesson.order,
      is_free: lesson.is_free,
    })
    if (error) {
      throw new Error(`lesson ${lesson.id}: ${error.message}`)
    }
  }
  console.log(`lessons: ${payload.lessons.length}`)

  for (const row of payload.user_courses) {
    const userId = mapUser(row.user_id)
    if (!userId) {
      console.warn(`skip enrollment ${row.id}: no user map for ${row.user_id}`)
      continue
    }
    const { error } = await supabase.from('user_courses').upsert({
      id: row.id,
      course_id: row.course_id,
      user_id: userId,
      status: row.status,
      current_lesson_id: row.current_lesson_id,
    })
    if (error) {
      throw new Error(`user_course ${row.id}: ${error.message}`)
    }
  }
  console.log(`user_courses: ${payload.user_courses.length}`)

  for (const row of payload.user_lessons ?? []) {
    const userId = mapUser(row.user_id)
    if (!userId) {
      continue
    }
    const { error } = await supabase.from('user_lessons').upsert({
      user_id: userId,
      lesson_id: row.lesson_id,
      watched_duration: row.watched_duration,
      is_completed: row.is_completed,
    })
    if (error) {
      console.warn(`user_lesson:`, error.message)
    }
  }

  for (const row of payload.lesson_notes ?? []) {
    const userId = mapUser(row.user_id)
    if (!userId) {
      continue
    }
    const { error } = await supabase.from('lesson_notes').upsert({
      id: row.id,
      user_id: userId,
      lesson_id: row.lesson_id,
      content: row.content,
      timestamp: row.timestamp,
    })
    if (error) {
      console.warn(`lesson_note:`, error.message)
    }
  }

  console.log('Migration finished.')
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
