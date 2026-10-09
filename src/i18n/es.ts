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
    gradeLabel: 'Nota media',
    courseworkLabel: 'Asignaturas relevantes',
    items: [
      {
        institution: 'ITIC Barcelona',
        degree: 'Curso de Especialización en Recursos y Entornos Cloud',
        dates: '2026 — actualidad',
        note: 'En curso — despliegue y gestión de infraestructura cloud.',
        grade: '',
        coursework: [],
      },
      {
        institution: 'ITIC Barcelona',
        degree: 'Curso de Especialización en Inteligencia Artificial y Big Data',
        dates: '2025 — 2026',
        note: 'Desarrollo de modelos, sistemas de datos y procesamiento a gran escala.',
        grade: '8,6/10',
        coursework: [
          'Modelos de Inteligencia Artificial',
          'Sistemas de Aprendizaje Automático',
          'Programación de Inteligencia Artificial',
          'Sistemas de Big Data',
          'Big Data Aplicado',
        ],
      },
      {
        institution: 'Prat FP',
        degree: 'Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
        dates: '2023 — 2025',
        note: '',
        grade: '9,1/10',
        coursework: [
          'Programación',
          'Bases de Datos',
          'Acceso a Datos',
          'Desarrollo de Interfaces',
          'Programación de Servicios y Procesos',
        ],
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
        slug: 'rag-pdf',
        title: 'Asistente de estudio con RAG',
        description: 'App móvil para subir tus PDFs y hacerles preguntas en lenguaje natural: las respuestas salen del propio documento gracias a un agente RAG.',
        context: 'Trabajo de fin del Curso de Especialización en Inteligencia Artificial y Big Data (ITIC Barcelona), desarrollado de forma individual y documentado en un paper académico. Un estudiante sube sus apuntes, libros o artículos y conversa con ellos desde el móvil: resúmenes, flashcards y explicaciones de conceptos generadas a partir de fragmentos recuperados semánticamente.',
        depthTopics: [
          'Pipeline de ingesta de PDFs: extracción de texto, chunking con solapamiento y embeddings de 512 dimensiones con nomic-embed-text en local vía Ollama',
          'Búsqueda semántica en PostgreSQL con pgvector: función SQL con similitud coseno, umbral mínimo y top-k configurables',
          'Agente con LangGraph y patrón ReAct (tool calling) con herramientas de recuperación, resumen, flashcards y explicación, evolucionado desde un primer grafo con router explícito',
          'Backend asíncrono con FastAPI y streaming de la respuesta token a token hacia la app mediante Server-Sent Events',
          'Historial de conversación persistente en base de datos y LLM intercambiable entre Claude Haiku (API de Anthropic) y Gemma en local',
        ],
        stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'PostgreSQL', 'pgvector', 'Supabase', 'Ollama', 'React Native'],
        outcome: 'Nota final: 9/10. Trabajo de fin de especialización acompañado de un paper que documenta el diseño, la evolución del agente y sus limitaciones.',
        repoHref: 'https://github.com/cristoge/TIC_project',
        demoHref: '',
      },
      {
        slug: 'bikeshare',
        title: 'BikeShare',
        description: 'App móvil de alquiler de bicicletas normales y eléctricas con mapa interactivo, reservas y estadísticas de CO₂ ahorrado.',
        context: 'Proyecto final del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma (Prat FP), desarrollado en un equipo de cuatro personas. La app permite localizar, reservar y desbloquear bicicletas sin pasar por un mostrador, y muestra al usuario el impacto ambiental positivo de sus trayectos.',
        depthTopics: [
          'Modelado de la base de datos en PostgreSQL (Supabase): usuarios, bicicletas, ubicaciones, alquileres y rutas, con sus relaciones',
          'Ciclo de vida del alquiler: reserva con caducidad de una hora, alquiler en curso y finalización, sincronizando en cada paso el estado y la ubicación de la bicicleta',
          'Mapa interactivo con react-native-maps y geolocalización del usuario con expo-location',
          'Autenticación con Supabase Auth y sesión persistente, estado global con Zustand y validación de formularios con Zod',
          'Historial de viajes y estadísticas por usuario, con una estimación del CO₂ evitado según la distancia recorrida',
        ],
        stack: ['TypeScript', 'React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Zustand', 'Zod'],
        outcome: 'Nota final: 9,84/10. Proyecto final del ciclo, entregado con memoria técnica y manual de usuario.',
        repoHref: 'https://github.com/cristoge/bikeshare',
        demoHref: '',
      },
    ],
  },
  stack: {
    heading: 'Tecnologías',
    groups: [
      { label: 'Lenguajes', items: ['Python', 'JavaScript'] },
      { label: 'IA / ML', items: ['LangChain', 'LangGraph', 'scikit-learn', 'Langfuse'] },
      { label: 'Backend', items: ['FastAPI', 'Pydantic', 'Redis', 'Celery', 'ARQ', 'pytest', 'uv'] },
      { label: 'Bases de datos', items: ['PostgreSQL', 'pgvector', 'SQLAlchemy', 'Alembic'] },
      { label: 'DevOps / Cloud', items: ['Docker', 'GitHub Actions', 'Nginx', 'AWS (VPC, IAM, EC2, S3)'] },
    ],
  },
  personal: {
    kicker: 'Personal',
    heading: "Quién soy",
    intro: [
      "Soy Cristo, desarrollador backend y de IA de cerca de Barcelona.",
      "Me metí en esto por pura curiosidad. Desde pequeño me gustaba la tecnología y entender cómo funcionaba todo por dentro, y programar fue la forma natural de seguir haciéndolo. Además de programar, hay otras cosas que me apasionan, y aquí te cuento algunas.",
    ],
    // TODO: añade las fotos en /public/personal/ y pon la ruta en `image` (p. ej. '/personal/teclados.jpg')
    sections: [
      {
        title: "Mecanografía y teclados",
        body: [
          "Cuando empecé a programar me pasaba el rato mirando el teclado para encontrar cada tecla. Me propuse dejar de hacerlo y empecé a practicar mecanografía en distintas páginas, poco a poco, hasta que escribir dejó de ser un obstáculo y empezó a gustarme de verdad.",
          "De ahí salté al mundo de los teclados mecánicos custom: fui descubriendo distintos layouts y todo tipo de teclados, y hoy tengo cuatro y sigo buscando modelos raros y exclusivos que probar.",
        ],
        image: '',
      },
      {
        title: "Mi setup",
        body: [
          "De tanto usar la terminal acabé descubriendo Neovim, y con él todo un mundo de configuraciones. Como terminal uso Ghostty, que me permite añadirle shaders para que todo sea más bonito visualmente, y Starship para el prompt, buscando siempre la máxima personalización.",
          "De tanto probar configuraciones y paletas de colores, encontré la definitiva: vague. Ahora la uso para todo: el editor, la terminal y prácticamente cualquier herramienta que lo permita.",
        ],
        note: "Y sí, por si te habías fijado: todo este portfolio también está hecho con la paleta vague.",
        inlineLink: { text: 'vague', href: 'https://github.com/vague-theme' },
        link: { label: 'Ver mis dotfiles en GitHub', href: 'https://github.com/cristoge/dotfiles' },
        image: '',
      },
      {
        title: "Música",
        body: [
          "Empecé a tocar el violín a los 12 años, en el colegio, gracias a un programa del ayuntamiento que acercaba la música y la cultura a los alumnos.",
          "Con los años lo fui dejando poco a poco, pero ahora lo estoy retomando y aprendiendo sin prisa. Más que una afición, es mi forma de desintoxicarme de lo digital, que de vez en cuando no viene nada mal.",
          "Además, el violín despertó mi curiosidad por aprender más sobre música: descubrir géneros distintos, cómo está construida una canción y todo lo que hay detrás.",
        ],
        image: '',
      },
      {
        title: "Café",
        body: [
          "Y para terminar, el café: combustible oficial de cada proyecto, y nunca falta.",
        ],
        image: '',
      },
    ],
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
      sendingLabel: 'Enviando…',
      successMessage: '¡Mensaje enviado! Te responderé pronto.',
      errorMessage: 'No se ha podido enviar el mensaje. Vuelve a intentarlo o escríbeme directamente por correo.',
    },
  },
  footer: {
    rights: 'Todos los derechos reservados.',
  },
} as const;
