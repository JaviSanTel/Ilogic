import { PyramidPuzzle } from '../../types';
import { CellCoord, ValidationResult } from '../../types/engine';

export function validatePyramid(
  puzzle: PyramidPuzzle,
  current: (number | null)[][]
): ValidationResult {
  const errors: CellCoord[] = [];

  // Check each non-base row: cell must equal sum of two cells below it
  for (let row = 0; row < current.length - 1; row++) {
    for (let col = 0; col < current[row].length; col++) {
      const above = current[row][col];
      const belowLeft  = current[row + 1][col];
      const belowRight = current[row + 1][col + 1];

      if (above !== null && belowLeft !== null && belowRight !== null) {
        if (above !== belowLeft + belowRight) {
          errors.push({ row, col });
        }
      }
    }
  }

  const allFilled = current.every((row) => row.every((cell) => cell !== null));

  return {
    isCorrect: allFilled && errors.length === 0,
    errors,
  };
}

export function isPyramidComplete(
  puzzle: PyramidPuzzle,
  current: (number | null)[][]
): boolean {
  return validatePyramid(puzzle, current).isCorrect;
}
