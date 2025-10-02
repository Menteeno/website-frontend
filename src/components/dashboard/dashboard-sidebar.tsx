"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import {
  BarChart3,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Get current locale from pathname
  const locale = pathname.split("/")[1] || "en";

  const navigationItems = [
    {
      name: t("dashboard.sidebar.dashboard"),
      href: `/${locale}/dashboard`,
      icon: Home,
      isActive:
        pathname === `/${locale}/dashboard` || pathname.endsWith("/dashboard"),
    },
    {
      name: t("dashboard.sidebar.surveys"),
      href: `/${locale}/dashboard/surveys`,
      icon: FileText,
      isActive: pathname.includes("/surveys"),
    },
    {
      name: t("dashboard.sidebar.analytics"),
      href: `/${locale}/dashboard/analytics`,
      icon: BarChart3,
      isActive: pathname.includes("/analytics"),
    },
    {
      name: t("dashboard.sidebar.responses"),
      href: `/${locale}/dashboard/responses`,
      icon: Users,
      isActive: pathname.includes("/responses"),
    },
    {
      name: t("dashboard.sidebar.settings"),
      href: `/${locale}/dashboard/settings`,
      icon: Settings,
      isActive: pathname.includes("/settings"),
    },
  ];

  return (
    <div className={`w-64 bg-background border-r ${className}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">{t("dashboard.title")}</h2>
          {user && (
            <p className="text-sm text-muted-foreground mt-1">
              {t("dashboard.welcome_back", {
                name: user.name || user.first_name,
              })}
            </p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {String(user?.name || user?.first_name || "User")}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {String(user?.email || user?.mobile || "")}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t("dashboard.sidebar.logout")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
