import type { ProjectSlug } from '../data/projects';

// Forma común de los tres diccionarios: cada idioma la cumple con `satisfies Dictionary`,
// así que si a uno le falta o le sobra un campo (o un proyecto) el editor lo marca.

export interface Link {
  label: string;
  href: string;
}

// Texto de un párrafo que se convierte en enlace.
export interface InlineLink {
  text: string;
  href: string;
}

export interface EducationEntry {
  institution: string;
  institutionHref?: string;
  degree: string;
  dates: string;
  note: string;
  coursework?: readonly string[];
  link?: Link;
}

export interface ProjectText {
  title: string;
  description: string;
  context: string;
  depthTopics: readonly string[];
  outcome?: string;
}

// Tecnología con enlace opcional y, si es poco conocida, una descripción corta al lado.
export interface StackEntry {
  label: string;
  href?: string;
  description?: string;
}

export type StackItem = string | StackEntry;

export interface StackGroup {
  label: string;
  items: readonly StackItem[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface PersonalSection {
  title: string;
  body: readonly string[];
  inlineLinks?: readonly InlineLink[];
  note?: string;
  link?: Link;
  image: string;
  caption?: string;
}

export interface Dictionary {
  nav: {
    home: string;
    personal: string;
    contact: string;
    ariaLabel: string;
    languageLabel: string;
    skipLink: string;
  };
  theme: {
    dark: string;
    light: string;
    toggle: string;
  };
  meta: {
    title: string;
    description: string;
  };
  intro: {
    ariaLabel: string;
    title: string;
    languageQuestion: string;
    themeQuestion: string;
    loading: string;
    hint: string;
    skip: string;
  };
  hero: {
    kicker: string;
    status: string;
    greeting: string;
    name: string;
    tagline: string;
    cta: string;
  };
  education: {
    heading: string;
    courseworkLabel: string;
    items: readonly EducationEntry[];
  };
  projects: {
    heading: string;
    note: string;
    links: {
      repo: string;
      demo: string;
    };
    detail: {
      back: string;
      context: string;
      depth: string;
      stackLabel: string;
      outcome: string;
    };
    items: Record<ProjectSlug, ProjectText>;
  };
  stack: {
    heading: string;
    groups: readonly StackGroup[];
  };
  personal: {
    kicker: string;
    heading: string;
    facts: readonly Fact[];
    intro: readonly string[];
    sections: readonly PersonalSection[];
  };
  contact: {
    kicker: string;
    heading: string;
    body: string;
    copyEmail: {
      label: string;
      ariaLabel: string;
      done: string;
    };
    map: {
      heading: string;
      caption: string;
    };
    form: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      submitLabel: string;
      subject: string;
      sendingLabel: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  footer: {
    builtWith: string;
  };
}
