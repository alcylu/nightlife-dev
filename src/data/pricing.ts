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
      "All 3 tools",
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
      "All 3 tools",
      "All supported cities",
      "Priority support",
      "Webhooks (coming soon)",
    ],
    cta: "Get API Key",
    ctaHref: "/signup",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For high-volume and custom integrations.",
    features: [
      "Unlimited requests",
      "All 3 tools",
      "All supported cities",
      "Dedicated support",
      "Custom SLA",
      "On-prem option",
    ],
    cta: "Contact Us",
    ctaHref: "mailto:allen@nightlifetokyo.com",
  },
];
