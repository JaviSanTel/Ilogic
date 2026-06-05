import { CruzexPuzzle } from '../../types';
import { CellCoord, ValidationResult } from '../../types/engine';

export function validateCruzex(
  puzzle: CruzexPuzzle,
  grid: (number | null)[][]
): ValidationResult {
  const errors: CellCoord[] = [];
  let allFilled = true;

  for (let r = 0; r < puzzle.solution.length; r++) {
    for (let c = 0; c < puzzle.solution[r].length; c++) {
      const expected = puzzle.solution[r][c];
      const actual = grid[r][c];
      if (expected === null) continue;
      if (actual === null || actual === 0) {
        allFilled = false;
      } else if (actual !== expected) {
        errors.push({ row: r, col: c });
      }
    }
  }

  return {
    isCorrect: allFilled && errors.length === 0,
    errors,
  };
}
