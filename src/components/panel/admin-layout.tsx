"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BookOpen, LayoutDashboard, Users } from "lucide-react";
import { SiteHeader } from "@/components/panel/public-layout";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar"
import { Footer } from "@/components/footer"

const links = [
  { href: "/panel/admin", end: true, icon: LayoutDashboard, labelKey: "panel.admin.dashboard" },
  { href: "/panel/admin/courses", end: false, icon: BookOpen, labelKey: "panel.admin.courses" },
  { href: "/panel/admin/users", end: false, icon: Users, labelKey: "panel.admin.users" },
] as const;

export function AdminLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-56">
          <div className="rounded-lg border bg-card p-3">
            <p className="mb-3 px-2 text-sm font-semibold text-muted-foreground">
              {t("panel.admin.title")}
            </p>
            <nav className="flex flex-col gap-1">
              {links.map((link) => {
                const active = link.end
                  ? pathname === link.href || pathname === `${link.href}/`
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {t(`panel.${link.labelKey}`)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
