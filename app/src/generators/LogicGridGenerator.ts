import { Clue, Difficulty, LogicGridPuzzle } from '../types';
import { TOPICS } from './logicGridTopics';

interface Config {
  categories: number;     // total categorías (la primera es el "ancla")
  items: number;          // items por categoría
  cluesPositive: number;  // pistas positivas garantizadas
  cluesNegative: number;  // pistas negativas extra
}

const CONFIG: Record<Difficulty, Config> = {
  easy:   { categories: 3, items: 3, cluesPositive: 4, cluesNegative: 2 },
  medium: { categories: 3, items: 4, cluesPositive: 6, cluesNegative: 4 },
  hard:   { categories: 4, items: 4, cluesPositive: 8, cluesNegative: 6 },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateLogicGrid(difficulty: Difficulty): LogicGridPuzzle {
  const cfg = CONFIG[difficulty];

  // Pick N categories at random from the bank
  const chosenTopics = shuffle(TOPICS).slice(0, cfg.categories);
  const categories = chosenTopics.map((t) => t.name);

  // Pick N items from each category and shuffle them
  const items: Record<string, string[]> = {};
  chosenTopics.forEach((topic) => {
    items[topic.name] = shuffle(topic.items).slice(0, cfg.items);
  });

  // Build solution by assigning each anchor item to one of each other category
  const anchorCat = categories[0];
  const anchorItems = items[anchorCat];

  // For each non-anchor category, create a random permutation of its items
  const permutations: Record<string, string[]> = {};
  for (let c = 1; c < categories.length; c++) {
    permutations[categories[c]] = shuffle(items[categories[c]]);
  }

  // Build solution as map of "anchorItem.category" → item
  const solution: Record<string, string> = {};
  anchorItems.forEach((anchor, i) => {
    for (let c = 1; c < categories.length; c++) {
      const cat = categories[c];
      solution[`${anchor}.${cat}`] = permutations[cat][i];
    }
  });

  // Generate clues
  const clues = generateClues(categories, items, solution, cfg);

  return {
    id:               `logic-grid-${difficulty}-${Date.now()}`,
    type:             'logic-grid',
    difficulty,
    estimatedMinutes: difficulty === 'easy' ? 4 : difficulty === 'medium' ? 8 : 15,
    createdAt:        Date.now(),
    categories,
    items,
    clues,
    solution,
  };
}

function generateClues(
  categories: string[],
  items: Record<string, string[]>,
  solution: Record<string, string>,
  cfg: Config
): Clue[] {
  const anchorCat = categories[0];
  const anchorItems = items[anchorCat];

  // ── All possible POSITIVE clues from the solution ───────────────────────
  const positivePool: Clue[] = [];
  anchorItems.forEach((anchor) => {
    for (let c = 1; c < categories.length; c++) {
      const cat = categories[c];
      const value = solution[`${anchor}.${cat}`];
      positivePool.push({
        text: `${anchor} se asocia con ${value}.`,
        type: 'positive',
      });
    }
  });

  // ── All possible NEGATIVE clues ─────────────────────────────────────────
  const negativePool: Clue[] = [];
  anchorItems.forEach((anchor) => {
    for (let c = 1; c < categories.length; c++) {
      const cat = categories[c];
      const correctValue = solution[`${anchor}.${cat}`];
      items[cat]
        .filter((v) => v !== correctValue)
        .forEach((wrongValue) => {
          negativePool.push({
            text: `${anchor} NO se asocia con ${wrongValue}.`,
            type: 'negative',
          });
        });
    }
  });

  // ── Sample clues according to config ────────────────────────────────────
  const positives = shuffle(positivePool).slice(0, cfg.cluesPositive);
  const negatives = shuffle(negativePool).slice(0, cfg.cluesNegative);

  return shuffle([...positives, ...negatives]);
}
