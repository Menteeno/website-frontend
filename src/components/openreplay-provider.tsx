"use client";

import tracker from "@/lib/openreplay";
import { useEffect } from "react";

export function OpenReplayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Start tracking when the component mounts
    tracker.start();

    // Cleanup function to stop tracking when component unmounts
    return () => {
      tracker.stop();
    };
  }, []);

  return <>{children}</>;
}
