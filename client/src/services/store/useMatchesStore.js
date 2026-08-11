import { create } from 'zustand';
import { fetchMatches, MatchesApiError } from '../matchesApiService';
import { getStoredMatches, saveMatches } from '../storageService';

export const useMatchesStore = create((set) => ({
  matches: [],
  loading: false,
  error: null,

  loadMatches: async () => {
    set({ loading: true, error: null });

    try {
      const storedMatches = getStoredMatches();

      if (storedMatches) {
        set({
          matches: storedMatches,
          loading: false,
        });
        return;
      }

      const matches = await fetchMatches();

      saveMatches(matches);

      set({
        matches,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        error: error instanceof MatchesApiError ? error.code : 'errors.loadMatches',
        loading: false,
      });
    }
  },
}));
