import { SudokuGrid, SudokuCell, SudokuDifficulty } from '../../types/sudoku';

function createEmptyGrid(): number[][] {
  return Array(9).fill(null).map(() => Array(9).fill(0));
}

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
    if (grid[x][col] === num) return false;
  }
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
}

function fillGrid(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        // Mélange des chiffres de 1 à 9 pour la génération aléatoire
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (const num of nums) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false; // Backtracking
      }
    }
  }
  return true;
}

function removeNumbers(grid: number[][], count: number): number[][] {
  const newGrid = grid.map(row => [...row]);
  let removed = 0;
  while (removed < count) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (newGrid[row][col] !== 0) {
      newGrid[row][col] = 0;
      removed++;
    }
  }
  return newGrid;
}

export function generateSudoku(difficulty: SudokuDifficulty): SudokuGrid {
  const fullGrid = createEmptyGrid();
  fillGrid(fullGrid);

  let cellsToRemove = 30; // Facile
  if (difficulty === 'medium') cellsToRemove = 45;
  if (difficulty === 'hard') cellsToRemove = 55;

  const puzzleGrid = removeNumbers(fullGrid, cellsToRemove);

  const cells: SudokuCell[][] = [];
  for (let row = 0; row < 9; row++) {
    const rowCells: SudokuCell[] = [];
    for (let col = 0; col < 9; col++) {
      const solutionValue = fullGrid[row][col];
      const puzzleValue = puzzleGrid[row][col] === 0 ? null : puzzleGrid[row][col];
      const isGiven = puzzleValue !== null;

      rowCells.push({
        row,
        col,
        value: puzzleValue,
        solutionValue,
        isGiven,
        notes: [],
        hasError: false,
      });
    }
    cells.push(rowCells);
  }

  return {
    cells,
    difficulty,
    isComplete: false,
    timeElapsed: 0,
  };
}
