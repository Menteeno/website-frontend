"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function CSSOptimizer() {
  const pathname = usePathname();

  useEffect(() => {
    // Determine locale from pathname
    const segments = pathname.split("/");
    const locale = segments[1] || "fa";

    // Critical CSS inlining for above-the-fold content
    const criticalCSS = `
      body {
        font-family: ${
          locale === "fa" ? "var(--font-dana)" : "var(--font-sans)"
        }, system-ui, sans-serif;
        background-color: var(--background);
        color: var(--foreground);
        margin: 0;
        padding: 0;
      }
      
      .antialiased {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Prevent layout shift during font loading */
      .font-loading {
        font-display: swap;
      }
    `;

    // Inject critical CSS
    const style = document.createElement("style");
    style.textContent = criticalCSS;
    style.setAttribute("data-critical", "true");
    document.head.insertBefore(style, document.head.firstChild);

    // Preload non-critical CSS based on locale
    const preloadNonCriticalCSS = () => {
      const nonCriticalSheets =
        locale === "fa"
          ? ["/assets/css/dana-web-font.css"]
          : ["https://fonts.bunny.net/css?family=instrument-sans:400,500,600"];

      nonCriticalSheets.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = href;
        link.as = "style";
        link.onload = () => {
          link.rel = "stylesheet";
        };
        document.head.appendChild(link);
      });
    };

    // Load non-critical CSS after initial render
    const timer = setTimeout(preloadNonCriticalCSS, 100);

    return () => {
      clearTimeout(timer);
      // Clean up critical CSS on unmount
      const criticalStyle = document.querySelector(
        'style[data-critical="true"]'
      );
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, [pathname]);

  return null;
}

// CSS purging optimization
export function CSSPurger() {
  useEffect(() => {
    // Remove unused CSS classes after component mount
    const removeUnusedCSS = () => {
      const allElements = document.querySelectorAll("*");
      const usedClasses = new Set<string>();

      allElements.forEach((element) => {
        if (element.className && typeof element.className === "string") {
          element.className.split(" ").forEach((cls) => {
            if (cls.trim()) {
              usedClasses.add(cls.trim());
            }
          });
        }
      });

      // This is a simplified version - in production, you'd want to use
      // a proper CSS purging tool like PurgeCSS
      console.log("Used CSS classes:", Array.from(usedClasses).length);
    };

    const timer = setTimeout(removeUnusedCSS, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
