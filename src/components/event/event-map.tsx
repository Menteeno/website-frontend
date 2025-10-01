"use client";

import { useTranslation } from "@/hooks/use-translation";

const EventMap = () => {
  const { t } = useTranslation();

  return (
    <div id="location" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-relaxed mb-6">
            {t("event.map.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("event.map.description")}
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-background rounded-2xl p-6 shadow-lg">
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              title="map-iframe"
              src="https://neshan.org/maps/iframe/places/a88a529dcb480437e809a990995d1067#c35.818-51.460-18z-0p/35.8176674/51.459115999999995"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="border-0 rounded-xl"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Location Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl mb-4">
                {t("event.map.address.title")}
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p>{t("event.map.address.location")}</p>
                <p>{t("event.map.address.details")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-xl mb-4">
                {t("event.map.transport.title")}
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p>{t("event.map.transport.metro")}</p>
                <p>{t("event.map.transport.parking")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMap;
