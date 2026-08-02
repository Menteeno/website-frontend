"use client";

import { Suspense } from "react";
import { PaymentResultPage } from "@/features/panel/payments/pages/payment-result-page";
import { useTranslation } from "@/hooks/use-translation";

export default function Page() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<p>{t("panel.common.loading")}</p>}>
      <PaymentResultPage />
    </Suspense>
  );
}
