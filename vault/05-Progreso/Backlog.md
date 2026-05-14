# Backlog — Ilogic

> Todos los tickets del proyecto. Mover al sprint correspondiente al planificar.
> Estados: 🔲 pendiente · 🔄 en curso · ✅ hecho · ❌ descartado

---

## INFRA — Infraestructura base

| ID | Tarea | Sprint | Estado |
|----|-------|--------|--------|
| INFRA-01 | Scaffold Expo + TypeScript | S01 | ✅ |
| INFRA-02 | Configurar Expo Router | S01 | ✅ |
| INFRA-03 | ESLint + Prettier | S01 | ✅ |
| INFRA-04 | Jest + RNTL | S01 | ✅ |
| INFRA-05 | `GridEngine` genérico | S02 | 🔲 (aplazado) |
| INFRA-06 | Componentes base: `PuzzleButton`, `PuzzleCard`, `Timer` | S01 | ✅ |
| INFRA-07 | `StorageService` con AsyncStorage | S01 | ✅ |
| INFRA-08 | Tipos globales | S01 | ✅ |
| INFRA-09 | Pantalla Home | S01 | ✅ |
| INFRA-10 | Pantalla `/game/[puzzleId]` | S01 | ✅ |
| INFRA-11 | Pantalla de resultados | S01 | ✅ |
| INFRA-12 | Sistema de dificultad transversal | S02 | 🔲 |
| INFRA-13 | Repo GitHub + ramas main/develop | S01 | ✅ |

---

## PYRAMID — Pirámide numérica

| ID | Tarea | Sprint | Estado |
|----|-------|--------|--------|
| PYR-01 | `PyramidPuzzle` types.ts | S01 | ✅ |
| PYR-02 | `PyramidGenerator` | S01 | ✅ |
| PYR-03 | Tests del generador | S01 | ✅ |
| PYR-04 | `PyramidValidator` | S01 | ✅ |
| PYR-05 | `PyramidBoard.tsx` | S01 | ✅ |
| PYR-06 | Conectar en pantalla de juego | S01 | ✅ |
| PYR-07 | Tests de integración | S02 | 🔲 |

---

## LOGIC-GRID — Quién es Quién

| ID | Tarea | Sprint | Estado |
|----|-------|--------|--------|
| LG-01 | `LogicGridPuzzle` types.ts | S02 | 🔲 |
| LG-02 | `LogicGridGenerator` | S02 | 🔲 |
| LG-03 | Tests del generador | S02 | 🔲 |
| LG-04 | `LogicGridValidator` | S02 | 🔲 |
| LG-05 | `LogicGridBoard.tsx` | S02 | 🔲 |
| LG-06 | Renderizado de pistas | S02 | 🔲 |
| LG-07 | Conectar en pantalla de juego | S02 | 🔲 |
| LG-08 | Tests de integración | S02 | 🔲 |

---

## KAKURO — Sumas cruzadas

| ID | Tarea | Sprint | Estado |
|----|-------|--------|--------|
| KAK-01 | `KakuroPuzzle` types.ts | S03 | 🔲 |
| KAK-02 | `KakuroGenerator` | S03 | 🔲 |
| KAK-03 | Tests del generador | S03 | 🔲 |
| KAK-04 | `KakuroValidator` | S03 | 🔲 |
| KAK-05 | `KakuroBoard.tsx` | S03 | 🔲 |
| KAK-06 | Conectar en pantalla de juego | S03 | 🔲 |

---

## NONOGRAM — Picross

| ID | Tarea | Sprint | Estado |
|----|-------|--------|--------|
| NON-01 | `NonogramPuzzle` types.ts | S03 | 🔲 |
| NON-02 | `NonogramGenerator` | S03 | 🔲 |
| NON-03 | Tests del generador | S03 | 🔲 |
| NON-04 | `NonogramValidator` | S03 | 🔲 |
| NON-05 | `NonogramBoard.tsx` | S03 | 🔲 |
| NON-06 | Conectar en pantalla de juego | S03 | 🔲 |

---

## Sprint 04 — Puzzles restantes

| Módulo | IDs | Sprint | Estado |
|--------|-----|--------|--------|
| Lanzarrayos | LAZ-01..06 | S04 | 🔲 |
| Crúzex | CRZ-01..06 | S04 | 🔲 |
| Clasificaciones | CLA-01..06 | S04 | 🔲 |
| Goteo | GOT-01..06 | S04 | 🔲 |

Cada módulo: Types + Generator + Tests + Validator + Board + conexión game screen.

---

## POLISH — Fase final (Sprint 05)

| ID | Tarea | Estado |
|----|-------|--------|
| POL-01 | Tutorial / onboarding por tipo de puzzle | 🔲 |
| POL-02 | Estadísticas globales de jugador | 🔲 |
| POL-03 | Animaciones de resolución (Reanimated) | 🔲 |
| POL-04 | Assets finales (icono, splash) | 🔲 |
| POL-05 | Build EAS + publicación | 🔲 |
| POL-06 | Screenshots para stores | 🔲 |

---

## Ideas para v2 (post-lanzamiento)
- Modo diario (puzzle del día)
- Tablas de clasificación globales (requiere backend)
- Compartir resultado en redes
- Monetización con RevenueCat
- Modo oscuro / temas custom
- Sonidos y haptics avanzados
