import { KakuroPuzzle } from '../../types';
import { CellCoord, ValidationResult } from '../../types/engine';

/**
 * Valida un Kakuro:
 * - Cada celda input debe tener su valor solución (player no se equivoca)
 * - O bien todas las sumas de cada run son correctas Y no hay dígitos repetidos
 */
export function validateKakuro(puzzle: KakuroPuzzle): ValidationResult {
  const errors: CellCoord[] = [];
  let allFilled = true;

  // Comprueba contra solución (la solución es única en nuestro generador)
  for (let r = 0; r < puzzle.grid.length; r++) {
    for (let c = 0; c < puzzle.grid[r].length; c++) {
      const cell = puzzle.grid[r][c];
      if (cell.kind === 'input') {
        if (cell.value === null) {
          allFilled = false;
        } else if (cell.value !== cell.solution) {
          errors.push({ row: r, col: c });
        }
      }
    }
  }

  return {
    isCorrect: allFilled && errors.length === 0,
    errors,
  };
}

export function isKakuroComplete(puzzle: KakuroPuzzle): boolean {
  return validateKakuro(puzzle).isCorrect;
}
