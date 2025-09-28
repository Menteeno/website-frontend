import { Footer } from "@/components/footer";
import HeroCTA from "@/components/hero/hero-cta";
import HeroFAQ from "@/components/hero/hero-faq";
import HeroHeader from "@/components/hero/hero-header";
import HeroIntroduce from "@/components/hero/hero-introduce";
import HeroProblem from "@/components/hero/hero-problem";
import HeroTestimonials from "@/components/hero/hero-testimonials";
import Navbar from "@/components/navbar/navbar";
import { locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <HeroHeader />
      <HeroProblem />
      <HeroIntroduce />
      <HeroTestimonials />
      <HeroFAQ />
      <HeroCTA />
      <Footer />
    </>
  );
}
