import { getTranslation } from "./i18n";
import { absoluteUrl } from "./site";

/**
 * Build Event JSON-LD from existing Persian content only.
 * Omits startDate when no reliable ISO date exists in project data.
 */
export function buildEventJsonLd() {
  const name = getTranslation("fa", "event.hero.title");
  const description = getTranslation("fa", "event.about.description");
  const locationName = getTranslation("fa", "event.hero.location_value");
  const addressText = getTranslation("fa", "event.map.address.location");
  const organizerName = getTranslation("fa", "event.team.organizer.name");
  const organizerRole = getTranslation("fa", "event.team.organizer.role");

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    url: absoluteUrl("/event"),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: locationName,
      address: {
        "@type": "PostalAddress",
        streetAddress: addressText,
        addressCountry: "IR",
      },
    },
    organizer: {
      "@type": "Person",
      name: organizerName,
      description: organizerRole,
      url: absoluteUrl("/"),
    },
  };
}
