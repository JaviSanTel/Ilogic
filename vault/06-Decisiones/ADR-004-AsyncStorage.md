# ADR-002 — AsyncStorage para persistencia local

**Fecha**: 2026-05-11
**Estado**: Aceptado

## Contexto
La app necesita guardar progreso de partidas y settings del usuario. Las opciones son AsyncStorage, MMKV o SQLite.

## Decisión
Usar **@react-native-async-storage/async-storage**.

## Motivos
- Suficiente para el volumen de datos de v1 (< 50 KB total)
- Sin dependencias nativas complejas (compatible con Expo Go en desarrollo)
- API simple y bien documentada
- No necesitamos queries relacionales

## Consecuencias
- Todas las lecturas/escrituras son asíncronas (Promise-based)
- No hay transacciones — si el app cierra a medias, puede quedar estado inconsistente → mitigar guardando al cambiar cada celda, no solo al terminar
- Si en el futuro hay más de 1000 puzzles o stats complejas, migrar a MMKV o SQLite

## Alternativa descartada
**MMKV**: más rápido pero requiere recompilar la app nativa (no funciona con Expo Go). No justificado en v1.
