# ADR-002 — Orden de Implementación de Puzzles

## Estado
✅ Aceptado

## Contexto
Con 8 tipos de puzzle distintos, necesitábamos decidir el orden
para maximizar el aprendizaje y minimizar el riesgo técnico.

## Decisión
Orden: Pirámide → LogicGrid → Kakuro → Nonograma → Lanzarrayos → Crúzex → Clasificaciones → Goteo

## Criterios de ordenación
1. **Complejidad de UI** (de menor a mayor)
2. **Complejidad del generador** (de menor a mayor)
3. **Valor como prueba de infraestructura**

## Consecuencias
- La Pirámide valida toda la infraestructura base con UI mínima
- Los puzzles más complejos (Lanzarrayos, Crúzex) se abordan cuando
  el motor y patrones ya están maduros
- Permite lanzar una versión reducida (3-4 puzzles) antes de completar los 8
