import { Capsule, Difficulty, LanzarayosPuzzle, Ray } from '../types';

interface Config {
  rows: number;
  cols: number;
  capsules: number;
}

const CONFIG: Record<Difficulty, Config> = {
  easy:   { rows: 6,  cols: 6,  capsules: 4 },
  medium: { rows: 8,  cols: 8,  capsules: 6 },
  hard:   { rows: 10, cols: 10, capsules: 8 },
};

type Direction = 'up' | 'down' | 'left' | 'right';
const DIRECTIONS: Direction[] = ['up', 'down', 'left', 'right'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function step(r: number, c: number, dir: Direction): [number, number] {
  switch (dir) {
    case 'up':    return [r - 1, c];
    case 'down':  return [r + 1, c];
    case 'left':  return [r, c - 1];
    case 'right': return [r, c + 1];
  }
}

/** Coordenadas válidas dentro del grid */
function inBounds(r: number, c: number, rows: number, cols: number): boolean {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

export function generateLanzarayos(difficulty: Difficulty): LanzarayosPuzzle {
  const cfg = CONFIG[difficulty];

  // Colocamos cápsulas en posiciones random no repetidas
  const positions = new Set<string>();
  const capsules: Capsule[] = [];
  while (capsules.length < cfg.capsules) {
    const r = Math.floor(Math.random() * cfg.rows);
    const c = Math.floor(Math.random() * cfg.cols);
    const k = `${r},${c}`;
    if (positions.has(k)) continue;
    positions.add(k);
    capsules.push({ row: r, col: c, totalCells: 0 });
  }

  // Asignamos un rayo a cada cápsula evitando solapamientos
  const occupied = new Set<string>();
  capsules.forEach((cap) => occupied.add(`${cap.row},${cap.col}`));

  const solution: Ray[] = [];

  for (let i = 0; i < capsules.length; i++) {
    const cap = capsules[i];
    // Intenta direcciones al azar y longitudes al azar (mínimo 1, máximo 4)
    let placed = false;
    for (const dir of shuffle(DIRECTIONS)) {
      // Determina cuántas celdas libres hay en esa dirección
      let len = 0;
      let [r, c] = [cap.row, cap.col];
      const cells: [number, number][] = [];
      while (true) {
        [r, c] = step(r, c, dir);
        if (!inBounds(r, c, cfg.rows, cfg.cols)) break;
        if (occupied.has(`${r},${c}`)) break;
        cells.push([r, c]);
        len++;
        if (len >= 4) break;
      }
      if (len === 0) continue;
      // Toma una longitud aleatoria entre 1 y len
      const chosenLen = 1 + Math.floor(Math.random() * len);
      for (let j = 0; j < chosenLen; j++) {
        const [rr, cc] = cells[j];
        occupied.add(`${rr},${cc}`);
      }
      solution.push({ capsuleIdx: i, direction: dir, length: chosenLen });
      cap.totalCells = chosenLen + 1; // celdas cubiertas (cápsula incluida)
      placed = true;
      break;
    }
    if (!placed) {
      // Si no encontramos sitio (raro), asignamos un rayo de longitud 0 (solo la cápsula)
      solution.push({ capsuleIdx: i, direction: 'right', length: 0 });
      cap.totalCells = 1;
    }
  }

  return {
    id:               `lanzarrayos-${difficulty}-${Date.now()}`,
    type:             'lanzarrayos',
    difficulty,
    estimatedMinutes: difficulty === 'easy' ? 3 : difficulty === 'medium' ? 8 : 15,
    createdAt:        Date.now(),
    rows:             cfg.rows,
    cols:             cfg.cols,
    capsules,
    solution,
  };
}
