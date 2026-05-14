export type PuzzleType =
  | 'pyramid'
  | 'logic-grid'
  | 'kakuro'
  | 'nonogram'
  | 'lanzarrayos'
  | 'cruzex'
  | 'clasificaciones'
  | 'goteo';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PuzzleBase {
  id: string;
  type: PuzzleType;
  difficulty: Difficulty;
  estimatedMinutes: number;
  createdAt: number;
}

// ── Pyramid ──────────────────────────────────────────────────────────────────
export interface PyramidPuzzle extends PuzzleBase {
  type: 'pyramid';
  levels: number;
  cells: (number | null)[][];
  solution: number[][];
}

// ── Logic Grid ───────────────────────────────────────────────────────────────
export interface Clue {
  text: string;
  type: 'positive' | 'negative' | 'relative';
}

export interface LogicGridPuzzle extends PuzzleBase {
  type: 'logic-grid';
  categories: string[];
  items: Record<string, string[]>;
  clues: Clue[];
  solution: Record<string, string>;
}

// ── Kakuro ───────────────────────────────────────────────────────────────────
export type KakuroCell =
  | { kind: 'black' }
  | { kind: 'clue'; sumRight?: number; sumDown?: number }
  | { kind: 'input'; value: number | null; solution: number };

export interface KakuroPuzzle extends PuzzleBase {
  type: 'kakuro';
  grid: KakuroCell[][];
}

// ── Nonogram ─────────────────────────────────────────────────────────────────
export interface NonogramPuzzle extends PuzzleBase {
  type: 'nonogram';
  rows: number;
  cols: number;
  rowClues: number[][];
  colClues: number[][];
  solution: boolean[][];
}

// ── Lanzarrayos ──────────────────────────────────────────────────────────────
export interface Capsule {
  row: number;
  col: number;
  totalCells: number;
}

export interface Ray {
  capsuleIdx: number;
  direction: 'up' | 'down' | 'left' | 'right';
  length: number;
}

export interface LanzarayosPuzzle extends PuzzleBase {
  type: 'lanzarrayos';
  rows: number;
  cols: number;
  capsules: Capsule[];
  solution: Ray[];
}

// ── Cruzex ───────────────────────────────────────────────────────────────────
export interface CruzexPuzzle extends PuzzleBase {
  type: 'cruzex';
  grid: (number | null)[][];
  numberList: number[];
  solution: (number | null)[][];
}

// ── Clasificaciones ──────────────────────────────────────────────────────────
export interface LeagueRow {
  team: string;
  G: number;
  E: number;
  P: number;
  F: number;
  C: number;
  Pts: number;
}

export interface ClasificacionesPuzzle extends PuzzleBase {
  type: 'clasificaciones';
  teams: string[];
  table: LeagueRow[];
  solution: Record<string, string>;
}

// ── Goteo ────────────────────────────────────────────────────────────────────
export interface GoteoPuzzle extends PuzzleBase {
  type: 'goteo';
  columns: string[][];
  solution: string;
}

// ── Union ────────────────────────────────────────────────────────────────────
export type AnyPuzzle =
  | PyramidPuzzle
  | LogicGridPuzzle
  | KakuroPuzzle
  | NonogramPuzzle
  | LanzarayosPuzzle
  | CruzexPuzzle
  | ClasificacionesPuzzle
  | GoteoPuzzle;
