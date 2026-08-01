-- Seed: 5 soft-skills courses for local/demo testing
-- Run in Supabase SQL Editor (bypasses RLS).

begin;

-- Courses
insert into public.courses (id, title, short_description, description, slug, status, price, sale_price, currency)
values
  (
    '01SEEDCOURSE00000000000001',
    'ارتباط مؤثر در محیط کار',
    'صحبت کردن شفاف، گوش دادن فعال و انتقال پیام بدون سوءتفاهم.',
    'در این دوره یاد می‌گیرید چطور در جلسات، ایمیل و گفت‌وگوهای روزمره شفاف‌تر ارتباط برقرار کنید؛ بازخورد بدهید و بشنوید؛ و تعارض‌های کوچک را قبل از بزرگ شدن حل کنید.',
    'effective-communication',
    'published',
    890000,
    690000,
    'IRT'
  ),
  (
    '01SEEDCOURSE00000000000002',
    'هوش هیجانی برای حرفه‌ای‌ها',
    'شناخت احساسات خود و دیگران و مدیریت واکنش در موقعیت‌های سخت.',
    'هوش هیجانی مهارتی است که کیفیت همکاری، رهبری و تصمیم‌گیری را بالا می‌برد. این دوره روی خودآگاهی، خودتنظیمی، همدلی و مهارت‌های اجتماعی تمرکز دارد.',
    'emotional-intelligence',
    'published',
    990000,
    null,
    'IRT'
  ),
  (
    '01SEEDCOURSE00000000000003',
    'مدیریت زمان و تمرکز',
    'اولویت‌بندی واقعی، کاهش حواس‌پرتی و ساختن عادت‌های پایدار.',
    'با تکنیک‌های عملی برنامه‌ریزی هفتگی، مدیریت انرژی (نه فقط زمان) و ساختن سیستم شخصی کار، بهره‌وری‌تان را بدون فرسودگی افزایش دهید.',
    'time-management-focus',
    'published',
    750000,
    0,
    'IRT'
  ),
  (
    '01SEEDCOURSE00000000000004',
    'کار تیمی و همکاری سازنده',
    'نقش‌ها، اعتماد، بازخورد و پیشبرد کار در تیم‌های چندتخصصی.',
    'یاد می‌گیرید چطور در تیم مشارکت مؤثر داشته باشید، مسئولیت را شفاف کنید، تعارض را سازنده مدیریت کنید و به خروجی مشترک برسید.',
    'teamwork-collaboration',
    'published',
    820000,
    650000,
    'IRT'
  ),
  (
    '01SEEDCOURSE00000000000005',
    'تفکر انتقادی و حل مسئله',
    'تحلیل مسئله، تصمیم‌گیری منطقی و اجتناب از سوگیری‌های رایج.',
    'این دوره به شما کمک می‌کند مسئله را درست تعریف کنید، گزینه‌ها را بسنجید، فرضیات را به چالش بکشید و راه‌حل‌های قابل اجرا ارائه دهید.',
    'critical-thinking-problem-solving',
    'published',
    1100000,
    850000,
    'IRT'
  )
on conflict (id) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  description = excluded.description,
  slug = excluded.slug,
  status = excluded.status,
  price = excluded.price,
  sale_price = excluded.sale_price,
  currency = excluded.currency,
  updated_at = now();

-- Chapters (2 per course)
insert into public.chapters (id, course_id, title, description, "order")
values
  ('01SEEDCHAPTER0000000000001', '01SEEDCOURSE00000000000001', 'مبانی ارتباط', 'پایه و اصول ارتباط شفاف', 0),
  ('01SEEDCHAPTER0000000000002', '01SEEDCOURSE00000000000001', 'تمرین در موقعیت‌های واقعی', 'کاربرد در جلسه، ایمیل و بازخورد', 1),
  ('01SEEDCHAPTER0000000000003', '01SEEDCOURSE00000000000002', 'خودآگاهی و خودتنظیمی', null, 0),
  ('01SEEDCHAPTER0000000000004', '01SEEDCOURSE00000000000002', 'همدلی و مهارت اجتماعی', null, 1),
  ('01SEEDCHAPTER0000000000005', '01SEEDCOURSE00000000000003', 'سیستم شخصی بهره‌وری', null, 0),
  ('01SEEDCHAPTER0000000000006', '01SEEDCOURSE00000000000003', 'تمرکز عمیق و عادت‌ها', null, 1),
  ('01SEEDCHAPTER0000000000007', '01SEEDCOURSE00000000000004', 'دینامیک تیم', null, 0),
  ('01SEEDCHAPTER0000000000008', '01SEEDCOURSE00000000000004', 'تعارض و بازخورد', null, 1),
  ('01SEEDCHAPTER0000000000009', '01SEEDCOURSE00000000000005', 'چارچوب حل مسئله', null, 0),
  ('01SEEDCHAPTER0000000000010', '01SEEDCOURSE00000000000005', 'تصمیم‌گیری بهتر', null, 1)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  "order" = excluded."order",
  updated_at = now();

