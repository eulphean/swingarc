import { create } from "zustand";

interface GameLogicState {
  pitches: number;
  strikes: number;
  runs: number;
  isGameOver: boolean;
  incrementPitches: () => void;
  addRun: () => void;
  addStrike: () => void;
  resetGame: () => void;
}

export const useGameLogic = create<GameLogicState>((set) => ({
  pitches: 0,
  strikes: 0,
  runs: 0,
  isGameOver: false,

  incrementPitches: () =>
    set((state) => ({ pitches: state.pitches + 1 })),

  addRun: () =>
    set((state) => ({
      pitches: state.pitches + 1,
      runs: state.runs + 1,
    })),

  addStrike: () =>
    set((state) => {
      const newStrikes = state.strikes + 1;
      return {
        pitches: state.pitches + 1,
        strikes: newStrikes,
        isGameOver: newStrikes >= 3,
      };
    }),

  resetGame: () =>
    set({ pitches: 0, strikes: 0, runs: 0, isGameOver: false }),
}));
