"use client";

import Link from "next/link";
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/panel/auth/auth-context'

export function HomePage() {
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <section className="flex min-h-[70vh] flex-col justify-center gap-8 py-10">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
          {t('common.appName')}
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {t('home.headline')}
        </h1>
        <p className="text-lg text-[var(--color-muted-foreground)]">{t('home.subheadline')}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="/panel/courses">{t('home.ctaCourses')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={user ? '/panel/account' : '/panel/login'}>{t('home.ctaAccount')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
