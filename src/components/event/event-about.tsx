"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Heart, Lightbulb, Target, Users } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { Autoplay, EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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

  // Local event images for the slider
  const eventImages = [
    {
      id: 1,
      src: "/assets/images/event/001.jpg",
      alt: "Historic mansion event venue",
    },
    {
      id: 2,
      src: "/assets/images/event/002.jpg",
      alt: "Grand library hall event venue",
    },
    {
      id: 3,
      src: "/assets/images/event/003.jpg",
      alt: "Conference hall event venue",
    },
    {
      id: 4,
      src: "/assets/images/event/005.jpg",
      alt: "Event venue space",
    },
    {
      id: 5,
      src: "/assets/images/event/006.jpg",
      alt: "Meeting space event venue",
    },
  ];

  return (
    <div id="about" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
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
            <div className="w-full max-w-md mx-auto">
              <Swiper
                effect="cards"
                grabCursor={true}
                modules={[EffectCards, Autoplay, Pagination]}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                className="w-full h-80"
              >
                {eventImages.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
                      />

                      {/* Instagram/TikTok style overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-blue-500/20"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400/10 via-transparent to-cyan-400/15"></div>

                      {/* Vignette effect */}
                      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.3)]"></div>

                      {/* Glow border effect */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>

                      {/* Shimmer effect like TikTok */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                      {/* Corner accent like Instagram */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
                      <div className="absolute top-6 right-6 w-1 h-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAbout;
