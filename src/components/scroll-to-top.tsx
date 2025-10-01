"use client";

import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface ScrollToTopProps {
  behavior?: "smooth" | "auto";
  delay?: number;
}

export function ScrollToTop({
  behavior = "smooth",
  delay = 0,
}: ScrollToTopProps) {
  useScrollToTop();
  return null; // This component doesn't render anything
}

// Alternative component with immediate scroll
export function ScrollToTopImmediate() {
  const { useScrollToTopImmediate } = require("@/hooks/use-scroll-to-top");
  useScrollToTopImmediate();
  return null;
}

// Component with custom options
export function ScrollToTopCustom({
  behavior = "smooth",
  delay = 0,
}: ScrollToTopProps) {
  const { useScrollToTopCustom } = require("@/hooks/use-scroll-to-top");
  useScrollToTopCustom({ behavior, delay });
  return null;
}
