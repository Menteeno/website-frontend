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
import { useEffect, useState } from "react";
import { BentoCard, BentoGrid } from "../ui/bento-grid";

// Seeded random number generator for consistent values
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

const HeroProblem = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Creative background elements with floating animations
  const createFloatingIcons = (
    icons: any[],
    count: number = 8,
    seed: number = 0
  ) => {
    if (!isClient) {
      // Return empty array during SSR to prevent hydration mismatch
      return [];
    }

    const rng = new SeededRandom(seed);
    // Reduce count on mobile for better performance
    const mobileCount = Math.min(count, 4);
    const desktopCount = count;
    const actualCount =
      typeof window !== "undefined" && window.innerWidth < 768
        ? mobileCount
        : desktopCount;

    return Array.from({ length: actualCount }, (_, i) => {
      const Icon = icons[i % icons.length];
      const size = rng.next() * 20 + 10;
      const left = rng.next() * 80 + 10;
      const top = rng.next() * 60 + 20;
      const delay = rng.next() * 3;
      const duration = rng.next() * 4 + 3; // 3-7 seconds
      const animationType = ["animate-bounce", "animate-pulse", "animate-ping"][
        i % 3
      ];
      const floatX = rng.next() * 20 - 10; // -10 to 10
      const floatY = rng.next() * 20 - 10; // -10 to 10

      return (
        <div
          key={i}
          className="absolute hidden sm:block"
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

  // Helper function to create animated dots with seeded random
  const createAnimatedDots = (count: number, seed: number) => {
    if (!isClient) return [];

    const rng = new SeededRandom(seed);
    // Reduce count on mobile for better performance
    const mobileCount = Math.min(count, 8);
    const actualCount =
      typeof window !== "undefined" && window.innerWidth < 768
        ? mobileCount
        : count;

    return Array.from({ length: actualCount }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-gray-400 rounded-full animate-pulse hidden sm:block"
        style={{
          left: `${rng.next() * 100}%`,
          top: `${rng.next() * 100}%`,
          animationDelay: `${rng.next() * 2}s`,
        }}
      />
    ));
  };

  // Helper function to create animated lines with seeded random
  const createAnimatedLines = (count: number, seed: number) => {
    if (!isClient) return [];

    const rng = new SeededRandom(seed);
    // Reduce count on mobile for better performance
    const mobileCount = Math.min(count, 4);
    const actualCount =
      typeof window !== "undefined" && window.innerWidth < 768
        ? mobileCount
        : count;

    return Array.from({ length: actualCount }, (_, i) => (
      <div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-pulse hidden sm:block"
        style={{
          left: `${rng.next() * 100}%`,
          top: `${rng.next() * 100}%`,
          width: `${rng.next() * 40 + 20}%`,
          animationDelay: `${rng.next() * 3}s`,
        }}
      />
    ));
  };

  // Helper function to create animated circles with seeded random
  const createAnimatedCircles = (count: number, seed: number) => {
    if (!isClient) return [];

    const rng = new SeededRandom(seed);
    // Reduce count on mobile for better performance
    const mobileCount = Math.min(count, 6);
    const actualCount =
      typeof window !== "undefined" && window.innerWidth < 768
        ? mobileCount
        : count;

    return Array.from({ length: actualCount }, (_, i) => (
      <div
        key={i}
        className="absolute border border-gray-300 dark:border-gray-700 rounded-full animate-ping hidden sm:block"
        style={{
          left: `${rng.next() * 100}%`,
          top: `${rng.next() * 100}%`,
          width: `${rng.next() * 30 + 10}px`,
          height: `${rng.next() * 30 + 10}px`,
          animationDelay: `${rng.next() * 4}s`,
        }}
      />
    ));
  };

  // Helper function to create animated shapes with seeded random
  const createAnimatedShapes = (count: number, seed: number) => {
    if (!isClient) return [];

    const rng = new SeededRandom(seed);
    // Reduce count on mobile for better performance
    const mobileCount = Math.min(count, 6);
    const actualCount =
      typeof window !== "undefined" && window.innerWidth < 768
        ? mobileCount
        : count;

    return Array.from({ length: actualCount }, (_, i) => (
      <div
        key={i}
        className={cn(
          "absolute bg-gradient-to-r from-red-400/20 to-orange-400/20 animate-pulse hidden sm:block",
          i % 3 === 0
            ? "rounded-full"
            : i % 3 === 1
            ? "rounded-sm"
            : "rounded-none"
        )}
        style={{
          left: `${rng.next() * 100}%`,
          top: `${rng.next() * 100}%`,
          width: `${rng.next() * 20 + 8}px`,
          height: `${rng.next() * 20 + 8}px`,
          animationDelay: `${rng.next() * 3}s`,
        }}
      />
    ));
  };

  // Helper function to create animated stars with seeded random
  const createAnimatedStars = (count: number, seed: number) => {
    if (!isClient) return [];

    const rng = new SeededRandom(seed);
    // Reduce count on mobile for better performance
    const mobileCount = Math.min(count, 8);
    const actualCount =
      typeof window !== "undefined" && window.innerWidth < 768
        ? mobileCount
        : count;

    return Array.from({ length: actualCount }, (_, i) => (
      <div
        key={i}
        className="absolute text-purple-400 dark:text-purple-600 animate-pulse hidden sm:block"
        style={{
          left: `${rng.next() * 100}%`,
          top: `${rng.next() * 100}%`,
          fontSize: `${rng.next() * 8 + 4}px`,
          animationDelay: `${rng.next() * 2}s`,
        }}
      >
        ✨
      </div>
    ));
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
            12,
            1
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:to-purple-950/20" />

          {/* Animated dots pattern */}
          <div className="absolute inset-0 opacity-10">
            {createAnimatedDots(20, 2)}
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
            10,
            3
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-blue-50/30 dark:from-green-950/20 dark:to-blue-950/20" />

          {/* Animated lines pattern */}
          <div className="absolute inset-0 opacity-5">
            {createAnimatedLines(8, 4)}
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
            8,
            5
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/20" />

          {/* Animated circles pattern */}
          <div className="absolute inset-0 opacity-10">
            {createAnimatedCircles(15, 6)}
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
            9,
            7
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 dark:from-orange-950/20 dark:to-red-950/20" />

          {/* Animated geometric shapes */}
          <div className="absolute inset-0 opacity-15">
            {createAnimatedShapes(12, 8)}
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
            11,
            9
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 dark:from-purple-950/20 dark:to-pink-950/20" />

          {/* Animated stars pattern */}
          <div className="absolute inset-0 opacity-20">
            {createAnimatedStars(18, 10)}
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
      <div className="flex gap-6 sm:gap-8 lg:gap-10 flex-col items-center justify-center max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center leading-tight sm:leading-relaxed px-4">
            {t("messages.hero-problem.title")}
          </h2>
        </div>
        <div className="relative z-10 w-full">
          {/* Mobile: Horizontal scroll */}
          <div className="block md:hidden">
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4 py-4">
                {features.map((feature) => (
                  <div
                    key={feature.name}
                    className="flex-shrink-0 w-80 snap-center"
                  >
                    <BentoCard {...feature} />
                  </div>
                ))}
              </div>

              {/* Scroll indicators */}
              <div className="flex justify-center mt-6 space-x-3">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:block">
            <BentoGrid className="grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 auto-rows-[220px] md:auto-rows-[280px] lg:auto-rows-[400px]">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroProblem;
