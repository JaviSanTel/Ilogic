import { ClasificacionesPuzzle, Difficulty, LeagueRow } from '../types';

const TEAM_NAMES = [
  'Real Águilas', 'Atlético Sol', 'Lobos FC',     'Tiburones',
  'Cóndores',     'Pumas',        'Halcones',     'Dragones',
];

interface Config {
  teams: number;
  hiddenMatches: number;
  maxGoals: number;
}

const CONFIG: Record<Difficulty, Config> = {
  easy:   { teams: 3, hiddenMatches: 2, maxGoals: 3 },
  medium: { teams: 4, hiddenMatches: 4, maxGoals: 3 },
  hard:   { teams: 5, hiddenMatches: 6, maxGoals: 4 },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function matchKey(a: string, b: string): string {
  return [a, b].sort().join(' vs ');
}

export function generateClasificaciones(difficulty: Difficulty): ClasificacionesPuzzle {
  const cfg = CONFIG[difficulty];
  const teams = shuffle(TEAM_NAMES).slice(0, cfg.teams);

  // Generate all matches (round-robin) with random scores
  const matches: { home: string; away: string; homeG: number; awayG: number }[] = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        home: teams[i],
        away: teams[j],
        homeG: Math.floor(Math.random() * (cfg.maxGoals + 1)),
        awayG: Math.floor(Math.random() * (cfg.maxGoals + 1)),
      });
    }
  }

  // Compute league table from matches
  const table: LeagueRow[] = teams.map((team) => ({
    team, G: 0, E: 0, P: 0, F: 0, C: 0, Pts: 0,
  }));
  const rowOf = (t: string) => table.find((r) => r.team === t)!;

  for (const m of matches) {
    const h = rowOf(m.home);
    const a = rowOf(m.away);
    h.F += m.homeG; h.C += m.awayG;
    a.F += m.awayG; a.C += m.homeG;
    if (m.homeG > m.awayG)      { h.G++; h.Pts += 3; a.P++; }
    else if (m.homeG < m.awayG) { a.G++; a.Pts += 3; h.P++; }
    else                         { h.E++; a.E++; h.Pts++; a.Pts++; }
  }

  // Sort table by Pts desc, GD desc
  table.sort((x, y) => (y.Pts - x.Pts) || ((y.F - y.C) - (x.F - x.C)));

  // Solution: ALL matches as "h-a" strings
  const solution: Record<string, string> = {};
  for (const m of matches) {
    solution[matchKey(m.home, m.away)] = `${m.homeG}-${m.awayG}`;
  }

  return {
    id:               `clasificaciones-${difficulty}-${Date.now()}`,
    type:             'clasificaciones',
    difficulty,
    estimatedMinutes: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 20,
    createdAt:        Date.now(),
    teams,
    table,
    solution,
  };
}
