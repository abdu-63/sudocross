export type SudokuDifficulty = 'easy' | 'medium' | 'hard';

export interface SudokuCell {
  row: number;
  col: number;
  value: number | null;
  solutionValue: number;
  isGiven: boolean;
  notes: number[];
  hasError: boolean;
}

export interface SudokuGrid {
  cells: SudokuCell[][];
  difficulty: SudokuDifficulty;
  isComplete: boolean;
  timeElapsed: number;
}
