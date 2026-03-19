import { create } from "zustand";
import * as THREE from "three";

interface GameRefs {
  ballRef: THREE.Mesh | null;
  batTipRef: THREE.Mesh | null;
  batBarrelRef: THREE.Mesh | null;
  setBallRef: (ref: THREE.Mesh | null) => void;
  setBatTipRef: (ref: THREE.Mesh | null) => void;
  setBatBarrelRef: (ref: THREE.Mesh | null) => void;
}

export const useGameRefs = create<GameRefs>((set) => ({
  ballRef: null,
  batTipRef: null,
  batBarrelRef: null,
  setBallRef: (ref) => set({ ballRef: ref }),
  setBatTipRef: (ref) => set({ batTipRef: ref }),
  setBatBarrelRef: (ref) => set({ batBarrelRef: ref }),
}));
