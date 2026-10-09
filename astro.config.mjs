import { defineConfig } from 'astro/config';

// Desplegado en Vercel (sirve desde la raíz -> base: '/').
export default defineConfig({
  site: 'https://cristoge-portfolio.vercel.app',
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
