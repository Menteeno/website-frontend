import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/components/user-info";
import { useLogout } from "@/hooks/use-logout";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { type User } from "@/types";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

interface UserMenuContentProps {
  user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
  const cleanup = useMobileNavigation();
  const { logout, isLoggingOut } = useLogout();

  const handleLogout = () => {
    cleanup();
    logout();
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
          <Link className="block w-full" href="/profile/edit" onClick={cleanup}>
            <Settings className="mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <button
          className="block w-full"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2" />
          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </DropdownMenuItem>
    </>
  );
}
