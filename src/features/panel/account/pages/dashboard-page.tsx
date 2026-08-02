"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/panel/auth/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import { getPublicStorageUrl, supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import type {
  Course,
  PaymentOrder,
  PaymentOrderStatus,
  UserCourse,
} from "@/types/database";

type EnrollmentWithCourse = UserCourse & { courses: Course | null };
type PaymentWithCourse = PaymentOrder & { course: Course | null };

function statusLabelKey(status: PaymentOrderStatus): string {
  return `panel.payments.status.${status}`;
}

export function AccountDashboardPage() {
  const { t, locale: lang } = useTranslation();
  const { user } = useAuth();
  const locale = lang === "fa" ? "fa-IR" : "en-US";

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ["my-courses", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("user_courses")
        .select("*")
        .eq("user_id", user?.id ?? "")
        .neq("status", "dropped")
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }

      const courseIds = rows.map((row) => row.course_id);
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
        (row): EnrollmentWithCourse => ({
          ...row,
          courses: courseMap.get(row.course_id) ?? null,
        }),
      );
    },
  });

  const { data: recentPayments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["my-payments-preview", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("payment_orders")
        .select("*")
        .eq("user_id", user?.id ?? "")
        .order("created_at", { ascending: false })
        .limit(5);
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

  if (isLoading || paymentsLoading) {
    return (
      <p className="text-[var(--color-muted-foreground)]">
        {t("panel.common.loading")}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{t("panel.account.title")}</h1>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/panel/account/payments">
              {t("panel.nav.payments")}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/panel/account/profile">{t("panel.nav.profile")}</Link>
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          {t("panel.account.myCourses")}
        </h2>
        {enrollments.length === 0 ? (
          <p className="text-[var(--color-muted-foreground)]">
            {t("panel.account.noCourses")}{" "}
            <Link
              className="text-[var(--color-primary)] hover:underline"
              href="/panel/courses"
            >
              {t("panel.nav.courses")}
            </Link>
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {enrollments.map((item) => {
              const course = item.courses;
              if (!course) {
                return null;
              }
              const cover = getPublicStorageUrl(
                "course-covers",
                course.cover_path,
              );
              return (
                <Card key={item.id} className="overflow-hidden">
                  {cover ? (
                    <img
                      src={cover}
                      alt={course.title}
                      className="h-36 w-full object-cover"
                    />
                  ) : null}
                  <CardHeader>
                    <CardTitle className="text-base">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href={`/panel/account/courses/${course.id}`}>
                        {t("panel.account.continue")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">{t("panel.payments.title")}</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/panel/account/payments">
              {t("panel.payments.viewAll")}
            </Link>
          </Button>
        </div>
        {recentPayments.length === 0 ? (
          <p className="text-[var(--color-muted-foreground)]">
            {t("panel.payments.empty")}
          </p>
        ) : (
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">
                      {payment.course?.title ??
                        t("panel.payments.unknownCourse")}
                    </p>
                    <p className="text-[var(--color-muted-foreground)]">
                      {formatPrice(payment.amount, payment.currency, locale)}
                      {" · "}
                      {new Date(payment.created_at).toLocaleDateString(locale)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      payment.status === "failed" ? "destructive" : "secondary"
                    }
                  >
                    {t(statusLabelKey(payment.status))}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
