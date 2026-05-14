# Sprint 04 — Lanzarrayos + Cruzex + Clasificaciones + Goteo

> **Objetivo**: Completar los 8 tipos de puzzle.
> **Duración**: 2 semanas
> **Rama git**: `feat/sprint-04-remaining-puzzles`
> **Prerequisito**: Sprint 03 mergeado en `develop`

---

## Tickets

### Lanzarrayos

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| LAZ-01 | `LanzarayosPuzzle` types.ts | 🔲 | Ver [[Puzzles/lanzarrayos]] |
| LAZ-02 | `LanzarayosGenerator` | 🔲 | Coloca cápsulas, lanza rayos, verifica cobertura |
| LAZ-03 | Tests generador | 🔲 | |
| LAZ-04 | `LanzarayosValidator` | 🔲 | Verifica que cada cápsula está cubierta |
| LAZ-05 | `LanzarayosBoard.tsx` | 🔲 | Grid con cápsulas y rayos dibujados |
| LAZ-06 | Conectar en game screen | 🔲 | |

### Cruzex

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| CRZ-01 | `CruzexPuzzle` types.ts | 🔲 | Ver [[Puzzles/cruzex]] |
| CRZ-02 | `CruzexGenerator` | 🔲 | Coloca números en grid con celdas negras |
| CRZ-03 | Tests generador | 🔲 | |
| CRZ-04 | `CruzexValidator` | 🔲 | |
| CRZ-05 | `CruzexBoard.tsx` | 🔲 | |
| CRZ-06 | Conectar en game screen | 🔲 | |

### Clasificaciones

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| CLA-01 | `ClasificacionesPuzzle` types.ts | 🔲 | Ver [[Puzzles/clasificaciones]] |
| CLA-02 | `ClasificacionesGenerator` | 🔲 | Genera resultados coherentes con tabla |
| CLA-03 | Tests generador | 🔲 | Verificar coherencia G+E+P y F-C |
| CLA-04 | `ClasificacionesValidator` | 🔲 | |
| CLA-05 | `ClasificacionesBoard.tsx` | 🔲 | Tabla de clasificación + grid de resultados |
| CLA-06 | Conectar en game screen | 🔲 | |

### Goteo

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| GOT-01 | `GoteoPuzzle` types.ts | 🔲 | Ver [[Puzzles/goteo]] |
| GOT-02 | `GoteoGenerator` | 🔲 | Toma frase → distribuye letras en columnas |
| GOT-03 | Tests generador | 🔲 | |
| GOT-04 | `GoteoValidator` | 🔲 | Reconstruye frase desde selecciones |
| GOT-05 | `GoteoBoard.tsx` | 🔲 | Columnas de letras, una seleccionable por turno |
| GOT-06 | Conectar en game screen | 🔲 | |

---

## Criterios de aceptación del sprint

- [ ] Los 8 tipos de puzzle accesibles y jugables
- [ ] Todos los tests pasando
- [ ] Sin regresiones en puzzles anteriores
- [ ] App lista para fase de polish (Sprint 05)
