"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTopSimple() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}
