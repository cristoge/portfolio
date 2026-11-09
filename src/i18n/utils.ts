import ca from './ca';
import es from './es';
import en from './en';
import type { Dictionary } from './types';

export const languages = ['ca', 'es', 'en'] as const;

export type Lang = (typeof languages)[number];

export const defaultLang: Lang = 'ca';

export const languageLabels: Record<Lang, string> = {
  ca: 'CAT',
  es: 'ES',
  en: 'EN',
};

// Nombre de cada idioma en su propia lengua (selector de la intro).
export const languageNames: Record<Lang, string> = {
  ca: 'català',
  es: 'español',
  en: 'english',
};

const dictionaries: Record<Lang, Dictionary> = { ca, es, en };

export type Page = 'home' | 'personal' | 'contact';

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

function isLang(value: string): value is Lang {
  return (languages as readonly string[]).includes(value);
}

// Rutas de las páginas de src/pages/[...lang]: el idioma por defecto (ca) va sin
// prefijo, así que su parámetro es `undefined`.
export function getLangStaticPaths() {
  return languages.map((lang) => ({
    params: { lang: lang === defaultLang ? undefined : lang },
    props: { lang },
  }));
}

// Construye la URL de una ruta ('', 'contact', 'projects/mi-proyecto') en un idioma,
// respetando que el idioma por defecto (ca) se sirve sin prefijo en la raíz.
export function localizedPath(lang: Lang, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  if (lang === defaultLang) {
    return `/${clean}`;
  }
  return `/${lang}/${clean}`.replace(/\/$/, '');
}

// Inversa de `localizedPath`: '/es/projects/x/' -> 'projects/x'.
export function unlocalizedPath(pathname: string): string {
  const [first = '', ...rest] = pathname.split('/').filter(Boolean);
  return (isLang(first) ? rest : [first, ...rest]).join('/');
}

export function localePath(lang: Lang, page: Page): string {
  return localizedPath(lang, page === 'home' ? '' : page);
}

export function projectDetailPath(lang: Lang, slug: string): string {
  return localizedPath(lang, `projects/${slug}`);
}
