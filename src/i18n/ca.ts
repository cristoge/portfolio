export default {
  nav: {
    home: 'Professional',
    personal: 'Personal',
    contact: 'Contacte',
  },
  meta: {
    title: 'Cristo — Portfolio',
    description: 'Portfolio personal de Cristo.',
  },
  hero: {
    kicker: 'Desenvolupador Backend & IA',
    greeting: 'Hola, sóc',
    name: 'Cristo',
    // TODO: tags reals separats per "|"
    tagline: ['Backend', 'Frontend', 'DevOps'],
    cta: 'Veure el CV',
    // TODO: enllaça el fitxer real del CV a /public/cv.pdf
    ctaHref: '/cv.pdf',
    outro: "m'alegra que hi siguis 🌌",
    exploreCta: 'Veure-ho tot',
  },
  education: {
    heading: 'Educació',
    items: [
      {
        // TODO: nom del centre i anys exactes
        institution: '[Centre educatiu]',
        degree: "Curs d'Especialització en Recursos i Entorns Cloud",
        dates: '[any] — actualitat',
        note: "En curs — desplegament i gestió d'infraestructura cloud.",
      },
      {
        institution: '[Centre educatiu]',
        degree: "Curs d'Especialització en Intel·ligència Artificial i Big Data",
        dates: '[any] — [any]',
        note: 'Desenvolupament de models, sistemes de dades i processament a gran escala.',
      },
      {
        // TODO: especialitat concreta del cicle (DAM, ASIX, DAW...)
        institution: '[Centre educatiu]',
        degree: 'Cicle Formatiu de Grau Superior en [especialitat]',
        dates: '[any] — [any]',
        note: '',
      },
    ],
  },
  projects: {
    heading: 'Projectes',
    note: 'Una selecció de projectes acadèmics.',
    viewDetail: 'Veure detall',
    detail: {
      back: 'Tornar a projectes',
      context: 'Context',
      depth: 'En què es va aprofundir',
      stackLabel: 'Stack',
      outcome: 'Resultat',
    },
    items: [
      {
        slug: 'proyecto-lorem',
        title: 'Projecte Lorem',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        context: "Projecte acadèmic de l'assignatura Lorem Ipsum, dins del Curs d'Especialització en Intel·ligència Artificial i Big Data.",
        depthTopics: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          'Sed do eiusmod tempor incididunt ut labore et dolore',
          'Ut enim ad minim veniam, quis nostrud exercitation',
        ],
        stack: ['TypeScript', 'Astro', 'Node.js'],
        outcome: 'Lorem ipsum dolor sit amet — resultat o nota final del projecte.',
        repoHref: '#',
        demoHref: '#',
      },
      {
        slug: 'proyecto-ipsum',
        title: 'Projecte Ipsum',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        context: "Projecte acadèmic de l'assignatura Ipsum Dolor, dins del Cicle Formatiu de Grau Superior.",
        depthTopics: [
          'Duis aute irure dolor in reprehenderit in voluptate',
          'Excepteur sint occaecat cupidatat non proident',
          'Sunt in culpa qui officia deserunt mollit anim',
        ],
        stack: ['Python', 'FastAPI', 'PostgreSQL'],
        outcome: 'Ut enim ad minim veniam — resultat o nota final del projecte.',
        repoHref: '#',
        demoHref: '#',
      },
      {
        slug: 'proyecto-dolor',
        title: 'Projecte Dolor',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        context: "Projecte acadèmic de l'assignatura Dolor Sit, dins del Curs d'Especialització en Recursos i Entorns Cloud.",
        depthTopics: [
          'Duis aute irure dolor in reprehenderit in voluptate',
          'Excepteur sint occaecat cupidatat non proident',
          'Sunt in culpa qui officia deserunt mollit anim',
        ],
        stack: ['React', 'Tailwind', 'Docker'],
        outcome: 'Duis aute irure — resultat o nota final del projecte.',
        repoHref: '#',
        demoHref: '#',
      },
    ],
  },
  stack: {
    heading: 'Stack',
    groups: [
      { label: 'IA / ML', items: ['Model development', 'RAG systems', 'Agent development'] },
      { label: 'Backend', items: ['FastAPI', 'Clean architecture', 'Typed outputs'] },
      { label: 'Bases de dades', items: ['PostgreSQL (relacional)'] },
      { label: 'Bases de dades vectorials', items: ['pgvector', 'Pinecone'] },
      { label: 'DevOps', items: ['Docker', 'GitHub Actions'] },
      { label: 'Observabilitat', items: ['LangSmith'] },
      { label: 'Cloud', items: ['AWS', 'Infrastructure fundamentals'] },
    ],
  },
  personal: {
    kicker: 'Personal',
    heading: 'Encara en construcció',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aquest espai tindrà fotos i notes sobre els meus hobbies — de moment és un marcador de posició.',
  },
  contact: {
    kicker: 'Contacte',
    heading: 'Parlem',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pots trobar-me als següents llocs.',
    links: [
      { label: 'Email', value: 'tu@exemple.com', href: 'mailto:tu@exemple.com' },
      { label: 'LinkedIn', value: 'linkedin.com/in/tu-usuari', href: 'https://linkedin.com/in/tu-usuari' },
      { label: 'GitHub', value: 'github.com/tu-usuari', href: 'https://github.com/tu-usuari' },
    ],
  },
  footer: {
    rights: 'Tots els drets reservats.',
  },
} as const;
