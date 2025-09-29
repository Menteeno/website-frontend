"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface PerformanceOptimizerProps {
  enableWebVitals?: boolean;
  enableResourceHints?: boolean;
}

export function PerformanceOptimizer({
  enableWebVitals = true,
  enableResourceHints = true,
}: PerformanceOptimizerProps) {
  const pathname = usePathname();

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
      // Preload critical resources based on locale
      const preloadCriticalResources = () => {
        const segments = pathname.split("/");
        const locale = segments[1] || "fa";

        const criticalResources =
          locale === "fa"
            ? [
                "/assets/css/dana-web-font.css",
                "/assets/fonts/dana/DanaVF.woff2",
              ]
            : [
                "https://fonts.bunny.net/css?family=instrument-sans:400,500,600",
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
  }, [enableWebVitals, enableResourceHints, pathname]);

  return null;
}

// Resource hints component - now conditional based on locale
export function ResourceHints() {
  return (
    <>
      {/* DNS Prefetch - only for critical resources */}
      <link rel="dns-prefetch" href="//fonts.bunny.net" />

      {/* Preconnect - only for fonts.bunny.net since it's actually used */}
      <link
        rel="preconnect"
        href="https://fonts.bunny.net"
        crossOrigin="anonymous"
      />
    </>
  );
}
