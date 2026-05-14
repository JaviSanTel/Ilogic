export { NonogramPuzzle } from '../../types/puzzle';

/**
 * Estado del jugador. Cada celda puede estar:
 * - 'fill': marcada (pintada)
 * - 'cross': marcada como vacía (X)
 * - undefined: sin marcar
 */
export type NonogramMark = 'fill' | 'cross' | undefined;
export type NonogramState = NonogramMark[][];
