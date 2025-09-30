"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Heart, Lightbulb, Target, Users } from "lucide-react";
import { MagicCard } from "../magicui/magic-card";

const EventAbout = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Target,
      title: t("event.about.features.networking.title"),
      description: t("event.about.features.networking.description"),
    },
    {
      icon: Lightbulb,
      title: t("event.about.features.learning.title"),
      description: t("event.about.features.learning.description"),
    },
    {
      icon: Heart,
      title: t("event.about.features.community.title"),
      description: t("event.about.features.community.description"),
    },
    {
      icon: Users,
      title: t("event.about.features.collaboration.title"),
      description: t("event.about.features.collaboration.description"),
    },
  ];

  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("event.about.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("event.about.description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
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

        {/* Event Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              {t("event.about.highlights.title")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  {t("event.about.highlights.item1")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  {t("event.about.highlights.item2")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  {t("event.about.highlights.item3")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  {t("event.about.highlights.item4")}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="size-16 text-primary" />
                </div>
                <p className="text-muted-foreground font-medium">
                  {t("event.about.image-placeholder")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAbout;
