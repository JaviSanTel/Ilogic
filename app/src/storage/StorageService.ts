import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStats, PlayerProgress, PuzzleResult, UserSettings } from '../types';
import { progressKey, SETTINGS_KEY, STATS_KEY } from './keys';

const DEFAULT_SETTINGS: UserSettings = {
  hapticEnabled: true,
  soundEnabled: true,
  preferredDifficulty: 'medium',
};

const DEFAULT_STATS: GlobalStats = {
  totalSolved: 0,
  byType: {
    pyramid: 0, 'logic-grid': 0, kakuro: 0, nonogram: 0,
    lanzarrayos: 0, cruzex: 0, clasificaciones: 0, goteo: 0, sudoku: 0,
  },
  bestTimes: {},
  currentStreak: 0,
  lastPlayedAt: 0,
};

async function get<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function set(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silent — never crash the game
  }
}

export const StorageService = {
  async saveProgress(puzzleId: string, progress: PlayerProgress): Promise<void> {
    await set(progressKey(puzzleId), progress);
  },

  async loadProgress(puzzleId: string): Promise<PlayerProgress | null> {
    const raw = await AsyncStorage.getItem(progressKey(puzzleId)).catch(() => null);
    return raw ? JSON.parse(raw) : null;
  },

  async clearProgress(puzzleId: string): Promise<void> {
    await AsyncStorage.removeItem(progressKey(puzzleId)).catch(() => null);
  },

  async saveSettings(settings: UserSettings): Promise<void> {
    await set(SETTINGS_KEY, settings);
  },

  async loadSettings(): Promise<UserSettings> {
    return get(SETTINGS_KEY, DEFAULT_SETTINGS);
  },

  async updateStats(result: PuzzleResult): Promise<void> {
    const stats = await get(STATS_KEY, DEFAULT_STATS);
    stats.totalSolved += 1;
    stats.byType[result.type] = (stats.byType[result.type] ?? 0) + 1;

    const timeKey = `${result.type}-${result.difficulty}`;
    const prev = stats.bestTimes[timeKey];
    if (!prev || result.elapsedSeconds < prev) {
      stats.bestTimes[timeKey] = result.elapsedSeconds;
    }

    // Streak: si jugó ayer o hoy, suma; si no, resetea
    const now = Date.now();
    const msPerDay = 86_400_000;
    const daysSinceLast = (now - (stats.lastPlayedAt || 0)) / msPerDay;
    stats.currentStreak = daysSinceLast < 2 ? stats.currentStreak + 1 : 1;
    stats.lastPlayedAt = now;

    await set(STATS_KEY, stats);
  },

  async loadStats(): Promise<GlobalStats> {
    return get(STATS_KEY, DEFAULT_STATS);
  },
};
