# Contributing to PruebasGH600

¡Gracias por tu interés en contribuir! Este documento describe cómo construir y probar el proyecto localmente.

## Build

El proyecto está escrito en TypeScript y necesita ser compilado a JavaScript antes de ejecutarse en producción.

### Comando canónico

```bash
npm run build
```

Este comando ejecuta `tsc` (el compilador de TypeScript) utilizando la configuración definida en `tsconfig.json`. Los archivos compilados se generarán en el directorio `./dist`.

### Limpiar el directorio de build

Para eliminar los archivos compilados previamente:

```bash
npm run clean
```

### Requisitos

- Node.js 18.x o superior (ver `.nvmrc`)
- npm 8.x o superior

### Verificación

Después de ejecutar `npm run build`, verifica que los archivos se hayan generado correctamente en `./dist`.

## Testing

```bash
npm test
```

Ejecuta el suite de pruebas usando Vitest.

## Development

Para iniciar el servidor en modo desarrollo:

```bash
npm start
```

El servidor escuchará en `http://localhost:3000`.

## Pull Requests

1. Crea una rama desde `main`: `git checkout -b feature/nombre-de-la-funcionalidad`
2. Realiza tus cambios y commits
3. Ejecuta `npm run build` y `npm test` para verificar que todo funciona
4. Push a GitHub: `git push origin feature/nombre-de-la-funcionalidad`
5. Crea una Pull Request
6. Espera a que se apruebe y pasen los tests
7. Merge a `main`
8. Elimina la rama feature

¡Gracias por contribuir! 💪