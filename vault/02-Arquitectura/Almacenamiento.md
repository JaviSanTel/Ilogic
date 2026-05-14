# Almacenamiento Local — AsyncStorage

## Claves y esquemas

### Progreso por puzzle
```
Clave: "progress:{puzzleId}"
Valor: PlayerProgress
```
```typescript
interface PlayerProgress {
  puzzleId: string;
  currentState: unknown;    // estado actual del grid (específico por tipo)
  startedAt: number;        // timestamp
  elapsedSeconds: number;
  isCompleted: boolean;
  completedAt?: number;
}
```

### Configuración de usuario
```
Clave: "settings:user"
Valor: UserSettings
```
```typescript
interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  hapticEnabled: boolean;
  preferredDifficulty: 'easy' | 'medium' | 'hard';
}
```

### Estadísticas globales
```
Clave: "stats:global"
Valor: GlobalStats
```
```typescript
interface GlobalStats {
  totalCompleted: number;
  byType: Record<string, { completed: number; bestTime: number }>;
  streak: number;
  lastPlayedAt: number;
}
```

## Wrapper de acceso
`/src/storage/StorageService.ts` — nunca usar AsyncStorage directamente en componentes.

## Tags
#arquitectura #storage #asyncstorage
