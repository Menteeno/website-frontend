const ZIBAL_BASE = "https://gateway.zibal.ir";

export type ZibalRequestResult = {
  result: number;
  trackId?: number;
  message?: string;
};

export type ZibalVerifyResult = {
  result: number;
  status?: number;
  amount?: number;
  refNumber?: string | number;
  description?: string;
  cardNumber?: string;
  orderId?: string;
  message?: string;
  paidAt?: string;
};

export function getZibalMerchant(): string {
  return Deno.env.get("ZIBAL_MERCHANT") ?? "zibal";
}

export function getSiteUrl(): string {
  const site = Deno.env.get("SITE_URL")?.replace(/\/$/, "");
  if (!site) {
    throw new Error("SITE_URL secret is not set");
  }
  return site;
}

export function getCallbackUrl(): string {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.replace(/\/$/, "");
  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is not available");
  }
  return `${supabaseUrl}/functions/v1/zibal-callback`;
}

export function startPaymentUrl(trackId: number): string {
  return `${ZIBAL_BASE}/start/${trackId}`;
}

export async function zibalRequest(payload: {
  merchant: string;
  amount: number;
  callbackUrl: string;
  orderId: string;
  description?: string;
}): Promise<ZibalRequestResult> {
  const res = await fetch(`${ZIBAL_BASE}/v1/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return (await res.json()) as ZibalRequestResult;
}

export async function zibalVerify(payload: {
  merchant: string;
  trackId: number;
}): Promise<ZibalVerifyResult> {
  const res = await fetch(`${ZIBAL_BASE}/v1/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return (await res.json()) as ZibalVerifyResult;
}

/** Course prices are stored in Tomans (IRT); Zibal expects Rials. */
export function tomanToRial(toman: number): number {
  return toman * 10;
}

export function courseFinalPrice(
  price: number,
  salePrice: number | null,
): number {
  if (salePrice !== null && salePrice >= 0) {
    return salePrice;
  }
  return price;
}

export function createOrderId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  // Crockford Base32-ish ULID-like id without external deps
  const time = Date.now().toString(36);
  const rand = Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join(
    "",
  );
  return `${time}${rand}`.slice(0, 26).toUpperCase();
}
