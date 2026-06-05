import { Difficulty, NonogramPuzzle } from '../types';

const SIZES: Record<Difficulty, { rows: number; cols: number; density: number }> = {
  easy:   { rows: 5,  cols: 5,  density: 0.55 },
  medium: { rows: 10, cols: 10, density: 0.50 },
  hard:   { rows: 15, cols: 15, density: 0.45 },
};

/**
 * Calcula las pistas (runs de celdas marcadas) de una secuencia booleana.
 * Ej: [t,t,f,t] → [2, 1]
 */
function cluesFromLine(line: boolean[]): number[] {
  const clues: number[] = [];
  let count = 0;
  for (const cell of line) {
    if (cell) {
      count++;
    } else if (count > 0) {
      clues.push(count);
      count = 0;
    }
  }
  if (count > 0) clues.push(count);
  return clues.length > 0 ? clues : [0];
}

export function generateNonogram(difficulty: Difficulty): NonogramPuzzle {
  const cfg = SIZES[difficulty];

  // Generate boolean solution with target density
  let solution: boolean[][];
  let nonTrivial = false;
  let attempts = 0;

  do {
    solution = [];
    for (let r = 0; r < cfg.rows; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < cfg.cols; c++) {
        row.push(Math.random() < cfg.density);
      }
      solution.push(row);
    }
    // Avoid trivial puzzles: every row and column must have at least one true and one false
    nonTrivial =
      solution.every((row) => row.some((v) => v) && row.some((v) => !v)) &&
      Array.from({ length: cfg.cols }, (_, c) => solution.map((r) => r[c])).every(
        (col) => col.some((v) => v) && col.some((v) => !v)
      );
    attempts++;
  } while (!nonTrivial && attempts < 50);

  // Derive clues
  const rowClues = solution.map((row) => cluesFromLine(row));
  const colClues = Array.from({ length: cfg.cols }, (_, c) =>
    cluesFromLine(solution.map((r) => r[c]))
  );

  return {
    id:               `nonogram-${difficulty}-${Date.now()}`,
    type:             'nonogram',
    difficulty,
    estimatedMinutes: difficulty === 'easy' ? 3 : difficulty === 'medium' ? 8 : 15,
    createdAt:        Date.now(),
    rows:             cfg.rows,
    cols:             cfg.cols,
    rowClues,
    colClues,
    solution,
  };
}

// Exported for testing
export { cluesFromLine };
