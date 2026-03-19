import { create } from "zustand";

interface BatState {
  isSwinging: boolean;
  position: [number, number, number];
  swing: () => void;
  completeSwing: () => void;
}

export const useBatStore = create<BatState>((set) => ({
  isSwinging: false,
  position: [0.55, 0.0, 3.2],
  swing: () => set({ isSwinging: true }),
  completeSwing: () => set({ isSwinging: false }),
}));
