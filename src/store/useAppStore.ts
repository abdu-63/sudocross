import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  activeGame: 'sudoku' | 'picross' | null;
  setActiveGame: (game: 'sudoku' | 'picross' | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeGame: null,
      setActiveGame: (game) => set({ activeGame: game }),
    }),
    {
      name: 'sudocross-app-active-game',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
