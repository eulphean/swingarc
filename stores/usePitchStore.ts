import { create } from "zustand";

export type DebugPosition = "START" | "END" | null;

interface PitchState {
  countdown: number | null;
  isPitching: boolean;
  debugPosition: DebugPosition;
  startPitch: () => void;
  setCountdown: (value: number | null) => void;
  setIsPitching: (value: boolean) => void;
  resetPitch: () => void;
  setDebugPosition: (position: DebugPosition) => void;
}

export const usePitchStore = create<PitchState>((set) => ({
  countdown: null,
  isPitching: false,
  debugPosition: null,
  startPitch: () =>
    set({ countdown: 3, isPitching: false, debugPosition: null }),
  setCountdown: (value) => set({ countdown: value }),
  setIsPitching: (value) => set({ isPitching: value }),
  resetPitch: () => set({ countdown: null, isPitching: false }),
  setDebugPosition: (position) => set({ debugPosition: position, isPitching: false, countdown: null }),
}));
