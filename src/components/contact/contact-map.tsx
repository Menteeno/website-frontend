"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

export function ContactMap() {
  const { t, locale } = useTranslation();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {t("contact.map.title")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {locale === "fa"
            ? "موقعیت ما را روی نقشه ببینید"
            : "Find our location on the map"}
        </p>
      </div>
      <Card className="shadow-lg border-0 !p-0">
        <CardContent className="p-0">
          <div className="aspect-video rounded-lg overflow-hidden relative">
            <iframe
              title="contact-map-iframe"
              src="https://neshan.org/maps/iframe/places/4e5df86b90c3b347859707520c6681ad#c36.707-52.652-18z-0p/36.707025901863794/52.65097808549817"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="border-0 rounded-lg absolute inset-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
