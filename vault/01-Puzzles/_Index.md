# Catálogo de Puzzles

## Los 8 tipos implementados

| ID | Nombre | Nota | Estado | Dificultad gen. |
|----|--------|------|--------|----------------|
| `pyramid` | Pirámide numérica | [[Pyramid]] | 🔴 Pendiente | Baja |
| `logic-grid` | Quién es Quién | [[LogicGrid]] | 🔴 Pendiente | Media |
| `kakuro` | Sumas cruzadas | [[Kakuro]] | 🔴 Pendiente | Alta |
| `nonogram` | Nonograma | [[Nonogram]] | 🔴 Pendiente | Alta |
| `lanzarrayos` | Lanzarrayos | [[Lanzarrayos]] | 🔴 Pendiente | Alta |
| `cruzex` | Crúzex numérico | [[Cruzex]] | 🔴 Pendiente | Media |
| `clasificaciones` | Clasificaciones fútbol | [[Clasificaciones]] | 🔴 Pendiente | Media |
| `goteo` | Frase por goteo | [[Goteo]] | 🔴 Pendiente | Baja |

## Estados posibles
- 🔴 Pendiente — no iniciado
- 🟡 En progreso — en desarrollo activo
- 🟢 Completo — generador + UI + tests
- ⚫ Bloqueado — dependencia no resuelta

## Orden de implementación
Ver [[../06-Decisiones/ADR-002-OrdenImplementacion]]

## Estructura de archivos por puzzle
```
/src/puzzles/{type}/
  types.ts          ← interfaces TypeScript
  validator.ts      ← lógica de validación
  {Type}Board.tsx   ← componente principal de juego
  {Type}Board.test.tsx

/src/generators/
  {Type}Generator.ts
  {Type}Generator.test.ts
```
