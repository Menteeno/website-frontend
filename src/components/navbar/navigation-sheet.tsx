import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslation } from "@/hooks/use-translation";
import { Menu } from "lucide-react";
import AppLogo from "../app-logo";
import { NavMenu } from "./nav-menu";

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
      </SheetContent>
    </Sheet>
  );
};
