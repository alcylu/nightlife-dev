// Supabase can return either a confirmed session (autoconfirm enabled) or an
// unconfirmed account. Never tell an already-signed-in user to await an email.
export function signupOutcome(hasSession: boolean, checkout: boolean, plan: unknown) {
  if (!hasSession) return { kind: "confirm_email" as const };
  return { kind: "redirect" as const, url: checkout ? `/checkout?plan=${plan === "pro" ? "pro" : "starter"}` : "/dashboard" };
}
