// Datos del sitio que no dependen del idioma. El texto traducible vive en src/i18n.
export const site = {
  owner: 'Cristopher Gordon',
  cvHref: '/CV_Cristopher_Gordon.pdf',
  email: 'cristo.g@outlook.es',
  linkedin: {
    label: 'LinkedIn',
    handle: 'cristopher-gordon',
    display: 'linkedin.com/in/cristopher-gordon',
    href: 'https://www.linkedin.com/in/cristopher-gordon/',
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/cristoge',
  },
  mapEmbedSrc: 'https://www.google.com/maps?q=Esplugues+de+Llobregat&z=13&output=embed',
  builtWithHref: 'https://astro.build',
} as const;
