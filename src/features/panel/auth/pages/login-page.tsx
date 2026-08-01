"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { supabase } from '@/lib/supabase'

function authRedirectTo(path: string): string {
  return `${window.location.origin}${path}`
}

export function LoginPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [magicMode, setMagicMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (magicMode) {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: authRedirectTo('/panel/auth/callback') },
        })
        if (error) {
          throw error
        }
        toast.success(t('auth.magicLinkSent'))
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          throw error
        }
        router.push('/panel/account')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.invalidCredentials'))
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: authRedirectTo('/panel/auth/callback') },
    })
    if (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>{t('auth.loginTitle')}</CardTitle>
          <CardDescription>{t('common.appName')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={(e) => void onSubmit(e)}>
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
              />
            </div>
            {!magicMode ? (
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  dir="ltr"
                />
              </div>
            ) : null}
            <Button type="submit" disabled={loading}>
              {magicMode ? t('auth.sendMagicLink') : t('nav.login')}
            </Button>
          </form>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setMagicMode((v) => !v)}
          >
            {magicMode ? t('auth.loginWithPassword') : t('auth.loginWithMagicLink')}
          </Button>
          <div className="text-sm">
            <Link className="text-[var(--color-primary)] hover:underline" href="/panel/forgot-password">
              {t('auth.forgotPassword')}
            </Link>
          </div>
          <Separator />
          <Button type="button" variant="outline" onClick={() => void loginWithGoogle()}>
            {t('auth.loginWithGoogle')}
          </Button>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {t('auth.noAccount')}{' '}
            <Link className="text-[var(--color-primary)] hover:underline" href="/panel/register">
              {t('nav.register')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
