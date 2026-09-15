# Portfolio

Portfolio personal construido con [Astro](https://astro.build), i18n nativo (ca/es/en) y desplegado en GitHub Pages.

## Desarrollo

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deploy

El workflow `.github/workflows/deploy.yml` construye y despliega a GitHub Pages en cada push a `main`.
En el repositorio de GitHub: **Settings → Pages → Source → GitHub Actions**.

## Pendiente de definir / editar

- [ ] `astro.config.mjs`: cambiar `TU-USUARIO` por tu usuario real de GitHub (y `base` si usas un repo de proyecto en vez de `usuario.github.io`).
- [ ] `src/i18n/{ca,es,en}.ts` → `hero.tagline`: tagline real separada por "|".
- [ ] `src/i18n/{ca,es,en}.ts` → `education.items`: nombre del centro (`[Centro educativo]`), años exactos (`[año]`) y especialidad del Ciclo Superior (`[especialidad]`) en las tres entradas.
- [ ] `src/i18n/{ca,es,en}.ts` → `projects.items`: contenido real de cada proyecto académico (título, descripción, `context`, `depthTopics`, stack, `outcome`, enlaces a repo/demo). Ahora mismo son 3 proyectos de ejemplo con lorem ipsum, ya con la plantilla de página de detalle lista en `/projects/:slug`.
- [ ] Enlaces de contacto reales (`contact.links`: email, LinkedIn, GitHub) en los tres idiomas.
- [ ] Subir el CV a `public/cv.pdf` (el botón "Ver CV" ya apunta ahí).
- [ ] Página **Personal**: sustituir el placeholder por fotos/contenido de hobbies cuando esté listo.
- [ ] Imágenes reales de los proyectos (ahora hay un marcador `IMG` en la tarjeta y en la página de detalle).
- [ ] Confirmar dominio final (¿dominio propio o `usuario.github.io`?).

## Estructura

- `src/i18n/` — diccionarios de contenido por idioma.
- `src/views/` — cuerpo de cada página (Home/Personal/Contact/ProjectDetail), compartido entre idiomas.
- `src/pages/` — rutas: catalán en la raíz (idioma por defecto), `es/` y `en/` con prefijo. `projects/[slug].astro` genera una página por proyecto a partir de `projects.items` en cada idioma.
- `src/components/` — Nav, selector de idioma, tarjetas de proyecto/educación.
- `src/styles/global.css` — tokens de diseño (paleta "papel envejecido", tipografías).
