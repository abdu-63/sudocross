import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PicrossGrid, PicrossSize, CellState } from '../types/picross';
import { generatePicross } from '../core/picross/generator';
import { isPicrossComplete } from '../core/picross/validator';

interface PicrossState {
  grid: PicrossGrid | null;
  currentTool: 'fill' | 'cross';
  
  initGame: (size: PicrossSize) => void;
  setTool: (tool: 'fill' | 'cross') => void;
  toggleCell: (row: number, col: number) => void;
  revealHint: () => void;
}

export const usePicrossStore = create<PicrossState>()(
  persist(
    (set, get) => ({
      grid: null,
      currentTool: 'fill',

      initGame: (size) => {
        const newGrid = generatePicross(size);
        set({ grid: newGrid });
      },

      setTool: (tool) => {
        set({ currentTool: tool });
      },

      toggleCell: (row, col) => {
        set(state => {
          if (!state.grid || state.grid.isComplete) return state;

          const newCells = [...state.grid.cells];
          newCells[row] = [...newCells[row]];
          const cell = newCells[row][col];

          let newState: CellState = 'empty';

          if (state.currentTool === 'fill') {
            newState = cell.state === 'filled' ? 'empty' : 'filled';
          } else if (state.currentTool === 'cross') {
            newState = cell.state === 'crossed' ? 'empty' : 'crossed';
          }

          newCells[row][col] = { ...cell, state: newState };

          const isComplete = isPicrossComplete(newCells);

          return {
            grid: {
              ...state.grid,
              cells: newCells,
              isComplete
            }
          };
        });
      },

      revealHint: () => {
        set(state => {
          if (!state.grid || state.grid.isComplete) return state;
          const { cells, size } = state.grid;

          // Find all cells that should be filled but aren't currently filled
          const unsolved: { r: number; c: number }[] = [];
          for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
              const cell = cells[r][c];
              if (cell.solutionState === 'filled' && cell.state !== 'filled') {
                unsolved.push({ r, c });
              }
            }
          }

          if (unsolved.length === 0) return state;

          // Select a random cell and reveal it
          const randomIndex = Math.floor(Math.random() * unsolved.length);
          const { r, c } = unsolved[randomIndex];

          const newCells = [...cells];
          newCells[r] = [...newCells[r]];
          newCells[r][c] = { ...newCells[r][c], state: 'filled' };

          const isComplete = isPicrossComplete(newCells);

          return {
            grid: {
              ...state.grid,
              cells: newCells,
              isComplete
            }
          };
        });
      }
    }),
    {
      name: 'sudocross-picross-game',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

