"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trans } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ArrowUpRight,
  ChevronLeftIcon,
  ChevronRightIcon,
  CirclePlay,
} from "lucide-react";
import { useEffect, useState } from "react";
import { WordRotate } from "../magicui/word-rotate";
import { BackgroundPattern } from "./background-pattern";

const HeroHeader = () => {
  const [direction, setDirection] = useState<string>("ltr");

  useEffect(() => {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window !== "undefined") {
      setDirection(localStorage.getItem("direction") || "ltr");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
      <BackgroundPattern />

      <div className="relative px-4 z-10 max-w-2xl text-center lg:text-start pb-2 pt-24 lg:py-0">
        <Badge className="bg-gradient-to-br from-primary to-secondary rounded-full py-1 border-none">
          Just released v1.0.0
        </Badge>
        <div className="mt-6 flex flex-col gap-2">
          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl">
            {trans("messages.home-header.title")}
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
                  trans("messages.home-header.title-rotate.1"),
                  trans("messages.home-header.title-rotate.2"),
                  trans("messages.home-header.title-rotate.3"),
                  trans("messages.home-header.title-rotate.4"),
                ]}
              />
            </div>
          </div>
        </div>
        <p className="mt-6 text-[17px] md:text-lg">
          {trans("messages.home-header.description")}
        </p>
        <div className="mt-8 lg:mt-12 flex items-center justify-center lg:justify-start gap-4">
          <Button size="lg" className="rounded-full text-base">
            {trans("messages.home-header.call-to-action-button")}{" "}
            <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" />{" "}
            {trans("messages.home-header.video-button")}
          </Button>
        </div>
      </div>
      <div className="lg:flex-1">
        <DotLottieReact
          className="lg:w-[600px] md:w-[500px] relative z-10"
          src="/assets/images/friends.lottie"
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
