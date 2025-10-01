"use client";

import { useLoading } from "@/contexts/loading-context";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useNavigationLoading() {
  const { startLoading, stopLoading, scrollToTop } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Stop loading and scroll to top when pathname or search params change
    stopLoading();
    scrollToTop();
  }, [pathname, searchParams, stopLoading, scrollToTop]);

  // Function to start loading (can be called manually)
  const handleNavigationStart = () => {
    startLoading();
  };

  return {
    handleNavigationStart,
  };
}

// Hook for handling link clicks
export function useLinkLoading() {
  const { startLoading } = useLoading();

  const handleLinkClick = (href: string) => {
    // Only start loading for internal links
    if (href.startsWith("/") && !href.startsWith("//")) {
      startLoading();
    }
  };

  return {
    handleLinkClick,
  };
}
