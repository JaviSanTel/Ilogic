# Motor de Grid Genérico

## Ubicación
`/src/engine/`

## Responsabilidad
Renderizar y gestionar cualquier tipo de grid de forma genérica.
Cada puzzle lo especializa mediante configuración y callbacks.

## API pública

```typescript
// GridConfig — configuración del grid
interface GridConfig {
  rows: number;
  cols: number;
  cellSize: number;               // px, cuadrado
  renderCell: (row: number, col: number) => CellConfig;
  onCellPress?: (row: number, col: number) => void;
  onCellLongPress?: (row: number, col: number) => void;
}

interface CellConfig {
  content?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  disabled?: boolean;
}

// ValidationResult
interface ValidationResult {
  isCorrect: boolean;
  errors: Array<{ row: number; col: number; reason: string }>;
}
```

## Componentes del motor

| Archivo | Rol |
|---------|-----|
| `GridEngine.tsx` | Componente principal de renderizado |
| `useGridState.ts` | Hook de estado del grid |
| `GridValidator.ts` | Validación genérica |
| `GridAnimations.ts` | Animaciones con Reanimated |

## Principios de diseño
- El motor **no conoce** las reglas de ningún puzzle
- Cada puzzle le pasa su lógica mediante callbacks
- El motor solo gestiona: renderizado, gestos, animaciones

## Relaciones
- Usado por: todos los `{Type}Board.tsx`
- Depende de: `react-native-gesture-handler`, `react-native-reanimated`

## Tags
#arquitectura #motor #grid
