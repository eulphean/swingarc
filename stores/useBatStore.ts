import { create } from "zustand";

export type DebugRotation = "REST" | "LOAD" | "SWING" | "FOLLOW" | null;

interface BatState {
  isSwinging: boolean;
  position: [number, number, number];
  debugRotation: DebugRotation;
  swing: () => void;
  completeSwing: () => void;
  setDebugRotation: (rotation: DebugRotation) => void;
}

export const useBatStore = create<BatState>((set) => ({
  isSwinging: false,
  position: [0.55, 0.0, 3.2],
  debugRotation: null,
  swing: () => set({ isSwinging: true, debugRotation: null }),
  completeSwing: () => set({ isSwinging: false }),
  setDebugRotation: (rotation) => set({ debugRotation: rotation, isSwinging: false }),
}));
