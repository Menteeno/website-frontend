"use client";

import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import {
  AwardIcon,
  BarChart3Icon,
  BookOpenIcon,
  BrainIcon,
  CheckCircleIcon,
  ClockIcon,
  CompassIcon,
  HandshakeIcon,
  HeadsetIcon,
  LightbulbIcon,
  MessageSquareIcon,
  ShieldIcon,
  StarIcon,
  SwordsIcon,
  TargetIcon,
  TrendingUpIcon,
  UserCheckIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { BentoCard, BentoGrid } from "../ui/bento-grid";

const HeroProblem = () => {
  const { t } = useTranslation();

  // Creative background elements with floating animations
  const createFloatingIcons = (icons: any[], count: number = 8) => {
    return Array.from({ length: count }, (_, i) => {
      const Icon = icons[i % icons.length];
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 80 + 10;
      const top = Math.random() * 60 + 20;
      const delay = Math.random() * 3;
      const duration = Math.random() * 4 + 3; // 3-7 seconds
      const animationType = ["animate-bounce", "animate-pulse", "animate-ping"][
        i % 3
      ];
      const floatX = Math.random() * 20 - 10; // -10 to 10
      const floatY = Math.random() * 20 - 10; // -10 to 10

      return (
        <div
          key={i}
          className="absolute"
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              animation: `float ${duration}s ease-in-out infinite`,
              "--float-x": `${floatX}px`,
              "--float-y": `${floatY}px`,
            } as React.CSSProperties
          }
        >
          <Icon
            className={`opacity-20 text-gray-400 dark:text-gray-600 ${animationType}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        </div>
      );
    });
  };

  const features = [
    {
      Icon: CompassIcon,
      name: t("messages.hero-problem.sections.learning.title"),
      description: t("messages.hero-problem.sections.learning.description"),
      href: "/",
      cta: t("common.learn_more"),
      background: (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating learning icons */}
          {createFloatingIcons(
            [BookOpenIcon, TargetIcon, TrendingUpIcon, CompassIcon],
            12
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:to-purple-950/20" />

          {/* Animated dots pattern */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: HandshakeIcon,
      name: t("messages.hero-problem.sections.practice.title"),
      description: t("messages.hero-problem.sections.practice.description"),
      href: "/",
      cta: t("common.learn_more"),
      background: (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating practice icons */}
          {createFloatingIcons(
            [UsersIcon, AwardIcon, ZapIcon, HandshakeIcon],
            10
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-blue-50/30 dark:from-green-950/20 dark:to-blue-950/20" />

          {/* Animated lines pattern */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 40 + 20}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: HeadsetIcon,
      name: t("messages.hero-problem.sections.support.title"),
      description: t("messages.hero-problem.sections.support.description"),
      href: "/",
      cta: t("common.learn_more"),
      background: (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating support icons */}
          {createFloatingIcons(
            [ClockIcon, ShieldIcon, MessageSquareIcon, HeadsetIcon],
            8
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/20" />

          {/* Animated circles pattern */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                className="absolute border border-gray-300 dark:border-gray-700 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 30 + 10}px`,
                  height: `${Math.random() * 30 + 10}px`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: SwordsIcon,
      name: t("messages.hero-problem.sections.challenges.title"),
      description: t("messages.hero-problem.sections.challenges.description"),
      href: "/",
      cta: t("common.learn_more"),
      background: (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating challenge icons */}
          {createFloatingIcons(
            [LightbulbIcon, BarChart3Icon, CheckCircleIcon, SwordsIcon],
            9
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 dark:from-orange-950/20 dark:to-red-950/20" />

          {/* Animated geometric shapes */}
          <div className="absolute inset-0 opacity-15">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute bg-gradient-to-r from-red-400/20 to-orange-400/20 animate-pulse",
                  i % 3 === 0
                    ? "rounded-full"
                    : i % 3 === 1
                    ? "rounded-sm"
                    : "rounded-none"
                )}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 20 + 8}px`,
                  height: `${Math.random() * 20 + 8}px`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BrainIcon,
      name: t("messages.hero-problem.sections.feedback.title"),
      description: t("messages.hero-problem.sections.feedback.description"),
      href: "/",
      cta: t("common.learn_more"),
      background: (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating feedback icons */}
          {createFloatingIcons(
            [StarIcon, UserCheckIcon, BrainIcon, MessageSquareIcon],
            11
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 dark:from-purple-950/20 dark:to-pink-950/20" />

          {/* Animated stars pattern */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="absolute text-purple-400 dark:text-purple-600 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 8 + 4}px`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        </div>
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(var(--float-x, 5px), var(--float-y, -5px))
              rotate(90deg);
          }
          50% {
            transform: translate(
                calc(var(--float-x, 5px) * 1.5),
                calc(var(--float-y, -5px) * 1.5)
              )
              rotate(180deg);
          }
          75% {
            transform: translate(var(--float-x, 5px), var(--float-y, -5px))
              rotate(270deg);
          }
        }
      `}</style>
      <div className="flex gap-8 flex-col items-center justify-center max-w-7xl mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <h2 className="font-bold text-2xl text-center sm:text-3xl md:text-4xl leading-relaxed">
            {t("messages.hero-problem.title")}
          </h2>
        </div>
        <div className="relative z-10 w-full">
          <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 auto-rows-[500px]">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </>
  );
};

export default HeroProblem;
