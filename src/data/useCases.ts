export interface UseCase {
  title: string;
  description: string;
  icon: string;
}

export const useCases: UseCase[] = [
  {
    title: "Hotel Concierge AI",
    description:
      "Give your hotel's AI assistant real-time knowledge of what's happening tonight. Guests ask, your agent answers with live events.",
    icon: "🏨",
  },
  {
    title: "Travel Planning Agents",
    description:
      "Build travel agents that include nightlife in itineraries. Search by genre, area, or date range across supported cities.",
    icon: "✈️",
  },
  {
    title: "Nightlife Apps",
    description:
      "Power your nightlife discovery app with structured event data. Venues, lineups, genres, prices -- all via MCP.",
    icon: "🎵",
  },
  {
    title: "Venue Analytics",
    description:
      "Analyze event patterns, pricing trends, and genre popularity across venues and cities for market research.",
    icon: "📊",
  },
];
