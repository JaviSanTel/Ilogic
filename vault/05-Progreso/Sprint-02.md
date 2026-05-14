# Sprint 02 — Logic Grid + UX base

> **Objetivo**: Puzzle más representativo del género jugable. Flujo completo con selector de dificultad.
> **Duración**: 1 semana
> **Rama git**: `feat/sprint-02-logic-grid`
> **Prerequisito**: Sprint 01 mergeado en `develop` ✅

---

## Tickets

### UX base

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| INFRA-11 | Victory screen | ✅ | (heredado del Sprint 01) `app/results/[puzzleId].tsx` |
| INFRA-12 | Selector de dificultad transversal | ✅ | Modal `DifficultyPicker` activado al pulsar PuzzleCard |

### Logic Grid

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| LG-01 | `LogicGridPuzzle` types.ts | ✅ | `src/puzzles/logic-grid/types.ts` + `GridState`, `pairKey` helper |
| LG-02 | `LogicGridGenerator` | ✅ | Banco de 8 temas, selección aleatoria. easy 3×3, medium 3×4, hard 4×4 |
| LG-03 | Tests del generador | ✅ | 16 tests pasando — estructura, consistencia, validez en 3 dificultades |
| LG-04 | `LogicGridValidator` | ✅ | Comprueba marcas ✓/✗ vs solución (cross-categorías incluido) |
| LG-05 | `LogicGridBoard.tsx` | ✅ | Subtablas N×N por par de categorías. Tap cíclico (✓→✗→vacío) |
| LG-06 | Renderizado de pistas | ✅ | Panel superior con pistas (color rojo para negativas) |
| LG-07 | Conectar en game screen | ✅ | Switch en `game/[puzzleId].tsx` con parse especial para "logic-grid-..." |
| LG-08 | Tests de integración | 🔲 | Aplazado a Sprint 03 |

---

## Stack añadido en este sprint

- **Banco de temas** (`logicGridTopics.ts`): 8 categorías × 5 items cada una
- **GridState** type para representar marcas del jugador
- **DifficultyPicker** modal reusable para los 8 puzzles

---

## Criterios de aceptación del sprint

- [x] Pyramid y Logic Grid accesibles desde Home con selector de dificultad
- [x] Selector de dificultad funcional
- [x] Victory screen al completar puzzle (heredado)
- [x] `npm test` sin errores → **29/29 pasando**
- [x] `npx tsc --noEmit` sin errores → **0 errores**

---

## Métricas

| | Antes (S01) | Ahora (S02) |
|---|---|---|
| Tests | 13 | 29 |
| Puzzles jugables | 1 | 2 |
| Ficheros src/ | 14 | 18 |

---

## Decisiones del sprint

- **Sin solver de unicidad** en v1 del generador — las pistas pueden no ser mínimas. Si el feedback dice que es trivial o ambiguo, añadiremos solver en Sprint 03.
- **GridState global** por par `pairKey(itemA, itemB)` ordenado alfabéticamente — evita duplicar (A.B vs B.A).
- **Subgrids por par de categorías** en lugar de una sola tabla gigante. Más legible en móvil.

---

## Notas / blockers

- Las pistas son sólo "X se asocia con Y" / "X NO se asocia con Y" — no hay pistas relativas tipo "el que tiene X1 también tiene Y1". Se añadirán en una iteración futura si aporta.
- Los nombres de items se truncan a 4-6 caracteres en cabeceras para encajar en pantallas pequeñas. Habrá que revisar en tablets.
