"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    chatwootSettings?: {
      position?: string;
      type?: string;
      launcherTitle?: string;
      hideMessageBubble?: boolean;
      locale?: string;
    };
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    $chatwoot?: {
      toggle: () => void;
      open: () => void;
      close: () => void;
    };
  }
}

export function ChatwootWidget() {
  useEffect(() => {
    // Set Chatwoot settings before loading SDK
    window.chatwootSettings = {
      position: "right",
      type: "standard",
      launcherTitle: "با ما گفتگو کنید",
      hideMessageBubble: false,
      locale: "fa",
    };

    // Check if Chatwoot SDK script is already loaded
    const existingScript = document.querySelector(
      'script[src*="chatwoot.com/packs/js/sdk.js"]'
    );

    if (existingScript) {
      // Script already exists, try to initialize if SDK is available
      const initChatwoot = () => {
        if (
          window.chatwootSDK &&
          typeof window.chatwootSDK.run === "function"
        ) {
          try {
            window.chatwootSDK.run({
              websiteToken: "yPrT88KjBkgmBZGReXXSnCp8",
              baseUrl: "https://app.chatwoot.com",
            });
          } catch (error) {
            console.error("Chatwoot initialization error:", error);
          }
        } else {
          // SDK not ready yet, try again after a short delay
          setTimeout(initChatwoot, 200);
        }
      };
      initChatwoot();
      return;
    }

    // Load Chatwoot SDK script
    const script = document.createElement("script");
    script.src = "https://app.chatwoot.com/packs/js/sdk.js";
    script.async = true;
    script.id = "chatwoot-sdk-script";
    script.crossOrigin = "anonymous";

    script.onload = () => {
      // Initialize Chatwoot after script loads
      const initChatwoot = () => {
        if (
          window.chatwootSDK &&
          typeof window.chatwootSDK.run === "function"
        ) {
          try {
            window.chatwootSDK.run({
              websiteToken: "yPrT88KjBkgmBZGReXXSnCp8",
              baseUrl: "https://app.chatwoot.com",
            });
            console.log("Chatwoot initialized successfully");
          } catch (error) {
            console.error("Chatwoot initialization error:", error);
          }
        } else {
          // SDK not ready yet, try again
          setTimeout(initChatwoot, 100);
        }
      };

      // Try to initialize immediately, then retry if needed
      setTimeout(initChatwoot, 100);
    };

    script.onerror = (error) => {
      console.error("Failed to load Chatwoot SDK:", error);
    };

    // Append script to head instead of body for better compatibility
    const head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(script);
  }, []);

  return null;
}
