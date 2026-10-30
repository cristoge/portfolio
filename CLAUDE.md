# CLAUDE.md

## Proyecto

Portfolio personal — Astro estático, sin backend, deploy en GitHub Pages.

## Comandos

- `npm run dev` — desarrollo local
- `npm run build` — build de producción (`dist/`)
- `npm run preview` — previsualizar el build

## i18n

- 3 idiomas: `ca` (por defecto, sin prefijo en la URL), `es`, `en`.
- Todo el contenido vive en `src/i18n/{ca,es,en}.ts` — nunca hardcodear texto en componentes o vistas.
- Al añadir o cambiar contenido, actualizar los 3 archivos de idioma a la vez para no romper el paralelismo entre ellos (misma forma de objeto, mismo orden, mismos `slug` de proyecto).
- Helpers de rutas en `src/i18n/utils.ts`: `localePath` (páginas fijas), `localizedPath` (ruta arbitraria), `projectDetailPath` (detalle de proyecto).

## Estructura

- `src/pages/` — rutas: `ca` en la raíz, `es/` y `en/` con prefijo. `projects/[slug].astro` genera una página por proyecto a partir de `projects.items` de cada idioma.
- `src/views/` — cuerpo de cada página (`HomeView`, `PersonalView`, `ContactView`, `ProjectDetailView`), reciben `lang` (y `slug` cuando aplica) como prop.
- `src/components/` — `Nav`, `LanguageSwitcher`, `ProjectCard`, `EducationItem`.
- `src/layouts/BaseLayout.astro` — head, Nav, Footer. Acepta `page` (para resaltar el nav) y `path` opcional (para rutas dinámicas como `/projects/:slug`).
- `src/styles/global.css` — design tokens. Estilo inspirado en orea.uk: fondo blanco `--page`, tinta negra `--ink`, titulares en mayúsculas muy gruesos (Hanken Grotesk 800), tarjetas redondeadas con borde fino (clase `.card`, `--radius`, `--line`), botones en píldora con flecha (`.btn`, `.arrow-link`, `.arrow`) y etiquetas `.pill` sobre `--surface`. Tema claro u oscuro según la preferencia del sistema; el oscuro se activa con `:root[data-theme='dark']` (botón en `Nav`, guardado en `localStorage`). Utilidades: `.eyebrow` (píldora con borde), `.lead`, `.note`, `.section-head`, `.card`, `.btn`, `.arrow-link`, `.arrow`, `.pill`, `.reveal` (aparece al hacer scroll).

## Convenciones

- No añadir dependencias nuevas sin justificación clara — el sitio es 100% estático.
- Respetar los tokens de `global.css` (colores, `--radius`, `--radius-sm`, `--ease-*`, `--content-width`) en vez de valores sueltos.
- Cada proyecto tiene un `slug` usado en `/projects/:slug` — debe coincidir exactamente en los 3 idiomas.
- Los campos marcados con comentarios `// TODO` en los archivos de i18n son placeholders reales (rol, tagline, CV, contacto, educación, proyectos) pendientes de rellenar con contenido definitivo.
