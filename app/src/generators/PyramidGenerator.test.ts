import { generatePyramid } from './PyramidGenerator';
import { validatePyramid } from '../puzzles/pyramid/validator';
import { Difficulty } from '../types';

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

describe('PyramidGenerator', () => {
  DIFFICULTIES.forEach((difficulty) => {
    describe(`difficulty: ${difficulty}`, () => {
      it('generates a puzzle with correct structure', () => {
        const puzzle = generatePyramid(difficulty);
        expect(puzzle.type).toBe('pyramid');
        expect(puzzle.difficulty).toBe(difficulty);
        expect(puzzle.solution.length).toBe(puzzle.levels);
        expect(puzzle.cells.length).toBe(puzzle.levels);
      });

      it('solution passes validation', () => {
        const puzzle = generatePyramid(difficulty);
        const result = validatePyramid(puzzle, puzzle.solution);
        expect(result.isCorrect).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('has hidden cells (null values)', () => {
        const puzzle = generatePyramid(difficulty);
        const nullCount = puzzle.cells.flat().filter((c) => c === null).length;
        expect(nullCount).toBeGreaterThan(0);
      });

      it('generates 10 different valid puzzles', () => {
        for (let i = 0; i < 10; i++) {
          const puzzle = generatePyramid(difficulty);
          const result = validatePyramid(puzzle, puzzle.solution);
          expect(result.isCorrect).toBe(true);
        }
      });
    });
  });

  it('base row has correct number of cells per difficulty', () => {
    expect(generatePyramid('easy').cells.at(-1)!.length).toBe(4);
    expect(generatePyramid('medium').cells.at(-1)!.length).toBe(5);
    expect(generatePyramid('hard').cells.at(-1)!.length).toBe(6);
  });
});
