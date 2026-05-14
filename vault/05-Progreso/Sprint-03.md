# Sprint 03 — Kakuro + Nonogram

> **Objetivo**: Dos puzzles numéricos/visuales con lógica más compleja.
> **Duración**: 2 semanas
> **Rama git**: `feat/sprint-03-kakuro-nonogram`
> **Prerequisito**: Sprint 02 mergeado en `develop`

---

## Tickets

### Kakuro

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| KAK-01 | `KakuroPuzzle` types.ts | 🔲 | Ver [[Puzzles/kakuro]] |
| KAK-02 | `KakuroGenerator` | 🔲 | Backtracking con constraint propagation |
| KAK-03 | Tests generador | 🔲 | Verificar sumas y unicidad de dígitos por run |
| KAK-04 | `KakuroValidator` | 🔲 | Suma por run + sin repetición |
| KAK-05 | `KakuroBoard.tsx` | 🔲 | Celdas negras con pistas diagonales, input 1-9 |
| KAK-06 | Conectar en game screen | 🔲 | |

### Nonogram

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| NON-01 | `NonogramPuzzle` types.ts | 🔲 | Ver [[Puzzles/nonogram]] |
| NON-02 | `NonogramGenerator` | 🔲 | Genera solución booleana → deriva pistas |
| NON-03 | Tests generador | 🔲 | Pistas derivadas correctas, puzzles no triviales |
| NON-04 | `NonogramValidator` | 🔲 | Compara runs de celdas marcadas con pistas |
| NON-05 | `NonogramBoard.tsx` | 🔲 | Grid con headers de pistas arriba/izquierda |
| NON-06 | Conectar en game screen | 🔲 | |

---

## Notas técnicas

- **Kakuro**: el generador es el más complejo del proyecto (backtracking). Contemplar tiempo de generación y cachear puzzles pre-generados si supera 500ms.
- **Nonogram**: la UI es la más exigente visualmente. Revisar scroll en grids grandes (>10x10).

---

## Criterios de aceptación del sprint

- [ ] 4 tipos de puzzle accesibles y jugables desde Home
- [ ] Generadores Kakuro y Nonogram con 100% de tests pasando
- [ ] Sin regresiones en Pyramid ni Logic Grid
