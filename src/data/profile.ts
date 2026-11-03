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
      'I’m a software architect and engineering leader based in the Canary Islands. Over the last 7+ years I’ve designed and run cloud platforms on AWS, Kubernetes and Terraform, and gone from junior developer to CTO along the way.',
      'I founded an AI-driven adtech startup and led engineering teams for investment fund platforms. Today I build AI products myself, from the cloud infrastructure and architecture to the agents, MCP integrations and pipelines that let a small team ship a lot.',
      'My foundation is Clean Architecture, DDD and TDD. Over the last two years most of my work has been about using AI in day-to-day engineering: coding with agents, building MCP integrations and shipping LLM features to real users.',
    ],
    es: [
      'Soy arquitecto de software y líder técnico desde Canarias. En más de 7 años he diseñado y operado plataformas cloud en AWS, Kubernetes y Terraform, y por el camino he pasado de developer junior a CTO.',
      'Fundé una startup de adtech basada en IA y lideré equipos de ingeniería para plataformas de fondos de inversión. Hoy construyo productos de IA yo mismo, desde la infraestructura cloud y la arquitectura hasta los agentes, las integraciones MCP y los pipelines que permiten a un equipo pequeño sacar mucho trabajo adelante.',
      'Mi base es Clean Architecture, DDD y TDD. En los últimos dos años casi todo mi trabajo ha girado en torno a usar la IA en la ingeniería del día a día: programar con agentes, construir integraciones MCP y llevar funcionalidades con LLMs a usuarios reales.',
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
    company: 'Trenddi',
    role: { en: 'AI & Platform Engineer', es: 'AI & Platform Engineer' },
    period: { en: 'Nov 2024 – May 2026', es: 'Nov 2024 – May 2026' },
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
    period: { en: 'Nov 2023 – Nov 2024', es: 'Nov 2023 – Nov 2024' },
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
    period: { en: 'Sep 2021 – Jun 2023', es: 'Sep 2021 – Jun 2023' },
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
    period: { en: 'Oct 2018 – Jun 2023', es: 'Oct 2018 – Jun 2023' },
    start: 2018,
    end: 2023,
    summary: {
      en: 'Grew from junior developer to CTO in under five years. Set the technical vision and architecture for investment fund platforms and internal products, including Adgoclick, an SEO performance tool for SMEs. Built and mentored the development team.',
      es: 'Pasé de developer junior a CTO en menos de cinco años. Definí la visión técnica y la arquitectura de plataformas de fondos de inversión y productos internos, entre ellos Adgoclick, una herramienta de rendimiento SEO para pymes. Formé y mentoricé al equipo de desarrollo.',
    },
    tags: ['Leadership', 'Architecture', 'AWS', 'Java', 'Python'],
  },
  {
    company: 'Lean Mind',
    role: { en: 'Junior Consultant', es: 'Consultor Junior' },
    period: { en: 'Jan 2018 – Oct 2018', es: 'Ene 2018 – Oct 2018' },
    start: 2018,
    end: 2018,
    summary: {
      en: 'My first job. Trained in agile, TDD and clean code while working on client projects.',
      es: 'Mi primer trabajo. Me formé en agile, TDD y clean code trabajando en proyectos de clientes.',
    },
    tags: ['TDD', 'Clean Code', 'Agile'],
  },
];

export const education = {
  degree: { en: 'BSc Computer Engineering, Software Security', es: 'Grado en Ingeniería Informática, mención en Seguridad del Software' },
  school: 'Universidad de Las Palmas de Gran Canaria',
  period: '2012 – 2018',
};

export const principles: { title: L; body: L; glyph: string }[] = [
  {
    glyph: '01',
    title: { en: 'Architecture is about trade-offs', es: 'La arquitectura va de compromisos' },
    body: {
      en: 'Clean Architecture and DDD where the business logic lives, pragmatic shortcuts everywhere else. I document decisions so teams can disagree with them later.',
      es: 'Clean Architecture y DDD donde vive la lógica de negocio, atajos pragmáticos en todo lo demás. Documento las decisiones para que el equipo pueda cuestionarlas después.',
    },
  },
  {
    glyph: '02',
    title: { en: 'Tests first', es: 'Primero los tests' },
    body: {
      en: 'I’ve worked with TDD since my first job. A fast test suite is what lets people and coding agents change code safely.',
      es: 'Trabajo con TDD desde mi primer empleo. Una batería de tests rápida es lo que permite a personas y agentes cambiar el código con seguridad.',
    },
  },
  {
    glyph: '03',
    title: { en: 'AI in the daily workflow', es: 'IA en el día a día' },
    body: {
      en: 'I use coding agents, MCP servers and automated pipelines to get more out of small teams. Every change still goes through tests, evals and a human review.',
      es: 'Uso agentes de código, servidores MCP y pipelines automatizados para sacar más partido a equipos pequeños. Cada cambio sigue pasando por tests, evaluaciones y revisión humana.',
    },
  },
  {
    glyph: '04',
    title: { en: 'You build it, you run it', es: 'Quien lo construye, lo opera' },
    body: {
      en: 'Infrastructure as code, observability from the start, and SRE habits. Once it’s deployed, it’s still my job to keep it running.',
      es: 'Infraestructura como código, observabilidad desde el inicio y hábitos de SRE. Una vez desplegado, mantenerlo en pie sigue siendo cosa mía.',
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
