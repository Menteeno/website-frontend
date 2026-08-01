-- Menteeno LMS schema for Supabase (phases 1-4)
-- IDs for domain tables use text (ULID) to preserve Laravel migration data.
-- profiles.id uses auth.users UUID.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  legacy_ulid text unique,
  first_name text,
  last_name text,
  email text,
  mobile text,
  job_title text,
  birth_date date,
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles (email);
create index profiles_legacy_ulid_idx on public.profiles (legacy_ulid);

-- ---------------------------------------------------------------------------
-- Courses / Chapters / Lessons
-- ---------------------------------------------------------------------------
create table public.courses (
  id text primary key,
  title text not null,
  short_description text,
  description text,
  slug text not null unique,
  instructor_id uuid references public.profiles (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  price bigint not null default 0,
  sale_price bigint,
  currency text not null default 'IRT',
  cover_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index courses_status_idx on public.courses (status);
create index courses_instructor_id_idx on public.courses (instructor_id);

create table public.chapters (
  id text primary key,
  course_id text not null references public.courses (id) on delete cascade,
  title text not null,
  description text,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index chapters_course_id_idx on public.chapters (course_id);

create table public.lessons (
  id text primary key,
  chapter_id text not null references public.chapters (id) on delete cascade,
  title text not null,
  content text,
  video_url text,
  duration integer,
  "order" integer not null default 0,
  is_free boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index lessons_chapter_id_idx on public.lessons (chapter_id);

-- ---------------------------------------------------------------------------
-- Enrollments & progress
-- ---------------------------------------------------------------------------
create table public.user_courses (
  id text primary key,
  course_id text not null references public.courses (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'enrolled' check (status in ('enrolled', 'completed', 'dropped')),
  current_lesson_id text references public.lessons (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, user_id)
);

create index user_courses_user_id_idx on public.user_courses (user_id);

create table public.user_lessons (
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id text not null references public.lessons (id) on delete cascade,
  watched_duration integer not null default 0,
  is_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.lesson_notes (
  id text primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id text not null references public.lessons (id) on delete cascade,
  content text not null,
  "timestamp" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index lesson_notes_user_lesson_idx on public.lesson_notes (user_id, lesson_id);

create table public.discussions (
  id text primary key,
  lesson_id text not null references public.lessons (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  parent_id text references public.discussions (id) on delete cascade,
  content text not null,
  type text not null default 'question' check (type in ('question', 'answer', 'reply')),
  is_resolved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index discussions_lesson_id_idx on public.discussions (lesson_id);

-- Public curriculum summary (no video_url / content). Runs as owner to bypass lessons RLS.
create or replace view public.lesson_summaries
with (security_invoker = false)
as
select
  l.id,
  l.chapter_id,
  l.title,
  l.duration,
  l."order",
  l.is_free,
  c.id as course_id
from public.lessons l
join public.chapters ch on ch.id = l.chapter_id
join public.courses c on c.id = ch.course_id
where c.status = 'published';

grant select on public.lesson_summaries to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger courses_updated_at before update on public.courses
  for each row execute function public.set_updated_at();
create trigger chapters_updated_at before update on public.chapters
  for each row execute function public.set_updated_at();
create trigger lessons_updated_at before update on public.lessons
  for each row execute function public.set_updated_at();
create trigger user_courses_updated_at before update on public.user_courses
  for each row execute function public.set_updated_at();
create trigger user_lessons_updated_at before update on public.user_lessons
  for each row execute function public.set_updated_at();
create trigger lesson_notes_updated_at before update on public.lesson_notes
  for each row execute function public.set_updated_at();
create trigger discussions_updated_at before update on public.discussions
  for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

create or replace function public.is_enrolled(p_course_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_courses
    where course_id = p_course_id
      and user_id = auth.uid()
      and status <> 'dropped'
  );
$$;

create or replace function public.lesson_course_id(p_lesson_id text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select c.course_id
  from public.lessons l
  join public.chapters c on c.id = l.chapter_id
  where l.id = p_lesson_id;
$$;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'given_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'family_name', '')
  )
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.chapters enable row level security;
alter table public.lessons enable row level security;
alter table public.user_courses enable row level security;
alter table public.user_lessons enable row level security;
alter table public.lesson_notes enable row level security;
alter table public.discussions enable row level security;

-- Profiles
create policy "Profiles are viewable by authenticated users"
  on public.profiles for select to authenticated
  using (true);

create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

create policy "Admins can insert profiles"
  on public.profiles for insert to authenticated
  with check (public.is_admin() or id = auth.uid());

-- Courses
create policy "Published courses are public"
  on public.courses for select
  using (status = 'published' or public.is_admin() or instructor_id = auth.uid());

create policy "Admins manage courses"
  on public.courses for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Chapters
create policy "Chapters readable with course access"
  on public.chapters for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.courses c
      where c.id = course_id
        and (c.status = 'published' or c.instructor_id = auth.uid())
    )
  );

create policy "Admins manage chapters"
  on public.chapters for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Lessons (video_url only for free / enrolled / admin / instructor)
create policy "Lessons readable when free enrolled or admin"
  on public.lessons for select
  using (
    public.is_admin()
    or is_free = true
    or exists (
      select 1
      from public.chapters ch
      join public.courses c on c.id = ch.course_id
      where ch.id = chapter_id
        and (
          c.instructor_id = auth.uid()
          or public.is_enrolled(c.id)
        )
    )
  );

create policy "Admins manage lessons"
  on public.lessons for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- User courses
create policy "Users see own enrollments"
  on public.user_courses for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy "Admins manage enrollments"
  on public.user_courses for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Users can enroll themselves"
  on public.user_courses for insert to authenticated
  with check (user_id = auth.uid());

create policy "Users update own enrollment progress"
  on public.user_courses for update to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- User lessons
create policy "Users manage own lesson progress"
  on public.user_lessons for all to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- Lesson notes
create policy "Users manage own notes"
  on public.lesson_notes for all to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- Discussions
create policy "Discussions readable when enrolled or free or admin"
  on public.discussions for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.lessons l
      where l.id = lesson_id and l.is_free = true
    )
    or public.is_enrolled(public.lesson_course_id(lesson_id))
  );

create policy "Users create discussions when enrolled"
  on public.discussions for insert to authenticated
  with check (
    user_id = auth.uid()
    and (
      public.is_admin()
      or exists (select 1 from public.lessons l where l.id = lesson_id and l.is_free = true)
      or public.is_enrolled(public.lesson_course_id(lesson_id))
    )
  );

create policy "Users update own discussions"
  on public.discussions for update to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

create policy "Users delete own discussions"
  on public.discussions for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('course-covers', 'course-covers', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload own avatar"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update own avatar"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Course covers are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'course-covers');

create policy "Admins manage course covers"
  on storage.objects for all to authenticated
  using (bucket_id = 'course-covers' and public.is_admin())
  with check (bucket_id = 'course-covers' and public.is_admin());
