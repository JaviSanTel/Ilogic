# ADR-001 — Expo Router para navegación

**Fecha**: 2026-05-11
**Estado**: Aceptado

## Contexto
Necesitamos un sistema de navegación para la app. Las opciones principales son Expo Router (file-based) o React Navigation (imperativo).

## Decisión
Usar **Expo Router v3**.

## Motivos
- Navegación file-based → estructura de carpetas = estructura de rutas (menos boilerplate)
- Deep linking gratuito y automático
- Integración nativa con Expo SDK 51
- Mejor soporte para web si en el futuro queremos versión web

## Consecuencias
- La carpeta `app/` está controlada por Expo Router (no mover ni renombrar)
- Los screens viven en `app/`, la lógica de negocio en `src/`
- Para modales y overlays: usar `app/(modal)/` con grupos de rutas
