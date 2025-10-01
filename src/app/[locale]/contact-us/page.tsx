import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactMap } from "@/components/contact/contact-map";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface ContactUsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ContactUsPage({ params }: ContactUsPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

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
                  title: locale === "fa" ? "خانه" : "Home",
                  href: `/${locale}`,
                },
                {
                  title: locale === "fa" ? "تماس با ما" : "Contact Us",
                  href: `/${locale}/contact-us`,
                },
              ]}
            />

            {/* Hero Content */}
            <div className="text-center max-w-4xl mx-auto mt-12">
              <h1 className="font-black text-4xl sm:text-5xl md:text-6xl mb-6">
                {locale === "fa" ? "تماس با ما" : "Contact Us"}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {locale === "fa"
                  ? "منتینو یک آزمایشگاه مهارت‌های نرم برای دنیای واقعی است. ما باور داریم که موفقیت شغلی فقط به تخصص فنی وابسته نیست — بلکه توانایی کار تیمی، حل مسئله، و ارتباط مؤثر، نقشی کلیدی در تبدیل شدن به یک مهره‌ی حیاتی در تیم دارند."
                  : "Menteeno is a soft skills laboratory for the real world. We believe that professional success is not only dependent on technical expertise — but the ability to work as a team, solve problems, and communicate effectively plays a key role in becoming a vital part of the team."}
              </p>
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
