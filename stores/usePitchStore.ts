import { create } from "zustand";

export type DebugPosition = "START" | "END" | null;
export type BallState = "IDLE" | "PITCHING" | "HIT" | "MISS";

interface PitchState {
  countdown: number | null;
  ballState: BallState;
  debugPosition: DebugPosition;
  startPitch: () => void;
  setCountdown: (value: number | null) => void;
  setBallState: (state: BallState) => void;
  resetPitch: () => void;
  setDebugPosition: (position: DebugPosition) => void;
}

export const usePitchStore = create<PitchState>((set) => ({
  countdown: null,
  ballState: "IDLE",
  debugPosition: null,
  startPitch: () =>
    set({ countdown: 3, ballState: "IDLE", debugPosition: null }),
  setCountdown: (value) => set({ countdown: value }),
  setBallState: (state) => set({ ballState: state }),
  resetPitch: () => set({ countdown: null, ballState: "IDLE" }),
  setDebugPosition: (position) => set({ debugPosition: position, ballState: "IDLE", countdown: null }),
}));
