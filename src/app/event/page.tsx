import EventAbout from "@/components/event/event-about";
import EventCTA from "@/components/event/event-cta";
import EventDataDriven from "@/components/event/event-data-driven";
import EventFAQ from "@/components/event/event-faq";
import EventHero from "@/components/event/event-hero";
import EventMap from "@/components/event/event-map";
import EventPricing from "@/components/event/event-pricing";
import EventSchedule from "@/components/event/event-schedule";
import EventTargetAudience from "@/components/event/event-target-audience";
import EventTeam from "@/components/event/event-team";
import { Footer } from "@/components/footer";
import { buildEventJsonLd } from "@/lib/event-json-ld";
import { buildPageMetadata } from "@/lib/page-seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata("event");

export default function EventPage() {
  const eventJsonLd = buildEventJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventJsonLd),
        }}
      />
      <EventHero />
      <EventAbout />
      <EventDataDriven />
      <EventSchedule />
      <EventTargetAudience />
      <EventTeam />
      <EventPricing />
      <EventMap />
      <EventFAQ />
      <EventCTA />
      <Footer />
    </>
  );
}
