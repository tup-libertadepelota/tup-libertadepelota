import { create } from 'zustand';
import { fetchMatches } from '../matchesApiService';
import { getStoredMatches, saveMatches } from '../storageService';

export const useMatchesStore = create((set) => ({
  matches: [],
  loading: false,
  error: null,

  loadMatches: async (season = 2024) => {
    set({ loading: true, error: null });

    try {
      const storedMatches = getStoredMatches(season);

      if (storedMatches) {
        set({
          matches: storedMatches,
          loading: false,
        });
        return;
      }

      const matches = await fetchMatches(season);

      saveMatches(matches, season);

      set({
        matches,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        error: 'errors.loadMatches',
        loading: false,
      });
    }
  },
}));
