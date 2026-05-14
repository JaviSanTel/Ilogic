# Sprint 02 — Logic Grid + UX base

> **Objetivo**: Puzzle más representativo del género jugable. Home y flujo completo de partida.
> **Duración**: 1 semana
> **Rama git**: `feat/sprint-02-logic-grid`
> **Prerequisito**: Sprint 01 mergeado en `develop`

---

## Tickets

### UX base (pendiente de Sprint 01)

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| INFRA-11 | Pantalla de resultados / victory screen | 🔲 | Tiempo, puzzle resuelto, botón "nuevo puzzle" |
| INFRA-12 | Sistema de dificultad transversal | 🔲 | Selector en Home antes de iniciar partida |

### Logic Grid

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| LG-01 | `LogicGridPuzzle` types.ts | 🔲 | Ver [[Puzzles/logic-grid]] |
| LG-02 | `LogicGridGenerator` | 🔲 | Genera solución → deriva pistas → oculta |
| LG-03 | Tests generador | 🔲 | Pistas suficientes para solución única |
| LG-04 | `LogicGridValidator` | 🔲 | Comprueba tabla de cruces contra solución |
| LG-05 | `LogicGridBoard.tsx` | 🔲 | Tabla de cruces con celdas ternarias (✓/✗/?) |
| LG-06 | Renderizado de pistas | 🔲 | Lista de clues con highlight al seleccionar |
| LG-07 | Conectar en game screen | 🔲 | |
| LG-08 | Tests de integración | 🔲 | |

---

## Criterios de aceptación del sprint

- [ ] Los dos tipos de puzzle (pyramid + logic-grid) accesibles desde Home
- [ ] Selector de dificultad funcional
- [ ] Victory screen al completar puzzle
- [ ] `npm test` y `npx tsc --noEmit` sin errores

---

## Notas

_(vacío al inicio del sprint)_
