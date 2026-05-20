export type PicrossSize = 5 | 10 | 15;

export type CellState = 'empty' | 'filled' | 'crossed';

export interface PicrossCell {
  row: number;
  col: number;
  state: CellState;
  solutionState: 'empty' | 'filled';
}

export interface PicrossClues {
  rows: number[][];
  cols: number[][];
}

export interface PicrossGrid {
  size: PicrossSize;
  cells: PicrossCell[][];
  clues: PicrossClues;
  isComplete: boolean;
  timeElapsed: number;
}
