import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import {
  createOrderId,
  getSiteUrl,
  getZibalMerchant,
  tomanToRial,
  zibalVerify,
} from "../_shared/zibal.ts";

function redirect(to: string): Response {
  return new Response(null, {
    status: 302,
    headers: { Location: to },
  });
}

function resultUrl(
  siteUrl: string,
  params: Record<string, string | undefined>,
): string {
  // trailing slash required for GitHub Pages static export
  const url = new URL(`${siteUrl}/panel/payment/result/`);
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

Deno.serve(async (req) => {
  const siteUrl = (() => {
    try {
      return getSiteUrl();
    } catch {
      return null;
    }
  })();

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey || !siteUrl) {
      return new Response("Server misconfigured", { status: 500 });
    }

    const incoming = new URL(req.url);
    const trackIdRaw =
      incoming.searchParams.get("trackId") ||
      incoming.searchParams.get("trackid");
    const successRaw = incoming.searchParams.get("success");
    const orderIdParam = incoming.searchParams.get("orderId") ?? undefined;

    const trackId = trackIdRaw ? Number(trackIdRaw) : NaN;
    if (!Number.isFinite(trackId)) {
      return redirect(
        resultUrl(siteUrl, { status: "failed", reason: "missing_track" }),
      );
    }

    const admin = createClient(supabaseUrl, serviceKey);

    const { data: order, error: orderError } = await admin
      .from("payment_orders")
      .select("*")
      .eq("zibal_track_id", trackId)
      .maybeSingle();

    if (orderError || !order) {
      return redirect(
        resultUrl(siteUrl, {
          status: "failed",
          reason: "order_not_found",
          orderId: orderIdParam,
        }),
      );
    }

    // Idempotent: already paid
    if (order.status === "paid") {
      return redirect(
        resultUrl(siteUrl, {
          status: "paid",
          orderId: order.id,
          courseId: order.course_id,
        }),
      );
    }

    if (successRaw === "0") {
      await admin
        .from("payment_orders")
        .update({ status: "failed" })
        .eq("id", order.id)
        .eq("status", "pending");
      return redirect(
        resultUrl(siteUrl, {
          status: "failed",
          orderId: order.id,
          courseId: order.course_id,
        }),
      );
    }

    const verify = await zibalVerify({
      merchant: getZibalMerchant(),
      trackId,
    });

    const expectedRial = tomanToRial(Number(order.amount));
    const verified =
      verify.result === 100 &&
      verify.status === 1 &&
      Number(verify.amount) === expectedRial;

    if (!verified) {
      await admin
        .from("payment_orders")
        .update({ status: "failed" })
        .eq("id", order.id)
        .eq("status", "pending");
      return redirect(
        resultUrl(siteUrl, {
          status: "failed",
          orderId: order.id,
          courseId: order.course_id,
          reason: String(verify.result ?? "verify_failed"),
        }),
      );
    }

    const refNumber =
      verify.refNumber !== undefined && verify.refNumber !== null
        ? String(verify.refNumber)
        : null;

    const { error: payError } = await admin
      .from("payment_orders")
      .update({
        status: "paid",
        zibal_ref_number: refNumber,
        paid_at: new Date().toISOString(),
      })
      .eq("id", order.id)
      .eq("status", "pending");

    if (payError) {
      // Likely race / already updated — check current status
      const { data: refreshed } = await admin
        .from("payment_orders")
        .select("status")
        .eq("id", order.id)
        .maybeSingle();
      if (refreshed?.status !== "paid") {
        return redirect(
          resultUrl(siteUrl, {
            status: "failed",
            orderId: order.id,
            reason: "update_failed",
          }),
        );
      }
    }

    const { data: existingEnrollment } = await admin
      .from("user_courses")
      .select("id")
      .eq("course_id", order.course_id)
      .eq("user_id", order.user_id)
      .neq("status", "dropped")
      .maybeSingle();

    if (!existingEnrollment) {
      await admin.from("user_courses").insert({
        id: createOrderId(),
        course_id: order.course_id,
        user_id: order.user_id,
        status: "enrolled",
      });
    }

    return redirect(
      resultUrl(siteUrl, {
        status: "paid",
        orderId: order.id,
        courseId: order.course_id,
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    if (siteUrl) {
      return redirect(
        resultUrl(siteUrl, { status: "failed", reason: message }),
      );
    }
    return new Response(message, { status: 500 });
  }
});
