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
    gradeLabel: 'Nota mitjana',
    courseworkLabel: 'Assignatures rellevants',
    items: [
      {
        institution: 'ITIC Barcelona',
        degree: "Curs d'Especialització en Recursos i Entorns Cloud",
        dates: '2026 — actualitat',
        note: "En curs — desplegament i gestió d'infraestructura cloud.",
        grade: '',
        coursework: [],
      },
      {
        institution: 'ITIC Barcelona',
        degree: "Curs d'Especialització en Intel·ligència Artificial i Big Data",
        dates: '2025 — 2026',
        note: 'Desenvolupament de models, sistemes de dades i processament a gran escala.',
        grade: '8,6/10',
        coursework: [
          "Models d'Intel·ligència Artificial",
          "Sistemes d'Aprenentatge Automàtic",
          "Programació d'Intel·ligència Artificial",
          'Sistemes de Big Data',
          'Big Data Aplicat',
        ],
      },
      {
        institution: 'Prat FP',
        degree: "Cicle Formatiu de Grau Superior en Desenvolupament d'Aplicacions Multiplataforma (DAM)",
        dates: '2023 — 2025',
        note: '',
        grade: '9,1/10',
        coursework: [
          'Programació',
          'Bases de Dades',
          'Accés a Dades',
          "Desenvolupament d'Interfícies",
          'Programació de Serveis i Processos',
        ],
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
        slug: 'rag-pdf',
        title: "Assistent d'estudi amb RAG",
        description: 'App mòbil per pujar els teus PDFs i fer-los preguntes en llenguatge natural: les respostes surten del mateix document gràcies a un agent RAG.',
        context: "Treball de final del Curs d'Especialització en Intel·ligència Artificial i Big Data (ITIC Barcelona), desenvolupat de manera individual i documentat en un paper acadèmic. Un estudiant puja els seus apunts, llibres o articles i hi conversa des del mòbil: resums, flashcards i explicacions de conceptes generades a partir de fragments recuperats semànticament.",
        depthTopics: [
          "Pipeline d'ingesta de PDFs: extracció de text, chunking amb solapament i embeddings de 512 dimensions amb nomic-embed-text en local via Ollama",
          'Cerca semàntica a PostgreSQL amb pgvector: funció SQL amb similitud cosinus, llindar mínim i top-k configurables',
          "Agent amb LangGraph i patró ReAct (tool calling) amb eines de recuperació, resum, flashcards i explicació, evolucionat a partir d'un primer graf amb router explícit",
          "Backend asíncron amb FastAPI i streaming de la resposta token a token cap a l'app mitjançant Server-Sent Events",
          "Historial de conversa persistent a la base de dades i LLM intercanviable entre Claude Haiku (API d'Anthropic) i Gemma en local",
        ],
        stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'PostgreSQL', 'pgvector', 'Supabase', 'Ollama', 'React Native'],
        outcome: "Nota final: 9/10. Treball de final d'especialització acompanyat d'un paper que documenta el disseny, l'evolució de l'agent i les seves limitacions.",
        repoHref: 'https://github.com/cristoge/TIC_project',
        demoHref: '',
      },
      {
        slug: 'bikeshare',
        title: 'BikeShare',
        description: 'App mòbil de lloguer de bicicletes normals i elèctriques amb mapa interactiu, reserves i estadístiques de CO₂ estalviat.',
        context: "Projecte final del Cicle Formatiu de Grau Superior en Desenvolupament d'Aplicacions Multiplataforma (Prat FP), desenvolupat en un equip de quatre persones. L'app permet localitzar, reservar i desbloquejar bicicletes sense passar per un taulell, i mostra a l'usuari l'impacte ambiental positiu dels seus trajectes.",
        depthTopics: [
          'Modelatge de la base de dades a PostgreSQL (Supabase): usuaris, bicicletes, ubicacions, lloguers i rutes, amb les seves relacions',
          "Cicle de vida del lloguer: reserva amb caducitat d'una hora, lloguer en curs i finalització, sincronitzant a cada pas l'estat i la ubicació de la bicicleta",
          "Mapa interactiu amb react-native-maps i geolocalització de l'usuari amb expo-location",
          'Autenticació amb Supabase Auth i sessió persistent, estat global amb Zustand i validació de formularis amb Zod',
          'Historial de viatges i estadístiques per usuari, amb una estimació del CO₂ evitat segons la distància recorreguda',
        ],
        stack: ['TypeScript', 'React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Zustand', 'Zod'],
        outcome: "Nota final: 9,84/10. Projecte final del cicle, lliurat amb memòria tècnica i manual d'usuari.",
        repoHref: 'https://github.com/cristoge/bikeshare',
        demoHref: '',
      },
    ],
  },
  stack: {
    heading: 'Tecnologies',
    groups: [
      { label: 'Llenguatges', items: ['Python', 'JavaScript'] },
      { label: 'IA / ML', items: ['LangChain', 'LangGraph', 'scikit-learn', 'Langfuse'] },
      { label: 'Backend', items: ['FastAPI', 'Pydantic', 'Redis', 'Celery', 'ARQ', 'pytest', 'uv'] },
      { label: 'Bases de dades', items: ['PostgreSQL', 'pgvector', 'SQLAlchemy', 'Alembic'] },
      { label: 'DevOps / Cloud', items: ['Docker', 'GitHub Actions', 'Nginx', 'AWS (VPC, IAM, EC2, S3)'] },
    ],
  },
  personal: {
    kicker: 'Personal',
    heading: "Qui sóc",
    intro: [
      "Sóc en Cristo, desenvolupador backend i d'IA de prop de Barcelona.",
      "Em vaig ficar en això per pura curiositat. Des de petit m'agradava la tecnologia i entendre com funcionava tot per dins, i programar va ser la manera natural de continuar fent-ho. Fora de la pantalla, però, també hi ha altres coses que m'apassionen.",
    ],
    // TODO: afegeix les fotos a /public/personal/ i posa la ruta a `image` (p. ex. '/personal/teclats.jpg')
    sections: [
      {
        title: "Mecanografia i teclats",
        body: [
          "Quan vaig començar a programar em passava l'estona mirant el teclat per trobar cada tecla. Em vaig proposar deixar de fer-ho i vaig començar a practicar mecanografia en diferents pàgines, a poc a poc, fins que escriure va deixar de ser un obstacle i em va començar a agradar de debò.",
          "D'aquí vaig saltar al món dels teclats mecànics custom: vaig anar descobrint layouts diferents i tota mena de teclats, i avui en tinc quatre i continuo buscant models estranys i exclusius per provar.",
        ],
        image: '',
      },
      {
        title: "Música",
        body: [
          "Vaig començar a tocar el violí als 12 anys, a l'escola, gràcies a un programa de l'ajuntament que apropava la música i la cultura als alumnes.",
          "Amb els anys, a poc a poc el vaig anar deixant, però ara l'estic reprenent i aprenent sense pressa. Més que una afició, és la meva manera de desintoxicar-me del digital, que de tant en tant no va gens malament.",
          "A més, el violí em va despertar la curiositat per aprendre més sobre música: descobrir gèneres diferents, com està construïda una cançó i tot el que hi ha al darrere.",
        ],
        image: '',
      },
      {
        title: "Cafè",
        body: [
          "I per acabar, el cafè: combustible oficial de cada projecte, i no hi falta mai.",
        ],
        image: '',
      },
    ],
  },
  contact: {
    kicker: 'Contacte',
    heading: 'Parlem',
    body: "Si vols parlar d'un projecte, tens algun dubte o simplement vols saludar, aquí em trobaràs.",
    links: [
      { label: 'Email', value: 'cristo.g@outlook.es', href: 'mailto:cristo.g@outlook.es' },
      { label: 'LinkedIn', value: 'linkedin.com/in/cristopher-marrasquin', href: 'https://www.linkedin.com/in/cristopher-marrasquin/' },
      { label: 'GitHub', value: 'github.com/cristoge', href: 'https://github.com/cristoge' },
    ],
    map: {
      heading: 'Ubicació',
      caption: 'Esplugues de Llobregat, prop de Barcelona.',
    },
    form: {
      heading: 'Formulari de contacte',
      nameLabel: 'Nom complet',
      emailLabel: 'Correu electrònic',
      messageLabel: 'El teu missatge',
      submitLabel: 'Enviar missatge',
      subject: 'Missatge des del portfolio',
      sendingLabel: 'Enviant…',
      successMessage: 'Missatge enviat! Et respondré aviat.',
      errorMessage: "No s'ha pogut enviar el missatge. Torna-ho a provar o escriu-me directament per correu.",
    },
  },
  footer: {
    rights: 'Tots els drets reservats.',
  },
} as const;
