"use client";

import type { ReactNode } from "react";
import { RequireAuth } from "@/features/panel/auth/route-guards";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}
