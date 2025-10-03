"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowUpRight, Target, TrendingUp, Users } from "lucide-react";
import { BlurFade } from "../magicui/blur-fade";
import { MagicCard } from "../magicui/magic-card";

// Number Ticker Component (inline implementation)
const NumberTicker = ({
  value,
  className,
  isPercentage = true,
}: {
  value: number | string;
  className?: string;
  isPercentage?: boolean;
}) => {
  return (
    <span
      className={`font-black text-3xl md:text-4xl lg:text-5xl text-primary ${className}`}
    >
      {typeof value === "string" ? value : `${value}${isPercentage ? "%" : ""}`}
    </span>
  );
};

const EventDataDriven = () => {
  const { t } = useTranslation();

  const statistics = [
    {
      number: "11x",
      title: t("event.data-driven.statistics.google.title"),
      description: t("event.data-driven.statistics.google.description"),
      source: t("event.data-driven.statistics.google.source"),
      sourceUrl: t("event.data-driven.statistics.google.sourceUrl"),
      icon: Users,
      isPercentage: false,
    },
    {
      number: 66,
      title: t("event.data-driven.statistics.future.title"),
      description: t("event.data-driven.statistics.future.description"),
      source: t("event.data-driven.statistics.future.source"),
      sourceUrl: t("event.data-driven.statistics.future.sourceUrl"),
      icon: TrendingUp,
      isPercentage: true,
    },
    {
      number: 92,
      title: t("event.data-driven.statistics.hiring.title"),
      description: t("event.data-driven.statistics.hiring.description"),
      source: t("event.data-driven.statistics.hiring.source"),
      sourceUrl: t("event.data-driven.statistics.hiring.sourceUrl"),
      icon: Target,
      isPercentage: true,
    },
    {
      number: 85,
      title: t("event.data-driven.statistics.success.title"),
      description: t("event.data-driven.statistics.success.description"),
      source: t("event.data-driven.statistics.success.source"),
      sourceUrl: t("event.data-driven.statistics.success.sourceUrl"),
      icon: ArrowUpRight,
      isPercentage: true,
    },
  ];

  return (
    <div id="data-driven" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <BlurFade direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("event.data-driven.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("event.data-driven.description")}
            </p>
          </div>
        </BlurFade>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {statistics.map((stat, index) => (
            <BlurFade key={index} direction="up" delay={0.2 + index * 0.1}>
              <Card className="p-0 shadow-none border-none h-full">
                <MagicCard
                  gradientColor="oklch(72.3% 0.219 149.579 / .15)"
                  className="p-0 h-full flex flex-col"
                  gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
                  gradientTo="oklch(72.3% 0.219 149.579 / .4)"
                >
                  <CardHeader className="text-center py-4">
                    <div className="flex justify-center mb-3">
                      <div className="size-12 bg-primary/15 rounded-full p-3">
                        <stat.icon className="size-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-center py-4 flex-1 flex flex-col justify-center">
                    <div className="mb-3">
                      <NumberTicker
                        value={stat.number}
                        isPercentage={stat.isPercentage}
                      />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </CardContent>

                  <CardFooter className="py-3">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground w-full">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {stat.sourceUrl ? (
                        <a
                          href={stat.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline hover:text-primary transition-colors"
                        >
                          {stat.source}
                        </a>
                      ) : (
                        <span className="font-medium">{stat.source}</span>
                      )}
                    </div>
                  </CardFooter>
                </MagicCard>
              </Card>
            </BlurFade>
          ))}
        </div>

        {/* Final Statement */}
        <BlurFade direction="up" delay={0.6}>
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                  {t("event.data-driven.conclusion")}
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default EventDataDriven;
