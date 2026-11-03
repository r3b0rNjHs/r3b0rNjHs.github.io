import type { L } from '@/i18n/ui';

export const profile = {
  name: 'Jorge Hernández Suárez',
  shortName: 'Jorge Hernández',
  initials: 'JH',
  email: 'hernansua.jorge@gmail.com',
  location: { city: 'Las Palmas de Gran Canaria', country: 'Spain', tz: 'Atlantic/Canary', coords: '28.12°N 15.43°W' },
  /** Set to an image path in /public (e.g. "/portrait.jpg") to replace the generative placeholder. */
  photo: null as string | null,
  socials: [
    { label: 'GitHub', href: 'https://github.com/r3b0rNjHs', handle: '@r3b0rNjHs' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jhernandezsuarez', handle: 'in/jhernandezsuarez' },
  ],
  bio: {
    en: [
      'I’m a software architect and engineering leader based in the Canary Islands. Over the last 7+ years I’ve designed and run cloud platforms on AWS, Kubernetes and Terraform — and grown from junior developer to CTO along the way.',
      'I founded an AI-driven adtech startup, led engineering teams for investment fund platforms, and today I build AI-native products end to end: from the infrastructure and the architecture to the agents, the MCP integrations and the pipelines that let a tiny team ship like a big one.',
      'My foundation is Clean Architecture, DDD and TDD. My edge is putting AI to work in real engineering — not as a demo, but as part of how software gets designed, built and operated.',
    ],
    es: [
      'Soy arquitecto de software y líder técnico desde Canarias. En más de 7 años he diseñado y operado plataformas cloud en AWS, Kubernetes y Terraform — y he pasado de developer junior a CTO por el camino.',
      'Fundé una startup de adtech basada en IA, lideré equipos de ingeniería para plataformas de fondos de inversión y hoy construyo productos nativos de IA de principio a fin: desde la infraestructura y la arquitectura hasta los agentes, las integraciones MCP y los pipelines que permiten a un equipo pequeño entregar como uno grande.',
      'Mi base es Clean Architecture, DDD y TDD. Mi ventaja es poner la IA a trabajar en ingeniería real — no como demo, sino como parte de cómo se diseña, construye y opera el software.',
    ],
  } satisfies Record<string, string[]>,
  stats: [
    { value: 7, suffix: '+', key: 'about.stat.years' },
    { value: 5, suffix: '', prefix: '<', key: 'about.stat.cto' },
    { value: 32, suffix: 'k', key: 'about.stat.players' },
  ] as const,
};

export interface Role {
  company: string;
  role: L;
  period: L;
  start: number;
  end: number | null;
  note?: L;
  summary: L;
  tags: string[];
}

export const experience: Role[] = [
  {
    company: 'Yoqze',
    role: { en: 'Founder & AI Engineer', es: 'Fundador & AI Engineer' },
    period: { en: '2026 — Now', es: '2026 — Hoy' },
    start: 2026,
    end: null,
    summary: {
      en: 'Building AI-native products end to end with a tiny team: a live Roblox game shipped by two people, the agent platform that supports it, and an AI-powered developer API — with Claude Code, MCP and agentic pipelines as the engineering backbone.',
      es: 'Construyo productos nativos de IA de principio a fin con un equipo mínimo: un juego de Roblox en producción hecho por dos personas, la plataforma de agentes que le da soporte y una API para developers impulsada por IA — con Claude Code, MCP y pipelines agénticos como columna vertebral de la ingeniería.',
    },
    tags: ['AI agents', 'Claude Code', 'MCP', 'TypeScript', 'Python', 'Luau'],
  },
  {
    company: 'Trenddi',
    role: { en: 'AI & Platform Engineer', es: 'AI & Platform Engineer' },
    period: { en: 'Nov 2024 — May 2026', es: 'Nov 2024 — May 2026' },
    start: 2024,
    end: 2026,
    summary: {
      en: 'Drove the adoption of AI-assisted development and Model Context Protocol integrations across engineering, speeding up delivery. Designed scalable architectures connecting backend, product and operations.',
      es: 'Impulsé la adopción del desarrollo asistido por IA y de integraciones con Model Context Protocol en todo el equipo de ingeniería, acelerando la entrega. Diseñé arquitecturas escalables que conectaban backend, producto y operaciones.',
    },
    tags: ['MCP', 'Claude Code', 'React', 'AWS', 'Kubernetes'],
  },
  {
    company: 'TMC2',
    role: { en: 'Site Reliability Engineer', es: 'Site Reliability Engineer' },
    period: { en: 'Nov 2023 — Nov 2024', es: 'Nov 2023 — Nov 2024' },
    start: 2023,
    end: 2024,
    summary: {
      en: 'Rotated across client projects owning DevOps and infrastructure modules. Built and maintained infrastructure as code with Terraform and Terragrunt on AWS and Kubernetes, and advised on decisions to keep systems maintainable and resilient.',
      es: 'Roté por proyectos de distintos clientes como responsable de módulos de DevOps e infraestructura. Construí y mantuve infraestructura como código con Terraform y Terragrunt sobre AWS y Kubernetes, asesorando en decisiones para mantener los sistemas mantenibles y resilientes.',
    },
    tags: ['Terraform', 'Terragrunt', 'AWS', 'Kubernetes', 'Python'],
  },
  {
    company: 'Adsviu',
    role: { en: 'Founder & Software Engineer', es: 'Fundador & Software Engineer' },
    period: { en: 'Sep 2021 — Jun 2023', es: 'Sep 2021 — Jun 2023' },
    start: 2021,
    end: 2023,
    summary: {
      en: 'Designed and built an AI-driven contextual advertising platform from scratch. Delivered the cloud infrastructure on Google Cloud and AWS, and applied AI to ad targeting and analytics.',
      es: 'Diseñé y construí desde cero una plataforma de publicidad contextual basada en IA. Desplegué la infraestructura cloud en Google Cloud y AWS y apliqué IA a la segmentación y la analítica de anuncios.',
    },
    tags: ['AI', 'Python', 'React', 'GCP', 'AWS', 'Terraform'],
  },
  {
    company: 'Next Chance Assets',
    role: { en: 'CTO · Tech Lead · Software Architect', es: 'CTO · Tech Lead · Software Architect' },
    period: { en: 'Oct 2018 — Jun 2023', es: 'Oct 2018 — Jun 2023' },
    start: 2018,
    end: 2023,
    summary: {
      en: 'Grew from junior developer to CTO in under five years. Set the technical vision and architecture for investment fund platforms and internal products — including Adgoclick, an SEO performance tool for SMEs — and built and mentored the team.',
      es: 'Pasé de developer junior a CTO en menos de cinco años. Definí la visión técnica y la arquitectura de plataformas de fondos de inversión y productos internos — incluido Adgoclick, una herramienta de rendimiento SEO para pymes — y formé y mentoricé al equipo.',
    },
    tags: ['Leadership', 'Architecture', 'AWS', 'Java', 'Python'],
  },
  {
    company: 'Lean Mind',
    role: { en: 'Junior Consultant', es: 'Consultor Junior' },
    period: { en: 'Jan 2018 — Oct 2018', es: 'Ene 2018 — Oct 2018' },
    start: 2018,
    end: 2018,
    summary: {
      en: 'Where it started: trained in agile, TDD and clean code while supporting client projects.',
      es: 'Donde empezó todo: formación en agile, TDD y clean code mientras apoyaba proyectos de clientes.',
    },
    tags: ['TDD', 'Clean Code', 'Agile'],
  },
];

export const education = {
  degree: { en: 'BSc Computer Engineering — Software Security', es: 'Grado en Ingeniería Informática — Seguridad del Software' },
  school: 'Universidad de Las Palmas de Gran Canaria',
  period: '2012 — 2018',
};

export const principles: { title: L; body: L; glyph: string }[] = [
  {
    glyph: '01',
    title: { en: 'Architecture is a set of bets', es: 'La arquitectura es un conjunto de apuestas' },
    body: {
      en: 'Clean Architecture and DDD to keep the core honest; pragmatic trade-offs everywhere else. I document decisions so teams can disagree with them later.',
      es: 'Clean Architecture y DDD para mantener el núcleo limpio; compromisos pragmáticos en todo lo demás. Documento las decisiones para que el equipo pueda cuestionarlas después.',
    },
  },
  {
    glyph: '02',
    title: { en: 'Tests are the spec', es: 'Los tests son la especificación' },
    body: {
      en: 'TDD since day one. Fast feedback loops are what let both humans and AI agents change code without fear.',
      es: 'TDD desde el primer día. Los ciclos de feedback rápidos son lo que permite a personas y agentes de IA cambiar código sin miedo.',
    },
  },
  {
    glyph: '03',
    title: { en: 'AI is part of the team', es: 'La IA forma parte del equipo' },
    body: {
      en: 'Augmented coding, MCP servers and agentic pipelines are how I multiply small teams — with guardrails, evals and humans in the loop.',
      es: 'Augmented coding, servidores MCP y pipelines agénticos son mi forma de multiplicar equipos pequeños — con guardarraíles, evaluaciones y personas en el bucle.',
    },
  },
  {
    glyph: '04',
    title: { en: 'You build it, you run it', es: 'Si lo construyes, lo operas' },
    body: {
      en: 'Infrastructure as code, observability from the start, and SRE habits. Shipping is the beginning of the job, not the end.',
      es: 'Infraestructura como código, observabilidad desde el inicio y hábitos de SRE. Desplegar es el principio del trabajo, no el final.',
    },
  },
];

export const stack: { group: L; items: string[] }[] = [
  {
    group: { en: 'AI engineering', es: 'Ingeniería de IA' },
    items: ['Claude Code', 'Model Context Protocol', 'LLM integration', 'Agentic pipelines', 'Evals'],
  },
  {
    group: { en: 'Cloud & infra', es: 'Cloud e infra' },
    items: ['AWS', 'Google Cloud', 'Kubernetes', 'Terraform', 'Terragrunt', 'Docker', 'CI/CD'],
  },
  {
    group: { en: 'Languages & data', es: 'Lenguajes y datos' },
    items: ['TypeScript', 'Python', 'Java', 'React', 'PostgreSQL', 'OpenSearch'],
  },
  { group: { en: 'Reliability', es: 'Fiabilidad' }, items: ['Prometheus', 'Grafana', 'CloudWatch', 'SRE'] },
  { group: { en: 'Craft', es: 'Oficio' }, items: ['Clean Architecture', 'DDD', 'TDD', 'Mentoring', 'Tech leadership'] },
];
