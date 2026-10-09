import { defineConfig } from 'astro/config';

// Desplegado en Vercel (sirve desde la raíz -> base: '/').
// TODO: sustituir `site` por la URL final de Vercel o del dominio propio.
export default defineConfig({
  site: 'https://cristoge.github.io',
  base: '/',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
