import { create } from "zustand";

interface PitchState {
  countdown: number | null;
  isPitching: boolean;
  startPitch: () => void;
  setCountdown: (value: number | null) => void;
  setIsPitching: (value: boolean) => void;
  resetPitch: () => void;
}

export const usePitchStore = create<PitchState>((set) => ({
  countdown: null,
  isPitching: false,
  startPitch: () =>
    set({ countdown: 3, isPitching: false }),
  setCountdown: (value) => set({ countdown: value }),
  setIsPitching: (value) => set({ isPitching: value }),
  resetPitch: () => set({ countdown: null, isPitching: false }),
}));
