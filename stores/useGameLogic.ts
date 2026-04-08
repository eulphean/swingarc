import { create } from "zustand";

interface GameLogicState {
  pitches: number;
  strikes: number;
  runs: number;
  currentStreak: number;
  bestStreak: number;
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
  currentStreak: 0,
  bestStreak: 0,
  isGameOver: false,

  incrementPitches: () =>
    set((state) => ({ pitches: state.pitches + 1 })),

  addRun: () =>
    set((state) => {
      const newStreak = state.currentStreak + 1;
      const newBestStreak = Math.max(newStreak, state.bestStreak);
      return {
        pitches: state.pitches + 1,
        runs: state.runs + 1,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
      };
    }),

  addStrike: () =>
    set((state) => {
      const newStrikes = state.strikes + 1;
      return {
        pitches: state.pitches + 1,
        strikes: newStrikes,
        currentStreak: 0,
        isGameOver: newStrikes >= 3,
      };
    }),

  resetGame: () =>
    set({ pitches: 0, strikes: 0, runs: 0, currentStreak: 0, bestStreak: 0, isGameOver: false }),
}));
