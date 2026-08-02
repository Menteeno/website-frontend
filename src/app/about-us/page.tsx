import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { AboutUsTeam } from "@/components/about-us/about-us-team";
import { getTranslation, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { BackgroundPattern } from "@/components/hero/background-pattern";

interface AboutUsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutUsPage({ params }: AboutUsPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get translations
  const t = (key: string) => getTranslation(locale as any, `about.${key}`);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative py-12 lg:py-16 overflow-hidden">
          <BackgroundPattern />
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <Breadcrumbs
              breadcrumbs={[
                {
                  title: t("breadcrumb.home"),
                  href: `/${locale}`,
                },
                {
                  title: t("breadcrumb.about"),
                  href: `/${locale}/about-us`,
                },
              ]}
            />

            {/* Hero Content */}
            <div className="text-center max-w-4xl mx-auto mt-8 lg:mt-12">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight">
                {t("title")}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        {/* Main Story Section */}
        <div className="container mx-auto px-4 py-12 lg:py-16 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Mission */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                {t("mission.title")}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t("mission.description")}
              </p>
            </div>

            {/* Vision */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                {t("vision.title")}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t("vision.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-8 lg:py-12">
          <AboutUsTeam />
        </div>
      </div>
      <Footer />
    </>
  );
}
