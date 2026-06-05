import { LanzarayosPuzzle } from '../../types';
import { ValidationResult } from '../../types/engine';
import { LanzarayosState } from './types';

export function validateLanzarayos(
  puzzle: LanzarayosPuzzle,
  state: LanzarayosState
): ValidationResult {
  for (let i = 0; i < puzzle.solution.length; i++) {
    const sol = puzzle.solution[i];
    const cur = state[i];
    if (!cur) return { isCorrect: false, errors: [] };
    if (cur.direction !== sol.direction) return { isCorrect: false, errors: [] };
    if (cur.length !== sol.length) return { isCorrect: false, errors: [] };
  }
  return { isCorrect: true, errors: [] };
}
