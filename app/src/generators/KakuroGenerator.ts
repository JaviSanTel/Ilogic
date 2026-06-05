import { Difficulty, KakuroCell, KakuroPuzzle } from '../types';
import { LAYOUTS, Layout, LayoutCell } from './kakuroLayouts';

interface Run {
  cells: { r: number; c: number }[];
  direction: 'horizontal' | 'vertical';
  clueR: number; // row of clue cell
  clueC: number; // col of clue cell
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Find all runs (horizontal + vertical) in the layout.
 * A run is a sequence of consecutive 'I' cells preceded by a clue cell.
 */
function findRuns(layout: Layout): Run[] {
  const rows = layout.length;
  const cols = layout[0].length;
  const runs: Run[] = [];

  // ── Horizontal runs ───────────────────────────────────────────────────────
  for (let r = 0; r < rows; r++) {
    let clueC = -1;
    let runCells: { r: number; c: number }[] = [];
    for (let c = 0; c < cols; c++) {
      const cell = layout[r][c];
      if (cell === 'I') {
        runCells.push({ r, c });
      } else {
        // Close existing run if any
        if (runCells.length > 0 && clueC >= 0) {
          runs.push({ cells: runCells, direction: 'horizontal', clueR: r, clueC });
        }
        runCells = [];
        clueC = (cell === 'Cr' || cell === 'Crd') ? c : -1;
      }
    }
    if (runCells.length > 0 && clueC >= 0) {
      runs.push({ cells: runCells, direction: 'horizontal', clueR: r, clueC });
    }
  }

  // ── Vertical runs ─────────────────────────────────────────────────────────
  for (let c = 0; c < cols; c++) {
    let clueR = -1;
    let runCells: { r: number; c: number }[] = [];
    for (let r = 0; r < rows; r++) {
      const cell = layout[r][c];
      if (cell === 'I') {
        runCells.push({ r, c });
      } else {
        if (runCells.length > 0 && clueR >= 0) {
          runs.push({ cells: runCells, direction: 'vertical', clueR, clueC: c });
        }
        runCells = [];
        clueR = (cell === 'Cd' || cell === 'Crd') ? r : -1;
      }
    }
    if (runCells.length > 0 && clueR >= 0) {
      runs.push({ cells: runCells, direction: 'vertical', clueR, clueC: c });
    }
  }

  return runs;
}

/**
 * Fill input cells with values 1-9 such that no digit repeats within any run.
 * Uses backtracking. Returns map of "r,c" → value, or null if impossible.
 */
function backtrackFill(layout: Layout, runs: Run[]): Record<string, number> | null {
  const rows = layout.length;
  const cols = layout[0].length;

  // Collect input cells
  const inputCells: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (layout[r][c] === 'I') inputCells.push({ r, c });
    }
  }

  // Build cell → runs index
  const cellToRuns: Record<string, Run[]> = {};
  for (const run of runs) {
    for (const cell of run.cells) {
      const key = `${cell.r},${cell.c}`;
      cellToRuns[key] = cellToRuns[key] || [];
      cellToRuns[key].push(run);
    }
  }

  const values: Record<string, number> = {};

  function solve(idx: number): boolean {
    if (idx >= inputCells.length) return true;

    const { r, c } = inputCells[idx];
    const key = `${r},${c}`;

    const runsForCell = cellToRuns[key] ?? [];

    for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      // Check no duplicate within any run containing this cell
      let valid = true;
      for (const run of runsForCell) {
        for (const cell of run.cells) {
          const ck = `${cell.r},${cell.c}`;
          if (ck !== key && values[ck] === v) {
            valid = false;
            break;
          }
        }
        if (!valid) break;
      }

      if (valid) {
        values[key] = v;
        if (solve(idx + 1)) return true;
        delete values[key];
      }
    }

    return false;
  }

  return solve(0) ? values : null;
}

/**
 * Sanitize layout: convert clue cells without runs to black,
 * and convert isolated input cells (not in any run) to black.
 */
