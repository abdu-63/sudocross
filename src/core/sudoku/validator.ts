import { SudokuCell } from '../../types/sudoku';

export function isValidMove(grid: SudokuCell[][], row: number, col: number, value: number): boolean {
  // Vérification de la ligne
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c].value === value) return false;
  }
  // Vérification de la colonne
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col].value === value) return false;
  }
  // Vérification du bloc 3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const currentRow = startRow + r;
      const currentCol = startCol + c;
      if (currentRow !== row || currentCol !== col) {
        if (grid[currentRow][currentCol].value === value) return false;
      }
    }
  }
  return true;
}

export function isGridComplete(grid: SudokuCell[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      if (cell.value === null || cell.value !== cell.solutionValue) {
        return false;
      }
    }
  }
  return true;
}
