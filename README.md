# Portfolio

Personal portfolio of **Cristopher Gordon**: projects, education, tech stack and contact. A fully static site built with [Astro](https://astro.build), available in three languages (Catalan, Spanish and English).

**Live site:** <https://cristoge-portfolio.vercel.app>

## Getting started

Requirements: Node.js 20 or later.

```sh
npm install
cp .env.example .env   # optional: only needed for the contact form
npm run dev            # http://localhost:4321
```

| Command           | What it does                     |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the development server     |
| `npm run build`   | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |

### Environment variables

| Variable               | Purpose                                                                       |
| ---------------------- | ----------------------------------------------------------------------------- |
| `PUBLIC_WEB3FORMS_KEY` | [Web3Forms](https://web3forms.com) access key used to send the contact form |

The site works without it; only the contact form submission fails.

## Features

- **Native Astro i18n**: `ca` is the default locale (no URL prefix); `es` and `en` are prefixed. A single page per route generates all three languages.
- **Typed content**: the dictionaries in `src/i18n/` satisfy a shared `Dictionary` type, so a field missing in any language fails to compile.
- **Light and dark themes**: follows the system preference and can be toggled from the navigation bar.
- **No framework JavaScript**: only small per-component scripts (theme, scroll reveal, copy email, contact form).

## Project structure

```text
src/
├── pages/[...lang]/   # routes: index, personal, contact, projects/[slug]
├── layouts/           # BaseLayout: head, nav, footer
├── components/        # grouped by area: ui, layout, home, personal, contact
├── i18n/              # ca/es/en dictionaries, Dictionary type and helpers
├── data/              # language-independent data: site.ts and projects.ts
├── lib/               # non-UI utilities
└── styles/global.css  # design tokens
```

### Adding a project

1. Add an entry to `src/data/projects.ts` (`slug`, `stack`, links, image).
2. Add its text to `projects.items` in `src/i18n/{ca,es,en}.ts` using the same `slug`.
3. Put the image in `public/`.

The order of the list in `projects.ts` is the order shown on the site, and each project gets its own page at `/projects/<slug>`.

## Deployment

Deployed on [Vercel](https://vercel.com) from the `master` branch and served from the root (`base: '/'` in `astro.config.mjs`). If you deploy to a different domain, update `site` in that file.

## Author

Cristopher Gordon — [LinkedIn](https://www.linkedin.com/in/cristopher-gordon/) · [GitHub](https://github.com/cristoge)
