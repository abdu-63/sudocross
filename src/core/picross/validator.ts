import { PicrossCell } from '../../types/picross';

export function isPicrossComplete(cells: PicrossCell[][]): boolean {
  for (let r = 0; r < cells.length; r++) {
    for (let c = 0; c < cells[r].length; c++) {
      const cell = cells[r][c];
      // Si la solution attend 'filled', la case doit être 'filled'
      if (cell.solutionState === 'filled' && cell.state !== 'filled') {
        return false;
      }
      // Si la solution attend 'empty', la case ne doit PAS être 'filled' (elle peut être 'empty' ou 'crossed')
      if (cell.solutionState === 'empty' && cell.state === 'filled') {
        return false;
      }
    }
  }
  return true;
}
