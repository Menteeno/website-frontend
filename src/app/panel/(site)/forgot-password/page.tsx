"use client";
import { GuestOnly } from "@/features/panel/auth/route-guards";
import { ForgotPasswordPage } from "@/features/panel/auth/pages/forgot-password-page";

export default function Page() {
  return (
    <GuestOnly>
      <ForgotPasswordPage />
    </GuestOnly>
  );
}
