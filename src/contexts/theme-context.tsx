"use client";

import type { Appearance } from "@/types/common";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  appearance: Appearance;
  updateAppearance: (mode: Appearance) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDark = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === "undefined") {
    return;
  }

  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
  const isDark =
    appearance === "dark" || (appearance === "system" && prefersDark());
  document.documentElement.classList.toggle("dark", isDark);
  return isDark;
};

const mediaQuery = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [isDark, setIsDark] = useState(false);

  const updateAppearance = (mode: Appearance) => {
    setAppearance(mode);
    localStorage.setItem("appearance", mode);
    setCookie("appearance", mode);
    const newIsDark = applyTheme(mode);
    setIsDark(newIsDark);
  };

  useEffect(() => {
    const savedAppearance =
      (localStorage.getItem("appearance") as Appearance) || "system";
    setAppearance(savedAppearance);
    const newIsDark = applyTheme(savedAppearance);
    setIsDark(newIsDark);

    const handleSystemThemeChange = () => {
      if (appearance === "system") {
        const newIsDark = applyTheme("system");
        setIsDark(newIsDark);
      }
    };

    const mediaQueryList = mediaQuery();
    mediaQueryList?.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQueryList?.removeEventListener("change", handleSystemThemeChange);
    };
  }, [appearance]);

  return (
    <ThemeContext.Provider value={{ appearance, updateAppearance, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
