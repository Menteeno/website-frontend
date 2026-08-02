"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Seo } from "@/components/panel/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/panel/auth/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import type {
  Course,
  PaymentOrder,
  PaymentOrderStatus,
} from "@/types/database";

type PaymentWithCourse = PaymentOrder & { course: Course | null };

function statusVariant(
  status: PaymentOrderStatus,
): "default" | "secondary" | "outline" | "destructive" {
  if (status === "paid") {
    return "default";
  }
  if (status === "failed") {
    return "destructive";
  }
  if (status === "cancelled") {
    return "outline";
  }
  return "secondary";
}

export function AccountPaymentsPage() {
  const { t, locale: lang } = useTranslation();
  const { user } = useAuth();
  const locale = lang === "fa" ? "fa-IR" : "en-US";

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-payments", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("payment_orders")
        .select("*")
        .eq("user_id", user?.id ?? "")
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }

      const courseIds = [...new Set(rows.map((row) => row.course_id))];
      const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select("*")
        .in("id", courseIds.length ? courseIds : ["__none__"]);
      if (coursesError) {
        throw coursesError;
      }

      const courseMap = new Map(
        (courses ?? []).map((course) => [course.id, course]),
      );
      return rows.map(
        (row): PaymentWithCourse => ({
          ...row,
          course: courseMap.get(row.course_id) ?? null,
        }),
      );
    },
  });

  if (isLoading) {
    return (
      <p className="text-[var(--color-muted-foreground)]">
        {t("panel.common.loading")}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <Seo
        title={t("panel.payments.title")}
        description={t("panel.payments.description")}
        path="/panel/account/payments"
        noIndex
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{t("panel.payments.title")}</h1>
        <Button asChild variant="outline">
          <Link href="/panel/account">{t("panel.account.title")}</Link>
        </Button>
      </div>

      {payments.length === 0 ? (
        <p className="text-[var(--color-muted-foreground)]">
          {t("panel.payments.empty")}{" "}
          <Link
            className="text-[var(--color-primary)] hover:underline"
            href="/panel/courses"
          >
            {t("panel.nav.courses")}
          </Link>
        </p>
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-base">
                  {payment.course?.title ?? t("panel.payments.unknownCourse")}
                </CardTitle>
                <Badge variant={statusVariant(payment.status)}>
                  {t(`panel.payments.status.${payment.status}`)}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="space-y-1 text-[var(--color-muted-foreground)]">
                  <p>{formatPrice(payment.amount, payment.currency, locale)}</p>
                  <p>
                    {new Date(payment.created_at).toLocaleString(locale, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  {payment.zibal_ref_number ? (
                    <p className="font-mono text-xs">
                      {t("panel.payments.refNumber")}:{" "}
                      {payment.zibal_ref_number}
                    </p>
                  ) : null}
                </div>
                {payment.status === "paid" && payment.course ? (
                  <Button asChild size="sm">
                    <Link href={`/panel/account/courses/${payment.course.id}`}>
                      {t("panel.account.continue")}
                    </Link>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
