import { Button } from "@/components/ui/button";
import { LoadingLink } from "@/components/ui/loading-link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { Menu } from "lucide-react";
import AppLogo from "../app-logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  const { t, locale } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  return (
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
      <SheetContent className="p-4" dir={locale === "fa" ? "rtl" : "ltr"}>
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <AppLogo className="fill-foreground" />
        <NavMenu orientation="vertical" className="mt-12" />

        {/* Auth buttons for mobile */}
        <div className="mt-8 space-y-3">
          {isAuthenticated && user ? (
            <Button
              asChild
              variant="outline"
              className="w-full rounded-full"
              aria-label={t("messages.navbar.dashboard")}
            >
              <LoadingLink href={`/${locale}/dashboard`}>
                {t("messages.navbar.dashboard")}
              </LoadingLink>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full"
                aria-label={t("messages.navbar.sign-in")}
              >
                <LoadingLink href={`/${locale}/auth`}>
                  {t("messages.navbar.sign-in")}
                </LoadingLink>
              </Button>
              <Button
                asChild
                className="w-full rounded-full"
                aria-label={t("messages.navbar.sign-up")}
              >
                <LoadingLink href={`/${locale}/auth`}>
                  {t("messages.navbar.sign-up")}
                </LoadingLink>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
