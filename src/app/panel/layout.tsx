import type { ReactNode } from "react";
import { PanelProviders } from "@/features/panel/providers"
import Navbar from "@/components/navbar/navbar"
import { Footer } from "@/components/footer"

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <PanelProviders>
      <Navbar />
      {children}
      <Footer />
    </PanelProviders>
  )
}
