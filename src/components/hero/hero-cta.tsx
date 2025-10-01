"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react";
import { MagicCard } from "../magicui/magic-card";

const HeroCTA = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 text-sm">
          {t("messages.hero-cta.badge")}
        </Badge>
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-relaxed mb-6">
          {t("messages.hero-cta.title")}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {t("messages.hero-cta.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
        <Card className="p-0 shadow-none border-none">
          <MagicCard
            gradientColor="oklch(72.3% 0.219 149.579 / .15)"
            className="p-0 h-full"
            gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
            gradientTo="oklch(72.3% 0.219 149.579 / .4)"
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="size-16 bg-primary/15 rounded-full p-4">
                  <Users className="size-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-xl mb-2">
                {t("messages.hero-cta.features.community.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("messages.hero-cta.features.community.description")}
              </p>
            </CardContent>
          </MagicCard>
        </Card>

        <Card className="p-0 shadow-none border-none">
          <MagicCard
            gradientColor="oklch(72.3% 0.219 149.579 / .15)"
            className="p-0 h-full"
            gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
            gradientTo="oklch(72.3% 0.219 149.579 / .4)"
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="size-16 bg-primary/15 rounded-full p-4">
                  <Star className="size-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-xl mb-2">
                {t("messages.hero-cta.features.experience.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("messages.hero-cta.features.experience.description")}
              </p>
            </CardContent>
          </MagicCard>
        </Card>

        <Card className="p-0 shadow-none border-none">
          <MagicCard
            gradientColor="oklch(72.3% 0.219 149.579 / .15)"
            className="p-0 h-full"
            gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
            gradientTo="oklch(72.3% 0.219 149.579 / .4)"
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="size-16 bg-primary/15 rounded-full p-4">
                  <CheckCircle className="size-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-xl mb-2">
                {t("messages.hero-cta.features.guarantee.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("messages.hero-cta.features.guarantee.description")}
              </p>
            </CardContent>
          </MagicCard>
        </Card>
      </div>

      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Button size="lg" className="text-lg px-8 py-6">
            <ArrowRight className="size-5 order-1" />
            <span className="order-2">
              {t("messages.hero-cta.primary-button")}
            </span>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            {t("messages.hero-cta.secondary-button")}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("messages.hero-cta.disclaimer")}
        </p>
      </div>
    </div>
  );
};

export default HeroCTA;
