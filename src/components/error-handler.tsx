"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

export function ErrorBoundary({
  children,
  fallback: Fallback,
}: ErrorBoundaryProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Log page views for analytics
    if (typeof window !== "undefined") {
      console.log("Page view:", pathname);
    }
  }, [pathname]);

  return <>{children}</>;
}

// Global error handler for unhandled errors
export function GlobalErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);

      // Send error to analytics if available
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "exception", {
          description: event.error?.message || "Unknown error",
          fatal: false,
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);

      // Send error to analytics if available
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "exception", {
          description: event.reason?.message || "Unhandled promise rejection",
          fatal: false,
        });
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  return null;
}

// Health check component for monitoring
export function HealthCheck() {
  useEffect(() => {
    // Simple health check - only for non-static deployments
    const checkHealth = async () => {
      // Skip health check for static exports (GitHub Pages)
      if (process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "github-pages") {
        return;
      }

      try {
        const response = await fetch("/api/health", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.warn("Health check failed:", response.status);
        }
      } catch (error) {
        console.warn("Health check error:", error);
      }
    };

    // Run health check every 5 minutes
    const interval = setInterval(checkHealth, 5 * 60 * 1000);

    // Initial check
    checkHealth();

    return () => clearInterval(interval);
  }, []);

  return null;
}
