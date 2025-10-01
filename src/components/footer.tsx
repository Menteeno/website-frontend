"use client";

import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const { t, locale } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full border-t border-border/50 mt-8 md:mt-12 relative overflow-hidden bg-background",
        className
      )}
    >
      {/* Retro Grid Background */}
      <RetroGrid cellSize={50} opacity={1} />

      <div className="container mx-auto px-4 pt-8 pb-4 md:pt-12 md:pb-8 relative z-10 bg-gradient-to-b from-background to-muted/20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
          {/* Brand Section */}
          <div className="space-y-3 md:space-y-4">
            <div className="space-y-2 md:space-y-2">
              <h3 className="text-lg md:text-lg font-semibold text-foreground">
                {t("footer.brand.name")}
              </h3>
              <p className="text-sm md:text-sm text-muted-foreground leading-relaxed">
                {t("footer.brand.description")}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm md:text-sm text-muted-foreground">
                {t("footer.brand.powered_by")}
              </span>
              <WordRotate
                words={[
                  t("footer.words.innovation"),
                  t("footer.words.creativity"),
                  t("footer.words.technology"),
                  t("footer.words.excellence"),
                ]}
                className="text-sm md:text-sm font-medium text-primary"
                duration={2000}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-sm md:text-sm font-semibold text-foreground">
              {t("footer.quick_links.title")}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-10 md:h-auto p-2 md:p-0 text-sm md:text-sm text-muted-foreground hover:text-foreground"
              >
                {t("footer.quick_links.about")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-10 md:h-auto p-2 md:p-0 text-sm md:text-sm text-muted-foreground hover:text-foreground"
              >
                {t("footer.quick_links.services")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-10 md:h-auto p-2 md:p-0 text-sm md:text-sm text-muted-foreground hover:text-foreground"
              >
                {t("footer.quick_links.contact")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-10 md:h-auto p-2 md:p-0 text-sm md:text-sm text-muted-foreground hover:text-foreground"
              >
                {t("footer.quick_links.support")}
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="text-sm md:text-sm font-semibold text-foreground">
              {t("footer.contact.title")}
            </h4>
            <div className="space-y-1 md:space-y-1.5 text-sm md:text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <svg
                  className="h-3 w-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="truncate">{t("footer.contact.email")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-3 w-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{t("footer.contact.location")}</span>
              </div>
            </div>
            <div className="flex space-x-1 md:space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 md:h-8 md:w-8 p-0"
                asChild
              >
                <a
                  href={t("footer.social.instagram")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-3 w-3 md:h-4 md:w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 md:h-8 md:w-8 p-0"
                asChild
              >
                <a
                  href={t("footer.social.github")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-3 w-3 md:h-4 md:w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 md:h-8 md:w-8 p-0"
                asChild
              >
                <a
                  href={t("footer.social.linkedin")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-3 w-3 md:h-4 md:w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-3 md:my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="text-sm md:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} {t("footer.brand.name")}.{" "}
            {t("footer.legal.copyright")}
          </div>
          <div className="flex items-center space-x-4 md:space-x-6 text-sm md:text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 md:h-auto p-2 md:p-0 text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href={`/${locale}/privacy`}>{t("footer.legal.privacy")}</a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 md:h-auto p-2 md:p-0 text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href={`/${locale}/terms`}>{t("footer.legal.terms")}</a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 md:h-auto p-2 md:p-0 text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href={`/${locale}/cookies`}>{t("footer.legal.cookies")}</a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
