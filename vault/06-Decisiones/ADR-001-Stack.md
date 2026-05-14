# ADR-001 — Stack Tecnológico

## Estado
✅ Aceptado

## Contexto
Necesitábamos elegir stack para una app móvil de puzzles de lógica
con 8 tipos diferentes, priorizando velocidad de desarrollo sobre
rendimiento nativo máximo.

## Decisión
**Expo + TypeScript + React Native**

## Alternativas descartadas
- **Flutter/Dart**: descartado — requiere aprender Dart desde cero,
  sin ventaja suficiente para justificarlo dado el stack existente en TypeScript.
- **PWA**: descartada — la experiencia táctil en grids es inferior,
  y la distribución por tiendas da visibilidad importante.
- **React Native puro (sin Expo)**: descartado — Expo simplifica enormemente
  el setup de Xcode/Android Studio sin penalización real para este proyecto.

## Consecuencias
- Curva de aprendizaje mínima (TypeScript ya conocido)
- EAS Build para distribución en tiendas
- Posible limitación si se necesita código nativo muy específico (improbable)
