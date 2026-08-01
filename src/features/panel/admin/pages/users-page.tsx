"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from '@/features/panel/i18n/use-panel-translation'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { supabase } from '@/lib/supabase'

export function AdminUsersPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) {
        throw error
      }
      return data
    },
  })

  const toggleAdmin = useMutation({
    mutationFn: async ({ id, is_admin }: { id: string; is_admin: boolean }) => {
      const { error } = await supabase.from('profiles').update({ is_admin }).eq('id', id)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      toast.success(t('common.success'))
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  if (isLoading) {
    return <p className="text-[var(--color-muted-foreground)]">{t('common.loading')}</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('admin.users')}</h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{t('admin.usersHint')}</p>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle className="text-base">
                  {[user.first_name, user.last_name].filter(Boolean).join(' ') || user.email || user.id}
                </CardTitle>
                <CardDescription dir="ltr">{user.email}</CardDescription>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <span>{t('admin.makeAdmin')}</span>
                <Switch
                  checked={user.is_admin}
                  onCheckedChange={(checked) =>
                    toggleAdmin.mutate({ id: user.id, is_admin: checked })
                  }
                />
              </label>
            </CardHeader>
            <CardContent className="text-xs text-[var(--color-muted-foreground)]" dir="ltr">
              {user.id}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
