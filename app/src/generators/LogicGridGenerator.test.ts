import { generateLogicGrid } from './LogicGridGenerator';
import { validateLogicGrid, validateSummary } from '../puzzles/logic-grid/validator';
import { pairKey, SummaryState } from '../puzzles/logic-grid/types';
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

      it('passing the full solution as summary validates as correct', () => {
        const p = generateLogicGrid(difficulty);
        const summary: SummaryState = { ...p.solution };
        const result = validateSummary(p, summary);
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
