import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  setIsDarkMode: (loading: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: true,
  setIsDarkMode: (loading: boolean) => set({ isDarkMode: loading }),
}));
