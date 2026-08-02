"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserMenuContent } from "@/components/user-menu-content";
import { useAuth } from "@/features/panel/auth/auth-context";
import { useInitials } from "@/hooks/use-initials";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { type BreadcrumbItem, type NavItem, type User } from "@/types";
import {
  BookOpen,
  Calendar,
  Home,
  LayoutGrid,
  Menu,
  Newspaper,
  PanelLeft,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AppLogo from "./app-logo";
import AppLogoIcon from "./app-logo-icon";

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

function toMenuUser(
  user: NonNullable<ReturnType<typeof useAuth>["user"]>,
  profile: ReturnType<typeof useAuth>["profile"],
): User {
  const name =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    profile?.email ||
    user.email ||
    "User";

  const email = user.email ?? profile?.email ?? "";

  return {
    id: 0,
    name,
    email,
    avatar: profile?.avatar_url ?? "",
    email_verified_at: user.email_confirmed_at ?? null,
    created_at: user.created_at,
    updated_at: profile?.updated_at ?? user.created_at,
  };
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const { t, locale } = useTranslation();
  const { user, profile, isAdmin, signOut } = useAuth();
  const pathname = usePathname();
  const getInitials = useInitials();
  const [isScrolled, setIsScrolled] = useState(false);
  const isRTL = locale === "fa";

  const menuUser = user ? toMenuUser(user, profile) : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavItems: NavItem[] = [
    {
      title: t("messages.navbar.home"),
      href: "/",
      icon: Home,
    },
    {
      title: t("messages.navbar.event"),
      href: "/event",
      icon: Calendar,
    },
    {
      title: t("panel.nav.courses"),
      href: "/panel/courses",
      icon: BookOpen,
    },
    {
      title: t("messages.navbar.blog"),
      href: "/blog",
      icon: Newspaper,
    },
    {
      title: t("messages.navbar.contact-us"),
      href: "/contact-us",
      icon: Phone,
    },
  ];

  const orderedMainNavItems = isRTL
    ? [...mainNavItems].reverse()
    : mainNavItems;

  const authNavItems: NavItem[] = user
    ? [
        {
          title: t("panel.nav.account"),
          href: "/panel/account",
          icon: LayoutGrid,
        },
        ...(isAdmin
          ? [
              {
                title: t("panel.nav.admin"),
                href: "/panel/admin",
                icon: LayoutGrid,
              } satisfies NavItem,
            ]
          : []),
      ]
    : [];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-4 z-40 mx-auto h-16 transition-all",
          isScrolled
            ? "top-6 max-w-screen-xl rounded-full border bg-background/50 py-0 shadow-lg backdrop-blur"
            : "top-0 max-w-full bg-gradient-to-b from-background from-60% to-transparent py-12",
        )}
      >
        <div className="mx-auto flex h-full items-center justify-between px-4">
          <Link href="/" prefetch className="mx-4 flex items-center">
            <AppLogoIcon className="size-8 fill-foreground" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-6 space-x-0">
              {orderedMainNavItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 text-sm transition-colors hover:text-foreground",
                        isRTL ? "flex-row-reverse" : "flex-row",
                        isActive(item.href)
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.icon ? (
                        <Icon
                          iconNode={item.icon}
                          className="size-[1.25rem] stroke-accent-foreground"
                        />
                      ) : null}
                      <span>{item.title}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/panel/account">{t("panel.nav.account")}</Link>
                </Button>
                {isAdmin ? (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/panel/admin">{t("panel.nav.admin")}</Link>
                  </Button>
                ) : null}
                {menuUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="size-10 rounded-full p-1"
                      >
                        <Avatar className="size-8 overflow-hidden rounded-full">
                          <AvatarImage
                            src={menuUser.avatar}
                            alt={menuUser.name}
                          />
                          <AvatarFallback className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(menuUser.name)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <UserMenuContent user={menuUser} onSignOut={signOut} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/panel/login"
                  className={cn(
                    "flex h-9 items-center gap-2 rounded-md px-3 text-sm",
                    "bg-primary text-primary-foreground transition-colors hover:bg-primary/90",
                  )}
                >
                  <PanelLeft className="size-4" />
                  <span>{t("panel.nav.login")}</span>
                </Link>
              </div>
            )}

            <AnimatedThemeToggler />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    aria-label="Open navigation menu"
                  >
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="p-4"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <SheetTitle className="sr-only">
                    {t("messages.navbar.home")}
                  </SheetTitle>
                  <AppLogo className="fill-foreground" />
                  <nav className="mt-12 flex flex-col gap-4">
                    {[...mainNavItems, ...authNavItems].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 font-medium",
                          isRTL ? "flex-row-reverse" : "flex-row",
                          isActive(item.href) && "text-primary",
                        )}
                      >
                        {item.icon ? (
                          <Icon iconNode={item.icon} className="size-5" />
                        ) : null}
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-6 border-t pt-6">
                    {user ? (
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        onClick={() => void signOut()}
                      >
                        {t("panel.nav.logout")}
                      </Button>
                    ) : (
                      <Button
                        className="w-full justify-start gap-2"
                        asChild
                      >
                        <Link href="/panel/login">
                          <PanelLeft className="size-5" />
                          <span>{t("panel.nav.login")}</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {breadcrumbs.length > 1 && (
        <div className="flex w-full border-b border-sidebar-border/70">
          <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  );
}
