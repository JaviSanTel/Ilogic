import { ClasificacionesPuzzle } from '../../types';
import { ValidationResult } from '../../types/engine';
import { ClasificacionesState } from './types';

export function validateClasificaciones(
  puzzle: ClasificacionesPuzzle,
  state: ClasificacionesState
): ValidationResult {
  for (const [key, expected] of Object.entries(puzzle.solution)) {
    const actual = state[key];
    if (actual !== expected) return { isCorrect: false, errors: [] };
  }
  return { isCorrect: true, errors: [] };
}
