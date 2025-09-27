"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useTranslation } from "@/lib/lang";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { HomeIcon, NewspaperIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export const NavMenu = (props: NavigationMenuProps) => {
  const { t } = useTranslation();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <HomeIcon className="size-[1.25rem] stroke-accent-foreground" />
              <span>{t("messages.navbar.home")}</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <PhoneIcon className="size-[1.25rem] stroke-accent-foreground" />
              <span>{t("messages.navbar.contact-us")}</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#">
              <NewspaperIcon className="size-[1.25rem] stroke-accent-foreground" />
              <span>{t("messages.navbar.blog")}</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
