import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { getTranslation, locales } from "@/lib/i18n";
import type { Metadata } from "next";
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

  return {
    title: {
      template: `%s | ${getTranslation(locale, "messages.home-header.title")}`,
      default: getTranslation(locale, "messages.home-header.title"),
    },
    description: getTranslation(locale, "messages.home-header.description"),
    openGraph: {
      title: getTranslation(locale, "messages.home-header.title"),
      description: getTranslation(locale, "messages.home-header.description"),
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: getTranslation(locale, "messages.home-header.title"),
      description: getTranslation(locale, "messages.home-header.description"),
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fa: "/fa",
      },
    },
  };
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
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
