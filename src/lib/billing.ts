import { supabase } from "./supabase";

const api = import.meta.env.PUBLIC_BILLING_API_URL || "https://api.nightlife.dev/billing";

export type BillingStatus = {
  plan: "none" | "starter" | "pro";
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  can_manage: boolean;
  monthly_quota: number;
  per_minute_quota: number;
  advanced_data: boolean;
};

export async function billingRequest<T>(path: string, body?: object): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = {};
  if (session) headers.Authorization = `Bearer ${session.access_token}`;
  if (body) headers["Content-Type"] = "application/json";
  const response = await fetch(`${api}/${path}`, {
    method: body ? "POST" : "GET", headers, body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({ error: "Billing is temporarily unavailable. Please try again shortly." }));
  if (!response.ok) throw new Error(data.error || "Billing is temporarily unavailable.");
  return data as T;
}

export function rememberCheckout(): void {
  try {
  localStorage.setItem("nlt_checkout_intent", "paid");
  const plan = new URLSearchParams(location.search).get("plan");
  if (plan === "starter" || plan === "pro") localStorage.setItem("nlt_checkout_plan", plan);
  const source = new URLSearchParams(location.search).get("source");
  if (source && /^[a-zA-Z0-9_-]{1,50}$/.test(source)) localStorage.setItem("nlt_checkout_source", source);
  } catch { /* Storage restrictions must not prevent account creation. */ }
}

export function consumeCheckoutIntent(): boolean {
  try {
  const intent = ["paid", "pro"].includes(localStorage.getItem("nlt_checkout_intent") || "");
  localStorage.removeItem("nlt_checkout_intent");
  return intent;
  } catch { return false; }
}

export function redirectToStripe(url: string, portal = false): void {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== (portal ? "billing.stripe.com" : "checkout.stripe.com")) {
    throw new Error("Could not open secure checkout. Please retry.");
  }
  window.location.assign(url);
}
