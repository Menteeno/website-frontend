"use client";

import type { ReactNode } from "react";
import { PublicLayout } from "@/components/panel/public-layout"
import Navbar from "@/components/navbar/navbar"
import { Footer } from "@/components/footer"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <PublicLayout>
      <Navbar />
      {children}
      <Footer />
    </PublicLayout>
  )
}
