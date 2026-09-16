export default {
  nav: {
    home: 'Profesional',
    personal: 'Personal',
    contact: 'Contacto',
  },
  meta: {
    title: 'Cristo — Portfolio',
    description: 'Portfolio personal de Cristo.',
  },
  hero: {
    kicker: 'Desarrollador Backend & IA',
    greeting: 'Hola, soy',
    name: 'Cristo',
    // TODO: tags reales separados por "|"
    tagline: ['Backend', 'Frontend', 'DevOps'],
    cta: 'Ver el CV',
    // TODO: enlaza el fichero real del CV en /public/cv.pdf
    ctaHref: '/cv.pdf',
    outro: 'me alegra que estés aquí 🌌',
    exploreCta: 'Ver todo',
  },
  education: {
    heading: 'Educación',
    items: [
      {
        // TODO: nombre del centro y años exactos
        institution: '[Centro educativo]',
        degree: 'Curso de Especialización en Recursos y Entornos Cloud',
        dates: '[año] — actualidad',
        note: 'En curso — despliegue y gestión de infraestructura cloud.',
      },
      {
        institution: '[Centro educativo]',
        degree: 'Curso de Especialización en Inteligencia Artificial y Big Data',
        dates: '[año] — [año]',
        note: 'Desarrollo de modelos, sistemas de datos y procesamiento a gran escala.',
      },
      {
        // TODO: especialidad concreta del ciclo (DAM, ASIR, DAW...)
        institution: '[Centro educativo]',
        degree: 'Ciclo Formativo de Grado Superior en [especialidad]',
        dates: '[año] — [año]',
        note: '',
      },
    ],
  },
  projects: {
    heading: 'Proyectos',
    note: 'Una selección de proyectos académicos.',
    viewDetail: 'Ver detalle',
    detail: {
      back: 'Volver a proyectos',
      context: 'Contexto',
      depth: 'En qué se profundizó',
      stackLabel: 'Stack',
      outcome: 'Resultado',
    },
    items: [
      {
        slug: 'proyecto-lorem',
        title: 'Proyecto Lorem',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        context: 'Proyecto académico de la asignatura Lorem Ipsum, dentro del Curso de Especialización en Inteligencia Artificial y Big Data.',
        depthTopics: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          'Sed do eiusmod tempor incididunt ut labore et dolore',
          'Ut enim ad minim veniam, quis nostrud exercitation',
        ],
        stack: ['TypeScript', 'Astro', 'Node.js'],
        outcome: 'Lorem ipsum dolor sit amet — resultado o nota final del proyecto.',
        repoHref: '#',
        demoHref: '#',
      },
      {
        slug: 'proyecto-ipsum',
        title: 'Proyecto Ipsum',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        context: 'Proyecto académico de la asignatura Ipsum Dolor, dentro del Ciclo Formativo de Grado Superior.',
        depthTopics: [
          'Duis aute irure dolor in reprehenderit in voluptate',
          'Excepteur sint occaecat cupidatat non proident',
          'Sunt in culpa qui officia deserunt mollit anim',
        ],
        stack: ['Python', 'FastAPI', 'PostgreSQL'],
        outcome: 'Ut enim ad minim veniam — resultado o nota final del proyecto.',
        repoHref: '#',
        demoHref: '#',
      },
      {
        slug: 'proyecto-dolor',
        title: 'Proyecto Dolor',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        context: 'Proyecto académico de la asignatura Dolor Sit, dentro del Curso de Especialización en Recursos y Entornos Cloud.',
        depthTopics: [
          'Duis aute irure dolor in reprehenderit in voluptate',
          'Excepteur sint occaecat cupidatat non proident',
          'Sunt in culpa qui officia deserunt mollit anim',
        ],
        stack: ['React', 'Tailwind', 'Docker'],
        outcome: 'Duis aute irure — resultado o nota final del proyecto.',
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
      { label: 'Bases de datos', items: ['PostgreSQL (relacional)'] },
      { label: 'Bases de datos vectoriales', items: ['pgvector', 'Pinecone'] },
      { label: 'DevOps', items: ['Docker', 'GitHub Actions'] },
      { label: 'Observabilidad', items: ['LangSmith'] },
      { label: 'Cloud', items: ['AWS', 'Infrastructure fundamentals'] },
    ],
  },
  personal: {
    kicker: 'Personal',
    heading: 'Todavía en construcción',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Este espacio tendrá fotos y notas sobre mis hobbies — de momento es un marcador de posición.',
  },
  contact: {
    kicker: 'Contacto',
    heading: 'Hablemos',
    body: 'Si quieres hablar de un proyecto, tienes alguna duda o simplemente quieres saludar, aquí me encuentras.',
    links: [
      { label: 'Email', value: 'cristo.g@outlook.es', href: 'mailto:cristo.g@outlook.es' },
      { label: 'LinkedIn', value: 'linkedin.com/in/cristopher-marrasquin', href: 'https://www.linkedin.com/in/cristopher-marrasquin/' },
      { label: 'GitHub', value: 'github.com/cristoge', href: 'https://github.com/cristoge' },
    ],
    map: {
      heading: 'Ubicación',
      caption: 'Esplugues de Llobregat, cerca de Barcelona.',
    },
    form: {
      heading: 'Formulario de contacto',
      nameLabel: 'Nombre completo',
      emailLabel: 'Correo electrónico',
      messageLabel: 'Tu mensaje',
      submitLabel: 'Enviar mensaje',
      subject: 'Mensaje desde el portfolio',
    },
  },
  footer: {
    rights: 'Todos los derechos reservados.',
  },
} as const;
