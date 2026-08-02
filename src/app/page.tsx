import { Footer } from "@/components/footer";
import HeroCTA from "@/components/hero/hero-cta";
import HeroFAQ from "@/components/hero/hero-faq";
import HeroHeader from "@/components/hero/hero-header";
import HeroIntroduce from "@/components/hero/hero-introduce";
import HeroProblem from "@/components/hero/hero-problem";
import HeroTestimonials from "@/components/hero/hero-testimonials";
import { buildPageMetadata } from "@/lib/page-seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata("home");

export default function Home() {
  return (
    <>
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
