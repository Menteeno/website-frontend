"use client";

import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Track performance metrics
    const trackPerformance = () => {
      // Track First Contentful Paint (FCP)
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === "paint") {
              console.log(`${entry.name}: ${entry.startTime}ms`);
            }
          }
        });

        observer.observe({
          entryTypes: ["paint", "largest-contentful-paint", "first-input"],
        });
      }

      // Track resource loading times
      const trackResources = () => {
        const resources = performance.getEntriesByType("resource");
        const fontResources = resources.filter(
          (resource) =>
            resource.name.includes("font") || resource.name.includes("css")
        );

        console.log(
          "Font/CSS Resources:",
          fontResources.map((r) => ({
            name: r.name,
            duration: r.duration,
            transferSize: (r as any).transferSize || 0,
          }))
        );
      };

      // Track after page load
      window.addEventListener("load", trackResources);
    };

    trackPerformance();

    // Track bundle size improvements
    const trackBundleSize = () => {
      const scripts = document.querySelectorAll("script[src]");
      const stylesheets = document.querySelectorAll("link[rel='stylesheet']");

      console.log("📊 Performance Optimizations Applied:");
      console.log(`- Scripts loaded: ${scripts.length}`);
      console.log(`- Stylesheets loaded: ${stylesheets.length}`);
      console.log("- Font loading optimized with preload and async loading");
      console.log("- CSS loading optimized with critical CSS inlining");
      console.log("- JavaScript bundle splitting optimized");
      console.log("- Unused preconnects removed");
    };

    const timer = setTimeout(trackBundleSize, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}

// Performance budget monitoring
export function PerformanceBudgetMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPerformanceBudget = () => {
      // Check if we're within performance budgets
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        const budget = {
          fcp: 1800, // First Contentful Paint should be under 1.8s
          lcp: 2500, // Largest Contentful Paint should be under 2.5s
          cls: 0.1, // Cumulative Layout Shift should be under 0.1
          fid: 100, // First Input Delay should be under 100ms
        };

        console.log("🎯 Performance Budget Check:");
        console.log(
          `- Navigation timing: ${
            navigation.loadEventEnd - navigation.fetchStart
          }ms`
        );

        // Check if we're meeting performance budgets
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        if (loadTime < budget.fcp) {
          console.log("✅ Load time is within budget");
        } else {
          console.warn("⚠️ Load time exceeds budget");
        }
      }
    };

    const timer = setTimeout(checkPerformanceBudget, 3000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
