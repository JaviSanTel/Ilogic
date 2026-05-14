# Stack Técnico

## Decisión principal
[[../06-Decisiones/ADR-001-Stack]] — Expo + TypeScript sobre Flutter/PWA

## Dependencias core

| Paquete | Versión | Uso |
|---------|---------|-----|
| expo | ^51 | Runtime y toolchain |
| react-native | 0.74 | UI nativa |
| expo-router | ^3 | Navegación file-based |
| @react-native-async-storage/async-storage | ^1.23 | Persistencia local |
| react-native-gesture-handler | ^2 | Gestos táctiles en grids |
| react-native-reanimated | ^3 | Animaciones fluidas |

## Dependencias de desarrollo

| Paquete | Uso |
|---------|-----|
| typescript | Tipado estricto |
| jest | Testing |
| @testing-library/react-native | Tests de componentes |
| eslint + prettier | Calidad de código |

## Configuración TypeScript relevante
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

## Entornos
- **Dev**: `npx expo start`
- **iOS sim**: `npx expo run:ios`
- **Android sim**: `npx expo run:android`
- **Preview build**: EAS Build profile `preview`
- **Production**: EAS Build profile `production`

## Tags
#stack #expo #typescript #setup
