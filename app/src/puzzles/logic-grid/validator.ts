import { LogicGridPuzzle } from '../../types';
import { ValidationResult } from '../../types/engine';
import { GridState, pairKey } from './types';

/**
 * Construye el mapa completo de pares esperados a partir de la solución.
 * Para cada anchor → otros items asignados: pair = '✓'.
 * Para todos los demás pares cruzados: pair = '✗'.
 */
function buildExpectedState(puzzle: LogicGridPuzzle): Record<string, '✓' | '✗'> {
  const expected: Record<string, '✓' | '✗'> = {};
  const anchorCat = puzzle.categories[0];
  const anchorItems = puzzle.items[anchorCat];

  // Para cada par (anchorItem, item de otra cat)
  for (const anchor of anchorItems) {
    for (let c = 1; c < puzzle.categories.length; c++) {
      const cat = puzzle.categories[c];
      const correctValue = puzzle.solution[`${anchor}.${cat}`];

      for (const item of puzzle.items[cat]) {
        expected[pairKey(anchor, item)] =
          item === correctValue ? '✓' : '✗';
      }
    }
  }

  // Para pares entre categorías no-ancla (deducidos transitivamente)
  for (let c1 = 1; c1 < puzzle.categories.length; c1++) {
    for (let c2 = c1 + 1; c2 < puzzle.categories.length; c2++) {
      const cat1 = puzzle.categories[c1];
      const cat2 = puzzle.categories[c2];

      for (const anchor of anchorItems) {
        const v1 = puzzle.solution[`${anchor}.${cat1}`];
        const v2 = puzzle.solution[`${anchor}.${cat2}`];

        // v1 ↔ v2 son del mismo anchor → cross = ✓
        expected[pairKey(v1, v2)] = '✓';

        // v1 con cualquier otro de cat2 = ✗
        for (const item of puzzle.items[cat2]) {
          if (item !== v2) expected[pairKey(v1, item)] = '✗';
        }
      }
    }
  }

  return expected;
}

export function validateLogicGrid(
  puzzle: LogicGridPuzzle,
  state: GridState
): ValidationResult {
  const expected = buildExpectedState(puzzle);

  // Sólo nos importa que las marcas '✓' del usuario coincidan con la solución.
  // No exigimos que marque cada '✗' explícitamente.
  for (const [key, mark] of Object.entries(state)) {
    if (mark === '✓' && expected[key] !== '✓') {
      return { isCorrect: false, errors: [] };
    }
    if (mark === '✗' && expected[key] === '✓') {
      return { isCorrect: false, errors: [] };
    }
  }

  // ¿Están todas las relaciones positivas marcadas?
  const allPositivesFound = Object.entries(expected)
    .filter(([, v]) => v === '✓')
    .every(([k]) => state[k] === '✓');

  return { isCorrect: allPositivesFound, errors: [] };
}

export function isLogicGridComplete(
  puzzle: LogicGridPuzzle,
  state: GridState
): boolean {
  return validateLogicGrid(puzzle, state).isCorrect;
}
