# ADR-003 — Motor de grid genérico compartido

**Fecha**: 2026-05-11
**Estado**: Aceptado

## Contexto
Varios puzzles (kakuro, nonogram, cruzex, lanzarrayos) usan un grid de celdas. Podríamos implementar cada uno de forma totalmente independiente o compartir un motor base.

## Decisión
Implementar un **GridEngine genérico** en `src/engine/` que los puzzles extienden o configuran mediante props.

## Motivos
- Evita duplicación de lógica de renderizado (scroll, highlight, touch handling)
- Los puzzles solo necesitan definir `CellConfig[][]` y `onCellPress`
- Tests del motor centralizados

## Límites del motor
El motor se ocupa de:
- Renderizar grid con scroll
- Gestionar highlight de celda activa
- Llamar `onCellPress(row, col)` al tocar
- Mostrar errores (highlight rojo) desde `ValidationResult.errors`

El motor NO se ocupa de:
- Lógica específica de cada puzzle
- Renderizado de UI fuera del grid (pistas laterales, listas de números, etc.)
- Generación ni validación

## Consecuencias
- Si un puzzle necesita UI muy específica dentro de la celda, puede renderizar `children` dentro de la celda
- El motor asume grid rectangular — puzzles con formas irregulares (pyramid) no usan el motor y tienen su propio componente
