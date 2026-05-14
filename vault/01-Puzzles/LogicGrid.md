# Quién es Quién (Logic Grid)

## Descripción
Correlacionar atributos de personas/objetos usando pistas de lógica.
Grid de doble entrada con X (descartado) y O (correcto).

## Mecánica
- Tap en celda: cicla entre vacío → X → O → vacío
- Al marcar O en una celda: auto-rellenar X en fila y columna
- Validación: al completar todas las celdas

## Estructura de datos
Ver [[../03-Datos/LogicGridPuzzle]]

## Generador
Ver [[../04-Generadores/LogicGridGenerator]]

## UI
- Grid de múltiple entrada (N categorías × N ítems)
- Sección por par de categorías
- Panel de pistas scrollable a la derecha
- Botón "Comprobar" al finalizar

## Niveles de dificultad
| Dificultad | Categorías | Ítems por cat. | Pistas |
|------------|-----------|----------------|--------|
| Fácil | 2 | 3 | 4 |
| Medio | 3 | 3 | 5-6 |
| Difícil | 4 | 4 | 7-9 |

## Estado: 🔴 Pendiente
## Tags
#puzzle #logic-grid #deduccion
