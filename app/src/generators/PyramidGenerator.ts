import { Difficulty, PyramidPuzzle } from '../types';

const LEVELS: Record<Difficulty, number> = { easy: 4, medium: 5, hard: 6 };
const HIDE_RATIO: Record<Difficulty, number> = { easy: 0.30, medium: 0.50, hard: 0.65 };

function buildSolution(base: number[]): number[][] {
  const rows: number[][] = [base];
  let current = base;
  while (current.length > 1) {
    const next = current.slice(0, -1).map((v, i) => v + current[i + 1]);
    rows.unshift(next);
    current = next;
  }
  return rows;
}

export function generatePyramid(difficulty: Difficulty): PyramidPuzzle {
  const levels = LEVELS[difficulty];
  const hideRatio = HIDE_RATIO[difficulty];

  // Generate random base (1-9)
  const base = Array.from({ length: levels }, () => Math.floor(Math.random() * 9) + 1);
  const solution = buildSolution(base);

  // Build cells with hidden values
  const totalCells = solution.reduce((acc, row) => acc + row.length, 0);
  const toHide = Math.floor(totalCells * hideRatio);

  // Collect all non-base coords and shuffle
  const allCoords: [number, number][] = [];
  solution.forEach((row, r) => row.forEach((_, c) => allCoords.push([r, c])));

  // Shuffle using Fisher-Yates
  for (let i = allCoords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCoords[i], allCoords[j]] = [allCoords[j], allCoords[i]];
  }

  const hiddenSet = new Set(allCoords.slice(0, toHide).map(([r, c]) => `${r},${c}`));

  const cells: (number | null)[][] = solution.map((row, r) =>
    row.map((val, c) => (hiddenSet.has(`${r},${c}`) ? null : val))
  );

  return {
    id:               `pyramid-${difficulty}-${Date.now()}`,
    type:             'pyramid',
    difficulty,
    estimatedMinutes: difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 8,
    createdAt:        Date.now(),
    levels,
    cells,
    solution,
  };
}
