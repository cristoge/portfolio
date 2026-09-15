import { defineConfig } from 'astro/config';

// TODO: cambia "TU-USUARIO" por tu usuario de GitHub antes de desplegar.
// Repo de usuario (TU-USUARIO.github.io) -> base: '/'
// Si en vez de eso usas un repo de proyecto (TU-USUARIO.github.io/nombre-repo),
// cambia base a '/nombre-repo/'.
export default defineConfig({
  site: 'https://TU-USUARIO.github.io',
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
