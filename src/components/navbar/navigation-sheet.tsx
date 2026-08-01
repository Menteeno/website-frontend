import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslation } from "@/hooks/use-translation";
import { Menu, PanelLeft } from "lucide-react";
import AppLogo from "../app-logo";
import { NavMenu } from "./nav-menu";
import { getConsoleUrl } from "@/lib/site";

export const NavigationSheet = () => {
  const { t, locale } = useTranslation();

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
        <div className="mt-6 pt-6 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            asChild
          >
            <a
              href={getConsoleUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <PanelLeft className="size-5" />
              <span>{t("messages.navbar.user-panel")}</span>
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
