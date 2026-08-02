"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Seo } from "@/components/panel/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/panel/auth/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";

function param(
  searchParams: URLSearchParams,
  ...keys: string[]
): string | null {
  for (const key of keys) {
    const value = searchParams.get(key);
    if (value) {
      return value;
    }
  }
  return null;
}

export function PaymentResultPage() {
  const { t, locale: lang } = useTranslation();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const status = param(searchParams, "status") ?? "failed";
  const orderId = param(searchParams, "orderId", "orderid");
  const courseId = param(searchParams, "courseId", "courseid");
  const paid = status === "paid";
  const locale = lang === "fa" ? "fa-IR" : "en-US";

  const { data: order } = useQuery({
    queryKey: ["payment-order", orderId, user?.id],
    enabled: Boolean(orderId && user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_orders")
        .select("*")
        .eq("id", orderId ?? "")
        .maybeSingle();
      if (error) {
        throw error;
      }
      return data;
    },
  });

  const { data: course } = useQuery({
    queryKey: ["payment-result-course", courseId ?? order?.course_id],
    enabled: Boolean(courseId || order?.course_id),
    queryFn: async () => {
      const id = courseId || order?.course_id || "";
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, slug")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        throw error;
      }
      return data;
    },
  });

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Seo
        title={
          paid
            ? t("panel.payments.successTitle")
            : t("panel.payments.failedTitle")
        }
        description={
          paid
            ? t("panel.payments.successDescription")
            : t("panel.payments.failedDescription")
        }
        path="/panel/payment/result"
        noIndex
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {paid
              ? t("panel.payments.successTitle")
              : t("panel.payments.failedTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {paid
              ? t("panel.payments.successDescription")
              : t("panel.payments.failedDescription")}
          </p>
          {course ? (
            <p className="text-sm font-medium">{course.title}</p>
          ) : null}
          {order ? (
            <dl className="grid gap-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--color-muted-foreground)]">
                  {t("panel.payments.amount")}
                </dt>
                <dd>{formatPrice(order.amount, order.currency, locale)}</dd>
              </div>
              {order.zibal_ref_number ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted-foreground)]">
                    {t("panel.payments.refNumber")}
                  </dt>
                  <dd className="font-mono text-xs">
                    {order.zibal_ref_number}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          <div className="flex flex-wrap gap-3">
            {paid && course ? (
              <Button asChild>
                <Link href={`/panel/account/courses/${course.id}`}>
                  {t("panel.courses.startLearning")}
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="outline">
              <Link href="/panel/account/payments">
                {t("panel.payments.title")}
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/panel/account">{t("panel.account.title")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