function sanitizeLayout(layout: Layout): Layout {
  const rows = layout.length;
  const cols = layout[0].length;
  const sanitized: Layout = layout.map((row) => [...row]);
  const runs = findRuns(sanitized);

  // Inputs in at least one run
  const inputsInRun = new Set<string>();
  for (const run of runs) {
    for (const cell of run.cells) inputsInRun.add(`${cell.r},${cell.c}`);
  }

  // Find clue cells that have runs (right or down)
  const cluesWithRunRight = new Set<string>();
  const cluesWithRunDown = new Set<string>();
  for (const run of runs) {
    const k = `${run.clueR},${run.clueC}`;
    if (run.direction === 'horizontal') cluesWithRunRight.add(k);
    else                                 cluesWithRunDown.add(k);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = sanitized[r][c];
      const key = `${r},${c}`;

      if (cell === 'I' && !inputsInRun.has(key)) {
        sanitized[r][c] = 'B';
      } else if (cell === 'Cr' && !cluesWithRunRight.has(key)) {
        sanitized[r][c] = cluesWithRunDown.has(key) ? 'Cd' : 'B';
      } else if (cell === 'Cd' && !cluesWithRunDown.has(key)) {
        sanitized[r][c] = cluesWithRunRight.has(key) ? 'Cr' : 'B';
      } else if (cell === 'Crd') {
        const hasR = cluesWithRunRight.has(key);
        const hasD = cluesWithRunDown.has(key);
        if (!hasR && !hasD)      sanitized[r][c] = 'B';
        else if (!hasR)          sanitized[r][c] = 'Cd';
        else if (!hasD)          sanitized[r][c] = 'Cr';
      }
    }
  }

  return sanitized;
}

export function generateKakuro(difficulty: Difficulty): KakuroPuzzle {
  const layoutOptions = LAYOUTS[difficulty];
  const rawLayout = layoutOptions[Math.floor(Math.random() * layoutOptions.length)];
  const layout = sanitizeLayout(rawLayout);
  const runs = findRuns(layout);

  // Try up to 5 times (backtracking can occasionally fail on tight constraints)
  let values: Record<string, number> | null = null;
  for (let attempt = 0; attempt < 5; attempt++) {
    values = backtrackFill(layout, runs);
    if (values) break;
  }

  if (!values) {
    throw new Error(`KakuroGenerator: no valid filling found for difficulty ${difficulty}`);
  }

  // Calculate sums per run
  const runSums = new Map<Run, number>();
  for (const run of runs) {
    const sum = run.cells.reduce((acc, cell) => acc + values![`${cell.r},${cell.c}`], 0);
    runSums.set(run, sum);
  }

  // Build the grid
  const rows = layout.length;
  const cols = layout[0].length;
  const grid: KakuroCell[][] = [];

  for (let r = 0; r < rows; r++) {
    const row: KakuroCell[] = [];
    for (let c = 0; c < cols; c++) {
      const cell = layout[r][c];
      if (cell === 'B') {
        row.push({ kind: 'black' });
      } else if (cell === 'I') {
        row.push({ kind: 'input', value: null, solution: values[`${r},${c}`] });
      } else {
        // Find the runs whose clue is at this position
        let sumRight: number | undefined;
        let sumDown:  number | undefined;
        for (const run of runs) {
          if (run.clueR === r && run.clueC === c) {
            if (run.direction === 'horizontal') sumRight = runSums.get(run);
            else                                 sumDown  = runSums.get(run);
          }
        }
        row.push({ kind: 'clue', sumRight, sumDown });
      }
    }
    grid.push(row);
  }

  return {
    id:               `kakuro-${difficulty}-${Date.now()}`,
    type:             'kakuro',
    difficulty,
    estimatedMinutes: difficulty === 'easy' ? 4 : difficulty === 'medium' ? 10 : 20,
    createdAt:        Date.now(),
    grid,
  };
}

// Exported for testing
export const _internal = { findRuns, backtrackFill };
