"use client";

import { ScrollToTopSimple } from "@/components/scroll-to-top-simple";
import { GitHubLoadingBar } from "@/components/ui/loading-bar";
import { useLoading } from "@/contexts/loading-context";

export function LoadingBarWrapper() {
  const { isLoading } = useLoading();

  return (
    <>
      <GitHubLoadingBar isLoading={isLoading} />
      <ScrollToTopSimple />
    </>
  );
}
