"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuth } from "@/features/panel/auth/auth-context";
import { usePanelTranslation } from "@/features/panel/i18n/use-panel-translation";

function Loading() {
  const { t } = usePanelTranslation();
  return (
    <div className="p-8 text-center text-muted-foreground">
      {t("common.loading")}
    </div>
  );
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/panel/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Loading />;
  }

  return <>{children}</>;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.replace(`/panel/login?from=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!isAdmin) {
      router.replace("/panel/account");
    }
  }, [loading, user, isAdmin, router, pathname]);

  if (loading || !user || !isAdmin) {
    return <Loading />;
  }

  return <>{children}</>;
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/panel/account");
    }
  }, [loading, user, router]);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Loading />;
  }

  return <>{children}</>;
}
