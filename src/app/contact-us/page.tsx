import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactAnimation } from "@/components/contact/contact-animation";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactMap } from "@/components/contact/contact-map";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { getTranslation, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface ContactUsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactUsPage({ params }: ContactUsPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get translations
  const t = (key: string) => getTranslation(locale as any, `contact.${key}`);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <Breadcrumbs
              breadcrumbs={[
                {
                  title: t("breadcrumb.home"),
                  href: `/${locale}`,
                },
                {
                  title: t("breadcrumb.contact"),
                  href: `/${locale}/contact-us`,
                },
              ]}
            />

            {/* Hero Content */}
            <div className="text-center max-w-4xl mx-auto mt-12">
              <h1 className="font-black text-4xl sm:text-5xl md:text-6xl mb-6">
                {t("title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Contact Animation */}
            <div className="flex justify-center mt-12">
              <ContactAnimation />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-20 max-w-6xl">
          <div className="space-y-16">
            {/* Contact Information */}
            <ContactInfo />

            {/* Contact Form */}
            <ContactForm />

            {/* Map Section */}
            <ContactMap />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
