"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { useTranslation } from "@/hooks/use-translation";
import {
  BrainIcon,
  ChartColumnBigIcon,
  CompassIcon,
  HandshakeIcon,
  HeadsetIcon,
  MessagesSquareIcon,
  SwordsIcon,
} from "lucide-react";
import { AuroraText } from "../magicui/aurora-text";
import { Highlighter } from "../magicui/highlighter";

const HeroIntroduce = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        dir="ltr"
        className="lg:flex-1 col-span-12 lg:col-span-5 mb-8 lg:mb-0"
      >
        <Terminal className="transition-transform duration-1000 ease-in-out scale-100 sm:scale-110 lg:scale-120 hover:scale-100 rotate-x-0 sm:rotate-x-[20deg] lg:rotate-x-[30deg] -rotate-y-0 sm:-rotate-y-[20deg] lg:-rotate-y-[30deg] -rotate-z-0 hover:rotate-x-0 hover:rotate-y-0  hover:-rotate-z-0">
          <TypingAnimation>
            {t("messages.hero-introduce.terminal-command")}
          </TypingAnimation>

          <AnimatedSpan className="text-green-500">
            <span>✔ {t("messages.hero-introduce.features.mentorship")}</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ {t("messages.hero-introduce.features.learning-plan")}</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ {t("messages.hero-introduce.features.teamwork")}</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ {t("messages.hero-introduce.features.support")}</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ {t("messages.hero-introduce.features.feedback")}</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ {t("messages.hero-introduce.features.progress")}</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ {t("messages.hero-introduce.features.challenges")}</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-blue-500">
            <span>{t("messages.hero-introduce.terminal-info")}</span>
            <span className="pl-2">
              {t("messages.hero-introduce.terminal-path")}
            </span>
          </AnimatedSpan>

          <TypingAnimation className="text-muted-foreground">
            {t("messages.hero-introduce.terminal-complete")}
          </TypingAnimation>
        </Terminal>
      </div>
      <div className="relative px-2 sm:px-4 z-10 max-w-2xl col-span-12 lg:col-span-7 text-center lg:text-start">
        <p className="text-base sm:text-[17px] md:text-lg leading-relaxed">
          {t("messages.hero-introduce.question")}{" "}
          <Highlighter action="highlight">
            <span className="text-black">
              {t("messages.hero-introduce.debugger")}
            </span>
          </Highlighter>{" "}
          {t("messages.hero-introduce.question-continue")}
        </p>
        <h2 className="mt-3 sm:mt-4 font-bold text-lg sm:text-xl md:text-3xl lg:text-4xl leading-tight sm:leading-relaxed">
          {t("messages.hero-introduce.title")}{" "}
          <AuroraText className="font-black">
            {t("messages.hero-introduce.space")}
          </AuroraText>{" "}
          {t("messages.hero-introduce.title-continue")}
        </h2>
        <div className="mt-6 sm:mt-8 lg:mt-10 max-w-xl space-y-4 sm:space-y-3 lg:max-w-none">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <MessagesSquareIcon className="size-5 sm:size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                {t("messages.hero-introduce.sections.mentorship.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("messages.hero-introduce.sections.mentorship.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <CompassIcon className="size-5 sm:size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                {t("messages.hero-introduce.sections.learning.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("messages.hero-introduce.sections.learning.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <HandshakeIcon className="size-5 sm:size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                {t("messages.hero-introduce.sections.practice.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("messages.hero-introduce.sections.practice.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <HeadsetIcon className="size-5 sm:size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                {t("messages.hero-introduce.sections.support.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("messages.hero-introduce.sections.support.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <BrainIcon className="size-5 sm:size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                {t("messages.hero-introduce.sections.feedback.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("messages.hero-introduce.sections.feedback.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <ChartColumnBigIcon className="size-5 sm:size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                {t("messages.hero-introduce.sections.evaluation.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("messages.hero-introduce.sections.evaluation.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <SwordsIcon className="size-5 sm:size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                {t("messages.hero-introduce.sections.challenges.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("messages.hero-introduce.sections.challenges.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroIntroduce;
