---
name: logic-puzzles-app
description: >
  Skill para el desarrollo de la app móvil de pasatiempos de lógica en Expo + TypeScript.
  Usar siempre que se trabaje en este proyecto: generación de puzzles, motor de grid,
  componentes de juego, generadores algorítmicos, almacenamiento de progreso o cualquier
  tarea relacionada con los 8 tipos de puzzle soportados. Incluye convenciones de código,
  estructuras de datos canónicas y patrones de arquitectura del proyecto.
---

# Logic Puzzles App — Skill para Claude Code

## Stack y entorno

- **Framework**: Expo SDK 51 + React Native
- **Lenguaje**: TypeScript strict
- **Navegación**: Expo Router (file-based)
- **Almacenamiento local**: AsyncStorage
- **Testing**: Jest + React Native Testing Library
- **Linter**: ESLint + Prettier

## Estructura del proyecto

```
/src
  /engine/          ← Motor genérico de grid y lógica compartida
  /puzzles/         ← Un subdirectorio por tipo de puzzle
    /logic-grid/    ← Quién es Quién
    /kakuro/        ← Sumas cruzadas
    /nonogram/      ← Picross / Nonograma
    /pyramid/       ← Pirámide numérica
    /lanzarrayos/   ← Rayos desde cápsulas
    /cruzex/        ← Crúzex numérico
    /clasificaciones/
    /goteo/         ← Frase por goteo
  /generators/      ← Generación algorítmica de puzzles
  /storage/         ← Persistencia y progreso del jugador
  /components/      ← UI compartida (Grid, Cell, Timer, etc.)
  /screens/         ← Pantallas de Expo Router
/assets/            ← No modificar directamente
```

## Tipos de puzzle — referencia rápida

| ID | Nombre | Archivo de spec |
|----|--------|----------------|
| `logic-grid` | Quién es Quién | ver §Estructuras de datos |
| `kakuro` | Sumas cruzadas | ver §Estructuras de datos |
| `nonogram` | Nonograma/Picross | ver §Estructuras de datos |
| `pyramid` | Pirámide numérica | ver §Estructuras de datos |
| `lanzarrayos` | Lanzarrayos | ver §Estructuras de datos |
| `cruzex` | Crúzex numérico | ver §Estructuras de datos |
| `clasificaciones` | Clasificaciones fútbol | ver §Estructuras de datos |
| `goteo` | Frase por goteo | ver §Estructuras de datos |

## Estructuras de datos canónicas

### PuzzleBase (todos heredan de esto)
```typescript
interface PuzzleBase {
  id: string;
  type: PuzzleType;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  createdAt: number;
}
```

### LogicGridPuzzle
```typescript
interface LogicGridPuzzle extends PuzzleBase {
  type: 'logic-grid';
  categories: Category[];   // ej: ['Deportista', 'Atractivo', 'Ciudad']
  items: Record<string, string[]>; // ej: { Deportista: ['Futbolista', 'Nadador'] }
  clues: Clue[];
  solution: Record<string, string>; // { 'Futbolista.Ciudad': 'Niza' }
}
interface Clue { text: string; type: 'positive' | 'negative' | 'relative'; }
```

### KakuroPuzzle
```typescript
interface KakuroPuzzle extends PuzzleBase {
  type: 'kakuro';
  grid: KakuroCell[][];
}
type KakuroCell =
  | { kind: 'black' }
  | { kind: 'clue'; sumRight?: number; sumDown?: number }
  | { kind: 'input'; value: number | null; solution: number };
```

### NonogramPuzzle
```typescript
interface NonogramPuzzle extends PuzzleBase {
  type: 'nonogram';
  rows: number; cols: number;
  rowClues: number[][];
  colClues: number[][];
  solution: boolean[][];
}
```

### PyramidPuzzle
```typescript
interface PyramidPuzzle extends PuzzleBase {
  type: 'pyramid';
  levels: number;           // número de filas
  cells: (number | null)[][]; // null = celda vacía que el usuario rellena
  solution: number[][];
}
```

### LanzarayosPuzzle
```typescript
interface LanzarayosPuzzle extends PuzzleBase {
  type: 'lanzarrayos';
  rows: number; cols: number;
  capsules: Capsule[];
  solution: Ray[];
}
interface Capsule { row: number; col: number; totalCells: number; }
interface Ray { capsuleIdx: number; direction: 'up'|'down'|'left'|'right'; length: number; }
```

### CruzexPuzzle
```typescript
interface CruzexPuzzle extends PuzzleBase {
  type: 'cruzex';
  grid: (number | null)[][];  // null = celda negra
  numberList: number[];        // números a colocar
  solution: (number | null)[][];
}
```

### ClasificacionesPuzzle
```typescript
interface ClasificacionesPuzzle extends PuzzleBase {
  type: 'clasificaciones';
  teams: string[];
  table: LeagueRow[];         // G, E, P, F, C, Pts ya dados
  solution: Record<string, number>; // 'A-B': '2-1', etc.
}
interface LeagueRow { team: string; G: number; E: number; P: number; F: number; C: number; Pts: number; }
```

### GoteoPuzzle
```typescript
interface GoteoPuzzle extends PuzzleBase {
  type: 'goteo';
  columns: string[][];   // letras por columna (desordenadas)
  solution: string;      // frase completa
}
```

## Convenciones de código

- **Componentes**: PascalCase — `GridCell.tsx`, `PuzzleBoard.tsx`
- **Hooks**: camelCase con prefijo `use` — `usePuzzleState.ts`
- **Generadores**: sufijo `Generator` — `PyramidGenerator.ts`
- **Tipos**: en `/types/` o junto al módulo en `types.ts`
- **Tests**: mismo nombre con `.test.ts` — `PyramidGenerator.test.ts`
- **Exportaciones**: siempre named exports, nunca default export en lógica
- **Estilos**: StyleSheet.create() inline en el componente, sin styled-components

## Motor de grid — API pública

```typescript
// /src/engine/GridEngine.ts
interface GridEngine {
  render(config: GridConfig): JSX.Element;
  onCellPress(row: number, col: number): void;
  validate(current: unknown, solution: unknown): ValidationResult;
}
interface ValidationResult { isCorrect: boolean; errors: CellCoord[]; }
```

## Almacenamiento — claves AsyncStorage

```
progress:{puzzleId}     → PlayerProgress
settings:user           → UserSettings
stats:global            → GlobalStats
```

## Qué NO tocar

- `/assets/` — solo lectura desde el código
- `app.json` y `eas.json` — configuración de Expo/EAS
- `babel.config.js` — configuración de transpilación
- Archivos `.generated.ts` — autogenerados

## Flujo de desarrollo por puzzle

1. Definir tipo en `/src/puzzles/{type}/types.ts`
2. Implementar generador en `/src/generators/{Type}Generator.ts`
3. Implementar validador en `/src/puzzles/{type}/validator.ts`
4. Implementar componente de UI en `/src/puzzles/{type}/{Type}Board.tsx`
5. Conectar en pantalla `/src/screens/game/[puzzleId].tsx`
6. Añadir tests del generador y validador

## Orden de implementación recomendado

1. `pyramid` — UI más simple, valida la infraestructura base
2. `logic-grid` — el más representativo del género
3. `kakuro` — introduce restricciones de suma
4. `nonogram` — introduce renderizado visual complejo
5. `lanzarrayos`, `cruzex`, `clasificaciones`, `goteo` — iteraciones finales
