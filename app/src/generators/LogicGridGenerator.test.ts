import { generateLogicGrid } from './LogicGridGenerator';
import { validateLogicGrid } from '../puzzles/logic-grid/validator';
import { pairKey } from '../puzzles/logic-grid/types';
import { Difficulty } from '../types';

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

describe('LogicGridGenerator', () => {
  DIFFICULTIES.forEach((difficulty) => {
    describe(`difficulty: ${difficulty}`, () => {
      it('generates a puzzle with correct structure', () => {
        const p = generateLogicGrid(difficulty);
        expect(p.type).toBe('logic-grid');
        expect(p.difficulty).toBe(difficulty);
        expect(p.categories.length).toBeGreaterThanOrEqual(3);
        expect(p.categories.every((c) => p.items[c].length >= 3)).toBe(true);
      });

      it('has clues', () => {
        const p = generateLogicGrid(difficulty);
        expect(p.clues.length).toBeGreaterThan(0);
      });

      it('solution is consistent: each anchor maps to one item per other category', () => {
        const p = generateLogicGrid(difficulty);
        const anchorCat = p.categories[0];
        const anchorItems = p.items[anchorCat];

        for (let c = 1; c < p.categories.length; c++) {
          const cat = p.categories[c];
          const assigned = anchorItems.map((a) => p.solution[`${a}.${cat}`]);
          // No duplicates → each item of `cat` used exactly once
          expect(new Set(assigned).size).toBe(assigned.length);
        }
      });

      it('passing the full solution as state validates as correct', () => {
        const p = generateLogicGrid(difficulty);
        // Build state with all positive ✓ marks
        const state: Record<string, '✓' | '✗' | undefined> = {};
        const anchorCat = p.categories[0];
        const anchorItems = p.items[anchorCat];

        for (const anchor of anchorItems) {
          for (let c = 1; c < p.categories.length; c++) {
            const cat = p.categories[c];
            const value = p.solution[`${anchor}.${cat}`];
            state[pairKey(anchor, value)] = '✓';
          }
        }

        // Cross categories (non-anchor pairs)
        for (let c1 = 1; c1 < p.categories.length; c1++) {
          for (let c2 = c1 + 1; c2 < p.categories.length; c2++) {
            for (const anchor of anchorItems) {
              const v1 = p.solution[`${anchor}.${p.categories[c1]}`];
              const v2 = p.solution[`${anchor}.${p.categories[c2]}`];
              state[pairKey(v1, v2)] = '✓';
            }
          }
        }

        const result = validateLogicGrid(p, state);
        expect(result.isCorrect).toBe(true);
      });

      it('generates 5 valid puzzles in a row', () => {
        for (let i = 0; i < 5; i++) {
          const p = generateLogicGrid(difficulty);
          expect(p.clues.length).toBeGreaterThan(0);
          expect(Object.keys(p.solution).length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('difficulty determines categories count', () => {
    expect(generateLogicGrid('easy').categories.length).toBe(3);
    expect(generateLogicGrid('medium').categories.length).toBe(3);
    expect(generateLogicGrid('hard').categories.length).toBe(4);
  });
});
