import { create } from 'zustand';

interface AssetState {
  batLoaded: boolean;
  ballLoaded: boolean;
  allAssetsLoaded: boolean;
  setBatLoaded: (loaded: boolean) => void;
  setBallLoaded: (loaded: boolean) => void;
  resetAssets: () => void;
}

export const useAssetStore = create<AssetState>((set, get) => ({
  batLoaded: false,
  ballLoaded: false,
  allAssetsLoaded: false,

  setBatLoaded: (loaded: boolean) => {
    const state = get();
    set({
      batLoaded: loaded,
      allAssetsLoaded: loaded && state.ballLoaded
    });
  },

  setBallLoaded: (loaded: boolean) => {
    const state = get();
    set({
      ballLoaded: loaded,
      allAssetsLoaded: loaded && state.batLoaded
    });
  },

  resetAssets: () => set({ batLoaded: false, ballLoaded: false, allAssetsLoaded: false }),
}));
