"use client";

import { Button } from "@/components/ui/button";
import { LoadingLink } from "@/components/ui/loading-link";
import { useLoading } from "@/contexts/loading-context";
import { useTranslation } from "@/hooks/use-translation";

export function LoadingDemo() {
  const { t, locale } = useTranslation();
  const { startLoading, stopLoading, isLoading } = useLoading();

  const handleManualLoading = () => {
    startLoading();
    // Simulate loading for 2 seconds
    setTimeout(() => {
      stopLoading();
    }, 2000);
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Loading Bar Demo</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Manual Loading Test</h3>
          <Button onClick={handleManualLoading} disabled={isLoading}>
            {isLoading ? "Loading..." : "Start Loading"}
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Navigation Links</h3>
          <div className="flex gap-4">
            <LoadingLink
              href={`/${locale}/dashboard`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </LoadingLink>
            <LoadingLink
              href={`/${locale}/event`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Go to Event
            </LoadingLink>
            <LoadingLink
              href={`/${locale}/auth`}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Go to Auth
            </LoadingLink>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Current Status</h3>
          <p className="text-sm text-muted-foreground">
            Loading: {isLoading ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}
