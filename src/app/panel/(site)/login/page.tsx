"use client";
import { GuestOnly } from "@/features/panel/auth/route-guards";
import { LoginPage } from "@/features/panel/auth/pages/login-page";

export default function Page() {
  return (
    <GuestOnly>
      <LoginPage />
    </GuestOnly>
  );
}
