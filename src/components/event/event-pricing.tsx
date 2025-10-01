"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowRight, Check, Clock, MapPin, Star, Users } from "lucide-react";
import { MagicCard } from "../magicui/magic-card";

const EventPricing = () => {
  const { t } = useTranslation();

  const pricingTiers = [
    {
      name: t("event.pricing.early-bird.name"),
      price: t("event.pricing.early-bird.price"),
      originalPrice: t("event.pricing.regular.price"),
      currency: t("event.pricing.early-bird.currency"),
      period: t("event.pricing.early-bird.period"),
      badge: t("event.pricing.early-bird.badge"),
      popular: true,
      features: [
        t("event.pricing.early-bird.features.access"),
        t("event.pricing.early-bird.features.materials"),
        t("event.pricing.early-bird.features.networking"),
        t("event.pricing.early-bird.features.meal"),
      ],
    },
    {
      name: t("event.pricing.regular.name"),
      price: t("event.pricing.regular.price"),
      currency: t("event.pricing.regular.currency"),
      period: t("event.pricing.regular.period"),
      features: [
        t("event.pricing.regular.features.access"),
        t("event.pricing.regular.features.materials"),
        t("event.pricing.regular.features.networking"),
        t("event.pricing.regular.features.meal"),
      ],
    },
  ];

  const includedFeatures = [
    {
      icon: Users,
      title: t("event.pricing.included.networking.title"),
      description: t("event.pricing.included.networking.description"),
    },
    {
      icon: Clock,
      title: t("event.pricing.included.duration.title"),
      description: t("event.pricing.included.duration.description"),
    },
    {
      icon: MapPin,
      title: t("event.pricing.included.location.title"),
      description: t("event.pricing.included.location.description"),
    },
  ];

  return (
    <div id="pricing" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("event.pricing.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("event.pricing.description")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${tier.popular ? "border-primary shadow-lg" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="size-3 mr-1" />
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">
                  {tier.name}
                </CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      {tier.currency}
                    </span>
                  </div>
                  {tier.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-lg text-muted-foreground line-through">
                        {tier.originalPrice} {tier.currency}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        {t("event.pricing.discount")}
                      </Badge>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    {tier.period}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full hover:scale-105 transition-all duration-200 hover:shadow-lg active:scale-95 ${tier.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={tier.popular ? "default" : "outline"}
                  size="lg"
                >
                  <a
                    href="https://pay.frontchapter.ir/link/747292"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowRight className="size-4 order-1" />
                    <span className="order-2">
                      {t("event.pricing.register-button")}
                    </span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Included Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {includedFeatures.map((feature, index) => (
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
                      <feature.icon className="size-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </MagicCard>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPricing;
