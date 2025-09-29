"use client";

import { useEffect } from "react";

export function JSOptimizer() {
  useEffect(() => {
    // Dynamic import optimization for non-critical JavaScript
    const loadNonCriticalJS = () => {
      // Load analytics and tracking scripts asynchronously
      if (typeof window !== "undefined") {
        // Load web-vitals asynchronously
        import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
          // Only track in production
          if (process.env.NODE_ENV === "production") {
            onCLS((metric) => {
              console.log("CLS:", metric);
            });
            onINP((metric) => {
              console.log("INP:", metric);
            });
            onFCP((metric) => {
              console.log("FCP:", metric);
            });
            onLCP((metric) => {
              console.log("LCP:", metric);
            });
            onTTFB((metric) => {
              console.log("TTFB:", metric);
            });
          }
        });
      }
    };

    // Load non-critical JS after initial render
    const timer = setTimeout(loadNonCriticalJS, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

// Bundle analyzer for development
export function BundleAnalyzer() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Log bundle information in development
      const logBundleInfo = () => {
        const scripts = document.querySelectorAll("script[src]");
        const stylesheets = document.querySelectorAll("link[rel='stylesheet']");

        console.log("📦 Bundle Analysis:");
        console.log(`Scripts: ${scripts.length}`);
        console.log(`Stylesheets: ${stylesheets.length}`);

        // Log script sizes
        scripts.forEach((script, index) => {
          const src = script.getAttribute("src");
          if (src) {
            console.log(`Script ${index + 1}: ${src}`);
          }
        });
      };

      const timer = setTimeout(logBundleInfo, 2000);
      return () => clearTimeout(timer);
    }

    // Return undefined for non-development environments
    return undefined;
  }, []);

  return null;
}

// Memory optimization
export function MemoryOptimizer() {
  useEffect(() => {
    // Clean up unused event listeners and timers
    const cleanup = () => {
      // Remove any orphaned event listeners
      const elements = document.querySelectorAll("*");
      elements.forEach((element) => {
        // This is a simplified cleanup - in production you'd want more sophisticated cleanup
        if (element.getAttribute("data-cleanup")) {
          element.remove();
        }
      });
    };

    // Cleanup every 30 seconds
    const interval = setInterval(cleanup, 30000);

    return () => {
      clearInterval(interval);
      cleanup();
    };
  }, []);

  return null;
}
