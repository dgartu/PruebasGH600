# .github/copilot-instructions.md

Este repo usa **vitest** para tests. NUNCA agregues otra librería de tests.

## Convenciones de código
- TypeScript estricto. `tsc --noEmit` debe pasar.
- ESM modules (`type: "module"` en package.json).
- Archivos en `src/` exportan por nombre, nunca `default`.
- Tests en `tests/<area>.spec.ts`, paralelos a la estructura de `src/`.

## Convenciones de PR
- Siempre abrir el PR como **draft**.
- No mergear nunca por tu cuenta, la branch protection lo bloquea, pero
  además este es el contrato editorial: humano siempre revisa.
- Si los tests fallan después de 2 intentos, no sigas iterando, dejá el
  PR como está y comentá qué falló para que el humano decida.

## Cosas que NO podés hacer
- Modificar archivos en `.github/` (workflows, instructions, templates).
- Cambiar dependencias de `package.json` sin que esté en el plan.
- Tocar `tsconfig.json` o configuraciones de build.