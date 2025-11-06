"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { getAssetUrl } from "@/lib/config";
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
      src: getAssetUrl("/assets/images/event/gallery/001.jpg"),
      alt: "خانه فناوری - Tech House outdoor sign with pathway leading to building",
    },
    {
      id: 2,
      src: getAssetUrl("/assets/images/event/gallery/002.jpg"),
      alt: "Grand white building with classical architecture, porch and columns",
    },
    {
      id: 3,
      src: getAssetUrl("/assets/images/event/gallery/003.jpg"),
      alt: "Two-story indoor library and lobby space with decorative elements",
    },
    {
      id: 4,
      src: getAssetUrl("/assets/images/event/gallery/004.jpg"),
      alt: "Four men engaged in discussion around a table with cards and papers",
    },
    {
      id: 5,
      src: getAssetUrl("/assets/images/event/gallery/005.jpg"),
      alt: "Indoor event exhibition with Mentino and Jamaran Technology House banners",
    },
    {
      id: 6,
      src: getAssetUrl("/assets/images/event/gallery/006.jpg"),
      alt: "Workshop and meeting room with participants at tables",
    },
    {
      id: 7,
      src: getAssetUrl("/assets/images/event/gallery/007.jpg"),
      alt: "Six young men playing card game around a wooden table",
    },
    {
      id: 8,
      src: getAssetUrl("/assets/images/event/gallery/008.jpg"),
      alt: "Group photo of 25-30 people in front of white building with banners",
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
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
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
