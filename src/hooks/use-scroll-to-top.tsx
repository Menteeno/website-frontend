"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Scroll to top when pathname or search params change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname, searchParams]);
}

// Alternative hook with immediate scroll (no smooth animation)
export function useScrollToTopImmediate() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);
}

// Hook with custom scroll behavior
export function useScrollToTopCustom(options?: {
  behavior?: "smooth" | "auto";
  delay?: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { behavior = "smooth", delay = 0 } = options || {};

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior,
      });
    };

    if (delay > 0) {
      const timer = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timer);
    } else {
      scrollToTop();
    }
  }, [pathname, searchParams, behavior, delay]);
}
