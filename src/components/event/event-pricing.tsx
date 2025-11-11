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
  Percent,
} from "lucide-react";
import { useState, useEffect } from "react";
import { MagicCard } from "../magicui/magic-card";

interface EventPricingProps {
  activeTier?: "early-bird" | "regular";
}

const EventPricing = ({ activeTier = "early-bird" }: EventPricingProps) => {
  const { t } = useTranslation();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown target: November 14, 2025
  const targetDate = new Date("2025-11-14T23:59:59").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

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

  // Get the active pricing tier
  const getActiveTier = () => {
    if (activeTier === "regular") {
      return {
        id: "regular",
        name: t("event.pricing.regular.name"),
        price: t("event.pricing.regular.price"),
        currency: t("event.pricing.regular.currency"),
        period: t("event.pricing.regular.period"),
        badge: t("event.pricing.regular.badge"),
        popular: true,
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
      };
    } else {
      return {
        id: "early-bird",
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
          t("event.pricing.early-bird.features.discussion"),
          t("event.pricing.early-bird.features.team-building"),
          t("event.pricing.early-bird.features.menteeno-access"),
          t("event.pricing.early-bird.features.discount-codes"),
        ],
      };
    }
  };

  const activeTierData = getActiveTier();

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
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("event.pricing.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("event.pricing.description")}
          </p>
        </div>

        {/* Unified Pricing Card with Timer, Price, and Features */}
        <div className="max-w-5xl mx-auto mb-16">
          <MagicCard
            gradientColor="oklch(72.3% 0.219 149.579 / .15)"
            className="p-0 overflow-hidden rounded-xl relative"
            gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
            gradientTo="oklch(72.3% 0.219 149.579 / .4)"
          >
            {/* Ribbon Badge - تا ۲۲ آبان - Corner Position with Hidden Parts */}
            {activeTierData.period && (
              <div className="absolute top-0 start-0 z-20 transform -rotate-12 origin-top-start">
                <div className="relative">
                  {/* Hidden Left Corner - Extends outside card */}
                  <div className="absolute top-0 start-[-20px] w-20 h-full bg-gradient-to-br from-red-600 to-red-700 opacity-0 pointer-events-none" />
                  {/* Hidden Bottom Corner - Extends outside card */}
                  <div className="absolute bottom-[-20px] start-0 w-full h-20 bg-gradient-to-br from-red-600 to-red-700 opacity-0 pointer-events-none" />

                  {/* Ribbon Body - Visible Part */}
                  <div className="relative bg-gradient-to-br from-red-600 via-red-650 to-red-700 text-white px-5 py-2.5 shadow-xl">
                    <div className="flex items-center gap-1">
                      <span className="text-xs md:text-sm font-bold whitespace-nowrap drop-shadow-sm">
                        {activeTierData.period}
                      </span>
                    </div>
                    {/* Top Stitch Line */}
                    <div
                      className="absolute top-0 start-0 w-full h-1 bg-red-800/60"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, 
                          transparent 0px, 
                          transparent 3px, 
                          rgba(255,255,255,0.3) 3px, 
                          rgba(255,255,255,0.3) 4px,
                          transparent 4px,
                          transparent 7px)`,
                        backgroundSize: "7px 100%",
                      }}
                    />
                    {/* Bottom Stitch Line */}
                    <div
                      className="absolute bottom-0 start-0 w-full h-1 bg-red-800/60"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, 
                          transparent 0px, 
                          transparent 3px, 
                          rgba(255,255,255,0.3) 3px, 
                          rgba(255,255,255,0.3) 4px,
                          transparent 4px,
                          transparent 7px)`,
                        backgroundSize: "7px 100%",
                      }}
                    />
                    {/* Left Fold Triangle - Hidden part extends outside */}
                    <div className="absolute top-0 start-[-6px] w-0 h-0 border-t-[14px] border-t-red-800/80 border-e-[6px] border-e-transparent" />
                    <div className="absolute bottom-0 start-[-6px] w-0 h-0 border-b-[14px] border-b-red-800/80 border-e-[6px] border-e-transparent" />
                    {/* Right Fold Triangle */}
                    <div className="absolute top-0 end-0 w-0 h-0 border-t-[14px] border-t-red-800/80 border-s-[6px] border-s-transparent" />
                    <div className="absolute bottom-0 end-0 w-0 h-0 border-b-[14px] border-b-red-800/80 border-s-[6px] border-s-transparent" />
                    {/* Bottom Fold Triangle - Hidden part extends outside */}
                    <div className="absolute bottom-[-6px] start-0 w-0 h-0 border-s-[14px] border-s-red-800/80 border-b-[6px] border-b-transparent" />
                    <div className="absolute bottom-[-6px] end-0 w-0 h-0 border-e-[14px] border-e-red-800/80 border-b-[6px] border-b-transparent" />
                  </div>
                </div>
              </div>
            )}

            <Card className="border-0 shadow-none bg-transparent rounded-xl">
              {/* Combined Timer and Pricing Section */}
              <CardContent className="p-8 pt-16 border-b border-border/50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Pricing Section - Left Side */}
                  <div className="order-1 text-center lg:text-start">
                    <CardTitle className="text-2xl md:text-3xl font-bold mb-3">
                      {activeTierData.name}
                    </CardTitle>

                    {activeTierData.originalPrice && (
                      <div className="mb-4 flex justify-center lg:justify-start">
                        <Badge
                          variant="destructive"
                          className="text-sm bg-red-500 text-white px-3 py-1 shadow-md"
                        >
                          {t("event.pricing.discount")}
                        </Badge>
                      </div>
                    )}

                    <div className="mb-6">
                      {/* Prices in one line */}
                      <div className="flex items-baseline justify-center lg:justify-start gap-3 flex-wrap">
                        {activeTierData.originalPrice && (
                          <>
                            <span className="text-2xl md:text-3xl font-bold text-red-500 line-through">
                              {activeTierData.originalPrice}
                            </span>
                            <span className="text-lg text-red-500 line-through font-bold">
                              {activeTierData.currency}
                            </span>
                            <span className="text-muted-foreground">→</span>
                          </>
                        )}
                        <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                          {activeTierData.price}
                        </span>
                        <span className="text-lg md:text-xl text-muted-foreground">
                          {activeTierData.currency}
                        </span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full lg:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all font-semibold px-8"
                      size="lg"
                    >
                      <a
                        href="https://console.menteeno.app/events/soft-skils-for-developers/buy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>{t("event.pricing.register-button")}</span>
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                  </div>

                  {/* Countdown Timer - Right Side */}
                  <div className="order-2">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {t("event.pricing.countdown.title")}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t("event.pricing.countdown.subtitle")}
                      </p>
                    </div>
                    <div
                      className="grid grid-cols-4 gap-2 persian-number"
                      dir="ltr"
                    >
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-lg p-3 border border-primary/30 shadow-md hover:shadow-lg transition-shadow">
                          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                            {String(timeLeft.days).padStart(2, "0")}
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">
                            {t("event.pricing.countdown.days")}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-lg p-3 border border-primary/30 shadow-md hover:shadow-lg transition-shadow">
                          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                            {String(timeLeft.hours).padStart(2, "0")}
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">
                            {t("event.pricing.countdown.hours")}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-lg p-3 border border-primary/30 shadow-md hover:shadow-lg transition-shadow">
                          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                            {String(timeLeft.minutes).padStart(2, "0")}
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">
                            {t("event.pricing.countdown.minutes")}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-lg p-3 border border-primary/30 shadow-md hover:shadow-lg transition-shadow">
                          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                            {String(timeLeft.seconds).padStart(2, "0")}
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">
                            {t("event.pricing.countdown.seconds")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Features Section - 4 Columns */}
              <CardContent className="p-8">
                <CardTitle className="text-xl font-bold mb-6 text-center">
                  {t("event.pricing.features-title")}
                </CardTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeTierData.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start gap-2 text-sm md:text-base"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="size-3.5 text-primary" />
                        </div>
                      </div>
                      <span className="text-foreground leading-relaxed flex-1">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </MagicCard>
        </div>

        {/* Group Discount Information Card - Enhanced Marketing Design */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="relative overflow-hidden border-2 border-orange-300/50 bg-gradient-to-br from-orange-50 via-orange-100/50 to-amber-50 dark:from-orange-950/40 dark:via-orange-900/30 dark:to-amber-950/40 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 end-0 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 start-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <CardContent className="p-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Icon Section */}
                <div className="flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="size-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                      <Percent className="size-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -end-2 size-8 bg-red-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      <span className="text-white text-xs font-bold">۴۷٪</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:col-span-2 text-center md:text-start">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Badge className="bg-orange-500 text-white border-0 px-3 py-1 text-sm font-semibold">
                      {t("event.pricing.group-discount.title")}
                    </Badge>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    تخفیف ویژه برای تیم‌ها
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                    {t("event.pricing.group-discount.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button
                      onClick={() => setIsGroupModalOpen(true)}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6"
                      size="lg"
                    >
                      <UsersRound className="size-5 me-2" />
                      {t("event.pricing.group-discount.button")}
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                      <Users className="size-4" />
                      <span>حداقل ۳ نفر</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
