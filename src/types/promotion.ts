export interface Promotion {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  schedule: string; // e.g. "Every Saturday & Sunday, 11:30 AM - 3:30 PM"
  timeframe: string; // e.g. "Weekends"
  imageUrl: string;
  badge: string; // e.g. "Popular", "Limited Seats", "Special Event"
  terms: string[];
  pricingHighlights?: string;
  ctaText: string;
  isActive: boolean;
  priority: number;
}
