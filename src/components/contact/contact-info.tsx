"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function ContactInfo() {
  const { t, locale } = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.contact_info.phone"),
      value: t("contact.contact_info.phone_value"),
      href: "tel:+982191031614",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Mail,
      label: t("contact.contact_info.email"),
      value: t("contact.contact_info.email_value"),
      href: "mailto:hi@menteeno.app",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: MessageCircle,
      label: t("contact.contact_info.telegram"),
      value: t("contact.contact_info.telegram_value"),
      href: "https://t.me/menteeno",
      color: "text-sky-600",
      bgColor: "bg-sky-50",
    },
    {
      icon: MessageCircle,
      label: t("contact.contact_info.whatsapp"),
      value: t("contact.contact_info.whatsapp_value"),
      href: "https://wa.me/982191031614",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Clock,
      label: t("contact.contact_info.working_hours"),
      value: t("contact.contact_info.working_hours_value"),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: MapPin,
      label: t("contact.contact_info.address"),
      value: t("contact.contact_info.address_value"),
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {t("contact.contact_info.phone")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("contact.hero.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {contactInfo.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105"
            >
              <CardContent className="p-4 sm:p-8">
                <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4">
                  <div
                    className={`p-2 sm:p-4 rounded-xl sm:rounded-2xl ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`h-5 w-5 sm:h-8 sm:w-8 ${item.color}`}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-foreground hover:text-primary transition-colors break-all text-sm sm:text-base font-semibold group-hover:text-primary block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground break-words text-sm sm:text-base font-semibold">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
