import { ActivityType, DistanceLabel, Mood, PriceTier } from '../types';

export const distanceLabels: Record<DistanceLabel, string> = {
  walking: 'Walking',
  short_drive: 'Short drive',
  day_trip: 'Day trip',
  weekend_getaway: 'Weekend getaway',
};

export const activityLabels: Record<ActivityType, string> = {
  food: 'Food',
  outdoor: 'Outdoor',
  indoor: 'Indoor',
  adventure: 'Adventure',
  culture: 'Culture',
  relaxation: 'Relaxation',
};

export const moodLabels: Record<Mood, string> = {
  romantic: 'Romantic',
  casual: 'Casual',
  first_date: 'First date',
  anniversary: 'Anniversary',
  adventurous: 'Adventurous',
};

export const budgetOptions: PriceTier[] = ['Free', '$', '$$', '$$$', '$$$$'];
export const distanceOptions: DistanceLabel[] = ['walking', 'short_drive', 'day_trip', 'weekend_getaway'];
export const activityOptions: ActivityType[] = ['food', 'outdoor', 'indoor', 'adventure', 'culture', 'relaxation'];
export const moodOptions: Mood[] = ['romantic', 'casual', 'first_date', 'anniversary', 'adventurous'];

export function formatDistance(miles: number): string {
  if (miles < 10) return `${miles.toFixed(1)} mi`;
  return `${Math.round(miles)} mi`;
}
