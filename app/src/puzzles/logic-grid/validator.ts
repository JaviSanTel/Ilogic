import { LogicGridPuzzle } from '../../types';
import { ValidationResult } from '../../types/engine';
import { GridState, pairKey, SummaryState } from './types';

/**
 * Valida la tabla resumen contra la solución del puzzle.
 * Es la fuente de verdad: cuando ésta está correcta y completa, el puzzle está resuelto.
 */
export function validateSummary(
  puzzle: LogicGridPuzzle,
  summary: SummaryState
): ValidationResult {
  const anchorCat = puzzle.categories[0];
  const anchorItems = puzzle.items[anchorCat];

  for (const anchor of anchorItems) {
    for (let c = 1; c < puzzle.categories.length; c++) {
      const cat = puzzle.categories[c];
      const key = `${anchor}.${cat}`;
      const expected = puzzle.solution[key];
      const actual = summary[key];
      if (actual === undefined) {
        return { isCorrect: false, errors: [] };
      }
      if (actual !== expected) {
        return { isCorrect: false, errors: [] };
      }
    }
  }
  return { isCorrect: true, errors: [] };
}

/**
 * Comprueba si una asignación parcial de la tabla resumen es consistente:
 * cada item de cada categoría sólo puede asignarse a un anchor.
 * (No comprueba si es CORRECTA, solo si no hay duplicados.)
 */
export function isSummaryConsistent(
  puzzle: LogicGridPuzzle,
  summary: SummaryState
): boolean {
  for (let c = 1; c < puzzle.categories.length; c++) {
    const cat = puzzle.categories[c];
    const usedValues: string[] = [];
    for (const anchor of puzzle.items[puzzle.categories[0]]) {
      const v = summary[`${anchor}.${cat}`];
      if (v) {
        if (usedValues.includes(v)) return false;
        usedValues.push(v);
      }
    }
  }
  return true;
}

/**
 * Validación legacy de la tabla de cruces (scratch work).
 * Se mantiene por compatibilidad pero ya no es la fuente principal de validación.
 */
function buildExpectedState(puzzle: LogicGridPuzzle): Record<string, '✓' | '✗'> {
  const expected: Record<string, '✓' | '✗'> = {};
  const anchorCat = puzzle.categories[0];
  const anchorItems = puzzle.items[anchorCat];

  for (const anchor of anchorItems) {
    for (let c = 1; c < puzzle.categories.length; c++) {
      const cat = puzzle.categories[c];
      const correctValue = puzzle.solution[`${anchor}.${cat}`];
      for (const item of puzzle.items[cat]) {
        expected[pairKey(anchor, item)] = item === correctValue ? '✓' : '✗';
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
  for (const [key, mark] of Object.entries(state)) {
    if (mark === '✓' && expected[key] !== '✓') return { isCorrect: false, errors: [] };
    if (mark === '✗' && expected[key] === '✓') return { isCorrect: false, errors: [] };
  }
  const allPositivesFound = Object.entries(expected)
    .filter(([, v]) => v === '✓')
    .every(([k]) => state[k] === '✓');
  return { isCorrect: allPositivesFound, errors: [] };
}

export function isLogicGridComplete(puzzle: LogicGridPuzzle, state: GridState): boolean {
  return validateLogicGrid(puzzle, state).isCorrect;
}
