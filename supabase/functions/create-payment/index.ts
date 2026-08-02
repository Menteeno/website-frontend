import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import {
  courseFinalPrice,
  createOrderId,
  getCallbackUrl,
  getZibalMerchant,
  startPaymentUrl,
  tomanToRial,
  zibalRequest,
} from "../_shared/zibal.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !anonKey || !serviceKey) {
      return jsonResponse({ error: "Server misconfigured" }, 500);
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();
    if (userError || !user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const body = (await req.json()) as { courseId?: string };
    const courseId = body.courseId?.trim();
    if (!courseId) {
      return jsonResponse({ error: "courseId is required" }, 400);
    }

    const admin = createClient(supabaseUrl, serviceKey);

    const { data: course, error: courseError } = await admin
      .from("courses")
      .select("id, title, status, price, sale_price, currency")
      .eq("id", courseId)
      .maybeSingle();

    if (courseError) {
      return jsonResponse({ error: courseError.message }, 500);
    }
    if (!course || course.status !== "published") {
      return jsonResponse({ error: "Course not found" }, 404);
    }

    const amount = courseFinalPrice(course.price, course.sale_price);
    if (amount <= 0) {
      return jsonResponse(
        { error: "Course is free; enroll without payment" },
        400,
      );
    }

    const { data: enrollment } = await admin
      .from("user_courses")
      .select("id")
      .eq("course_id", course.id)
      .eq("user_id", user.id)
      .neq("status", "dropped")
      .maybeSingle();

    if (enrollment) {
      return jsonResponse({ error: "Already enrolled" }, 409);
    }

    const { data: paidOrder } = await admin
      .from("payment_orders")
      .select("id")
      .eq("course_id", course.id)
      .eq("user_id", user.id)
      .eq("status", "paid")
      .maybeSingle();

    if (paidOrder) {
      return jsonResponse({ error: "Already purchased" }, 409);
    }

    // Cancel any previous pending orders for this user/course
    await admin
      .from("payment_orders")
      .update({ status: "cancelled" })
      .eq("course_id", course.id)
      .eq("user_id", user.id)
      .eq("status", "pending");

    const orderId = createOrderId();
    const description = `خرید دوره: ${course.title}`;
    const amountRial = tomanToRial(amount);

    const { error: insertError } = await admin.from("payment_orders").insert({
      id: orderId,
      user_id: user.id,
      course_id: course.id,
      amount,
      currency: course.currency || "IRT",
      status: "pending",
      description,
    });

    if (insertError) {
      return jsonResponse({ error: insertError.message }, 500);
    }

    const merchant = getZibalMerchant();
    const callbackUrl = getCallbackUrl();
    const zibal = await zibalRequest({
      merchant,
      amount: amountRial,
      callbackUrl,
      orderId,
      description,
    });

    if (zibal.result !== 100 || !zibal.trackId) {
      await admin
        .from("payment_orders")
        .update({ status: "failed" })
        .eq("id", orderId);
      return jsonResponse(
        {
          error: zibal.message || "Zibal request failed",
          result: zibal.result,
        },
        502,
      );
    }

    const { error: trackError } = await admin
      .from("payment_orders")
      .update({ zibal_track_id: zibal.trackId })
      .eq("id", orderId);

    if (trackError) {
      return jsonResponse({ error: trackError.message }, 500);
    }

    return jsonResponse({
      orderId,
      trackId: zibal.trackId,
      paymentUrl: startPaymentUrl(zibal.trackId),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
