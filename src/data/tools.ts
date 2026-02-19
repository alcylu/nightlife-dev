export interface Tool {
  name: string;
  description: string;
  params: string[];
  example: string;
}

export const tools: Tool[] = [
  {
    name: "search_events",
    description:
      "Search nightlife events. Supports city, date filters (tonight, this_weekend, ISO date, ISO range), genre, and area.",
    params: ["city", "date", "genre", "area", "query", "limit", "offset"],
    example: `{
  "name": "search_events",
  "arguments": {
    "city": "tokyo",
    "date": "this_weekend",
    "genre": "techno",
    "area": "shibuya"
  }
}`,
  },
  {
    name: "get_tonight",
    description:
      "Get tonight's nightlife events using city timezone and service-day cutoff logic.",
    params: ["city", "genre", "area", "limit", "offset"],
    example: `{
  "name": "get_tonight",
  "arguments": {
    "city": "tokyo",
    "genre": "house",
    "limit": 10
  }
}`,
  },
  {
    name: "get_event_details",
    description:
      "Get full details for a specific event occurrence ID (UUID).",
    params: ["event_id"],
    example: `{
  "name": "get_event_details",
  "arguments": {
    "event_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}`,
  },
];
