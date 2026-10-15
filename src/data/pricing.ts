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
      "100 requests / day",
      "Public MCP tools + REST API",
      "Tokyo events",
      "Community support",
    ],
    cta: "Get API Key",
    ctaHref: "/signup",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    description: "For production apps and agents.",
    features: [
      "1,000 requests / day",
      "Public MCP tools + REST API",
      "All supported cities",
      "Priority support",
      "60 requests / minute",
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
      "Unlimited requests",
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
