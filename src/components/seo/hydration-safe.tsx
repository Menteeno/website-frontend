"use client";

import { useEffect, useState } from "react";

/**
 * Hydration-safe wrapper component to prevent hydration mismatches
 * caused by browser extensions like Dark Reader
 */
export function HydrationSafe({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Hook to check if component is hydrated
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Component that only renders on client side to avoid hydration issues
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const isHydrated = useHydration();

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Suppress hydration warnings for specific elements
 * Use this sparingly and only when necessary
 */
export function SuppressHydrationWarning({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div suppressHydrationWarning>{children}</div>;
}
