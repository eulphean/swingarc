import { create } from "zustand";

// 🐛 DEBUG MODE TOGGLE - Change this to enable/disable debug features
const ENABLE_DEBUG = false; // Set to true to show bounding boxes and debug buttons

interface DebugState {
  debugMode: boolean;
}

export const useDebugStore = create<DebugState>(() => ({
  debugMode: ENABLE_DEBUG,
}));
