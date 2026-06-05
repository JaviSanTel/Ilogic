import { generateNonogram, cluesFromLine } from './NonogramGenerator';
import { validateNonogram } from '../puzzles/nonogram/validator';
import { Difficulty } from '../types';
import { NonogramState } from '../puzzles/nonogram/types';

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

describe('cluesFromLine', () => {
  it('encodes runs correctly', () => {
    expect(cluesFromLine([true, true, false, true])).toEqual([2, 1]);
    expect(cluesFromLine([true, true, true])).toEqual([3]);
    expect(cluesFromLine([false, false])).toEqual([0]);
    expect(cluesFromLine([true, false, true, false, true])).toEqual([1, 1, 1]);
  });
});

describe('NonogramGenerator', () => {
  DIFFICULTIES.forEach((difficulty) => {
    describe(`difficulty: ${difficulty}`, () => {
      it('generates a puzzle with correct structure', () => {
        const p = generateNonogram(difficulty);
        expect(p.type).toBe('nonogram');
        expect(p.difficulty).toBe(difficulty);
        expect(p.solution.length).toBe(p.rows);
        expect(p.solution.every((r) => r.length === p.cols)).toBe(true);
        expect(p.rowClues.length).toBe(p.rows);
        expect(p.colClues.length).toBe(p.cols);
      });

      it('clues match the solution', () => {
        const p = generateNonogram(difficulty);
        for (let r = 0; r < p.rows; r++) {
          expect(cluesFromLine(p.solution[r])).toEqual(p.rowClues[r]);
        }
        for (let c = 0; c < p.cols; c++) {
          const col = p.solution.map((row) => row[c]);
          expect(cluesFromLine(col)).toEqual(p.colClues[c]);
        }
      });

      it('every row and column is non-trivial', () => {
        const p = generateNonogram(difficulty);
        for (const row of p.solution) {
          expect(row.some((v) => v)).toBe(true);
          expect(row.some((v) => !v)).toBe(true);
        }
        for (let c = 0; c < p.cols; c++) {
          const col = p.solution.map((row) => row[c]);
          expect(col.some((v) => v)).toBe(true);
          expect(col.some((v) => !v)).toBe(true);
        }
      });

      it('passing the full solution as state validates as correct', () => {
        const p = generateNonogram(difficulty);
        const state: NonogramState = p.solution.map((row) =>
          row.map((v) => (v ? 'fill' : undefined))
        );
        expect(validateNonogram(p, state).isCorrect).toBe(true);
      });

      it('an empty state is incorrect', () => {
        const p = generateNonogram(difficulty);
        const state: NonogramState = Array.from({ length: p.rows }, () =>
          Array(p.cols).fill(undefined)
        );
        expect(validateNonogram(p, state).isCorrect).toBe(false);
      });

      it('generates 3 valid puzzles in a row', () => {
        for (let i = 0; i < 3; i++) {
          const p = generateNonogram(difficulty);
          expect(p.solution.length).toBe(p.rows);
        }
      });
    });
  });

  it('size matches difficulty', () => {
    expect(generateNonogram('easy').rows).toBe(5);
    expect(generateNonogram('medium').rows).toBe(10);
    expect(generateNonogram('hard').rows).toBe(15);
  });
});
