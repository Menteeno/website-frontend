import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslation } from "@/hooks/use-translation";
import { type NavItem } from "@/types";
import {
  BarChart3,
  BookOpen,
  FileText,
  Folder,
  LayoutGrid,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import AppLogo from "./app-logo";

// This will be moved inside the component to be locale-aware

const footerNavItems: NavItem[] = [
  {
    title: "Repository",
    href: "https://github.com/laravel/react-starter-kit",
    icon: Folder,
  },
  {
    title: "Documentation",
    href: "https://laravel.com/docs/starter-kits#react",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const { locale } = useTranslation();

  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: `/${locale}/dashboard`,
      icon: LayoutGrid,
    },
    {
      title: "Surveys",
      href: `/${locale}/surveys`,
      icon: FileText,
    },
    {
      title: "Analytics",
      href: `/${locale}/analytics`,
      icon: BarChart3,
    },
    {
      title: "Responses",
      href: `/${locale}/responses`,
      icon: Users,
    },
    {
      title: "Settings",
      href: `/${locale}/settings`,
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/${locale}/dashboard`} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
