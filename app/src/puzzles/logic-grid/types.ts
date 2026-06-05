export { LogicGridPuzzle, Clue } from '../../types/puzzle';

/**
 * Estado de las celdas de la tabla de cruces (scratch work).
 * Key: "itemA.itemB" (orden alfabético entre cualquier par de items de distintas categorías)
 * Value: '✓' (marcadas como sí), '✗' (marcadas como no), undefined (sin marcar)
 */
export type GridState = Record<string, '✓' | '✗' | undefined>;

export const pairKey = (a: string, b: string) =>
  [a, b].sort().join('.');

/**
 * Estado de la tabla resumen (respuesta final).
 * Key: "anchorItem.categoryName" e.g. "Ana.Ciudad"
 * Value: el item de esa categoría que el usuario asigna al anchor
 */
export type SummaryState = Record<string, string | undefined>;
