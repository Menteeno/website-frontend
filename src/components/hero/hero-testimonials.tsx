"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { getAssetUrl } from "@/lib/config";
import { ExternalLink, Quote, Star } from "lucide-react";
import Link from "next/link";
import { MagicCard } from "../magicui/magic-card";

const HeroTestimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: t("messages.hero-testimonials.testimonials.1.name"),
      role: t("messages.hero-testimonials.testimonials.1.role"),
      company: t("messages.hero-testimonials.testimonials.1.company"),
      content: t("messages.hero-testimonials.testimonials.1.content"),
      rating: 5,
      avatar: getAssetUrl(
        "/assets/images/testimonials/sarinaemadi_menteeno.png"
      ),
      linkedin: t("messages.hero-testimonials.testimonials.1.linkedin"),
    },
    {
      id: 2,
      name: t("messages.hero-testimonials.testimonials.2.name"),
      role: t("messages.hero-testimonials.testimonials.2.role"),
      company: t("messages.hero-testimonials.testimonials.2.company"),
      content: t("messages.hero-testimonials.testimonials.2.content"),
      rating: 5,
      avatar: getAssetUrl(
        "/assets/images/testimonials/homayoun_naji_menteeno.jpeg"
      ),
      linkedin: t("messages.hero-testimonials.testimonials.2.linkedin"),
    },
    {
      id: 3,
      name: t("messages.hero-testimonials.testimonials.3.name"),
      role: t("messages.hero-testimonials.testimonials.3.role"),
      company: t("messages.hero-testimonials.testimonials.3.company"),
      content: t("messages.hero-testimonials.testimonials.3.content"),
      rating: 5,
      avatar: getAssetUrl(
        "/assets/images/testimonials/Fateme_Sharif_Dini_menteeno.jpeg"
      ),
      linkedin: t("messages.hero-testimonials.testimonials.3.linkedin"),
    },
    {
      id: 4,
      name: t("messages.hero-testimonials.testimonials.4.name"),
      role: t("messages.hero-testimonials.testimonials.4.role"),
      company: t("messages.hero-testimonials.testimonials.4.company"),
      content: t("messages.hero-testimonials.testimonials.4.content"),
      rating: 5,
      avatar: getAssetUrl(
        "/assets/images/testimonials/ElhamRivaz_menteeno.jpeg"
      ),
      linkedin: t("messages.hero-testimonials.testimonials.4.linkedin"),
    },
    {
      id: 5,
      name: t("messages.hero-testimonials.testimonials.5.name"),
      role: t("messages.hero-testimonials.testimonials.5.role"),
      company: t("messages.hero-testimonials.testimonials.5.company"),
      content: t("messages.hero-testimonials.testimonials.5.content"),
      rating: 5,
      avatar: getAssetUrl(
        "/assets/images/testimonials/taniya_atiye_ghorbani_menteeno.jpg"
      ),
      linkedin: t("messages.hero-testimonials.testimonials.5.linkedin"),
    },
  ];

  return (
    <div
      id="hero-testimonials"
      className="min-h-screen flex flex-col items-center justify-center max-w-7xl mx-auto px-4"
    >
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 text-sm">
          {t("messages.hero-testimonials.badge")}
        </Badge>
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-relaxed mb-6">
          {t("messages.hero-testimonials.title")}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("messages.hero-testimonials.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-0 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <Quote className="size-6 text-primary/60 mb-4" />

                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      {testimonial.linkedin && (
                        <Link
                          href={testimonial.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company &&
                        testimonial.company.trim() !== "" &&
                        !testimonial.company.startsWith("messages.") &&
                        ` at ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </MagicCard>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {t("messages.hero-testimonials.footer")}
        </p>
      </div>
    </div>
  );
};

export default HeroTestimonials;
