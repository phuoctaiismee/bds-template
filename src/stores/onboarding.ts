import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  // Step 1
  selectedSports: string[];
  primarySportId: string;

  // Step 2
  rankId: string | null;
  format: string | null;
  intents: string[];
  matchmakingPref: 'quick' | 'quality';
  frequency: string | null;
}

interface Action {
  setStep1: (data: { selectedSports: string[]; primarySportId: string }) => void;
  setStep2: (data: Partial<State>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<State & Action>()(
  persist(
    (set) => ({
      selectedSports: [],
      primarySportId: '',
      rankId: null,
      format: null,
      intents: [],
      matchmakingPref: 'quality',
      frequency: null,

      setStep1: (data) => set(data),
      setStep2: (data) => set(data),
      reset: () => set({ selectedSports: [], primarySportId: '', rankId: null }),
    }),
    {
      name: 'onboarding',
      storage: createJSONStorage(() => sessionStorage),
      version: 1
    },
  ),
);
