import { Difficulty, SudokuPuzzle, SudokuVariant } from '../types';

type Region = [number, number][];

interface VariantConfig {
  size: number;
  digits: number[];
  regions: (size: number) => Region[];
  boxRows: number;
  boxCols: number;
}

// ─── Regiones por variante ──────────────────────────────────────────────────
function classicRegions(size: number, boxRows: number, boxCols: number): Region[] {
  const regions: Region[] = [];
  // Filas
  for (let r = 0; r < size; r++) {
    const row: Region = [];
    for (let c = 0; c < size; c++) row.push([r, c]);
    regions.push(row);
  }
  // Columnas
  for (let c = 0; c < size; c++) {
    const col: Region = [];
    for (let r = 0; r < size; r++) col.push([r, c]);
    regions.push(col);
  }
  // Cajas
  for (let br = 0; br < size; br += boxRows) {
    for (let bc = 0; bc < size; bc += boxCols) {
      const box: Region = [];
      for (let r = br; r < br + boxRows; r++) {
        for (let c = bc; c < bc + boxCols; c++) box.push([r, c]);
      }
      regions.push(box);
    }
  }
  return regions;
}

function diagonalRegions(size: number): Region[] {
  const main: Region = [];
  const anti: Region = [];
  for (let i = 0; i < size; i++) {
    main.push([i, i]);
    anti.push([i, size - 1 - i]);
  }
  return [main, anti];
}

/** 4 cajas extra en posiciones internas (1-3, 1-3), (1-3, 5-7), (5-7, 1-3), (5-7, 5-7) */
function hyperRegions(): Region[] {
  const make = (r0: number, c0: number): Region => {
    const reg: Region = [];
    for (let r = r0; r < r0 + 3; r++)
      for (let c = c0; c < c0 + 3; c++) reg.push([r, c]);
    return reg;
  };
  return [make(1, 1), make(1, 5), make(5, 1), make(5, 5)];
}

const VARIANTS: Record<SudokuVariant, VariantConfig> = {
  classic: {
    size: 9, digits: [1,2,3,4,5,6,7,8,9], boxRows: 3, boxCols: 3,
    regions: (s) => classicRegions(s, 3, 3),
  },
  x: {
    size: 9, digits: [1,2,3,4,5,6,7,8,9], boxRows: 3, boxCols: 3,
    regions: (s) => [...classicRegions(s, 3, 3), ...diagonalRegions(s)],
  },
  mini: {
    size: 6, digits: [1,2,3,4,5,6], boxRows: 2, boxCols: 3,
    regions: (s) => classicRegions(s, 2, 3),
  },
  hyper: {
    size: 9, digits: [1,2,3,4,5,6,7,8,9], boxRows: 3, boxCols: 3,
    regions: (s) => [...classicRegions(s, 3, 3), ...hyperRegions()],
  },
};

// ─── Backtracking solver ────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Construye un mapa celda → regiones a las que pertenece */
function buildCellRegions(size: number, regions: Region[]): Region[][][] {
  const map: Region[][][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => [])
  );
  for (const reg of regions) {
    for (const [r, c] of reg) map[r][c].push(reg);
  }
  return map;
}

function isValid(
  grid: number[][],
  r: number, c: number, val: number,
  cellRegions: Region[][][]
): boolean {
  for (const reg of cellRegions[r][c]) {
    for (const [rr, cc] of reg) {
      if ((rr !== r || cc !== c) && grid[rr][cc] === val) return false;
    }
  }
  return true;
}

function solve(
  grid: number[][],
  size: number,
  digits: number[],
  cellRegions: Region[][][],
  startIdx = 0
): boolean {
  for (let idx = startIdx; idx < size * size; idx++) {
    const r = Math.floor(idx / size);
    const c = idx % size;
    if (grid[r][c] !== 0) continue;

    for (const v of shuffle(digits)) {
      if (isValid(grid, r, c, v, cellRegions)) {
        grid[r][c] = v;
        if (solve(grid, size, digits, cellRegions, idx + 1)) return true;
        grid[r][c] = 0;
      }
    }
    return false;
  }
  return true;
}

// ─── Configuración de dificultad ────────────────────────────────────────────
const REMOVE_RATIO: Record<Difficulty, number> = {
  easy:   0.40,
  medium: 0.55,
  hard:   0.65,
};

// ─── Generador público ──────────────────────────────────────────────────────
export function generateSudoku(
  variant: SudokuVariant,
  difficulty: Difficulty
): SudokuPuzzle {
  const cfg = VARIANTS[variant];
  const { size, digits } = cfg;
  const regions = cfg.regions(size);
  const cellRegions = buildCellRegions(size, regions);

  // Genera solución completa
  const solution: number[][] = Array.from({ length: size }, () =>
    Array(size).fill(0)
  );
  solve(solution, size, digits, cellRegions);

  // Copia y oculta celdas
  const grid: (number | null)[][] = solution.map((row) => [...row]);
  const total = size * size;
  const toRemove = Math.floor(total * REMOVE_RATIO[difficulty]);

  const coords: [number, number][] = [];
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) coords.push([r, c]);
  const shuffled = shuffle(coords);

  for (let i = 0; i < toRemove; i++) {
    const [r, c] = shuffled[i];
    grid[r][c] = null;
  }

  return {
    id:               `sudoku-${variant}-${difficulty}-${Date.now()}`,
    type:             'sudoku',
    difficulty,
    estimatedMinutes: variant === 'mini' ? 3 : difficulty === 'easy' ? 8 : difficulty === 'medium' ? 15 : 25,
    createdAt:        Date.now(),
    variant,
    size,
    grid,
    solution,
  };
}

export const _internal = { VARIANTS, classicRegions, diagonalRegions, hyperRegions };
