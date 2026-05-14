# 🎮 Ilogic — Bóveda de Conocimiento

Documentación viva del proyecto. Vinculada al código en `../app/` y versionada en GitHub.

## Mapa de la bóveda

| Carpeta | Contenido |
|---------|-----------|
| [[00-Proyecto/Roadmap]] | Visión y fases del proyecto |
| [[00-Proyecto/Stack]] | Tech stack y decisiones de entorno |
| [[01-Puzzles/_Index]] | Catálogo de los 8 tipos de puzzle |
| [[02-Arquitectura/Motor]] | Motor de grid genérico |
| [[02-Arquitectura/Navegacion]] | Estructura de screens con Expo Router |
| [[02-Arquitectura/Almacenamiento]] | AsyncStorage — claves y esquemas |
| [[03-Datos/_Index]] | Estructuras de datos TypeScript canónicas |
| [[04-Generadores/_Index]] | Algoritmos de generación por puzzle |
| [[05-Progreso/Sprint-01]] | Sprint actual / completados |
| [[05-Progreso/Backlog]] | Tareas pendientes priorizadas |
| [[06-Decisiones/_Index]] | ADRs — Architecture Decision Records |
| 07-Bugs/Activos | Bugs en investigación |
| 07-Bugs/Resueltos | Bugs cerrados (con commit del fix) |

## Estado del proyecto

| | |
|---|---|
| **Fase** | Sprint 01 ✅ completado · Sprint 02 listo para arrancar |
| **Stack** | Expo SDK 54 + TypeScript strict + Expo Router |
| **Repo** | https://github.com/JaviSanTel/Ilogic |
| **Tests** | 13/13 ✅ |
| **TypeScript** | 0 errores ✅ |

## Reglas de la bóveda

1. Cada puzzle tiene su propia nota en `01-Puzzles/`
2. Cuando cambie una estructura de datos → actualizar `03-Datos/`
3. Cada decisión técnica relevante → crear ADR en `06-Decisiones/`
4. Al cerrar un sprint → actualizar el correspondiente `05-Progreso/Sprint-XX.md`
5. Bugs encontrados → ficha en `07-Bugs/Activos/`, al resolver mover a `Resueltos/`

## Acceso desde móvil

Este vault vive dentro del repo. Para sincronizar desde móvil:
1. App **Obsidian** + plugin **Obsidian Git**
2. Configurar: `https://github.com/JaviSanTel/Ilogic` y carpeta `vault/`
3. Pull/push automático
