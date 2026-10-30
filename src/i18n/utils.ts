import ca from './ca';
import es from './es';
import en from './en';

export const dictionaries = { ca, es, en };

export type Lang = keyof typeof dictionaries;

export const languages: Lang[] = ['ca', 'es', 'en'];

export const languageLabels: Record<Lang, string> = {
  ca: 'CAT',
  es: 'ES',
  en: 'EN',
};

export const defaultLang: Lang = 'ca';

export type Page = 'home' | 'personal' | 'contact';

export function getDictionary(lang: Lang) {
  return dictionaries[lang];
}

export function pageSlug(page: Page): string {
  return page === 'home' ? '' : page;
}

// Builds the URL for a given language + raw path slug (e.g. '', 'contact',
// 'projects/my-project'), respecting that the default language (ca) is
// served unprefixed at the root.
export function localizedPath(lang: Lang, slug: string): string {
  const clean = slug.replace(/^\/+/, '');
  if (lang === defaultLang) {
    return `/${clean}`;
  }
  return `/${lang}/${clean}`.replace(/\/$/, '');
}

// Convenience wrapper for the three static top-level pages.
export function localePath(lang: Lang, page: Page): string {
  return localizedPath(lang, pageSlug(page));
}

export function projectDetailPath(lang: Lang, slug: string): string {
  return localizedPath(lang, `projects/${slug}`);
}

export function projectLinkLabels(lang: Lang): { repoLabel: string; demoLabel: string } {
  return {
    repoLabel: lang === 'ca' ? 'Repositori' : lang === 'es' ? 'Repositorio' : 'Repo',
    demoLabel: 'Demo',
  };
}
