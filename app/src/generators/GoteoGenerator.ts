import { Difficulty, GoteoPuzzle } from '../types';
import { PHRASES } from './goteoPhrases';

const COLUMN_HEIGHT: Record<Difficulty, number> = {
  easy:   3,
  medium: 4,
  hard:   5,
};

const ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateGoteo(difficulty: Difficulty): GoteoPuzzle {
  const phrases = PHRASES[difficulty];
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  const height = COLUMN_HEIGHT[difficulty];

  // Una columna por carácter; los espacios son columnas marcadoras (con un único ' ')
  const columns: string[][] = phrase.split('').map((ch) => {
    if (ch === ' ') {
      return [' '];
    }
    // Generamos `height` letras: 1 correcta + N-1 distractores aleatorios distintos
    const distractors: string[] = [];
    const candidates = ALPHABET.split('').filter((l) => l !== ch);
    const shuffled = shuffle(candidates);
    for (let i = 0; i < height - 1; i++) distractors.push(shuffled[i]);
    return shuffle([ch, ...distractors]);
  });

  return {
    id:               `goteo-${difficulty}-${Date.now()}`,
    type:             'goteo',
    difficulty,
    estimatedMinutes: difficulty === 'easy' ? 2 : difficulty === 'medium' ? 5 : 10,
    createdAt:        Date.now(),
    columns,
    solution:         phrase,
  };
}
