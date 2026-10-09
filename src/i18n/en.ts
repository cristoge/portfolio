export default {
  nav: {
    home: 'Professional',
    personal: 'Personal',
    contact: 'Contact',
  },
  meta: {
    title: 'Cristo — Portfolio',
    description: "Cristo's personal portfolio.",
  },
  hero: {
    kicker: 'Backend & AI Developer',
    greeting: "Hello, I'm",
    name: 'Cristo',
    // TODO: real tags separated by "|"
    tagline: ['Backend', 'Frontend', 'DevOps'],
    cta: 'View CV',
    // TODO: link the real CV file at /public/cv.pdf
    ctaHref: '/cv.pdf',
    outro: "glad you're here 🌌",
    exploreCta: 'See it all',
  },
  education: {
    heading: 'Education',
    gradeLabel: 'Grade',
    courseworkLabel: 'Relevant coursework',
    items: [
      {
        institution: 'ITIC Barcelona',
        degree: 'Specialization Course in Cloud Resources and Environments',
        dates: '2026 — present',
        note: 'Ongoing — cloud infrastructure deployment and management.',
        grade: '',
        coursework: [],
      },
      {
        institution: 'ITIC Barcelona',
        degree: 'Specialization Course in Artificial Intelligence and Big Data',
        dates: '2025 — 2026',
        note: 'Model development, data systems and large-scale processing.',
        grade: '8.6/10',
        coursework: [
          'Artificial Intelligence Models',
          'Machine Learning Systems',
          'Artificial Intelligence Programming',
          'Big Data Systems',
          'Applied Big Data',
        ],
      },
      {
        institution: 'Prat FP',
        degree: 'Higher Vocational Training in Multiplatform Application Development (DAM)',
        dates: '2023 — 2025',
        note: '',
        grade: '9.1/10',
        coursework: [
          'Programming',
          'Databases',
          'Data Access',
          'Interface Development',
          'Service and Process Programming',
        ],
      },
    ],
  },
  projects: {
    heading: 'Projects',
    note: 'A selection of academic projects.',
    viewDetail: 'View details',
    detail: {
      back: 'Back to projects',
      context: 'Context',
      depth: 'What this project dug into',
      stackLabel: 'Stack',
      outcome: 'Outcome',
    },
    items: [
      {
        slug: 'rag-pdf',
        title: 'RAG study assistant',
        description: 'Mobile app to upload your PDFs and ask them questions in natural language: answers come from the document itself, powered by a RAG agent.',
        context: 'Final project of the Specialization Course in Artificial Intelligence and Big Data (ITIC Barcelona), built individually and documented in an academic paper. Students upload their notes, books or articles and chat with them from their phone: summaries, flashcards and concept explanations generated from semantically retrieved passages.',
        depthTopics: [
          'PDF ingestion pipeline: text extraction, overlapping chunking and 512-dimension embeddings with nomic-embed-text running locally on Ollama',
          'Semantic search in PostgreSQL with pgvector: a SQL function using cosine similarity with configurable threshold and top-k',
          'LangGraph agent using the ReAct pattern (tool calling) with retrieval, summary, flashcard and explanation tools, evolved from an initial graph with an explicit router',
          'Async FastAPI backend streaming the answer token by token to the app over Server-Sent Events',
          'Conversation history persisted in the database and a swappable LLM: Claude Haiku (Anthropic API) or Gemma running locally',
        ],
        stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'PostgreSQL', 'pgvector', 'Supabase', 'Ollama', 'React Native'],
        outcome: 'Final grade: 9/10. Final specialization project, accompanied by a paper documenting the design, the evolution of the agent and its limitations.',
        repoHref: 'https://github.com/cristoge/TIC_project',
        demoHref: '',
      },
      {
        slug: 'bikeshare',
        title: 'BikeShare',
        description: 'Mobile app for renting regular and electric bikes, with an interactive map, reservations and CO₂ savings stats.',
        context: 'Final project of the Higher Vocational Training in Multiplatform Application Development (Prat FP), built in a team of four. The app lets users find, reserve and unlock bikes without going to a desk, and shows them the positive environmental impact of their rides.',
        depthTopics: [
          'Database modelling in PostgreSQL (Supabase): users, bikes, locations, rentals and routes, and how they relate',
          "Rental lifecycle: one-hour expiring reservations, ongoing rentals and completion, keeping the bike's status and location in sync at every step",
          'Interactive map with react-native-maps and user geolocation with expo-location',
          'Authentication with Supabase Auth and persistent sessions, global state with Zustand and form validation with Zod',
          'Ride history and per-user stats, including an estimate of the CO₂ avoided based on distance travelled',
        ],
        stack: ['TypeScript', 'React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Zustand', 'Zod'],
        outcome: 'Final grade: 9.84/10. Final project of the programme, delivered with a technical report and user manual.',
        repoHref: 'https://github.com/cristoge/bikeshare',
        demoHref: '',
      },
    ],
  },
  stack: {
    heading: 'Technologies',
    groups: [
      { label: 'Languages', items: ['Python', 'JavaScript'] },
      { label: 'AI / ML', items: ['LangChain', 'LangGraph', 'scikit-learn', 'Langfuse'] },
      { label: 'Backend', items: ['FastAPI', 'Pydantic', 'Redis', 'Celery', 'ARQ', 'pytest', 'uv'] },
      { label: 'Databases', items: ['PostgreSQL', 'pgvector', 'SQLAlchemy', 'Alembic'] },
      { label: 'DevOps / Cloud', items: ['Docker', 'GitHub Actions', 'Nginx', 'AWS (VPC, IAM, EC2, S3)'] },
    ],
  },
  personal: {
    kicker: 'Personal',
    heading: "Who I am",
    intro: [
      "I'm Cristo, a backend and AI developer based near Barcelona.",
      "I got into this out of pure curiosity. Since I was a kid I loved technology and figuring out how everything worked inside, and programming was the natural way to keep doing that. Besides coding, there are a few other things I'm passionate about, and here are some of them.",
    ],
    // TODO: add the photos to /public/personal/ and set the path in `image` (e.g. '/personal/keyboards.jpg')
    sections: [
      {
        title: "Touch typing and keyboards",
        body: [
          "When I started coding I spent most of the time looking down at the keyboard to find each key. I set out to stop doing that and began practicing touch typing on different sites, little by little, until typing stopped being an obstacle and turned into something I genuinely enjoyed.",
          "From there I fell into the world of custom mechanical keyboards: I discovered different layouts and all kinds of boards, and today I own four and keep hunting for unusual, exclusive ones to try.",
        ],
        image: '',
      },
      {
        title: "My setup",
        body: [
          "Spending so much time in the terminal eventually led me to Neovim, and with it a whole world of configs. My terminal is Ghostty, which lets me add shaders to make everything look nicer, and I use Starship for the prompt, always chasing as much customization as possible.",
          "After trying so many configs and color palettes, I found the one: vague. Now I use it for everything: the editor, the terminal and pretty much any tool that supports it.",
        ],
        note: "And yes, in case you noticed: this whole portfolio is built with the vague palette too.",
        inlineLink: { text: 'vague', href: 'https://github.com/vague-theme' },
        link: { label: 'See my dotfiles on GitHub', href: 'https://github.com/cristoge/dotfiles' },
        image: '',
      },
      {
        title: "Music",
        body: [
          "I started playing the violin at 12, at school, thanks to a city council programme that brought music and culture closer to students.",
          "Over the years I gradually drifted away from it, but I'm picking it back up now and learning little by little. More than a hobby, it's my way to detox from all things digital, which every now and then doesn't hurt at all.",
          "The violin also sparked my curiosity to learn more about music: discovering different genres, how a song is put together and everything behind it.",
        ],
        image: '',
      },
      {
        title: "Coffee",
        body: [
          "And last but not least, coffee: official fuel of every project, and never in short supply.",
        ],
        image: '',
      },
    ],
  },
  contact: {
    kicker: 'Contact',
    heading: "Let's talk",
    body: 'If you want to talk about a project, have a question, or just want to say hi, you can find me here.',
    links: [
      { label: 'Email', value: 'cristo.g@outlook.es', href: 'mailto:cristo.g@outlook.es' },
      { label: 'LinkedIn', value: 'linkedin.com/in/cristopher-marrasquin', href: 'https://www.linkedin.com/in/cristopher-marrasquin/' },
      { label: 'GitHub', value: 'github.com/cristoge', href: 'https://github.com/cristoge' },
    ],
    map: {
      heading: 'Location',
      caption: 'Esplugues de Llobregat, near Barcelona.',
    },
    form: {
      heading: 'Contact form',
      nameLabel: 'Full name',
      emailLabel: 'Email address',
      messageLabel: 'Your message',
      submitLabel: 'Send message',
      subject: 'Message from the portfolio',
      sendingLabel: 'Sending…',
      successMessage: "Message sent! I'll get back to you soon.",
      errorMessage: "The message couldn't be sent. Please try again or email me directly.",
    },
  },
  footer: {
    rights: 'All rights reserved.',
  },
} as const;
