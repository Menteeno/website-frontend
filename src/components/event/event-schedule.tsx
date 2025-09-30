"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
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
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("event.schedule.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("event.schedule.description")}
          </p>
        </div>

        {/* Schedule Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line - Positioned between first and last icons */}
          <div
            className="absolute right-4 w-0 border-l-2 border-dotted border-primary hidden md:block"
            style={{
              top: "5.2rem", // Start after first icon (half of icon height + spacing)
              bottom: "5.2rem", // End before last icon
              opacity: 0.3,
            }}
          ></div>

          <div className="space-y-3 md:space-y-4">
            {scheduleItems.map((item, index) => (
              <div key={index} className="relative">
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <Card className="shadow-sm hover:shadow-md transition-all duration-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-primary" />
                          <span className="font-semibold text-xs text-primary">
                            {item.time}
                          </span>
                        </div>
                        <Badge
                          className={cn(
                            "w-fit text-xs px-2 py-1",
                            getTypeColor(item.type)
                          )}
                        >
                          {t(`event.schedule.types.${item.type}`)}
                        </Badge>
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                  <div className="pr-12">
                    <Card className="shadow-sm hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-primary" />
                            <span className="font-semibold text-sm text-primary">
                              {item.time}
                            </span>
                          </div>
                          <Badge
                            className={cn(
                              "w-fit text-xs px-2 py-1",
                              getTypeColor(item.type)
                            )}
                          >
                            {t(`event.schedule.types.${item.type}`)}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-tight">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node - Desktop Only */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-primary rounded-full border-2 border-background shadow-md hover:shadow-lg transition-all duration-200 z-10 hover:scale-110">
                    <item.icon className="size-3 text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-foreground mb-3">
                {t("event.schedule.note.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
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
