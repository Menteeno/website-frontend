"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/panel/auth/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t } = useTranslation();
  const { user, isAdmin, signOut } = useAuth();
  const pathname = usePathname();

  const navClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2",
      pathname === href || pathname.startsWith(`${href}/`)
        ? "bg-muted font-medium"
        : "hover:bg-muted",
    );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/panel"
          className="text-xl font-bold tracking-tight text-primary"
        >
          {t("panel.common.appName")}
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 text-sm sm:gap-2">
          <Link href="/panel/courses" className={navClass("/panel/courses")}>
            {t("panel.nav.courses")}
          </Link>
          {user ? (
            <>
              <Link href="/panel/account" className={navClass("/panel/account")}>
                {t("panel.nav.account")}
              </Link>
              {isAdmin ? (
                <Link href="/panel/admin" className={navClass("/panel/admin")}>
                  {t("panel.nav.admin")}
                </Link>
              ) : null}
              <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                {t("panel.nav.logout")}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/panel/login">{t("panel.nav.login")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/panel/register">{t("panel.nav.register")}</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Menteeno
      </footer>
    </div>
  );
}
