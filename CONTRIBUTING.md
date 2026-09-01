# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a **PruebasGH600**! Esta guía te ayudará a entender cómo desarrollar y construir el proyecto.

---

## 🛠️ Requisitos

| Herramienta  | Versión mínima |
|--------------|----------------|
| Node.js      | 18.x o superior |
| npm          | 8.x o superior  |

> **Recomendación**: Usa la versión especificada en [`.nvmrc`](.nvmrc) para garantizar compatibilidad.

---

## 📦 Build

El comando canónico para compilar el proyecto es:

```bash
npm run build
```

Este comando ejecuta `tsc` (TypeScript Compiler) y compila todos los archivos `.ts` definidos en [`tsconfig.json`](tsconfig.json) al directorio `dist/`.

### ¿Qué hace el build?

- Lee los archivos TypeScript desde `src/`.
- Aplica las reglas de compilación definidas en `tsconfig.json`.
- Genera archivos JavaScript equivalentes en `dist/`.

### Verificación

Después de correr `npm run build`, deberías ver una carpeta `dist/` con los archivos compilados. Puedes verificar que el build fue exitoso revisando que no haya errores en la salida del comando.

---

## 🧪 Pruebas

Corre las pruebas con:

```bash
npm test
```

O para ejecutarlas una sola vez (útil en CI):

```bash
npm run test:run
```

---

## 🚀 Desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`.

---

## 📡 API Endpoints

| Método | Ruta        | Descripción                              |
|--------|-------------|------------------------------------------|
| `GET`  | `/`         | Mensaje de bienvenida                    |
| `GET`  | `/health`   | Estado del servicio (JSON)               |

---

## 📄 Licencia

ISC — Hecho con ❤️ en 2026