"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Award, Clock, Coffee, Presentation, Users } from "lucide-react";

const EventSchedule = () => {
  const { t } = useTranslation();

  const scheduleItems = [
    {
      time: "۱۵:۰۰ - ۱۵:۱۵",
      title: t("event.schedule.registration.title"),
      description: t("event.schedule.registration.description"),
      icon: Users,
      type: "registration",
    },
    {
      time: "۱۵:۱۵ - ۱۵:۳۰",
      title: t("event.schedule.welcome.title"),
      description: t("event.schedule.welcome.description"),
      icon: Presentation,
      type: "presentation",
    },
    {
      time: "۱۵:۳۰ - ۱۷:۴۵",
      title: t("event.schedule.workshop1.title"),
      description: t("event.schedule.workshop1.description"),
      icon: Users,
      type: "workshop",
    },
    {
      time: "۱۷:۴۵ - ۱۸:۱۵",
      title: t("event.schedule.break.title"),
      description: t("event.schedule.break.description"),
      icon: Coffee,
      type: "break",
    },
    {
      time: "۱۸:۱۵ - ۱۹:۴۵",
      title: t("event.schedule.workshop2.title"),
      description: t("event.schedule.workshop2.description"),
      icon: Users,
      type: "workshop",
    },
    {
      time: "۱۹:۴۵ - ۲۰:۰۰",
      title: t("event.schedule.dinner.title"),
      description: t("event.schedule.dinner.description"),
      icon: Award,
      type: "networking",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "registration":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "presentation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "workshop":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "break":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "meal":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "networking":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("event.schedule.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("event.schedule.description")}
          </p>
        </div>

        {/* Schedule Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

          <div className="space-y-8">
            {scheduleItems.map((item, index) => (
              <div key={index} className="relative flex items-start gap-6">
                {/* Timeline Dot */}
                <div className="hidden md:flex items-center justify-center w-8 h-8 bg-primary rounded-full border-4 border-background flex-shrink-0 relative z-10">
                  <item.icon className="size-4 text-primary-foreground" />
                </div>

                {/* Content */}
                <Card className="flex-1 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Clock className="size-5 text-muted-foreground" />
                        <span className="font-semibold text-lg">
                          {item.time}
                        </span>
                      </div>
                      <Badge className={`w-fit ${getTypeColor(item.type)}`}>
                        {t(`event.schedule.types.${item.type}`)}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t("event.schedule.note.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("event.schedule.note.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;
