import { SudokuPuzzle } from '../../types';
import { CellCoord, ValidationResult } from '../../types/engine';
import { SudokuState } from './types';

export function validateSudoku(
  puzzle: SudokuPuzzle,
  state: SudokuState
): ValidationResult {
  const errors: CellCoord[] = [];
  let allFilled = true;

  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {
      const val = state[r][c];
      const expected = puzzle.solution[r][c];
      if (val === null) allFilled = false;
      else if (val !== expected) errors.push({ row: r, col: c });
    }
  }

  return { isCorrect: allFilled && errors.length === 0, errors };
}
