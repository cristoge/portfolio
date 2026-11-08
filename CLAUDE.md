# CLAUDE.md

## Proyecto

Portfolio personal — Astro estático, sin backend, deploy en Vercel (`site` y `base` en `astro.config.mjs`).

## Comandos

- `npm run dev` — desarrollo local
- `npm run build` — build de producción (`dist/`)
- `npm run preview` — previsualizar el build

## i18n

- 3 idiomas: `ca` (por defecto, sin prefijo en la URL), `es`, `en`.
- Todo el texto vive en `src/i18n/{ca,es,en}.ts` — nunca hardcodear texto en componentes o páginas.
- Los 3 diccionarios cumplen el tipo `Dictionary` de `src/i18n/types.ts` (`satisfies Dictionary`): si a uno le falta o le sobra un campo, `tsc` lo marca. Al añadir un campo, añadirlo primero al tipo y luego a los 3 idiomas, en el mismo orden.
- Helpers en `src/i18n/utils.ts`: `getDictionary`, `localePath` (páginas fijas), `localizedPath` (ruta arbitraria), `unlocalizedPath` (quita el prefijo de idioma), `projectDetailPath` y `getLangStaticPaths` (rutas de `src/pages/[...lang]`).

## Datos

- `src/data/site.ts` — datos que no dependen del idioma: nombre, CV, email, LinkedIn, GitHub, mapa.
- `src/data/projects.ts` — por proyecto, lo que no se traduce (`slug`, `stack`, `repoHref`, `demoHref`, `image`); el orden de la lista es el orden en la web. El texto está en `projects.items` de cada idioma, indexado por `slug` (`Record<ProjectSlug, ProjectText>`, así que un proyecto sin traducir no compila). `getProjects(lang)` los combina.

## Estructura

- `src/pages/[...lang]/` — una sola página por ruta para los 3 idiomas (`index`, `personal`, `contact`, `projects/[slug]`); `getLangStaticPaths` genera `ca` sin prefijo y `es`/`en` con prefijo. Las páginas solo componen secciones.
- `src/layouts/BaseLayout.astro` — head (script de tema y del hero antes de pintar), Nav, Footer y el observer de `.reveal`. Props: `lang`, `title`, `description?`, `activePage?` (resalta el menú), `lockHero?` (portada). La ruta para el selector de idioma se deduce de la URL.
- `src/components/` por zonas:
  - `ui/` — piezas genéricas: `ButtonLink` (`.btn` como enlace), `ArrowLink` (`.arrow-link`), `PillList`, `SectionHeading`, `Icon`.
  - `layout/` — `Nav`, `LanguageSwitcher`, `ThemeToggle`, `Footer`.
  - `home/` — `Hero` (incluye el bloqueo del hero y el botón "Veure-ho tot"), `HomeReveal`, `ProjectsSection`, `ProjectCard`, `EducationSection`, `EducationItem`, `StackSection`.
  - `personal/` — `PersonalIntro`, `PersonalEntry`.
  - `contact/` — `ContactChannels` (email con botón de copiar y LinkedIn), `ContactForm` (envío a Web3Forms con `PUBLIC_WEB3FORMS_KEY` de `.env`), `MapEmbed`.
- `src/lib/` — utilidades sin UI: `links` (`externalLink`: atributos para abrir en pestaña nueva), `linkify`, `format`, `storage` (claves de localStorage/sessionStorage).
- Cada componente lleva sus estilos (scoped) y su script; los scripts se buscan por atributos `data-*`, no por clases de estilo.
- `src/styles/global.css` — design tokens. Estilo "case library": fondo blanco roto `--page`, tinta casi negra `--ink` y un único acento azul cobalto eléctrico `--accent`; titulares en minúsculas semibold y compactos (IBM Plex Sans 600) y etiquetas en monoespaciada y mayúsculas (IBM Plex Mono, `--font-mono`, clases `.eyebrow`/`.mono`); rejillas de esquinas rectas (`--radius: 0`) con bordes compartidos y líneas finas (`--line`, `--line-strong`); botones rectos en mono (`.btn`), enlaces de acción en azul con flecha (`.arrow-link`, `.arrow`), etiquetas `.pill` rectas (el subrayado ondulado del nombre vive en `Hero`). Escala tipográfica cerrada en `--fs-*`. Tema claro u oscuro según la preferencia del sistema; el oscuro se activa con `:root[data-theme='dark']` (botón en `Nav`, guardado en `localStorage`). Utilidades: `.page` (cuerpo de las páginas interiores), `.section` (sección de la portada), `.eyebrow` (etiqueta mono), `.lead`, `.note`, `.section-head`, `.btn`, `.arrow-link`, `.arrow`, `.pill`, `.visually-hidden`, `.reveal` (aparece al hacer scroll).

## Convenciones

- No añadir dependencias nuevas sin justificación clara — el sitio es 100% estático.
- Respetar los tokens de `global.css` (colores, `--radius`, `--radius-sm`, `--ease-*`, `--content-width`) en vez de valores sueltos.
- Para añadir un proyecto: entrada en `src/data/projects.ts` y su texto en `projects.items` de los 3 idiomas con el mismo `slug`.
- Enlaces externos con `{...externalLink}` (o `external` en `ButtonLink`/`ArrowLink`), no `target`/`rel` a mano.
- Comprobar tipos: `npx tsc --noEmit` (archivos `.ts`); para los `.astro`, `astro check` (requiere `@astrojs/check`, no instalado).