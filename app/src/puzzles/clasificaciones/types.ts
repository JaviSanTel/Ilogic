export { ClasificacionesPuzzle } from '../../types/puzzle';

/** Estado: respuestas del usuario. Key: matchKey(a,b), Value: "h-a" o undefined */
export type ClasificacionesState = Record<string, string | undefined>;
