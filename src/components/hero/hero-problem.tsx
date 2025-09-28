"use client";

import { useTranslation } from "@/hooks/use-translation";
import {
  BrainIcon,
  CompassIcon,
  HandshakeIcon,
  HeadsetIcon,
  SwordsIcon,
} from "lucide-react";
import { BentoCard, BentoGrid } from "../ui/bento-grid";

const HeroProblem = () => {
  const { t } = useTranslation();

  const features = [
    {
      Icon: CompassIcon,
      name: t("messages.hero-problem.sections.learning.title"),
      description: t("messages.hero-problem.sections.learning.description"),
      href: "/",
      cta: "Learn more",
      background: <div className="absolute -top-20 -right-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: HandshakeIcon,
      name: t("messages.hero-problem.sections.practice.title"),
      description: t("messages.hero-problem.sections.practice.description"),
      href: "/",
      cta: "Learn more",
      background: <div className="absolute -top-20 -right-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: HeadsetIcon,
      name: t("messages.hero-problem.sections.support.title"),
      description: t("messages.hero-problem.sections.support.description"),
      href: "/",
      cta: "Learn more",
      background: <div className="absolute -top-20 -right-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: SwordsIcon,
      name: t("messages.hero-problem.sections.challenges.title"),
      description: t("messages.hero-problem.sections.challenges.description"),
      href: "/",
      cta: "Learn more",
      background: <div className="absolute -top-20 -right-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BrainIcon,
      name: t("messages.hero-problem.sections.feedback.title"),
      description: t("messages.hero-problem.sections.feedback.description"),
      href: "/",
      cta: "Learn more",
      background: <div className="absolute -top-20 -right-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
  ];

  return (
    <div className="flex gap-6 flex-col items-center justify-center max-w-7xl mx-auto px-4 py-8">
      <div className="text-center space-y-3">
        <h2 className="font-bold text-xl text-center sm:text-2xl md:text-3xl leading-relaxed">
          {t("messages.hero-problem.title")}
        </h2>
      </div>
      <div className="relative z-10 w-full">
        <BentoGrid className="lg:grid-rows-2">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default HeroProblem;
