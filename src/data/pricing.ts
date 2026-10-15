export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
}

export const pricing: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For experimentation and hobby projects.",
    features: [
      "100 requests / month, shared across keys",
      "5 requests / minute per key",
      "Public MCP tools + REST API",
      "Tokyo events",
      "Community support",
    ],
    cta: "Get API Key",
    ctaHref: "/signup",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    description: "For production apps and agents.",
    features: [
      "2,000 requests / month, shared across keys",
      "Public MCP tools + REST API",
      "All supported cities",
      "Priority support",
      "30 requests / minute per key",
      "Hard cap — no surprise overage bills",
    ],
    cta: "Get Pro",
    ctaHref: "/checkout?source=pricing",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For high-volume and custom integrations.",
    features: [
      "Custom request volume",
      "Public MCP tools + REST API",
      "All supported cities",
      "Dedicated support",
      "Custom SLA",
      "On-prem option",
    ],
    cta: "Contact Us",
    ctaHref: "mailto:allen@nightlifetokyo.com",
  },
];
