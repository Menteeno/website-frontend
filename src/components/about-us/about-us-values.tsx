"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Heart, Target, Users, MessageSquare } from "lucide-react";

export const AboutUsValues = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Target,
      title: t("about.values.practical_learning.title"),
      description: t("about.values.practical_learning.description"),
    },
    {
      icon: Heart,
      title: t("about.values.personalization.title"),
      description: t("about.values.personalization.description"),
    },
    {
      icon: Users,
      title: t("about.values.community.title"),
      description: t("about.values.community.description"),
    },
    {
      icon: MessageSquare,
      title: t("about.values.continuous_feedback.title"),
      description: t("about.values.continuous_feedback.description"),
    },
  ];

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {t("about.values.title")}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("about.values.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

