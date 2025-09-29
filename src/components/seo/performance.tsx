"use client";

import { getAssetUrl } from "@/lib/config";
import { useEffect } from "react";

interface PerformanceOptimizerProps {
  enableWebVitals?: boolean;
  enableResourceHints?: boolean;
}

export function PerformanceOptimizer({
  enableWebVitals = true,
  enableResourceHints = true,
}: PerformanceOptimizerProps) {
  useEffect(() => {
    if (enableWebVitals) {
      // Web Vitals tracking
      const trackWebVitals = () => {
        // Track Core Web Vitals
        if (typeof window !== "undefined") {
          import("web-vitals").then(
            ({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
              onCLS(console.log);
              onINP(console.log);
              onFCP(console.log);
              onLCP(console.log);
              onTTFB(console.log);
            }
          );
        }
      };

      trackWebVitals();
    }

    if (enableResourceHints) {
      // Preload critical resources
      const preloadCriticalResources = () => {
        const criticalResources = [
          getAssetUrl("/assets/css/dana-web-font.css"),
          getAssetUrl("/assets/fonts/dana/DanaVF.woff2"),
        ];

        criticalResources.forEach((resource) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = resource;
          link.as = resource.endsWith(".css") ? "style" : "font";
          link.crossOrigin = "anonymous";
          document.head.appendChild(link);
        });
      };

      preloadCriticalResources();
    }
  }, [enableWebVitals, enableResourceHints]);

  return null;
}

// Resource hints component
export function ResourceHints() {
  return (
    <>
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.bunny.net" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Preconnect */}
      <link
        rel="preconnect"
        href="https://fonts.bunny.net"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* Preload critical fonts */}
      <link
        rel="preload"
        href={getAssetUrl("/assets/fonts/dana/DanaVF.woff2")}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Preload critical CSS */}
      <link
        rel="preload"
        href={getAssetUrl("/assets/css/dana-web-font.css")}
        as="style"
      />
    </>
  );
}
