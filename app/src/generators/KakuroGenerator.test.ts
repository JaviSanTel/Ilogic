import { generateKakuro } from './KakuroGenerator';
import { Difficulty } from '../types';

/**
 * Reconstruye los runs reales de un puzzle a partir del grid generado.
 * Un run termina cuando se encuentra una celda no-input.
 */
function getActualRuns(grid: { kind: string; solution?: number }[][]) {
  const horizontalRuns: number[][] = [];
  const verticalRuns: number[][] = [];

  // Horizontal: agrupa I's consecutivos
  for (let r = 0; r < grid.length; r++) {
    let run: number[] = [];
    for (let c = 0; c < grid[r].length; c++) {
      const cell = grid[r][c];
      if (cell.kind === 'input') {
        run.push(cell.solution as number);
      } else if (run.length > 0) {
        horizontalRuns.push(run);
        run = [];
      }
    }
    if (run.length > 0) horizontalRuns.push(run);
  }

  // Vertical
  for (let c = 0; c < grid[0].length; c++) {
    let run: number[] = [];
    for (let r = 0; r < grid.length; r++) {
      const cell = grid[r][c];
      if (cell.kind === 'input') {
        run.push(cell.solution as number);
      } else if (run.length > 0) {
        verticalRuns.push(run);
        run = [];
      }
    }
    if (run.length > 0) verticalRuns.push(run);
  }

  return { horizontalRuns, verticalRuns };
}

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

describe('KakuroGenerator', () => {
  DIFFICULTIES.forEach((difficulty) => {
    describe(`difficulty: ${difficulty}`, () => {
      it('generates a puzzle with correct structure', () => {
        const p = generateKakuro(difficulty);
        expect(p.type).toBe('kakuro');
        expect(p.difficulty).toBe(difficulty);
        expect(p.grid.length).toBeGreaterThan(0);
        expect(p.grid[0].length).toBeGreaterThan(0);
      });

      it('all input cells have valid solution values (1-9)', () => {
        const p = generateKakuro(difficulty);
        for (const row of p.grid) {
          for (const cell of row) {
            if (cell.kind === 'input') {
              expect(cell.solution).toBeGreaterThanOrEqual(1);
              expect(cell.solution).toBeLessThanOrEqual(9);
              expect(cell.value).toBeNull();
            }
          }
        }
      });

      it('clue cells have at least one sum', () => {
        const p = generateKakuro(difficulty);
        for (const row of p.grid) {
          for (const cell of row) {
            if (cell.kind === 'clue') {
              const hasSum = cell.sumRight !== undefined || cell.sumDown !== undefined;
              expect(hasSum).toBe(true);
            }
          }
        }
      });

      it('no digit repeats within any horizontal run', () => {
        const p = generateKakuro(difficulty);
        const { horizontalRuns } = getActualRuns(p.grid);
        for (const run of horizontalRuns) {
          expect(new Set(run).size).toBe(run.length);
        }
      });

      it('no digit repeats within any vertical run', () => {
        const p = generateKakuro(difficulty);
        const { verticalRuns } = getActualRuns(p.grid);
        for (const run of verticalRuns) {
          expect(new Set(run).size).toBe(run.length);
        }
      });

      it('generates 3 valid puzzles in a row', () => {
        for (let i = 0; i < 3; i++) {
          const p = generateKakuro(difficulty);
          expect(p.grid.length).toBeGreaterThan(0);
        }
      });
    });
  });
});
