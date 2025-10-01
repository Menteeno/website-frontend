"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { MagicCard } from "../magicui/magic-card";

const EventCTA = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Users,
      title: t("event.cta.benefits.networking.title"),
      description: t("event.cta.benefits.networking.description"),
    },
    {
      icon: Star,
      title: t("event.cta.benefits.experience.title"),
      description: t("event.cta.benefits.experience.description"),
    },
    {
      icon: CheckCircle,
      title: t("event.cta.benefits.certificate.title"),
      description: t("event.cta.benefits.certificate.description"),
    },
  ];

  const urgencyInfo = [
    {
      icon: Clock,
      text: t("event.cta.urgency.time"),
    },
    {
      icon: Users,
      text: t("event.cta.urgency.spots"),
    },
    {
      icon: MapPin,
      text: t("event.cta.urgency.location"),
    },
  ];

  return (
    <div id="cta" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm">
            {t("event.cta.badge")}
          </Badge>
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-relaxed mb-6">
            {t("event.cta.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("event.cta.description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-0 shadow-none border-none">
              <MagicCard
                gradientColor="oklch(72.3% 0.219 149.579 / .15)"
                className="p-0 h-full"
                gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
                gradientTo="oklch(72.3% 0.219 149.579 / .4)"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="size-16 bg-primary/15 rounded-full p-4">
                      <benefit.icon className="size-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </MagicCard>
            </Card>
          ))}
        </div>

        {/* Urgency Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("event.cta.urgency.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("event.cta.urgency.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {urgencyInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-background/50 rounded-lg"
              >
                <item.icon className="size-6 text-primary" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("event.cta.pricing.title")}
            </h3>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-primary">۷۷۵,۰۰۰</span>
              <span className="text-lg text-muted-foreground">تومان</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-lg text-muted-foreground line-through">
                ۹۸۵,۰۰۰ تومان
              </span>
              <Badge variant="destructive" className="text-xs">
                {t("event.cta.pricing.discount")}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("event.cta.pricing.note")}
            </p>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-200 hover:shadow-lg"
            >
              <a
                href="https://pay.frontchapter.ir/link/747292"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowRight className="size-5 order-1" />
                <span className="order-2">{t("event.cta.primary-button")}</span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-200 hover:shadow-lg hover:bg-muted/50"
            >
              <a href="#faq">{t("event.cta.secondary-button")}</a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("event.cta.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCTA;
