# Generadores de Puzzles — Índice

Todos los puzzles se generan algorítmicamente. No hay contenido manual.

## Estado de generadores

| Generador | Algoritmo | Estado |
|-----------|-----------|--------|
| [[PyramidGenerator]] | Bottom-up + ocultación aleatoria | 🔴 Pendiente |
| [[LogicGridGenerator]] | Backtracking + generación de pistas | 🔴 Pendiente |
| [[KakuroGenerator]] | Constraint satisfaction (CSP) | 🔴 Pendiente |
| [[NonogramGenerator]] | Imagen → clues + verificación unicidad | 🔴 Pendiente |
| [[LanzarayosGenerator]] | Placement + ray propagation | 🔴 Pendiente |
| [[CruzexGenerator]] | Crossword placement algorithm | 🔴 Pendiente |
| [[ClasificacionesGenerator]] | Random results → tabla coherente | 🔴 Pendiente |
| [[GoteoGenerator]] | Frase → shuffled columns | 🔴 Pendiente |

## Interfaz común de generador

```typescript
interface PuzzleGenerator<T extends PuzzleBase> {
  generate(difficulty: Difficulty, seed?: number): T;
  validate(puzzle: T): boolean;  // verifica que tiene solución única
}
```

## Principio de diseño
- Todo generador debe aceptar `seed` para reproducibilidad en tests
- Todo puzzle generado debe tener **solución única**
- La dificultad se controla por parámetros, no por post-filtrado

## Tags
#generadores #algoritmos
