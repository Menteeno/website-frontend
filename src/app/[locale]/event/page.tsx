import EventAbout from "@/components/event/event-about";
import EventCTA from "@/components/event/event-cta";
import EventFAQ from "@/components/event/event-faq";
import EventHero from "@/components/event/event-hero";
import EventMap from "@/components/event/event-map";
import EventSchedule from "@/components/event/event-schedule";
import EventTargetAudience from "@/components/event/event-target-audience";
import EventTeam from "@/components/event/event-team";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface EventPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <EventHero />
      <EventAbout />
      <EventSchedule />
      <EventTargetAudience />
      <EventTeam />
      <EventMap />
      <EventFAQ />
      <EventCTA />
      <Footer />
    </>
  );
}
