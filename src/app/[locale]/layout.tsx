import { PersianSEO } from "@/components/seo/persian-seo";
import { ThemeProvider } from "@/contexts/theme-context";
import {
  generateLocalizedMetadata,
  generateLocalizedViewport,
  locales,
} from "@/lib/i18n";
import { ReduxProvider } from "@/providers/redux-provider";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return generateLocalizedMetadata(locale);
}

export async function generateViewport({
  params,
}: LocaleLayoutProps): Promise<Viewport> {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return generateLocalizedViewport(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <ReduxProvider>
      <ThemeProvider>
        <PersianSEO locale={locale}>{children}</PersianSEO>
      </ThemeProvider>
    </ReduxProvider>
  );
}
