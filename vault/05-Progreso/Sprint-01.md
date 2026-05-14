# Sprint 01 — Infraestructura base + Pyramid

> **Objetivo**: App corriendo en simulador con el primer puzzle jugable end-to-end.
> **Duración**: 1 semana
> **Rama git**: `feat/sprint-01-infra`

---

## Tickets

### Infraestructura

| ID       | Tarea                         | Estado | Notas                                                               |
| -------- | ----------------------------- | ------ | ------------------------------------------------------------------- |
| INFRA-01 | Scaffold Expo 51 + TypeScript | ✅     | Expo 54 (última stable). `P:\Aetheria\Ilogic\app\`                 |
| INFRA-02 | Configurar Expo Router        | ✅     | `expo-router/entry` en main. Screens: index, game/[id], results/[id] |
| INFRA-03 | ESLint + Prettier             | ✅     | `eslint.config.js` con `@typescript-eslint/recommended`             |
| INFRA-04 | Jest + RNTL                   | ✅     | `jest-expo` preset + `@types/jest`. 13/13 tests ✅                  |
| INFRA-05 | `GridEngine` genérico         | 🔲     | Pendiente (Pyramid no lo necesita — tiene su propio board)          |
| INFRA-06 | Componentes base UI           | ✅     | `PuzzleButton`, `PuzzleCard`, `Timer`                               |
| INFRA-07 | `StorageService`              | ✅     | AsyncStorage wrappers completos                                     |
| INFRA-08 | Tipos globales                | ✅     | `src/types/` — puzzle.ts, engine.ts, storage.ts, index.ts           |
| INFRA-09 | Pantalla Home                 | ✅     | `app/index.tsx` — lista los 8 puzzles con PuzzleCard                |
| INFRA-10 | Pantalla `/game/[puzzleId]`   | ✅     | `app/game/[puzzleId].tsx` — renderiza board por tipo                |
| INFRA-11 | Victory screen                | ✅     | `app/results/[puzzleId].tsx`                                        |
| INFRA-13 | Repo GitHub + ramas           | ✅     | https://github.com/JaviSanTel/Ilogic — main + develop                |

### Pyramid

| ID     | Tarea                       | Estado | Notas                                                          |
| ------ | --------------------------- | ------ | -------------------------------------------------------------- |
| PYR-01 | `PyramidPuzzle` types.ts    | ✅     | `src/puzzles/pyramid/types.ts`                                 |
| PYR-02 | `PyramidGenerator`          | ✅     | `src/generators/PyramidGenerator.ts` — Fisher-Yates shuffle    |
| PYR-03 | Tests generador             | ✅     | 13 tests pasando — 3 dificultades × 10 puzzles válidos         |
| PYR-04 | `PyramidValidator`          | ✅     | `src/puzzles/pyramid/validator.ts`                             |
| PYR-05 | `PyramidBoard.tsx`          | ✅     | UI triangular, input numérico, highlight errores/solved        |
| PYR-06 | Conectar en game screen     | ✅     | `app/game/[puzzleId].tsx` — switch por tipo                    |
| PYR-07 | Tests integración           | 🔲     | Pendiente Sprint 02                                            |

---

## Criterios de aceptación del sprint

- [x] `tsc --noEmit` pasa sin errores
- [x] `jest` pasa — 13/13 tests
- [ ] App arranca en simulador iOS/Android ← pendiente probar en dispositivo
- [x] Pyramid jugable en 3 dificultades (generador + validador + UI)
- [x] StorageService implementado (persistencia al completar puzzle)
- [x] Repo GitHub creado con ramas main/develop

---

## Stack real del proyecto

> ⚠️ Se actualizó Expo 51 → **Expo 54** (última LTS estable al arrancar)

| Paquete | Versión |
|---------|---------|
| expo | ~54.0.33 |
| expo-router | ~6.0.23 |
| react-native | 0.81.5 |
| typescript | ~5.9.2 |
| jest | ^29 + jest-expo ~54 |

---

## Decisiones tomadas

- [[ADRs/ADR-001-expo-router]]
- [[ADRs/ADR-002-asyncstorage]]
- [[ADRs/ADR-003-grid-engine]] — GridEngine aplazado al Sprint 02 (Pyramid usa layout propio triangular)

---

## Notas

- `INFRA-05` (GridEngine) aplazado a Sprint 02 — Pyramid tiene layout triangular que no encaja en un grid rectangular genérico. Se implementará cuando se necesite para Kakuro/Nonogram.
- Pendiente token de GitHub para crear repo y empujar código.
