# Ilogic — Roadmap

## Visión
App móvil de pasatiempos de lógica. 8 tipos de puzzle clásicos, generados algorítmicamente, con progreso local y UX limpia. Sin backend en v1.

## Fases

### Fase 0 — Infraestructura base (Sprint 01) ✅ COMPLETADO
- Scaffold Expo 54 + TypeScript strict
- Expo Router configurado
- Motor de grid genérico (aplazado a Sprint 02)
- Componentes UI base (PuzzleButton, PuzzleCard, Timer)
- AsyncStorage wrappers (StorageService)
- Primer puzzle completo: `pyramid`
- 13/13 tests pasando · 0 errores TS

### Fase 1 — Puzzle estrella (Sprint 02)
- `logic-grid` (Quién es Quién)
- Pantalla de selector de dificultad

### Fase 2 — Puzzles numéricos (Sprint 03)
- `kakuro` — sumas cruzadas
- `nonogram` — Picross

### Fase 3 — Puzzles restantes (Sprint 04)
- `lanzarrayos`, `cruzex`, `clasificaciones`, `goteo`

### Fase 4 — Polish y publicación (Sprint 05)
- Onboarding/tutorial
- Estadísticas globales
- Animaciones (Reanimated)
- Build EAS + publicación

## Métricas de éxito v1
- [ ] Los 8 puzzles jugables sin bugs bloqueantes
- [ ] Generador produce puzzles válidos al 100% (tests)
- [ ] Tiempo de carga < 2s en dispositivo mid-range
- [ ] Tamaño bundle < 20 MB

## Dependencias externas
| Librería | Motivo |
|----------|--------|
| `expo-router` | Navegación file-based |
| `@react-native-async-storage/async-storage` | Persistencia |
| `expo-haptics` | Feedback táctil |
| `react-native-reanimated` | Animaciones |

## Links
- [[00-Proyecto/Stack]]
- [[05-Progreso/Backlog]]
- [[05-Progreso/Sprint-01]]
- [[02-Arquitectura/Motor]]
