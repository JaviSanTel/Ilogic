# Sprint 04 — Goteo + Clasificaciones + Crúzex + Lanzarrayos

> **Objetivo**: Completar los 8 tipos de puzzle.
> **Rama git**: `feat/sprint-04-remaining-puzzles`
> **Prerequisito**: Sprint 03 mergeado ✅

---

## Tickets

### Goteo

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| GOT-01 | `GoteoPuzzle` types.ts | ✅ | + `GoteoState` (índices por columna) |
| GOT-02 | `GoteoGenerator` | ✅ | Banco de frases en español por dificultad |
| GOT-03 | Tests generador | ✅ | Validación con solución completa |
| GOT-04 | `GoteoValidator` | ✅ | `buildAttempt` reconstruye la frase |
| GOT-05 | `GoteoBoard.tsx` | ✅ | Columnas verticales con tap-toggle |
| GOT-06 | Conectar game screen | ✅ | |

### Clasificaciones

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| CLA-01 | `ClasificacionesPuzzle` types.ts | ✅ | + `ClasificacionesState` |
| CLA-02 | `ClasificacionesGenerator` | ✅ | Round-robin con tabla derivada (Pts = G×3+E) |
| CLA-03 | Tests generador | ✅ | Verifica coherencia Pts y solución |
| CLA-04 | `ClasificacionesValidator` | ✅ | |
| CLA-05 | `ClasificacionesBoard.tsx` | ✅ | Tabla + lista partidos + editor 0-5 |
| CLA-06 | Conectar game screen | ✅ | |

### Crúzex

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| CRZ-01 | `CruzexPuzzle` types.ts | ✅ | |
| CRZ-02 | `CruzexGenerator` | ✅ | 3 layouts con backtracking, runs de ≥2 cells, 1-9 sin repetir |
| CRZ-03 | Tests generador | ✅ | |
| CRZ-04 | `CruzexValidator` | ✅ | |
| CRZ-05 | `CruzexBoard.tsx` | ✅ | Grid + lista de números chip + NumberPad |
| CRZ-06 | Conectar game screen | ✅ | |

### Lanzarrayos

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| LAZ-01 | `LanzarayosPuzzle` types.ts | ✅ | + `LanzarayosState` (rayos por cápsula) |
| LAZ-02 | `LanzarayosGenerator` | ✅ | Posiciones random, rayo sin solapar, totalCells calculado |
| LAZ-03 | Tests generador | ✅ | totalCells = length + 1 |
| LAZ-04 | `LanzarayosValidator` | ✅ | Compara dirección y longitud por cápsula |
| LAZ-05 | `LanzarayosBoard.tsx` | ✅ | Grid + selector direcciones + selector longitud |
| LAZ-06 | Conectar game screen | ✅ | |

---

## Métricas finales del proyecto

| | S01 | S02 | S03 | S04 |
|---|---|---|---|---|
| Tests | 13 | 29 | 67 | **80** |
| Puzzles jugables | 1 | 2 | 4 | **8** |
| Generadores | 1 | 2 | 4 | **8** |

---

## Mejoras de UX añadidas en este sprint (no estaban en plan)

- **NumberPad** propio (sin teclado nativo que se comía la pantalla)
- **GameHeader** reusable con cronómetro y botón salir
- **Cronómetro** persistente en cada puzzle, formato mm:ss
- **Pantalla de resultados** muestra tiempo + mejor récord personal
- **DifficultyPicker** reactivado con fix de Modal/Pressable
- **Logic Grid**: tabla resumen "✏️ Tu respuesta" como fuente de validación
- **Kakuro**: diagonal corregida (45deg \\), sumas en triángulos correctos
- **Stats persistentes** en AsyncStorage (récords por puzzle+dificultad)

---

## Criterios de aceptación del sprint

- [x] Los 8 tipos de puzzle accesibles y jugables
- [x] Todos los tests pasando (80/80)
- [x] Sin regresiones en puzzles anteriores
- [x] TypeScript 0 errores
- [x] App lista para fase de polish/publicación
