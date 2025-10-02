"use client";

import { ScrollToTopSimple } from "@/components/scroll-to-top-simple";
import NextTopLoader from "nextjs-toploader";

export function LoadingBarWrapper() {
  return (
    <>
      <NextTopLoader
        color="#22c55e"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #22c55e,0 0 5px #22c55e"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <ScrollToTopSimple />
    </>
  );
}
