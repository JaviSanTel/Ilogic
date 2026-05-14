export { LogicGridPuzzle, Clue } from '../../types/puzzle';

/**
 * Estado de las celdas de la tabla de cruces.
 * Key: "itemA.itemB" (orden alfabético entre cualquier par de items de distintas categorías)
 * Value: '✓' (marcadas como sí), '✗' (marcadas como no), undefined (sin marcar)
 */
export type GridState = Record<string, '✓' | '✗' | undefined>;

export const pairKey = (a: string, b: string) =>
  [a, b].sort().join('.');
