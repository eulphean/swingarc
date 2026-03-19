import { create } from "zustand";

export type DebugPosition = "START" | "END" | null;
export type BallState = "IDLE" | "PITCHING" | "HIT" | "MISS";

interface PitchState {
  countdown: number | null;
  ballState: BallState;
  debugPosition: DebugPosition;
  hitPoint: [number, number, number] | null;
  startPitch: () => void;
  setCountdown: (value: number | null) => void;
  setBallState: (state: BallState) => void;
  setHitPoint: (point: [number, number, number]) => void;
  resetPitch: () => void;
  setDebugPosition: (position: DebugPosition) => void;
}

export const usePitchStore = create<PitchState>((set) => ({
  countdown: null,
  ballState: "IDLE",
  debugPosition: null,
  hitPoint: null,
  startPitch: () =>
    set({ countdown: 3, ballState: "IDLE", debugPosition: null, hitPoint: null }),
  setCountdown: (value) => set({ countdown: value }),
  setBallState: (state) => set({ ballState: state }),
  setHitPoint: (point) => set({ hitPoint: point }),
  resetPitch: () => set({ countdown: null, ballState: "IDLE", hitPoint: null }),
  setDebugPosition: (position) => set({ debugPosition: position, ballState: "IDLE", countdown: null }),
}));