-- Lessons (first lesson of each course is free for preview)
insert into public.lessons (id, chapter_id, title, content, video_url, duration, "order", is_free)
values
  -- Course 1
  (
    '01SEEDLESSON00000000000001',
    '01SEEDCHAPTER0000000000001',
    'ارتباط چیست و چرا مهم است؟',
    'ارتباط فقط حرف زدن نیست؛ انتقال معنا، نیت و احساس است. در این درس مدل ساده فرستنده-پیام-گیرنده را می‌بینید و اشتباهات رایج را مرور می‌کنید.',
    'https://www.youtube.com/watch?v=HAnw168huqA',
    720,
    0,
    true
  ),
  (
    '01SEEDLESSON00000000000002',
    '01SEEDCHAPTER0000000000001',
    'گوش دادن فعال',
    'تکنیک‌های پارافریز، سؤال باز و حضور کامل در گفت‌وگو.',
    null,
    900,
    1,
    false
  ),
  (
    '01SEEDLESSON00000000000003',
    '01SEEDCHAPTER0000000000002',
    'بازخورد سازنده',
    'چارچوب SBI و تمرین دادن بازخورد بدون ایجاد دفاع.',
    null,
    840,
    0,
    false
  ),
  -- Course 2
  (
    '01SEEDLESSON00000000000004',
    '01SEEDCHAPTER0000000000003',
    'نقشه احساسات روزمره',
    'شناخت محرک‌ها، برچسب‌گذاری احساسات و فاصله گرفتن از واکنش خودکار.',
    'https://www.youtube.com/watch?v=Y0dmTh0tTlY',
    780,
    0,
    true
  ),
  (
    '01SEEDLESSON00000000000005',
    '01SEEDCHAPTER0000000000003',
    'مدیریت استرس لحظه‌ای',
    'تنفس، توقف کوتاه و انتخاب پاسخ به‌جای واکنش.',
    null,
    660,
    1,
    false
  ),
  (
    '01SEEDLESSON00000000000006',
    '01SEEDCHAPTER0000000000004',
    'همدلی عملی در کار',
    'چطور دیدگاه طرف مقابل را بفهمید بدون اینکه موضع خود را از دست بدهید.',
    null,
    900,
    0,
    false
  ),
  -- Course 3 (free course via price 0)
  (
    '01SEEDLESSON00000000000007',
    '01SEEDCHAPTER0000000000005',
    'اولویت‌بندی با ماتریس اهمیت/فوریت',
    'تمرکز روی کارهای مهم، نه فقط فوری. ساختن لیست هفتگی واقع‌بینانه.',
    'https://www.youtube.com/watch?v=t6f7Q5u8Y8c',
    600,
    0,
    true
  ),
  (
    '01SEEDLESSON00000000000008',
    '01SEEDCHAPTER0000000000005',
    'برنامه‌ریزی انرژی‌محور',
    'تطبیق کارهای سخت با ساعات اوج انرژی شما.',
    null,
    720,
    1,
    false
  ),
  (
    '01SEEDLESSON00000000000009',
    '01SEEDCHAPTER0000000000006',
    'بلاک تمرکز ۹۰ دقیقه‌ای',
    'حذف اعلان‌ها، تعریف هدف جلسه تمرکز و بازیابی کوتاه.',
    null,
    780,
    0,
    false
  ),
  -- Course 4
  (
    '01SEEDLESSON00000000000010',
    '01SEEDCHAPTER0000000000007',
    'نقش‌ها و انتظارها در تیم',
    'شفاف‌سازی مسئولیت، مالکیت و تعریف «تمام‌شده».',
    'https://www.youtube.com/watch?v=fk_A0XSZjVI',
    700,
    0,
    true
  ),
  (
    '01SEEDLESSON00000000000011',
    '01SEEDCHAPTER0000000000007',
    'اعتماد و روان‌شناسی ایمنی',
    'چطور فضای امن برای سؤال پرسیدن و اشتباه کردن بسازید.',
    null,
    860,
    1,
    false
  ),
  (
    '01SEEDLESSON00000000000012',
    '01SEEDCHAPTER0000000000008',
    'حل تعارض بدون باخت-باخت',
    'جدا کردن مسئله از شخص، پیدا کردن منافع مشترک.',
    null,
    920,
    0,
    false
  ),
  -- Course 5
  (
    '01SEEDLESSON00000000000013',
    '01SEEDCHAPTER0000000000009',
    'تعریف درست مسئله',
    '۵ چرا، بیان مسئله قابل اندازه‌گیری و تشخیص علامت از علت.',
    'https://www.youtube.com/watch?v=arj7oStGLkU',
    740,
    0,
    true
  ),
  (
    '01SEEDLESSON00000000000014',
    '01SEEDCHAPTER0000000000009',
    'تولید و غربال گزینه‌ها',
    'ایده‌پردازی واگرا و بعد همگرا کردن با معیارهای شفاف.',
    null,
    800,
    1,
    false
  ),
  (
    '01SEEDLESSON00000000000015',
    '01SEEDCHAPTER0000000000010',
    'سوگیری‌ها و تله‌های تصمیم',
    'تأییدطلبی، اثر لنگر و چطور چک‌لیست تصمیم بسازید.',
    null,
    880,
    0,
    false
  )
on conflict (id) do update set
  title = excluded.title,
  content = excluded.content,
  video_url = excluded.video_url,
  duration = excluded.duration,
  "order" = excluded."order",
  is_free = excluded.is_free,
  updated_at = now();

commit;
