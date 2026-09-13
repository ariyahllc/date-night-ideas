import { dateIdeas } from '../data/dateIdeas';
import { DateIdea, Filters, Mood } from '../types';

export interface NightPlan {
  dinner: DateIdea;
  activity: DateIdea;
}

/**
 * Builds a two-step "dinner + activity" plan.
 *
 * Scoring favors ideas that match the viewer's active filters and the moods
 * they've saved most often, with a random jitter so pressing the button
 * twice doesn't always return the same plan. Always returns two distinct
 * ideas, even with no filters and no saved history — it just falls back to
 * scoring the full catalog.
 */
export function generatePlan(filters: Filters, savedIdeas: DateIdea[], exclude: string[] = []): NightPlan | null {
  const preferredMoods = topMoods(savedIdeas);

  function score(idea: DateIdea): number {
    let s = Math.random() * 1.5; // jitter, so "Shuffle" actually shuffles
    if (filters.budgets.length && filters.budgets.includes(idea.priceTier)) s += 2;
    if (filters.distances.length && filters.distances.includes(idea.distanceLabel)) s += 2;
    if (filters.activityTypes.length && filters.activityTypes.includes(idea.activityType)) s += 2;
    if (filters.moods.length && filters.moods.some((m) => idea.moods.includes(m))) s += 2;
    if (preferredMoods.some((m) => idea.moods.includes(m))) s += 1.5;
    if (exclude.includes(idea.id)) s -= 5;
    return s;
  }

  const ranked = [...dateIdeas].sort((a, b) => score(b) - score(a));
  const dinner = ranked.find((i) => i.activityType === 'food');
  if (!dinner) return null;
  const activity = ranked.find((i) => i.id !== dinner.id && i.activityType !== 'food');
  if (!activity) return null;

  return { dinner, activity };
}

function topMoods(ideas: DateIdea[]): Mood[] {
  const counts = new Map<Mood, number>();
  for (const idea of ideas) {
    for (const mood of idea.moods) counts.set(mood, (counts.get(mood) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([mood]) => mood);
}
