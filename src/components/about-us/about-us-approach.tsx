"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import {
  UserCheck,
  BookOpen,
  Target,
  Headphones,
  MessageSquare,
  BarChart3,
  Swords,
} from "lucide-react";

export const AboutUsApproach = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: UserCheck,
      title: t("about.approach.features.mentorship.title"),
      description: t("about.approach.features.mentorship.description"),
    },
    {
      icon: BookOpen,
      title: t("about.approach.features.personalized_learning.title"),
      description: t("about.approach.features.personalized_learning.description"),
    },
    {
      icon: Target,
      title: t("about.approach.features.practical_exercises.title"),
      description: t("about.approach.features.practical_exercises.description"),
    },
    {
      icon: Headphones,
      title: t("about.approach.features.support.title"),
      description: t("about.approach.features.support.description"),
    },
    {
      icon: MessageSquare,
      title: t("about.approach.features.feedback.title"),
      description: t("about.approach.features.feedback.description"),
    },
    {
      icon: BarChart3,
      title: t("about.approach.features.evaluation.title"),
      description: t("about.approach.features.evaluation.description"),
    },
    {
      icon: Swords,
      title: t("about.approach.features.challenges.title"),
      description: t("about.approach.features.challenges.description"),
    },
  ];

  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-muted/30 rounded-2xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {t("about.approach.title")}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("about.approach.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 inline-block">
                    <Icon className="size-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

