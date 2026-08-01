"use client";

import { useRouter } from "next/navigation";
import { useEffect } from 'react'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { supabase } from '@/lib/supabase'

export function AuthCallbackPage() {
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    let cancelled = false

    void (async () => {
      const { data, error } = await supabase.auth.getSession()
      if (cancelled) {
        return
      }
      if (error || !data.session) {
        router.replace('/panel/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name,last_name')
        .eq('id', data.session.user.id)
        .maybeSingle()

      const needsProfile = !profile?.first_name || !profile?.last_name
      router.replace(needsProfile ? '/panel/account/profile' : '/panel/account')
    })()

    return () => {
      cancelled = true
    }
  }, [router])

  return <div className="p-8 text-center text-[var(--color-muted-foreground)]">{t('common.loading')}</div>
}
