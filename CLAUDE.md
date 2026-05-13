# Logic Puzzles App — Contexto para Claude Code

> App móvil de pasatiempos de lógica. Expo + TypeScript + React Native.

## Stack
- Expo SDK 51 · React Native · TypeScript strict
- Expo Router (navegación file-based)
- AsyncStorage (persistencia local)
- Jest + RNTL (tests)

## Puzzles soportados
`logic-grid` · `kakuro` · `nonogram` · `pyramid` · `lanzarrayos` · `cruzex` · `clasificaciones` · `goteo`

## Estructura
```
/src/engine/          ← Motor de grid genérico
/src/puzzles/{type}/  ← types.ts · validator.ts · {Type}Board.tsx
/src/generators/      ← {Type}Generator.ts
/src/components/      ← UI compartida
/src/storage/         ← AsyncStorage wrappers
/src/screens/         ← Expo Router screens
/assets/              ← NO MODIFICAR
```

## Convenciones
- Componentes: PascalCase
- Hooks: `use` + camelCase
- Generadores: sufijo `Generator`
- Named exports siempre (sin default en lógica)
- Estilos: `StyleSheet.create()` inline

## Archivos protegidos
`app.json` · `eas.json` · `babel.config.js` · `*.generated.ts`

## Documentación detallada
Ver bóveda Obsidian en `/docs/obsidian-vault/` para:
- Estructuras de datos completas por puzzle
- Algoritmos de generación
- Decisiones de arquitectura (ADRs)
- Estado del sprint actual
