"use client";
import AppLogoIcon from "@/components/app-logo-icon";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { Language } from "@/components/navbar/language";
import { NavMenu } from "@/components/navbar/nav-menu";
import { NavigationSheet } from "@/components/navbar/navigation-sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if scroll position is greater than 10px, otherwise false
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener on component mount
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // Base classes for the navbar
  const baseClasses = "fixed z-30 inset-x-4 h-16 transition-all mx-auto ";

  // Conditional classes based on the isScrolled state
  const scrolledClasses =
    "shadow-lg top-6 py-0 border max-w-screen-xl bg-background/50 backdrop-blur rounded-full";
  const topClasses =
    "max-w-full top-0 py-12 bg-gradient-to-b from-background from-60% to-transparent";

  return (
    <nav
      className={`${baseClasses} ${isScrolled ? scrolledClasses : topClasses}`}
    >
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <AppLogoIcon className="size-8 fill-foreground mx-4" />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Language />
          <AnimatedThemeToggler />

          {isAuthenticated && user ? (
            <Button
              asChild
              variant="outline"
              className="hidden sm:inline-flex rounded-full"
            >
              <Link href="/dashboard">{t("messages.navbar.dashboard")}</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="hidden sm:inline-flex rounded-full"
              >
                <Link href="/auth">{t("messages.navbar.sign-in")}</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link href="/auth">{t("messages.navbar.sign-up")}</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
