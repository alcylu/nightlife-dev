export type FunnelEvent = "page_view" | "plan_click" | "signup_attempt" | "signup_submitted" | "signup_error" | "email_confirmed" | "checkout_attempt" | "checkout_redirect" | "checkout_error";
const pages = ["home", "checkout", "signup", "login", "dashboard", "request-usage", "terms", "privacy"];
const sources = ["direct", "search", "github", "agensi", "nightlifetokyo", "other"];

// Analytics is optional: any storage/network failure must leave signup and
// checkout fully functional. Never include location.search/hash or form values.
export function track(event: FunnelEvent, selectedPlan?: string): void {
  try {
    if (location.hostname !== "nightlife.dev" || navigator.webdriver || navigator.doNotTrack === "1" || (navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl || localStorage.getItem("nlt_analytics_consent") !== "yes") return;
    const page = location.pathname.replace(/^\/|\/$/g, "") || "home";
    if (!pages.includes(page)) return;
    const day = new Date().toISOString().slice(0,10);
    let state = JSON.parse(sessionStorage.getItem("nlt_funnel_visit") || "null");
    if (!state || state.day !== day || !/^[0-9a-f-]{36}$/i.test(state.visit)) {
      let ref = ""; try { ref = new URL(document.referrer).hostname; } catch {}
      const campaign = new URLSearchParams(location.search).get("source");
      const source = campaign && sources.includes(campaign) ? campaign : /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com)$/.test(ref) ? "search" : ref === "github.com" ? "github" : /(^|\.)agensi\.io$/.test(ref) ? "agensi" : /(^|\.)nightlifetokyo\.com$/.test(ref) ? "nightlifetokyo" : ref && ref !== "nightlife.dev" ? "other" : "direct";
      state = {day, visit: crypto.randomUUID(), source};
      sessionStorage.setItem("nlt_funnel_visit", JSON.stringify(state));
    }
    const planValue = selectedPlan || new URLSearchParams(location.search).get("plan") || localStorage.getItem("nlt_checkout_plan");
    const plan = planValue === "starter" || planValue === "pro" ? planValue : "none";
    void fetch("https://api.nightlife.dev/site-analytics/event", {method:"POST",credentials:"omit",headers:{"Content-Type":"application/json"},keepalive:true,body:JSON.stringify({visit:state.visit,event,page,source:sources.includes(state.source)?state.source:"other",plan})}).catch(()=>{});
  } catch { /* Analytics must never break product workflows. */ }
}
