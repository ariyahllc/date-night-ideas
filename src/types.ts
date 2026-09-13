export type PriceTier = 'Free' | '$' | '$$' | '$$$' | '$$$$';

export type DistanceLabel = 'walking' | 'short_drive' | 'day_trip' | 'weekend_getaway';

export type ActivityType = 'food' | 'outdoor' | 'indoor' | 'adventure' | 'culture' | 'relaxation';

export type Mood = 'romantic' | 'casual' | 'first_date' | 'anniversary' | 'adventurous';

export interface DateIdea {
  id: string;
  title: string;
  blurb: string;
  description: string;
  priceTier: PriceTier;
  distanceLabel: DistanceLabel;
  distanceMiles: number;
  activityType: ActivityType;
  moods: Mood[];
  hours: string;
  address: string;
  bookingUrl: string;
}

export interface Filters {
  budgets: PriceTier[];
  distances: DistanceLabel[];
  activityTypes: ActivityType[];
  moods: Mood[];
}

export const emptyFilters: Filters = {
  budgets: [],
  distances: [],
  activityTypes: [],
  moods: [],
};
