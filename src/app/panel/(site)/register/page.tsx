"use client";
import { GuestOnly } from "@/features/panel/auth/route-guards";
import { RegisterPage } from "@/features/panel/auth/pages/register-page";

export default function Page() {
  return (
    <GuestOnly>
      <RegisterPage />
    </GuestOnly>
  );
}
