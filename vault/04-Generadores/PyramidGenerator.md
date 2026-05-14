# PyramidGenerator

## Algoritmo

### Paso 1 — Generar solución completa
```
1. Generar fila base aleatoria (enteros pequeños según dificultad)
2. Propagar hacia arriba: cell[r][c] = cell[r-1][c] + cell[r-1][c+1]
3. Resultado: pirámide completamente rellena
```

### Paso 2 — Ocultar celdas
```
1. Marcar todas las celdas como "dadas"
2. Seleccionar aleatoriamente celdas a ocultar (según % dificultad)
3. Para cada celda a ocultar: verificar que la pirámide sigue siendo
   resoluble sin ambigüedad (con backtracking simple)
4. Si la verificación falla: no ocultar esa celda, continuar
```

### Parámetros por dificultad
| Dificultad | Filas | Rango base | % ocultas |
|------------|-------|-----------|-----------|
| easy | 5 | 1-9 | 40% |
| medium | 7 | 1-15 | 55% |
| hard | 9 | 1-20 | 70% |

## Complejidad
- Generación: O(n²) donde n = número de filas
- Verificación de unicidad: O(n²) por backtracking simple

## Casos edge
- Pirámide con un solo camino de deducción (muy fácil) → aumentar ocultas
- Números muy grandes en cima → limitar rango base

## Estado: 🔴 Pendiente
## Tags
#generador #pyramid #algoritmo
