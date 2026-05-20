import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SudokuGrid, SudokuDifficulty } from '../types/sudoku';
import { generateSudoku } from '../core/sudoku/generator';
import { isGridComplete } from '../core/sudoku/validator';

interface SudokuState {
  grid: SudokuGrid | null;
  selectedCell: { row: number; col: number } | null;
  isNotesMode: boolean;
  
  initGame: (difficulty: SudokuDifficulty) => void;
  selectCell: (row: number, col: number) => void;
  toggleNotesMode: () => void;
  inputNumber: (num: number) => void;
  clearCell: () => void;
  revealHint: () => void;
}

export const useSudokuStore = create<SudokuState>()(
  persist(
    (set, get) => ({
      grid: null,
      selectedCell: null,
      isNotesMode: false,

      initGame: (difficulty) => {
        const newGrid = generateSudoku(difficulty);
        set({ grid: newGrid, selectedCell: null, isNotesMode: false });
      },

      selectCell: (row, col) => {
        set({ selectedCell: { row, col } });
      },

      toggleNotesMode: () => {
        set(state => ({ isNotesMode: !state.isNotesMode }));
      },

      inputNumber: (num) => {
        set(state => {
          if (!state.grid || !state.selectedCell || state.grid.isComplete) return state;
          
          const { row, col } = state.selectedCell;
          const cell = state.grid.cells[row][col];
          
          if (cell.isGiven) return state; // On ne modifie pas les indices initiaux

          const newCells = [...state.grid.cells];
          newCells[row] = [...newCells[row]];
          const newCell = { ...cell };

          if (state.isNotesMode) {
            if (newCell.notes.includes(num)) {
              newCell.notes = newCell.notes.filter(n => n !== num);
            } else {
              newCell.notes = [...newCell.notes, num].sort();
            }
          } else {
            // Mode normal
            if (newCell.value === num) {
              newCell.value = null; // Efface si on retape le même chiffre
              newCell.hasError = false;
            } else {
              newCell.value = num;
              // Vérification immédiate de l'erreur par rapport à la solution
              newCell.hasError = num !== newCell.solutionValue;
            }
          }

          newCells[row][col] = newCell;
          const isComplete = isGridComplete(newCells);

          return {
            grid: {
              ...state.grid,
              cells: newCells,
              isComplete
            }
          };
        });
      },

      clearCell: () => {
        set(state => {
          if (!state.grid || !state.selectedCell || state.grid.isComplete) return state;
          const { row, col } = state.selectedCell;
          const cell = state.grid.cells[row][col];
          
          if (cell.isGiven) return state;

          const newCells = [...state.grid.cells];
          newCells[row] = [...newCells[row]];
          newCells[row][col] = { ...cell, value: null, notes: [], hasError: false };

          return { grid: { ...state.grid, cells: newCells } };
        });
      },

      revealHint: () => {
        set(state => {
          if (!state.grid || !state.selectedCell || state.grid.isComplete) return state;
          const { row, col } = state.selectedCell;
          const cell = state.grid.cells[row][col];
          
          if (cell.isGiven || cell.value === cell.solutionValue) return state;

          const newCells = [...state.grid.cells];
          newCells[row] = [...newCells[row]];
          newCells[row][col] = { 
            ...cell, 
            value: cell.solutionValue, 
            notes: [], 
            hasError: false 
          };

          const isComplete = isGridComplete(newCells);

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
      name: 'sudocross-sudoku-game',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

