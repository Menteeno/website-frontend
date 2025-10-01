"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Code,
  GraduationCap,
  Lightbulb,
  Target,
} from "lucide-react";
import { MagicCard } from "../magicui/magic-card";

const EventTargetAudience = () => {
  const { t } = useTranslation();

  const audienceTypes = [
    {
      icon: GraduationCap,
      title: t("event.audience.students.title"),
      description: t("event.audience.students.description"),
      benefits: [
        t("event.audience.students.benefits.1"),
        t("event.audience.students.benefits.2"),
        t("event.audience.students.benefits.3"),
      ],
    },
    {
      icon: Briefcase,
      title: t("event.audience.professionals.title"),
      description: t("event.audience.professionals.description"),
      benefits: [
        t("event.audience.professionals.benefits.1"),
        t("event.audience.professionals.benefits.2"),
        t("event.audience.professionals.benefits.3"),
      ],
    },
    {
      icon: Code,
      title: t("event.audience.developers.title"),
      description: t("event.audience.developers.description"),
      benefits: [
        t("event.audience.developers.benefits.1"),
        t("event.audience.developers.benefits.2"),
        t("event.audience.developers.benefits.3"),
      ],
    },
    {
      icon: Lightbulb,
      title: t("event.audience.entrepreneurs.title"),
      description: t("event.audience.entrepreneurs.description"),
      benefits: [
        t("event.audience.entrepreneurs.benefits.1"),
        t("event.audience.entrepreneurs.benefits.2"),
        t("event.audience.entrepreneurs.benefits.3"),
      ],
    },
  ];

  const whyAttend = [
    {
      icon: Target,
      title: t("event.audience.why.practical_experience.title"),
      description: t("event.audience.why.practical_experience.description"),
    },
    {
      icon: GraduationCap,
      title: t("event.audience.why.soft_skills.title"),
      description: t("event.audience.why.soft_skills.description"),
    },
    {
      icon: CheckCircle,
      title: t("event.audience.why.effective_feedback.title"),
      description: t("event.audience.why.effective_feedback.description"),
    },
  ];

  return (
    <div id="audience" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("event.audience.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("event.audience.description")}
          </p>
        </div>

        {/* Audience Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {audienceTypes.map((audience, index) => (
            <Card key={index} className="p-0 shadow-none border-none">
              <MagicCard
                gradientColor="oklch(72.3% 0.219 149.579 / .15)"
                className="p-0 h-full"
                gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
                gradientTo="oklch(72.3% 0.219 149.579 / .4)"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="size-12 bg-primary/15 rounded-full p-3 flex-shrink-0">
                      <audience.icon className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">
                        {audience.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {audience.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {audience.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="size-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </MagicCard>
            </Card>
          ))}
        </div>

        {/* Why Attend Section */}
        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {t("event.audience.why.title")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyAttend.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="size-16 bg-primary/15 rounded-full p-4">
                    <item.icon className="size-8 text-primary" />
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <ArrowRight className="size-4" />
            <span>{t("event.audience.cta")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventTargetAudience;
