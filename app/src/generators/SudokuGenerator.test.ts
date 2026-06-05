import { generateSudoku, _internal } from './SudokuGenerator';
import { validateSudoku } from '../puzzles/sudoku/validator';
import { Difficulty, SudokuVariant } from '../types';

const VARIANTS: SudokuVariant[] = ['classic', 'x', 'mini', 'hyper'];
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

describe('SudokuGenerator', () => {
  VARIANTS.forEach((variant) => {
    DIFFICULTIES.forEach((difficulty) => {
      it(`generates a valid ${variant} ${difficulty} puzzle`, () => {
        const p = generateSudoku(variant, difficulty);
        expect(p.type).toBe('sudoku');
        expect(p.variant).toBe(variant);
        expect(p.difficulty).toBe(difficulty);

        const expectedSize = variant === 'mini' ? 6 : 9;
        expect(p.size).toBe(expectedSize);
        expect(p.solution.length).toBe(expectedSize);
        expect(p.solution[0].length).toBe(expectedSize);

        // Solución no debe tener ceros
        for (const row of p.solution) {
          for (const v of row) {
            expect(v).toBeGreaterThan(0);
            expect(v).toBeLessThanOrEqual(expectedSize);
          }
        }

        // Validador con solución completa
        const fullState = p.solution.map((row) => [...row]);
        expect(validateSudoku(p, fullState).isCorrect).toBe(true);
      });
    });
  });

  it('classic 9x9 has 9 unique digits per row/col/box', () => {
    const p = generateSudoku('classic', 'easy');
    for (let r = 0; r < 9; r++) {
      expect(new Set(p.solution[r]).size).toBe(9);
    }
    for (let c = 0; c < 9; c++) {
      const col = p.solution.map((row) => row[c]);
      expect(new Set(col).size).toBe(9);
    }
    // Boxes 3x3
    for (let br = 0; br < 9; br += 3) {
      for (let bc = 0; bc < 9; bc += 3) {
        const box: number[] = [];
        for (let r = br; r < br + 3; r++)
          for (let c = bc; c < bc + 3; c++) box.push(p.solution[r][c]);
        expect(new Set(box).size).toBe(9);
      }
    }
  });

  it('x variant has unique digits on both diagonals', () => {
    const p = generateSudoku('x', 'easy');
    const main = p.solution.map((row, i) => row[i]);
    const anti = p.solution.map((row, i) => row[p.size - 1 - i]);
    expect(new Set(main).size).toBe(p.size);
    expect(new Set(anti).size).toBe(p.size);
  });

  it('exports VARIANTS internals', () => {
    expect(_internal.VARIANTS.classic.size).toBe(9);
    expect(_internal.VARIANTS.mini.size).toBe(6);
  });
});
