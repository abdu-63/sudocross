import { PicrossGrid, PicrossCell, PicrossSize, PicrossClues } from '../../types/picross';

function generateClues(grid: ('empty' | 'filled')[][]): PicrossClues {
  const size = grid.length;
  const rows: number[][] = [];
  const cols: number[][] = [];

  // Indices des lignes
  for (let r = 0; r < size; r++) {
    const rowClue: number[] = [];
    let currentBlock = 0;
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 'filled') {
        currentBlock++;
      } else if (currentBlock > 0) {
        rowClue.push(currentBlock);
        currentBlock = 0;
      }
    }
    if (currentBlock > 0) {
      rowClue.push(currentBlock);
    }
    if (rowClue.length === 0) {
      rowClue.push(0); // Ligne vide
    }
    rows.push(rowClue);
  }

  // Indices des colonnes
  for (let c = 0; c < size; c++) {
    const colClue: number[] = [];
    let currentBlock = 0;
    for (let r = 0; r < size; r++) {
      if (grid[r][c] === 'filled') {
        currentBlock++;
      } else if (currentBlock > 0) {
        colClue.push(currentBlock);
        currentBlock = 0;
      }
    }
    if (currentBlock > 0) {
      colClue.push(currentBlock);
    }
    if (colClue.length === 0) {
      colClue.push(0); // Colonne vide
    }
    cols.push(colClue);
  }

  return { rows, cols };
}

export function generatePicross(size: PicrossSize): PicrossGrid {
  const fillProbability = 0.6; // 60% de chance d'être noircie

  // 1. Génération de la grille de solution
  const solutionGrid: ('empty' | 'filled')[][] = [];
  for (let r = 0; r < size; r++) {
    const row: ('empty' | 'filled')[] = [];
    for (let c = 0; c < size; c++) {
      row.push(Math.random() < fillProbability ? 'filled' : 'empty');
    }
    solutionGrid.push(row);
  }

  // 2. Calcul des indices
  const clues = generateClues(solutionGrid);

  // 3. Initialisation de la grille pour le joueur
  const cells: PicrossCell[][] = [];
  for (let r = 0; r < size; r++) {
    const rowCells: PicrossCell[] = [];
    for (let c = 0; c < size; c++) {
      rowCells.push({
        row: r,
        col: c,
        state: 'empty',
        solutionState: solutionGrid[r][c],
      });
    }
    cells.push(rowCells);
  }

  return {
    size,
    cells,
    clues,
    isComplete: false,
    timeElapsed: 0,
  };
}
