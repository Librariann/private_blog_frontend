import { create } from "zustand";

interface LoadingState {
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  globalLoading: false,
  setGlobalLoading: (loading: boolean) => set({ globalLoading: loading }),
}));
