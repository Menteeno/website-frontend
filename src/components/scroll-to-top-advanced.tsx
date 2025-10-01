"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface ScrollToTopAdvancedProps {
  behavior?: "smooth" | "auto";
  delay?: number;
  offset?: number;
  onlyOnPathnameChange?: boolean;
}

export function ScrollToTopAdvanced({
  behavior = "smooth",
  delay = 0,
  offset = 0,
  onlyOnPathnameChange = false,
}: ScrollToTopAdvancedProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const shouldScroll = onlyOnPathnameChange
      ? previousPathname.current !== pathname
      : true;

    if (shouldScroll) {
      const scrollToTop = () => {
        window.scrollTo({
          top: offset,
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
    }

    previousPathname.current = pathname;
  }, [pathname, searchParams, behavior, delay, offset, onlyOnPathnameChange]);

  return null;
}

// Component specifically for page navigation (ignores search param changes)
export function ScrollToTopOnPageChange() {
  return (
    <ScrollToTopAdvanced
      behavior="smooth"
      delay={100}
      onlyOnPathnameChange={true}
    />
  );
}

// Component for immediate scroll (no animation)
export function ScrollToTopImmediate() {
  return <ScrollToTopAdvanced behavior="auto" delay={0} />;
}
