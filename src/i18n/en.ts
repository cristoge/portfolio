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
    items: [
      {
        // TODO: school name and exact years
        institution: '[School / institution]',
        degree: 'Specialization Course in Cloud Resources and Environments',
        dates: '[year] — present',
        note: 'Ongoing — cloud infrastructure deployment and management.',
      },
      {
        institution: '[School / institution]',
        degree: 'Specialization Course in Artificial Intelligence and Big Data',
        dates: '[year] — [year]',
        note: 'Model development, data systems and large-scale processing.',
      },
      {
        // TODO: specific track (e.g. software development, networking...)
        institution: '[School / institution]',
        degree: 'Higher Vocational Training in [specialty]',
        dates: '[year] — [year]',
        note: '',
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
        slug: 'proyecto-lorem',
        title: 'Project Lorem',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        context: 'Academic project for the Lorem Ipsum course, part of the Specialization Course in Artificial Intelligence and Big Data.',
        depthTopics: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          'Sed do eiusmod tempor incididunt ut labore et dolore',
          'Ut enim ad minim veniam, quis nostrud exercitation',
        ],
        stack: ['TypeScript', 'Astro', 'Node.js'],
        outcome: 'Lorem ipsum dolor sit amet — final grade or outcome of the project.',
        repoHref: '#',
        demoHref: '#',
      },
      {
        slug: 'proyecto-ipsum',
        title: 'Project Ipsum',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        context: 'Academic project for the Ipsum Dolor course, part of the Higher Vocational Training.',
        depthTopics: [
          'Duis aute irure dolor in reprehenderit in voluptate',
          'Excepteur sint occaecat cupidatat non proident',
          'Sunt in culpa qui officia deserunt mollit anim',
        ],
        stack: ['Python', 'FastAPI', 'PostgreSQL'],
        outcome: 'Ut enim ad minim veniam — final grade or outcome of the project.',
        repoHref: '#',
        demoHref: '#',
      },
      {
        slug: 'proyecto-dolor',
        title: 'Project Dolor',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        context: 'Academic project for the Dolor Sit course, part of the Specialization Course in Cloud Resources and Environments.',
        depthTopics: [
          'Duis aute irure dolor in reprehenderit in voluptate',
          'Excepteur sint occaecat cupidatat non proident',
          'Sunt in culpa qui officia deserunt mollit anim',
        ],
        stack: ['React', 'Tailwind', 'Docker'],
        outcome: 'Duis aute irure — final grade or outcome of the project.',
        repoHref: '#',
        demoHref: '#',
      },
    ],
  },
  stack: {
    heading: 'Stack',
    groups: [
      { label: 'AI / ML', items: ['Model development', 'RAG systems', 'Agent development'] },
      { label: 'Backend', items: ['FastAPI', 'Clean architecture', 'Typed outputs'] },
      { label: 'Databases', items: ['PostgreSQL (relational)'] },
      { label: 'Vector DBs', items: ['pgvector', 'Pinecone'] },
      { label: 'DevOps', items: ['Docker', 'GitHub Actions'] },
      { label: 'Observability', items: ['LangSmith'] },
      { label: 'Cloud', items: ['AWS', 'Infrastructure fundamentals'] },
    ],
  },
  personal: {
    kicker: 'Personal',
    heading: 'Still under construction',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This space will hold photos and notes about my hobbies — for now it is a placeholder.',
  },
  contact: {
    kicker: 'Contact',
    heading: "Let's talk",
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. You can find me in the following places.',
    links: [
      { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
      { label: 'LinkedIn', value: 'linkedin.com/in/your-user', href: 'https://linkedin.com/in/your-user' },
      { label: 'GitHub', value: 'github.com/your-user', href: 'https://github.com/your-user' },
    ],
  },
  footer: {
    rights: 'All rights reserved.',
  },
} as const;
