export { LanzarayosPuzzle, Ray, Capsule } from '../../types/puzzle';

/** Estado del usuario: rayo asignado a cada cápsula (por índice) o undefined */
export type LanzarayosState = (
  | { direction: 'up' | 'down' | 'left' | 'right'; length: number }
  | undefined
)[];
