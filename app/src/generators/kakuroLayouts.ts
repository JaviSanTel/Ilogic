/**
 * Layouts predefinidos para puzzles Kakuro.
 * 'B' = celda negra · 'I' = input · 'Cr' = clue solo sumRight ·
 * 'Cd' = clue solo sumDown · 'Crd' = clue con ambos
 *
 * Invariantes a respetar:
 * - Cada 'I' debe estar precedida horizontalmente por Cr/Crd o verticalmente por Cd/Crd
 * - Cada Cr/Crd debe tener al menos una 'I' a su derecha hasta encontrar B o C
 * - Cada Cd/Crd debe tener al menos una 'I' debajo hasta encontrar B o C
 */
export type LayoutCell = 'B' | 'I' | 'Cr' | 'Cd' | 'Crd';
export type Layout = LayoutCell[][];

// ─── EASY 5×5 ───────────────────────────────────────────────────────────────
const easy1: Layout = [
  ['B',   'Cd',  'Cd',  'B',   'B' ],
  ['Cr',  'I',   'I',   'B',   'B' ],
  ['Cr',  'I',   'I',   'Cd',  'B' ],
  ['B',   'Cr',  'I',   'I',   'Cd'],
  ['B',   'B',   'Cr',  'I',   'I' ],
];

const easy2: Layout = [
  ['B',   'Cd',  'Cd',  'B',   'B' ],
  ['Cr',  'I',   'I',   'Cd',  'B' ],
  ['Cr',  'I',   'I',   'I',   'B' ],
  ['B',   'B',   'Cr',  'I',   'B' ],
  ['B',   'B',   'B',   'B',   'B' ],
];

// ─── MEDIUM 6×6 ─────────────────────────────────────────────────────────────
const medium1: Layout = [
  ['B',   'Cd',  'Cd',  'B',   'B',   'Cd' ],
  ['Cr',  'I',   'I',   'B',   'Cr',  'I'  ],
  ['Cr',  'I',   'I',   'Cd',  'I',   'I'  ],
  ['B',   'Cr',  'I',   'I',   'I',   'B'  ],
  ['B',   'Cr',  'I',   'I',   'B',   'B'  ],
  ['B',   'B',   'Cr',  'I',   'B',   'B'  ],
];

const medium2: Layout = [
  ['B',   'Cd',  'Cd',  'B',   'B',   'B'  ],
  ['Cr',  'I',   'I',   'Cd',  'Cd',  'B'  ],
  ['Cr',  'I',   'I',   'I',   'I',   'B'  ],
  ['B',   'Cr',  'I',   'I',   'I',   'Cd' ],
  ['B',   'B',   'Cr',  'I',   'I',   'I'  ],
  ['B',   'B',   'B',   'Cr',  'I',   'I'  ],
];

// ─── HARD 7×7 ───────────────────────────────────────────────────────────────
const hard1: Layout = [
  ['B',   'Cd',  'Cd',  'B',   'Cd',  'Cd',  'B'  ],
  ['Cr',  'I',   'I',   'B',   'Cr',  'I',   'B'  ],
  ['Cr',  'I',   'I',   'Cd',  'Cr',  'I',   'Cd' ],
  ['B',   'Cr',  'I',   'I',   'I',   'B',   'I'  ],
  ['B',   'B',   'Cr',  'I',   'I',   'Cd',  'I'  ],
  ['B',   'Cr',  'I',   'I',   'B',   'Cr',  'I'  ],
  ['B',   'B',   'Cr',  'I',   'I',   'B',   'B'  ],
];

export const LAYOUTS = {
  easy:   [easy1, easy2],
  medium: [medium1, medium2],
  hard:   [hard1],
};
