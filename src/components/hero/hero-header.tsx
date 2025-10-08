"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { getAssetUrl } from "@/lib/config";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ArrowUpRight,
  ChevronLeftIcon,
  ChevronRightIcon,
  CirclePlay,
} from "lucide-react";
import { WordRotate } from "../magicui/word-rotate";
import { BackgroundPattern } from "./background-pattern";

const HeroHeader = () => {
  const { t, locale } = useTranslation();
  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
      <BackgroundPattern />

      <div className="relative px-4 z-10 max-w-2xl text-center lg:text-start pb-2 pt-24 lg:py-0">
        <Badge className="bg-gradient-to-br from-primary to-secondary rounded-full py-1 border-none">
          Just released v1.0.0
        </Badge>
        <div className="mt-6 flex flex-col gap-2">
          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl">
            {t("messages.home-header.title")}
          </h1>
          <div className="flex items-center">
            {direction === "rtl" && (
              <ChevronLeftIcon className="size-10 hidden lg:block" />
            )}
            {direction === "ltr" && (
              <ChevronRightIcon className="size-10 hidden lg:block" />
            )}
            <div className="mx-auto lg:mx-0">
              <WordRotate
                className="text-lg lg:text-4xl text-center lg:text-start font-semibold text-black dark:text-white"
                words={[
                  t("messages.home-header.title-rotate.1"),
                  t("messages.home-header.title-rotate.2"),
                  t("messages.home-header.title-rotate.3"),
                  t("messages.home-header.title-rotate.4"),
                ]}
              />
            </div>
          </div>
        </div>
        <p className="mt-6 text-[17px] md:text-lg">
          {t("messages.home-header.description")}
        </p>
        <div className="mt-8 lg:mt-12 flex items-center justify-center lg:justify-start gap-4">
          <Button
            size="lg"
            className="rounded-full text-base"
            aria-label={t("messages.home-header.call-to-action-button")}
            onClick={() => {
              window.location.href = `/${locale}/event`;
            }}
          >
            <ArrowUpRight className="!h-5 !w-5 order-1" />
            <span className="order-2">
              {t("messages.home-header.call-to-action-button")}
            </span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
            aria-label="Learn More"
            onClick={() => {
              const nextSection = document.getElementById("hero-problem");
              if (nextSection) {
                nextSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            <CirclePlay className="!h-5 !w-5 mr-2" />
            بیشتر بدانید
          </Button>
        </div>
      </div>
      <div className="lg:flex-1">
        <DotLottieReact
          className="lg:w-[600px] md:w-[500px] relative z-10"
          src={getAssetUrl("/assets/images/friends.lottie")}
          loop
          autoplay
          width="800px"
          height="600px"
        />
      </div>
    </div>
  );
};

export default HeroHeader;
