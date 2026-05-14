# Navegación — Expo Router

## Estructura de screens

```
/src/screens/
  (tabs)/
    index.tsx          ← Home — catálogo de puzzles
    profile.tsx        ← Perfil y estadísticas
    settings.tsx       ← Configuración
  game/
    [puzzleId].tsx     ← Pantalla de juego (dinámica)
  puzzle-select/
    [type].tsx         ← Selección de puzzle por tipo
```

## Flujo de navegación principal
```
Home → PuzzleSelect[type] → Game[puzzleId]
```

## Parámetros de ruta

### `/game/[puzzleId]`
```typescript
// Acceso desde el componente:
const { puzzleId } = useLocalSearchParams<{ puzzleId: string }>();
// puzzleId format: "{type}:{uuid}" — ej: "pyramid:a1b2c3"
```

## Estado de juego
El estado de la partida activa se gestiona en `useGameSession.ts` (no en la URL).
Al salir y volver, se recupera de [[Almacenamiento]].

## Tags
#arquitectura #navegacion #expo-router
