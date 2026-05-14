# Ilogic

> App móvil de pasatiempos de lógica. Expo + TypeScript + React Native.

## Puzzles soportados
🔺 Pirámide · 🧩 Quién es Quién · ➕ Kakuro · 🖼️ Nonograma
⚡ Lanzarrayos · 🔢 Crúzex · ⚽ Clasificaciones · 💧 Goteo

## Estructura

```
ilogic/
├── CLAUDE.md         ← contexto del proyecto para Claude Code
├── .mcp.json         ← config MCP (Obsidian vault)
├── .claude/skills/   ← skills compartidas
└── app/              ← código Expo
    ├── app/          ← screens (Expo Router)
    ├── src/
    │   ├── types/
    │   ├── engine/
    │   ├── puzzles/{type}/
    │   ├── generators/
    │   ├── components/
    │   ├── storage/
    │   └── hooks/
    └── assets/
```

## Stack
- Expo SDK 54 · React Native 0.81 · TypeScript strict
- Expo Router (navegación file-based)
- AsyncStorage (persistencia local)
- Jest + RNTL

## Empezar

```bash
cd app
npm install
npm start
```

## Tests

```bash
cd app
npm test           # 13/13 tests ✅
npm run typecheck  # 0 errors ✅
```

## Documentación
Docs detalladas en el vault Obsidian del proyecto (`P:\Obsidian\Proyectos\Ilogic\`).
