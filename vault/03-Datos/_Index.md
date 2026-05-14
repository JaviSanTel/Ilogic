# Estructuras de Datos — Índice

Todas las interfaces TypeScript canónicas del proyecto.
**Fuente de verdad**: si hay discrepancia entre el código y esta nota, esta nota manda.

## PuzzleBase (raíz de todos)

```typescript
type PuzzleType = 
  | 'logic-grid' | 'kakuro' | 'nonogram' | 'pyramid'
  | 'lanzarrayos' | 'cruzex' | 'clasificaciones' | 'goteo';

interface PuzzleBase {
  id: string;                          // "{type}:{uuid}"
  type: PuzzleType;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  createdAt: number;                   // timestamp unix
}
```

## Por tipo

| Puzzle | Nota con detalle |
|--------|-----------------|
| Pirámide | [[PyramidPuzzle]] |
| Logic Grid | [[LogicGridPuzzle]] |
| Kakuro | [[KakuroPuzzle]] |
| Nonograma | [[NonogramPuzzle]] |
| Lanzarrayos | [[LanzarayosPuzzle]] |
| Crúzex | [[CruzexPuzzle]] |
| Clasificaciones | [[ClasificacionesPuzzle]] |
| Goteo | [[GoteoPuzzle]] |

## Tags
#datos #typescript #interfaces
