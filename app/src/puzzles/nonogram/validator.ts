import { NonogramPuzzle } from '../../types';
import { ValidationResult } from '../../types/engine';
import { NonogramState } from './types';

export function validateNonogram(
  puzzle: NonogramPuzzle,
  state: NonogramState
): ValidationResult {
  for (let r = 0; r < puzzle.rows; r++) {
    for (let c = 0; c < puzzle.cols; c++) {
      const shouldBeFilled = puzzle.solution[r][c];
      const userMark = state[r]?.[c];

      if (shouldBeFilled && userMark !== 'fill') {
        return { isCorrect: false, errors: [] };
      }
      if (!shouldBeFilled && userMark === 'fill') {
        return { isCorrect: false, errors: [] };
      }
    }
  }
  return { isCorrect: true, errors: [] };
}

export function isNonogramComplete(puzzle: NonogramPuzzle, state: NonogramState): boolean {
  return validateNonogram(puzzle, state).isCorrect;
}
