import { Difficulty, PuzzleType } from './puzzle';

export interface PlayerProgress {
  puzzleId: string;
  currentState: unknown;
  startedAt: number;
  elapsedSeconds: number;
}

export interface PuzzleResult {
  puzzleId: string;
  type: PuzzleType;
  difficulty: Difficulty;
  completedAt: number;
  elapsedSeconds: number;
}

export interface UserSettings {
  hapticEnabled: boolean;
  soundEnabled: boolean;
  preferredDifficulty: Difficulty;
}

export interface GlobalStats {
  totalSolved: number;
  byType: Record<PuzzleType, number>;
  bestTimes: Record<string, number>;
  currentStreak: number;
  lastPlayedAt: number;
}
