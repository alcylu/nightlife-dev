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
    name: "Starter",
    price: "$5",
    period: "/ month",
    description: "For testing advanced data and light integrations.",
    features: [
      "500 requests / month, shared across keys",
      "10 requests / minute per key",
      "Performer bios, profile images & social profiles",
      "Venue social links",
      "Public MCP tools + REST API",
      "All supported cities",
      "Community support",
    ],
    cta: "Get Starter",
    ctaHref: "/checkout?plan=starter&source=pricing",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    description: "For production apps and agents.",
    features: [
      "5,000 requests / month, shared across keys",
      "Performer bios, profile images & social profiles",
      "Venue social links",
      "Public MCP tools + REST API",
      "All supported cities",
      "Priority support",
      "30 requests / minute per key",
      "Hard cap — no surprise overage bills",
    ],
    cta: "Get Pro",
    ctaHref: "/checkout?plan=pro&source=pricing",
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
    cta: "Request more usage",
    ctaHref: "/request-usage",
  },
];
