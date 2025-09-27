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
    <div className="min-h-screen grid grid-cols-12 gap-8 flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
      <div dir="ltr" className="lg:flex-1 col-span-5">
        <Terminal className="transition-transform duration-1000 ease-in-out scale-120 hover:scale-100 rotate-x-[30deg] -rotate-y-[30deg] -rotate-z-[0deg] hover:rotate-x-0 hover:rotate-y-0  hover:-rotate-z-0">
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
      <div className="relative px-4 z-10 max-w-2xl col-span-7 text-center lg:text-start">
        <p className="text-[17px] md:text-lg">
          {t("messages.hero-introduce.question")}{" "}
          <Highlighter action="highlight">
            <span className="text-black">
              {t("messages.hero-introduce.debugger")}
            </span>
          </Highlighter>{" "}
          {t("messages.hero-introduce.question-continue")}
        </p>
        <h2 className="mt-4 font-bold text-xl sm:text-3xl md:text-4xl leading-relaxed">
          {t("messages.hero-introduce.title")}{" "}
          <AuroraText className="font-black">
            {t("messages.hero-introduce.space")}
          </AuroraText>{" "}
          {t("messages.hero-introduce.title-continue")}
        </h2>
        <dl className="mt-10 max-w-xl space-y-3 text-lg text-foreground/80 lg:max-w-none">
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <MessagesSquareIcon className="absolute top-1 start-1 size-6 text-primary" />
              {t("messages.hero-introduce.sections.mentorship.title")}
            </dt>
            <dd className="inline ps-1">
              {t("messages.hero-introduce.sections.mentorship.description")}
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <CompassIcon className="absolute top-1 start-1 size-6 text-primary" />
              {t("messages.hero-introduce.sections.learning.title")}
            </dt>
            <dd className="inline ps-1">
              {t("messages.hero-introduce.sections.learning.description")}
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <HandshakeIcon className="absolute top-1 start-1 size-6 text-primary" />
              {t("messages.hero-introduce.sections.practice.title")}
            </dt>
            <dd className="inline ps-1">
              {t("messages.hero-introduce.sections.practice.description")}
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <HeadsetIcon className="absolute top-1 start-1 size-6 text-primary" />
              {t("messages.hero-introduce.sections.support.title")}
            </dt>
            <dd className="inline ps-1">
              {t("messages.hero-introduce.sections.support.description")}
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <BrainIcon className="absolute top-1 start-1 size-6 text-primary" />
              {t("messages.hero-introduce.sections.feedback.title")}
            </dt>
            <dd className="inline ps-1">
              {t("messages.hero-introduce.sections.feedback.description")}
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <ChartColumnBigIcon className="absolute top-1 start-1 size-6 text-primary" />
              {t("messages.hero-introduce.sections.evaluation.title")}
            </dt>
            <dd className="inline ps-1">
              {t("messages.hero-introduce.sections.evaluation.description")}
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <SwordsIcon className="absolute top-1 start-1 size-6 text-primary" />
              {t("messages.hero-introduce.sections.challenges.title")}
            </dt>
            <dd className="inline ps-1">
              {t("messages.hero-introduce.sections.challenges.description")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default HeroIntroduce;
