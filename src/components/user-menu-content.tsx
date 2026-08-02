"use client";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/components/user-info";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { useTranslation } from "@/hooks/use-translation";
import { type User } from "@/types";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

interface UserMenuContentProps {
  user: User;
  onSignOut?: () => void | Promise<void>;
}

export function UserMenuContent({ user, onSignOut }: UserMenuContentProps) {
  const cleanup = useMobileNavigation();
  const { t } = useTranslation();

  const handleLogout = () => {
    cleanup();
    void onSignOut?.();
  };

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo user={user} showEmail={true} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            className="block w-full"
            href="/panel/account/profile"
            onClick={cleanup}
          >
            <Settings className="mr-2" />
            {t("panel.nav.profile")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <button className="block w-full" onClick={handleLogout}>
          <LogOut className="mr-2" />
          {t("panel.nav.logout")}
        </button>
      </DropdownMenuItem>
    </>
  );
}
