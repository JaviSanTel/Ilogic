import { CruzexPuzzle, Difficulty } from '../types';

interface Run {
  cells: { r: number; c: number }[];
  direction: 'h' | 'v';
}

const LAYOUTS: Record<Difficulty, number[][]> = {
  // 1 = input cell, 0 = black
  easy: [
    [1, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 1],
  ],
  medium: [
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
  ],
  hard: [
    [1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 1],
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Encuentra todos los runs (≥2 celdas) en horizontal y vertical */
function findRuns(layout: number[][]): Run[] {
  const runs: Run[] = [];
  const rows = layout.length;
  const cols = layout[0].length;

  // Horizontales
  for (let r = 0; r < rows; r++) {
    let cells: { r: number; c: number }[] = [];
    for (let c = 0; c < cols; c++) {
      if (layout[r][c] === 1) cells.push({ r, c });
      else {
        if (cells.length >= 2) runs.push({ cells, direction: 'h' });
        cells = [];
      }
    }
    if (cells.length >= 2) runs.push({ cells, direction: 'h' });
  }

  // Verticales
  for (let c = 0; c < cols; c++) {
    let cells: { r: number; c: number }[] = [];
    for (let r = 0; r < rows; r++) {
      if (layout[r][c] === 1) cells.push({ r, c });
      else {
        if (cells.length >= 2) runs.push({ cells, direction: 'v' });
        cells = [];
      }
    }
    if (cells.length >= 2) runs.push({ cells, direction: 'v' });
  }

  return runs;
}

function backtrack(
  layout: number[][],
  runs: Run[],
  inputCells: { r: number; c: number }[],
  values: Record<string, number>,
  idx: number
): boolean {
  if (idx >= inputCells.length) return true;
  const { r, c } = inputCells[idx];
  const key = `${r},${c}`;

  // Encuentra los runs a los que pertenece
  const cellRuns = runs.filter((run) =>
    run.cells.some((cell) => cell.r === r && cell.c === c)
  );

  for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    let valid = true;
    for (const run of cellRuns) {
      for (const cell of run.cells) {
        const ck = `${cell.r},${cell.c}`;
        if (ck !== key && values[ck] === v) { valid = false; break; }
      }
      if (!valid) break;
    }
    if (valid) {
      values[key] = v;
      if (backtrack(layout, runs, inputCells, values, idx + 1)) return true;
      delete values[key];
    }
  }
  return false;
}

export function generateCruzex(difficulty: Difficulty): CruzexPuzzle {
  const layout = LAYOUTS[difficulty];
  const runs = findRuns(layout);
  const rows = layout.length;
  const cols = layout[0].length;

  const inputCells: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (layout[r][c] === 1) inputCells.push({ r, c });
    }
  }

  const values: Record<string, number> = {};
  let success = false;
  for (let attempt = 0; attempt < 10; attempt++) {
    success = backtrack(layout, runs, inputCells, values, 0);
    if (success) break;
    for (const k of Object.keys(values)) delete values[k];
  }

  if (!success) {
    throw new Error('CruzexGenerator: could not generate puzzle');
  }

  // Build solution and grid
  const solution: (number | null)[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: (number | null)[] = [];
    for (let c = 0; c < cols; c++) {
      row.push(layout[r][c] === 1 ? values[`${r},${c}`] : null);
    }
    solution.push(row);
  }

  // numberList: collect all run values as multi-digit numbers
  const numberList: number[] = [];
  for (const run of runs) {
    const num = parseInt(
      run.cells.map((cell) => values[`${cell.r},${cell.c}`]).join(''),
      10
    );
    numberList.push(num);
  }

  // Player starts with empty grid (input cells = 0)
  const grid: (number | null)[][] = solution.map((row) =>
    row.map((v) => (v === null ? null : 0))
  );

  return {
    id:               `cruzex-${difficulty}-${Date.now()}`,
    type:             'cruzex',
    difficulty,
    estimatedMinutes: difficulty === 'easy' ? 4 : difficulty === 'medium' ? 10 : 18,
    createdAt:        Date.now(),
    grid,
    numberList:       shuffle(numberList),
    solution,
  };
}
