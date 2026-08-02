-- Course payments via Zibal (orders stored server-side; enrollment after verify)

create table public.payment_orders (
  id text primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id text not null references public.courses (id) on delete restrict,
  amount bigint not null check (amount >= 0),
  currency text not null default 'IRT',
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'cancelled')),
  zibal_track_id bigint unique,
  zibal_ref_number text,
  description text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payment_orders_user_id_idx on public.payment_orders (user_id);
create index payment_orders_course_id_idx on public.payment_orders (course_id);
create index payment_orders_status_idx on public.payment_orders (status);

-- One successful purchase per user/course
create unique index payment_orders_paid_user_course_uidx
  on public.payment_orders (user_id, course_id)
  where status = 'paid';

create trigger payment_orders_updated_at before update on public.payment_orders
  for each row execute function public.set_updated_at();

-- Final price helper (matches courseFinalPrice in the app)
create or replace function public.course_final_price(p_price bigint, p_sale_price bigint)
returns bigint
language sql
immutable
as $$
  select case
    when p_sale_price is not null and p_sale_price >= 0 then p_sale_price
    else p_price
  end;
$$;

create or replace function public.is_course_free(p_course_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.courses c
    where c.id = p_course_id
      and public.course_final_price(c.price, c.sale_price) = 0
  );
$$;

alter table public.payment_orders enable row level security;

create policy "Users see own payment orders"
  on public.payment_orders for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy "Admins manage payment orders"
  on public.payment_orders for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Tighten self-enroll: only free courses from the client
drop policy if exists "Users can enroll themselves" on public.user_courses;

create policy "Users can enroll themselves in free courses"
  on public.user_courses for insert to authenticated
  with check (
    user_id = auth.uid()
    and public.is_course_free(course_id)
  );
