"use client";

import { useEffect, useState } from 'react'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/features/panel/auth/auth-context'
import { supabase } from '@/lib/supabase'

export function ProfilePage() {
  const { t } = useTranslation()
  const { user, profile, refreshProfile } = useAuth()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    mobile: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
        job_title: profile.job_title ?? '',
        mobile: profile.mobile ?? '',
      })
    }
  }, [profile])

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!user) {
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: form.first_name,
          last_name: form.last_name,
          job_title: form.job_title || null,
          mobile: form.mobile || null,
          email: user.email ?? null,
        })
        .eq('id', user.id)
      if (error) {
        throw error
      }
      await refreshProfile()
      toast.success(t('account.profileSaved'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>{t('account.profileTitle')}</CardTitle>
          <CardDescription>{t('auth.completeProfileHint')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={(e) => void onSubmit(e)}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="first_name">{t('auth.firstName')}</Label>
                <Input
                  id="first_name"
                  required
                  value={form.first_name}
                  onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">{t('auth.lastName')}</Label>
                <Input
                  id="last_name"
                  required
                  value={form.last_name}
                  onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="job_title">Job</Label>
              <Input
                id="job_title"
                value={form.job_title}
                onChange={(e) => setForm((f) => ({ ...f, job_title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                dir="ltr"
                value={form.mobile}
                onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {t('common.save')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
