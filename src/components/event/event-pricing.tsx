"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/use-translation";
import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  MapPin,
  Star,
  Users,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { MagicCard } from "../magicui/magic-card";

const EventPricing = () => {
  const { t } = useTranslation();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const discountCode = t("event.pricing.modal.discount-code");

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleContinueToBuy = () => {
    window.open(
      "https://console.menteeno.app/events/soft-skils-for-developers/buy",
      "_blank",
      "noopener,noreferrer"
    );
    setIsGroupModalOpen(false);
  };

  const pricingTiers = [
    {
      id: "regular",
      name: t("event.pricing.regular.name"),
      price: t("event.pricing.regular.price"),
      currency: t("event.pricing.regular.currency"),
      period: t("event.pricing.regular.period"),
      badge: null,
      popular: false,
      active: false,
      features: [
        t("event.pricing.regular.features.access"),
        t("event.pricing.regular.features.materials"),
        t("event.pricing.regular.features.networking"),
        t("event.pricing.regular.features.meal"),
        t("event.pricing.regular.features.discussion"),
        t("event.pricing.regular.features.team-building"),
        t("event.pricing.regular.features.menteeno-access"),
        t("event.pricing.regular.features.discount-codes"),
      ],
    },
    {
      id: "early-bird",
      name: t("event.pricing.early-bird.name"),
      price: t("event.pricing.early-bird.price"),
      originalPrice: t("event.pricing.regular.price"),
      currency: t("event.pricing.early-bird.currency"),
      period: t("event.pricing.early-bird.period"),
      badge: t("event.pricing.regular.badge"),
      popular: true,
      active: true,
      features: [
        t("event.pricing.early-bird.features.access"),
        t("event.pricing.early-bird.features.materials"),
        t("event.pricing.early-bird.features.networking"),
        t("event.pricing.early-bird.features.meal"),
        t("event.pricing.early-bird.features.discussion"),
        t("event.pricing.early-bird.features.team-building"),
        t("event.pricing.early-bird.features.menteeno-access"),
        t("event.pricing.early-bird.features.discount-codes"),
      ],
    },
    {
      id: "group",
      name: t("event.pricing.group.name"),
      price: t("event.pricing.group.price"),
      currency: t("event.pricing.group.currency"),
      period: t("event.pricing.group.period"),
      badge: t("event.pricing.group.badge"),
      active: true,
      features: [
        t("event.pricing.group.features.access"),
        t("event.pricing.group.features.materials"),
        t("event.pricing.group.features.networking"),
        t("event.pricing.group.features.meal"),
        t("event.pricing.group.features.discussion"),
        t("event.pricing.group.features.team-building"),
        t("event.pricing.group.features.menteeno-access"),
        t("event.pricing.group.features.discount-codes"),
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

        {/* Pricing Cards - Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                tier.popular
                  ? "border-primary shadow-xl scale-105 md:scale-110"
                  : "border-border shadow-md hover:shadow-lg"
              } ${!tier.active ? "opacity-70" : ""}`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute top-4 end-4 z-10">
                  <Badge
                    className={`${
                      tier.popular
                        ? "bg-primary text-primary-foreground"
                        : tier.id === "group"
                          ? "bg-orange-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tier.popular && <Star className="size-3 me-1" />}
                    {tier.id === "group" && (
                      <UsersRound className="size-3 me-1" />
                    )}
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-xl font-bold mb-4">
                  {tier.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-base text-muted-foreground">
                      {tier.currency}
                    </span>
                  </div>
                  {tier.originalPrice && (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        {tier.originalPrice} {tier.currency}
                      </span>
                      <Badge
                        variant="destructive"
                        className="text-xs bg-red-500 text-white"
                      >
                        {t("event.pricing.discount")}
                      </Badge>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {tier.period}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-0 pb-6">
                <ul className="space-y-3 mb-6 min-h-[280px]">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {tier.active ? (
                  tier.id === "group" ? (
                    <Button
                      onClick={() => setIsGroupModalOpen(true)}
                      className="w-full bg-foreground hover:bg-foreground/90 text-background"
                      size="lg"
                    >
                      <span className="font-semibold">
                        {t("event.pricing.register-button")}
                      </span>
                      <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className={`w-full ${
                        tier.popular
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                          : "bg-foreground hover:bg-foreground/90 text-background"
                      }`}
                      size="lg"
                    >
                      <a
                        href="https://console.menteeno.app/events/soft-skils-for-developers-pre-order/buy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span className="font-semibold">
                          {t("event.pricing.register-button")}
                        </span>
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                  )
                ) : (
                  <Button
                    disabled
                    className="w-full bg-muted text-muted-foreground cursor-not-allowed border border-border"
                    size="lg"
                  >
                    <span className="font-semibold">
                      {tier.id === "regular"
                        ? t("event.pricing.coming-soon")
                        : t("event.pricing.ended")}
                    </span>
                  </Button>
                )}
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

        {/* Group Purchase Discount Code Modal */}
        <Dialog open={isGroupModalOpen} onOpenChange={setIsGroupModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {t("event.pricing.modal.title")}
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                {t("event.pricing.modal.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="bg-muted rounded-lg p-6 text-center space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t("event.pricing.modal.discount-code-label")}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <code className="text-3xl font-bold text-foreground font-mono tracking-wider bg-background px-4 py-2 rounded border">
                      {discountCode}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyCode}
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="size-5 text-green-500" />
                      ) : (
                        <Copy className="size-5" />
                      )}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-sm text-green-500 font-medium">
                      {t("event.pricing.modal.copied-message")}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsGroupModalOpen(false)}
                className="w-full sm:w-auto"
              >
                {t("event.pricing.modal.close")}
              </Button>
              <Button
                onClick={handleContinueToBuy}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t("event.pricing.modal.continue-to-buy")}
                <ArrowRight className="size-4 ms-2" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventPricing;
