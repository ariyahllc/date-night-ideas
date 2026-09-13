import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { dateIdeas } from '../data/dateIdeas';
import { DateIdea, Filters, emptyFilters, ActivityType, DistanceLabel, Mood, PriceTier } from '../types';

interface FiltersContextValue {
  filters: Filters;
  filteredIdeas: DateIdea[];
  toggleBudget: (v: PriceTier) => void;
  toggleDistance: (v: DistanceLabel) => void;
  toggleActivityType: (v: ActivityType) => void;
  toggleMood: (v: Mood) => void;
  clearAll: () => void;
  activeCount: number;
}

const FiltersContext = createContext<FiltersContextValue | null>(null);

function toggleInArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
}

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const toggleBudget = useCallback(
    (v: PriceTier) => setFilters((f) => ({ ...f, budgets: toggleInArray(f.budgets, v) })),
    [],
  );
  const toggleDistance = useCallback(
    (v: DistanceLabel) => setFilters((f) => ({ ...f, distances: toggleInArray(f.distances, v) })),
    [],
  );
  const toggleActivityType = useCallback(
    (v: ActivityType) => setFilters((f) => ({ ...f, activityTypes: toggleInArray(f.activityTypes, v) })),
    [],
  );
  const toggleMood = useCallback(
    (v: Mood) => setFilters((f) => ({ ...f, moods: toggleInArray(f.moods, v) })),
    [],
  );
  const clearAll = useCallback(() => setFilters(emptyFilters), []);

  const filteredIdeas = useMemo(() => {
    return dateIdeas.filter((idea) => {
      if (filters.budgets.length && !filters.budgets.includes(idea.priceTier)) return false;
      if (filters.distances.length && !filters.distances.includes(idea.distanceLabel)) return false;
      if (filters.activityTypes.length && !filters.activityTypes.includes(idea.activityType)) return false;
      if (filters.moods.length && !filters.moods.some((m) => idea.moods.includes(m))) return false;
      return true;
    });
  }, [filters]);

  const activeCount =
    filters.budgets.length + filters.distances.length + filters.activityTypes.length + filters.moods.length;

  const value = useMemo(
    () => ({
      filters,
      filteredIdeas,
      toggleBudget,
      toggleDistance,
      toggleActivityType,
      toggleMood,
      clearAll,
      activeCount,
    }),
    [filters, filteredIdeas, toggleBudget, toggleDistance, toggleActivityType, toggleMood, clearAll, activeCount],
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters(): FiltersContextValue {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('useFilters must be used within a FiltersProvider');
  return ctx;
}
