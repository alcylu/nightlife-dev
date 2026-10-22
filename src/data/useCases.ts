export interface UseCase {
  title: string;
  description: string;
  icon: string;
}

export const useCases: UseCase[] = [
  {
    title: "Hotel Concierge AI",
    description:
      "Answer “Where can I hear house in Shibuya tonight?” with a shortlist of events, venue details and links guests can follow.",
    icon: "🏨",
  },
  {
    title: "Travel Planning Agents",
    description:
      "Add an evening plan to a Tokyo itinerary. Filter by date, area and genre, then show published admission information and event links.",
    icon: "✈️",
  },
  {
    title: "Nightlife Apps",
    description:
      "Build a “This weekend” section for your website with structured events, lineups, genres and venue links through REST or MCP.",
    icon: "🎵",
  },
  {
    title: "Artist & Venue Profiles",
    description:
      "Enrich event cards with performer bios, profile images, social profiles and venue social links where available. Included with Starter and Pro; no audience rankings or demand metrics.",
    icon: "📊",
  },
];
