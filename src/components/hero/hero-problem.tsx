"use client";

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
import { MagicCard } from "../magicui/magic-card";
import { Card, CardContent } from "../ui/card";

const HeroProblem = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex gap-8 flex-col items-center justify-center max-w-7xl mx-auto">
      <h2 className="mt-4 font-bold text-xl text-center sm:text-3xl md:text-4xl leading-relaxed">
        {t("messages.hero-problem.title")}
      </h2>
      <div className="relative px-4 z-10 col-span-7 text-center lg:text-start">
        <div className="mt-10 grid grid-cols-12 w-full gap-4 items-stretch text-lg text-foreground">
          <Card className="p-0 col-span-6 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <MessagesSquareIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-foreground">
                    {t("messages.hero-problem.sections.mentorship.title")}
                  </h3>
                </div>
                <p className="ps-1">
                  {t("messages.hero-problem.sections.mentorship.description")}
                </p>
              </CardContent>
            </MagicCard>
          </Card>

          <Card className="p-0 col-span-6 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <CompassIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-foreground">
                    {t("messages.hero-problem.sections.learning.title")}
                  </h3>
                </div>
                <p className="ps-1">
                  {t("messages.hero-problem.sections.learning.description")}
                </p>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-4 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <HandshakeIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-foreground">
                    {t("messages.hero-problem.sections.practice.title")}
                  </h3>
                </div>
                <p className="ps-1">
                  {t("messages.hero-problem.sections.practice.description")}
                </p>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-4 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <HeadsetIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-foreground">
                    {t("messages.hero-problem.sections.support.title")}
                  </h3>
                </div>
                <p className="ps-1">
                  {t("messages.hero-problem.sections.support.description")}
                </p>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-4 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <BrainIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-foreground">
                    {t("messages.hero-problem.sections.feedback.title")}
                  </h3>
                </div>
                <p className="ps-1">
                  {t("messages.hero-problem.sections.feedback.description")}
                </p>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-6 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <ChartColumnBigIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-foreground">
                    {t("messages.hero-problem.sections.evaluation.title")}
                  </h3>
                </div>
                <p className="ps-1">
                  {t("messages.hero-problem.sections.evaluation.description")}
                </p>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-6 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <SwordsIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-foreground">
                    {t("messages.hero-problem.sections.challenges.title")}
                  </h3>
                </div>
                <p className="ps-1">
                  {t("messages.hero-problem.sections.challenges.description")}
                </p>
              </CardContent>
            </MagicCard>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroProblem;
