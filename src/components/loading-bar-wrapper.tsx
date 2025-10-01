"use client";

import { ScrollToTopOnPageChange } from "@/components/scroll-to-top-advanced";
import { GitHubLoadingBar } from "@/components/ui/loading-bar";
import { useLoading } from "@/contexts/loading-context";

export function LoadingBarWrapper() {
  const { isLoading } = useLoading();

  return (
    <>
      <GitHubLoadingBar isLoading={isLoading} />
      <ScrollToTopOnPageChange />
    </>
  );
}
