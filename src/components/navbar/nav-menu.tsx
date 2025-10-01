"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useTranslation } from "@/hooks/use-translation";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { CalendarIcon, HomeIcon, NewspaperIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export const NavMenu = (props: NavigationMenuProps) => {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  const menuItems = [
    {
      href: "/",
      icon: HomeIcon,
      text: t("messages.navbar.home"),
    },
    {
      href: "/event",
      icon: CalendarIcon,
      text: t("messages.navbar.event"),
    },
    {
      href: "/",
      icon: PhoneIcon,
      text: t("messages.navbar.contact-us"),
    },
    {
      href: "#",
      icon: NewspaperIcon,
      text: t("messages.navbar.blog"),
    },
  ];

  // Reverse the order for RTL layout
  const orderedMenuItems = isRTL ? [...menuItems].reverse() : menuItems;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {orderedMenuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={`flex items-center gap-2 ${
                  isRTL ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <item.icon className="size-[1.25rem] stroke-accent-foreground" />
                <span>{item.text}</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
