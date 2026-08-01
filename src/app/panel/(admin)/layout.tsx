"use client";

import type { ReactNode } from "react";
import { AdminLayout } from "@/components/panel/admin-layout";
import { RequireAdmin } from "@/features/panel/auth/route-guards";

export default function AdminGroupLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAdmin>
      <AdminLayout>{children}</AdminLayout>
    </RequireAdmin>
  );
}
