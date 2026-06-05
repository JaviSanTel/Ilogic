# Sprint 03 — Kakuro + Nonogram

> **Objetivo**: Dos puzzles numéricos/visuales con lógica más compleja.
> **Duración**: 2 semanas (estimadas)
> **Rama git**: `feat/sprint-03-kakuro-nonogram`
> **Prerequisito**: Sprint 02 mergeado en `develop` ✅

---

## Tickets

### Kakuro

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| KAK-01 | `KakuroPuzzle` types.ts | ✅ | Re-exporta del módulo global |
| KAK-02 | `KakuroGenerator` | ✅ | Backtracking + 5 layouts predefinidos (2 easy, 2 medium, 1 hard) |
| KAK-03 | Tests generador | ✅ | 18 tests pasando (estructura, no repeats, sums, etc.) |
| KAK-04 | `KakuroValidator` | ✅ | Compara directamente con solution (generador garantiza unicidad) |
| KAK-05 | `KakuroBoard.tsx` | ✅ | Grid con diagonal en clue cells, input numérico 1-9, botón Comprobar |
| KAK-06 | Conectar en game screen | ✅ | Switch en `[puzzleId].tsx` |

### Nonogram

| ID | Tarea | Estado | Notas |
|----|-------|--------|-------|
| NON-01 | `NonogramPuzzle` types.ts | ✅ | Re-exporta + `NonogramMark` / `NonogramState` |
| NON-02 | `NonogramGenerator` | ✅ | Random booleano con densidad ~50%, filtra triviales |
| NON-03 | Tests generador | ✅ | 20 tests pasando (clues match solution, non-trivial, etc.) |
| NON-04 | `NonogramValidator` | ✅ | Compara marcas 'fill' vs solution booleano |
| NON-05 | `NonogramBoard.tsx` | ✅ | Grid scroll horizontal, cell size adaptado a dificultad |
| NON-06 | Conectar en game screen | ✅ | Switch en `[puzzleId].tsx` |

---

## Stack añadido en este sprint

- **Kakuro layouts** (`kakuroLayouts.ts`): 5 layouts predefinidos validados, función `sanitizeLayout` que limpia clues sin run
- **Backtracking** con shuffle aleatorio para variedad en cada generación
- **cluesFromLine** helper para derivar pistas de filas/columnas booleanas

---

## Decisiones del sprint

- **Layouts predefinidos en lugar de generación procedural** para Kakuro: generar layouts válidos algorítmicamente requiere un solver más sofisticado. Para v1, 5 layouts dan variedad suficiente.
- **Sin solver de unicidad** para Nonogram en v1: las pistas derivadas siempre son válidas, aunque no garantizan solución única. Si el feedback dice que tiene múltiples soluciones, añadiremos solver en una iteración.
- **Cell size adaptativo** en Nonogram: 36px easy / 26px medium / 20px hard. Con scroll horizontal para pantallas pequeñas.

---

## Métricas

| | Antes (S02) | Ahora (S03) |
|---|---|---|
| Tests | 29 | **67** |
| Puzzles jugables | 2 | **4** |
| Generadores | 2 | 4 |

---

## Criterios de aceptación del sprint

- [x] 4 tipos de puzzle accesibles y jugables desde Home
- [x] Generadores Kakuro y Nonogram con 100% de tests pasando
- [x] Sin regresiones en Pyramid ni Logic Grid
- [x] `npm test` → **67/67 ✅**
- [x] `npx tsc --noEmit` → **0 errores ✅**

---

## Notas / blockers

- En Kakuro, el generador puede fallar en casos extremos del layout más restrictivo. Se reintenta hasta 5 veces. En todos los tests pasó al primer intento.
- Pendiente: detección de pistas excesivas en Nonogram que hagan trivial el puzzle. En v1 lo dejamos como está.
