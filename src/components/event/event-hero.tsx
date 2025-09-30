"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { getAssetUrl } from "@/lib/config";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowUpRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import { BackgroundPattern } from "../hero/background-pattern";

const EventHero = () => {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto relative">
      <BackgroundPattern />

      <div className="relative px-4 z-10 max-w-2xl text-center lg:text-start pb-2 pt-24 lg:py-0">
        <Badge className="bg-gradient-to-br from-primary to-secondary rounded-full py-1 border-none mb-6">
          {t("event.hero.badge")}
        </Badge>

        <h1 className="font-black text-4xl sm:text-5xl md:text-6xl mb-6">
          {t("event.hero.title")}
        </h1>

        <p className="text-[17px] md:text-lg text-muted-foreground mb-8">
          {t("event.hero.description")}
        </p>

        {/* Event Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
            <Calendar className="size-5 text-primary" />
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground">
                {t("event.hero.date")}
              </p>
              <p className="font-semibold">۱۸ مرداد ۱۴۰۴</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
            <Clock className="size-5 text-primary" />
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground">
                {t("event.hero.time")}
              </p>
              <p className="font-semibold">۱۵:۰۰ - ۲۰:۰۰</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
            <MapPin className="size-5 text-primary" />
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground">
                {t("event.hero.location")}
              </p>
              <p className="font-semibold">تهران، نیاوران، باغ خسروشاهی</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
            <Users className="size-5 text-primary" />
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground">
                {t("event.hero.capacity")}
              </p>
              <p className="font-semibold">۴۰ نفر</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button
            size="lg"
            className="rounded-full text-base"
            aria-label={t("event.hero.register-button")}
          >
            {t("event.hero.register-button")}
            <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
            aria-label={t("event.hero.learn-more-button")}
          >
            {t("event.hero.learn-more-button")}
          </Button>
        </div>
      </div>

      {/* Event Animation */}
      <div className="lg:flex-1 flex justify-center lg:justify-end">
        <div className="relative">
          <DotLottieReact
            src={getAssetUrl("/assets/images/soft-skills.lottie")}
            loop
            autoplay
            width="1600px"
            height="1200px"
            renderConfig={{
              autoResize: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventHero;
