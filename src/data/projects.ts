import type { ProjectText } from '../i18n/types';
import { getDictionary, type Lang } from '../i18n/utils';

interface ProjectMeta {
  slug: string;
  stack: readonly string[];
  repoHref: string;
  demoHref?: string;
  image: string;
}

// Datos de cada proyecto que no dependen del idioma. El orden de esta lista es el
// orden en que se muestran; el texto de cada uno está en `projects.items` de src/i18n,
// indexado por `slug`.
export const projectMeta = [
  {
    slug: 'rag-pdf',
    stack: ['Python', 'FastAPI', 'Strands Agents', 'PostgreSQL', 'pgvector', 'Ollama', 'Amazon Cognito', 'Terraform', 'TypeScript', 'React Native', 'Expo'],
    repoHref: 'https://github.com/cristoge/TIC_project',
    demoHref: 'https://youtu.be/20UHkDUTeqA',
    image: '/rag2.webp',
  },
  {
    slug: 'safe-reply',
    stack: ['Python', 'FastAPI', 'scikit-learn', 'PostgreSQL', 'pgvector', 'SQLAlchemy', 'Alembic', 'Redis', 'Pydantic', 'pytest', 'Docker'],
    repoHref: 'https://github.com/cristoge/rag_revision',
    image: '/docs.webp',
  },
  {
    slug: 'bikeshare',
    stack: ['TypeScript', 'React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Zustand', 'Zod'],
    repoHref: 'https://github.com/cristoge/bikeshare',
    image: '/bike2.webp',
  },
] as const satisfies readonly ProjectMeta[];

export type ProjectSlug = (typeof projectMeta)[number]['slug'];

export type Project = ProjectMeta & ProjectText;

export function getProjects(lang: Lang): Project[] {
  const texts = getDictionary(lang).projects.items;
  return projectMeta.map((meta) => ({ ...meta, ...texts[meta.slug] }));
}
