import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dateIdeas } from '../data/dateIdeas';
import { DateIdea } from '../types';

const STORAGE_KEY = 'ember.savedIds.v1';

interface SavedContextValue {
  savedIds: string[];
  savedIdeas: DateIdea[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  save: (id: string) => void;
  remove: (id: string) => void;
}

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setSavedIds(JSON.parse(raw));
      })
      .catch(() => {
        // First run or corrupted value — start from an empty jar.
      })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return; // avoid clobbering storage with the initial empty state
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds)).catch(() => {});
  }, [savedIds, hydrated]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const save = useCallback((id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setSavedIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const savedIdeas = useMemo(
    () => savedIds.map((id) => dateIdeas.find((idea) => idea.id === id)).filter((x): x is DateIdea => !!x),
    [savedIds],
  );

  const value = useMemo(
    () => ({ savedIds, savedIdeas, isSaved, toggleSaved, save, remove }),
    [savedIds, savedIdeas, isSaved, toggleSaved, save, remove],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved(): SavedContextValue {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within a SavedProvider');
  return ctx;
}
