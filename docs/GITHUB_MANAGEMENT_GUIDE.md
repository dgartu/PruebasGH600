# 📚 Guía Completa de Gestión de GitHub para Principiantes

> **¿Eres nuevo en GitHub y quieres organizar tu repositorio como un profesional?**
> Esta guía te explica paso a paso todas las herramientas GRATIS que hemos configurado en tu repositorio.

---

## 📖 Índice

1. [¿Qué es GitHub?](#1-qué-es-github)
2. [CODEOWNERS: ¿Quién mantiene el código?](#2-codeowners-quién-mantiene-el-código)
3. [Plantillas de Pull Request](#3-plantillas-de-pull-request)
4. [Solicitud de Revisión Automática (GRATIS)](#4-solicitud-de-revisión-automática-gratis)
5. [Integración Continua (CI) - Opcional](#5-integración-continua-ci---opcional)
6. [Plantillas de Issues](#6-plantillas-de-issues)
7. [Protección de Ramas](#7-protección-de-ramas)
8. [Buenas Prácticas de Ramas](#8-buenas-prácticas-de-ramas)
9. [Glosario de Términos](#9-glosario-de-términos)

---

## 1. ¿Qué es GitHub?

GitHub es una plataforma que alberga proyectos de código usando **Git** (un sistema de control de versiones). Te permite:

- **Guardar tu código** en la nube (respaldo automático)
- **Colaborar** con otros desarrolladores
- **Controlar cambios** (quién modificó qué y cuándo)
- **Automatizar tareas** (tests, revisiones, despliegues)

### Conceptos clave:
- **Repositorio (repo)**: Tu proyecto en GitHub (como este `PruebasGH600`)
- **Rama (branch)**: Una línea de desarrollo independiente
- **Commit**: Un cambio guardado en el historial
- **Pull Request (PR)**: Solicitud de unir cambios de una rama a otra

---

## 2. CODEOWNERS: ¿Quién mantiene el código?

### ¿Qué es?
El archivo `CODEOWNERS` te permite **asignar responsables** a diferentes partes de tu código. Cuando alguien crea una Pull Request que afecta esos archivos, GitHub **sugiere automáticamente** a esos responsables como revisores.

### ¿Cómo funciona?
```
# Sintaxis: <ruta-del-archivo> <usuario-de-github>
* @dgartu                    # Todo el repo → dgartu
index.js @dgartu             # index.js → dgartu
docs/ @dgartu                # Cualquier archivo en docs/ → dgartu
```

### ¿Por qué es útil?
- **Automatiza la asignación de revisores**: No tienes que recordar quién revisa qué
- **Mantiene la calidad**: Las personas adecuadas revisan los cambios
- **Especialización**: Quien conoce mejor una parte del código, la revisa

### Reglas importantes:
1. El primer patrón que coincide gana (el orden importa)
2. Puedes usar `*` como comodín para "cualquier cosa"
3. Puedes usar `@` para mencionar usuarios o equipos (`@equipo-backend`)
4. Los comentarios empiezan con `#`

### Cómo configurarlo:
1. Crea el archivo `.github/CODEOWNERS`
2. GitHub lo detecta automáticamente
3. ¡Listo! Las PRs mostrarán los owners sugeridos

---

## 3. Plantillas de Pull Request

### ¿Qué es una plantilla de PR?
Es un **formulario predefinido** que aparece cuando alguien crea una Pull Request. Ayuda a que todos los PRs tengan la misma estructura y contengan la información necesaria.

### ¿Por qué usarla?
- **Estandariza la comunicación**: Todos los PRs siguen el mismo formato
- **Reduce errores**: El checklist asegura que no se olvide nada
- **Facilita revisiones**: El revisor sabe qué buscar

### Estructura de nuestra plantilla:
1. **Descripción**: Qué cambiaste y por qué
2. **Tipo de cambio**: Bugfix, feature, documentación, etc.
3. **Checklist**: Verificaciones obligatorias
4. **Enlaces**: Relaciona con issues usando `Closes #123`
5. **Screenshots**: Si hay cambios visuales

### Tip: Usa `Closes #123`
Cuando escribas `Closes #123` en tu PR, GitHub **cierra automáticamente** el issue #123 cuando la PR se mezcle. ¡Muy útil para mantener todo organizado!

### Cómo configurarlo:
1. Crea el archivo `.github/PULL_REQUEST_TEMPLATE.md`
2. GitHub lo usa automáticamente en todas las PRs nuevas

---

## 4. Solicitud de Revisión Automática (GRATIS)

### ¿Qué es?
Cuando alguien crea una Pull Request, GitHub puede **asignar automáticamente** a una persona para que revise los cambios. Esto se configura directamente en GitHub **sin necesidad de GitHub Actions**.

### Cómo configurarlo (100% gratis):
1. Ve a tu repositorio en GitHub: `https://github.com/dgartu/PruebasGH600`
2. Haz clic en **Settings** (⚙️)
3. En el menú izquierdo, ve a **Pull requests**
4. GitHub ya sugiere revisores basado en CODEOWNERS automáticamente
5. Para configuración avanzada:
   - Ve a **Settings → Pull requests**
   - Busca **"Automatically add reviewers"** (si está disponible)

### ¿Por qué es útil?
- **No se te olvida revisar**: La PR aparece en tu bandeja automáticamente
- **Ahorra tiempo**: No tienes que buscar quién debe revisar
- **Mantiene el flujo**: Las PRs no se quedan sin revisión

### Alternativa con GitHub Actions (también gratis):
Si quieres una solución más avanzada, puedes usar GitHub Actions con límites gratuitos (2,000 minutos/mes):
```yaml
name: Auto-asignar revisor
on:
  pull_request:
    types: [opened, ready_for_review]
jobs:
  auto-assign:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: kentaro-m/auto-assign-action@v1.2.1
        with:
          configuration-path: ".github/auto_assign.yml"
```

---

## 5. Integración Continua (CI) - Opcional

### ¿Qué es CI?
**Integración Continua** significa que cada vez que haces `push` o creas una PR, se **automáticamente ejecutan tests** para asegurarse de que tu código no rompe nada.

### Opción GRATIS: GitHub Actions
GitHub Actions ofrece **2,000 minutos/mes gratis** para cuentas gratuitas. Para un proyecto pequeño como este, es más que suficiente.

### Opción SIN Actions: Manual
Si prefieres no usar Actions, simplemente:
1. Corre los tests localmente: `npm test`
2. Asegúrate de que pasen antes de hacer push
3. Usa la protección de ramas para exigir reviews manuales

### Nuestro workflow opcional (`ci.yml`):
```yaml
name: CI - Integración Continua

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
```

### ¿Por qué es importante?
- **Detecta errores temprano**: Antes de que lleguen a producción
- **Mantiene la calidad**: El código debe pasar tests antes de mezclarse
- **Automatiza el trabajo**: No tienes que correr tests manualmente

---

## 6. Plantillas de Issues

### ¿Qué es un issue?
Un **issue** es una tarjeta de trabajo en GitHub. Puedes usarlo para:
- Reportar bugs 🐛
- Solicitar funcionalidades ✨
- Hacer preguntas 💬
- Planificar tareas 📋

### Nuestras plantillas:
1. **Bug Report**: Para reportar errores
   - Descripción del problema
   - Pasos para reproducir
   - Información del entorno

2. **Feature Request**: Para nuevas funcionalidades
   - Qué problema resuelve
   - Cómo debería funcionar
   - Alternativas consideradas

### ¿Por qué usar plantillas?
- **Organización**: Cada tipo de issue tiene su formato
- **Información completa**: El creador no olvida detalles importantes
- **Etiquetas automáticas**: Los bugs se etiquetan como `bug` automáticamente

### Cómo configurarlo:
1. Crea los archivos en `.github/ISSUE_TEMPLATE/`
2. GitHub los usa automáticamente cuando alguien crea un issue

---

## 7. Protección de Ramas

### ¿Qué es?
La protección de ramas te permite **bloquear ciertas acciones** en ramas importantes (como `main`). Por ejemplo, puedes exigir que:
- Se requiera al menos un review antes de mezclar
- Los tests pasen (CI)
- No se pueda hacer push directo (todo va por PR)

### Cómo configurarlo (100% gratis):
1. Ve a tu repositorio en GitHub: `https://github.com/dgartu/PruebasGH600`
2. Haz clic en **Settings** (⚙️)
3. En el menú izquierdo, ve a **Branches**
4. Haz clic en **Add rule** (o "Add rule" en Branch protection rules)
5. En **Branch name pattern**, escribe `main`
6. Activa las opciones que quieras:
   - ✅ **Require a pull request before merging**
   - ✅ **Require approvals** (mínimo 1)
   - ✅ **Require status checks to pass** (si usas CI)
   - ✅ **Include administrators** (aplica también para ti)
7. Haz clic en **Create**

### ¿Por qué es importante?
- **Evita errores**: Nadie puede romper `main` accidentalmente
- **Fuerza revisiones**: Todo cambio es revisado por alguien más
- **Mantiene calidad**: El código pasa tests antes de entrar

---

## 8. Buenas Prácticas de Ramas

### Convenciones de nombres:
```
main          # Código en producción (estable)
develop       # Desarrollo activo
feature/nombre-de-la-funcionalidad  # Nuevas funcionalidades
bugfix/nombre-del-bug               # Corrección de errores
hotfix/urgente                    # Corrección urgente en producción
```

### Flujo de trabajo recomendado:
```
1. Crea una rama desde `main`: git checkout -b feature/nueva-funcionalidad
2. Haz tus cambios y commits
3. Push a GitHub: git push origin feature/nueva-funcionalidad
4. Crea una Pull Request
5. Espera a que se apruebe y pasen los tests
6. Merge a `main`
7. Elimina la rama feature
```

---

## 9. Glosario de Términos

| Término | Definición para principiantes |
|---------|------------------------------|
| **Git** | Sistema que guarda el historial de cambios de tu código |
| **GitHub** | Plataforma en la nube donde alojas proyectos Git |
| **Repositorio** | Carpeta del proyecto en GitHub (con todo el código) |
| **Rama (branch)** | Línea de desarrollo independiente del código |
| **Commit** | Un "guardado" con cambios específicos y un mensaje |
| **Push** | Subir tus commits a GitHub |
| **Pull Request (PR)** | Solicitud de unir cambios de una rama a otra |
| **Merge** | Unir los cambios de una rama con otra |
| **Reviewer** | Persona que revisa y aprueba una PR |
| **CI/CD** | Integración y Despliegue Continuo (automatización) |
| **Workflow** | Serie de comandos automatizados en GitHub Actions |
| **Issue** | Tarjeta de trabajo (bug, feature, tarea) |
| **CODEOWNERS** | Archivo que define quién revisa qué archivos |
| **Branch protection** | Reglas que protegen ramas importantes |

---

## 🚀 Próximos pasos

1. **Crea todos estos archivos** en tu repositorio
2. **Configura la protección de rama** en Settings → Branches
3. **Si usas CI**, activa GitHub Actions en la pestaña "Actions" de tu repo
4. **Lee esta guía** para entender todo el proceso

---

## 💰 ¿Todo es gratis?

| Funcionalidad | Plan gratuito | Límite |
|--------------|---------------|--------|
| **CODEOWNERS** | ✅ Sí | Ilimitado |
| **Plantilla de PR** | ✅ Sí | Ilimitado |
| **Plantillas de issues** | ✅ Sí | Ilimitado |
| **Protección de ramas** | ✅ Sí | Ilimitado |
| **Auto-asignación de revisores** | ✅ Sí | Ilimitado |
| **GitHub Actions** | ✅ Sí | 2,000 min/mes |
| **GitHub Pages** | ✅ Sí | Ilimitado |

> **Nota**: GitHub Actions tiene un límite mensual gratuito, pero para proyectos pequeños es más que suficiente. Si prefieres no usarlo, puedes omitir el workflow de CI y documentar cómo correr tests manualmente.

---

## 📞 ¿Necesitas ayuda?

- **GitHub Docs**: https://docs.github.com/es
- **Guía de inicio rápido**: https://docs.github.com/es/get-started/quickstart
- **Comunidad de desarrolladores**: https://github.community/

---

> **Recuerda**: La automatización es tu amiga, pero siempre revisa manualmente antes de hacer merge. ¡La calidad del código es responsabilidad de todos! 💪