"use client";

import Link from "next/link";
import { useState } from 'react'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'

function authRedirectTo(path: string): string {
  return `${window.location.origin}${path}`
}

export function ForgotPasswordPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: authRedirectTo('/panel/auth/callback'),
      })
      if (error) {
        throw error
      }
      toast.success(t('auth.resetSent'))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>{t('auth.resetTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={(e) => void onSubmit(e)}>
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {t('auth.sendMagicLink')}
            </Button>
          </form>
          <p className="mt-4 text-sm">
            <Link className="text-[var(--color-primary)] hover:underline" href="/panel/login">
              {t('common.back')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
