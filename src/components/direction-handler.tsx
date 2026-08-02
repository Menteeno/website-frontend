"use client";

import { useEffect } from "react";

export function DirectionHandler() {
  useEffect(() => {
    // Persian-only site - always RTL
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  return null;
}
