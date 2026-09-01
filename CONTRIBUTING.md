# Guía de Contribución

¡Gracias por tu interés en contribuir a PruebasGH600! Esta guía te ayudará a entender cómo construir y contribuir al proyecto.

## Requisitos

- Node.js 18.x o superior (ver `.nvmrc` para la versión específica)
- npm 8.x o superior

## Instalación

```bash
npm install
```

## Build

El comando de build canónico es:

```bash
npm run build
```

Este comando compila los archivos TypeScript a JavaScript utilizando el compilador de TypeScript (`tsc`). Los archivos compilados se generarán en la carpeta `dist/`.

### Detalles del Build

- **Entrada**: Archivos TypeScript en `src/`
- **Salida**: Archivos JavaScript en `dist/`
- **Configuración**: `tsconfig.json`

### Verificación del Build

Después de ejecutar `npm run build`, verifica que los archivos se hayan generado correctamente:

```bash
ls dist/
```

Deberías ver archivos como `app.js` y `app.d.ts`.

## Testing

Para ejecutar los tests:

```bash
npm test
```

Para ejecutar los tests una sola vez:

```bash
npm run test:run
```

## Desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`.

## Pull Requests

1. Crea una rama desde `main`:
   ```bash
   git checkout -b feature/nombre-de-la-funcionalidad
   ```
2. Realiza tus cambios
3. Ejecuta los tests y el build:
   ```bash
   npm run build
   npm test
   ```
4. Crea una Pull Request
5. Espera a que se apruebe y pasen los checks

## Buenas Prácticas

- Mantén tu rama actualizada con `main`
- Escribe tests para nuevas funcionalidades
- Asegúrate de que `npm run build` y `npm test` pasen antes de hacer merge
- Sigue los lineamientos de código existentes

## Recursos Adicionales

- [Guía de Gestión de GitHub](docs/GITHUB_MANAGEMENT_GUIDE.md)
- [README del Proyecto](README.md)

---

> **Nota**: Este proyecto usa TypeScript. Asegúrate de que tu editor tenga configurada la integración de TypeScript para una mejor experiencia de desarrollo.