# Pirámide Numérica

## Descripción
Completar una pirámide donde cada celda contiene la suma de las dos celdas inferiores.
Se dan algunos valores; el jugador rellena los que faltan.

## Mecánica
- Entrada: teclado numérico al pulsar celda vacía
- Validación: en tiempo real al rellenar cada celda
- Victoria: toda la pirámide correcta

## Estructura de datos
Ver [[../03-Datos/PyramidPuzzle]]

## Generador
Ver [[../04-Generadores/PyramidGenerator]]

## UI
- Grid triangular de celdas
- Celdas dadas: fondo gris, no editables
- Celdas vacías: fondo blanco, borde azul al seleccionar
- Error: borde rojo en celda incorrecta

## Niveles de dificultad
| Dificultad | Filas | Celdas vacías |
|------------|-------|---------------|
| Fácil | 5 | ~40% |
| Medio | 7 | ~55% |
| Difícil | 9 | ~70% |

## Estado: 🔴 Pendiente
## Tags
#puzzle #pyramid #numerico
