import { GoteoPuzzle } from '../../types';
import { ValidationResult } from '../../types/engine';
import { GoteoState } from './types';

export function buildAttempt(puzzle: GoteoPuzzle, state: GoteoState): string {
  return puzzle.columns
    .map((col, i) => {
      if (col.length === 1 && col[0] === ' ') return ' ';
      const idx = state[i];
      return idx === undefined ? '_' : col[idx];
    })
    .join('');
}

export function validateGoteo(puzzle: GoteoPuzzle, state: GoteoState): ValidationResult {
  const attempt = buildAttempt(puzzle, state);
  return { isCorrect: attempt === puzzle.solution, errors: [] };
}
