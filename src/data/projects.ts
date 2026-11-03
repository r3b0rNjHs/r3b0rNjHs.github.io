import type { ImageMetadata } from 'astro';
import type { L } from '@/i18n/ui';

import nocHome from '@/assets/projects/naruto-online-companion/en-inicio.jpg';
import nocTeams from '@/assets/projects/naruto-online-companion/en-equipos.jpg';
import nocSheet from '@/assets/projects/naruto-online-companion/en-ficha.jpg';
import nocDark from '@/assets/projects/naruto-online-companion/en-oscuro.jpg';
import aionMap from '@/assets/projects/aion2-companion/map.jpg';
import aionDps from '@/assets/projects/aion2-companion/dps.jpg';
import aionPets from '@/assets/projects/aion2-companion/pets.jpg';
import aionBosses from '@/assets/projects/aion2-companion/bosses.jpg';
import petAbyss from '@/assets/projects/pet-defense/thumb-1.png';
import petTundra from '@/assets/projects/pet-defense/thumb-2.png';
import petIsland from '@/assets/projects/pet-defense/thumb-3.png';

export interface ProjectLink {
  label: L;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One-line pitch shown on cards. */
  tagline: L;
  kind: L;
  year: string;
  role: L;
  status: L;
  /** Hue (0–360) used for the generative cover and accents of this project. */
  hue: number;
  /** Glyph drawn in the generative cover. */
  motif: 'orbits' | 'graph' | 'ledger' | 'grid' | 'radar' | 'hexagon';
  stack: string[];
  metrics?: { value: string; label: L }[];
  links: ProjectLink[];
  gallery: { src: ImageMetadata; alt: L }[];
  overview: L;
  challenge: L;
  approach: L[];
  /** How AI was used to build or power the project — the thread through the whole portfolio. */
  ai: L;
  outcome: L;
  note?: L;
}

export const projects: Project[] = [
  {
    slug: 'pet-defense',
    title: 'Pet Defense',
    tagline: {
      en: 'An AI-native production pipeline that let a two-person studio design, build and ship a complete Roblox game.',
      es: 'Un pipeline de producción nativo de IA que permitió a un estudio de dos personas diseñar, construir y lanzar un juego completo en Roblox.',
    },
    kind: { en: 'Game · AI-native pipeline', es: 'Videojuego · Pipeline nativo de IA' },
    year: '2026',
    role: { en: 'Founder & Technical Lead', es: 'Fundador & Technical Lead' },
    status: { en: 'Live on Roblox', es: 'Publicado en Roblox' },
    hue: 28,
    motif: 'orbits',
    stack: ['Luau', 'Rojo', 'Wally', 'ProfileStore', 'Python', 'Roblox Open Cloud', 'Claude Code', 'GitHub Actions'],
    metrics: [
      { value: '32k', label: { en: 'players in pre-launch campaigns', es: 'jugadores en campañas pre-lanzamiento' } },
      { value: '138k', label: { en: 'lines of Luau', es: 'líneas de Luau' } },
      { value: '2', label: { en: 'people on the team', es: 'personas en el equipo' } },
      { value: '9', label: { en: 'architecture decision records', es: 'registros de decisiones (ADR)' } },
    ],
    links: [{ label: { en: 'Play on Roblox', es: 'Jugar en Roblox' }, href: 'https://www.roblox.com/games/127844763631870/PET-DEFENSE' }],
    gallery: [
      { src: petIsland, alt: { en: 'Pet Defense key art — tropical island biome', es: 'Arte de Pet Defense — bioma de isla tropical' } },
      { src: petTundra, alt: { en: 'Pet Defense key art — frozen tundra biome', es: 'Arte de Pet Defense — bioma de tundra helada' } },
      {
        src: petAbyss,
        alt: { en: 'Pet Defense key art — The Abyss roguelike mode', es: 'Arte de Pet Defense — modo roguelike The Abyss' },
      },
    ],
    overview: {
      en: 'A pet-rescue idle/simulator for Roblox: players rescue, heal and collect pets, grow a sanctuary, discover rare species and evolve them through four stages — with raids, expeditions, co-op battles, a season pass and a full live-ops economy.',
      es: 'Un idle/simulador de rescate de mascotas para Roblox: los jugadores rescatan, curan y coleccionan mascotas, hacen crecer su santuario, descubren especies raras y las evolucionan en cuatro etapas — con raids, expediciones, batallas cooperativas, pase de temporada y una economía live-ops completa.',
    },
    challenge: {
      en: 'Ship a game with the scope of a mid-size studio — dozens of interlocking systems, multiplayer, monetisation and live operations — with a team of two, and keep the codebase healthy enough to reuse for the next titles.',
      es: 'Lanzar un juego con el alcance de un estudio mediano — decenas de sistemas interconectados, multijugador, monetización y operaciones en vivo — con un equipo de dos personas, y mantener el código lo bastante sano como para reutilizarlo en los siguientes títulos.',
    },
    approach: [
      {
        en: 'Core/Game architecture: a reusable Core (data, currency, inventory, progression, shop, networking) shared by server, client and GUI, and a game layer on top. Strictly typed modules with 90+ shared types.',
        es: 'Arquitectura Core/Game: un Core reutilizable (datos, moneda, inventario, progresión, tienda, red) compartido por servidor, cliente y GUI, y una capa de juego encima. Módulos estrictamente tipados con más de 90 tipos compartidos.',
      },
      {
        en: 'Server-authoritative state for anti-cheat, config-driven content so new species, biomes and shop items ship without code changes, and a hybrid world: a shared social hub plus instanced personal sanctuaries.',
        es: 'Estado autoritativo en servidor como anti-trampas, contenido dirigido por configuración para añadir especies, biomas y artículos sin tocar código, y un mundo híbrido: un hub social compartido más santuarios personales instanciados.',
      },
      {
        en: 'Live-ops tooling in Python: balance and XP simulators, Roblox Open Cloud automation and an automated pet thumbnail pipeline.',
        es: 'Herramientas live-ops en Python: simuladores de balance y XP, automatización con Roblox Open Cloud y un pipeline automático de miniaturas de mascotas.',
      },
    ],
    ai: {
      en: 'Claude Code is a first-class team member: project commands, rules and templates, session hooks that load context, a guard hook that blocks pushes with debug flags on, Claude PR reviews on every pull request, and a CI step that turns every merge into social-media drafts through our own agent platform.',
      es: 'Claude Code es un miembro más del equipo: comandos, reglas y plantillas del proyecto, hooks de sesión que cargan contexto, un hook de seguridad que bloquea pushes con flags de debug activos, revisiones de PR con Claude en cada pull request y un paso de CI que convierte cada merge en borradores para redes sociales a través de nuestra propia plataforma de agentes.',
    },
    outcome: {
      en: 'A complete, live game built and operated by two people, validated with 32,000 players during pre-launch marketing campaigns — and a reusable core for the studio’s next titles.',
      es: 'Un juego completo y en producción construido y operado por dos personas, validado con 32.000 jugadores durante las campañas de marketing previas al lanzamiento — y un núcleo reutilizable para los siguientes títulos del estudio.',
    },
  },
  {
    slug: 'yoqze-agents',
    title: 'Yoqze Agents',
    tagline: {
      en: 'A multi-project AI agent platform: community support, ticket triage, autonomous fixes and content generation — live in production.',
      es: 'Una plataforma multi-proyecto de agentes de IA: soporte a la comunidad, triaje de tickets, arreglos autónomos y generación de contenido — en producción.',
    },
    kind: { en: 'AI agents · Platform', es: 'Agentes de IA · Plataforma' },
    year: '2026',
    role: { en: 'Architect & Lead Engineer', es: 'Arquitecto & Lead Engineer' },
    status: { en: 'In production', es: 'En producción' },
    hue: 140,
    motif: 'graph',
    stack: ['TypeScript', 'Vercel AI SDK', 'Claude Sonnet', 'Llama 4 (Groq)', 'discord.js', 'Hono', 'SvelteKit', 'SQLite', 'Caddy', 'PM2'],
    metrics: [
      { value: '2', label: { en: 'model tiers routed by cost', es: 'niveles de modelo enrutados por coste' } },
      { value: '6', label: { en: 'dashboard views', es: 'vistas en el dashboard' } },
      { value: '0€', label: { en: 'API cost for moderation', es: 'coste de API en moderación' } },
    ],
    links: [],
    gallery: [],
    overview: {
      en: 'The agent layer behind the studio: a Discord assistant that answers players from a knowledge base generated from the game’s own config, moderation, AI ticket triage into GitHub issues, Claude-powered investigations and fixes, and a pipeline that turns commits into social content — all observable from an admin dashboard.',
      es: 'La capa de agentes detrás del estudio: un asistente en Discord que responde a los jugadores desde una base de conocimiento generada a partir de la propia configuración del juego, moderación, triaje de tickets con IA hacia issues de GitHub, investigaciones y arreglos con Claude, y un pipeline que convierte commits en contenido social — todo observable desde un dashboard de administración.',
    },
    challenge: {
      en: 'Give a tiny team the support and marketing capacity of a big one, without letting LLM costs or hallucinations get out of hand, and without coupling everything to a single game or channel.',
      es: 'Dar a un equipo diminuto la capacidad de soporte y marketing de uno grande, sin que los costes de los LLM ni las alucinaciones se descontrolen, y sin acoplarlo todo a un único juego o canal.',
    },
    approach: [
      {
        en: 'Channel-agnostic core: an adapter normalises messages so the orchestrator and agent registry never know they are talking to Discord. Per-project folders hold config, prompts, knowledge and sync rules, and one bot instance routes by community.',
        es: 'Núcleo agnóstico del canal: un adaptador normaliza los mensajes para que el orquestador y el registro de agentes no sepan que hablan con Discord. Cada proyecto tiene su carpeta con configuración, prompts, conocimiento y reglas de sincronización, y una sola instancia del bot enruta por comunidad.',
      },
      {
        en: 'Cost-aware model routing: a cheap tier (Llama 4 Scout on Groq) handles most questions with knowledge embedded in the prompt; a premium tier (Claude Sonnet) takes the hard ones. Every call is logged with tokens, cost and latency.',
        es: 'Enrutado de modelos según coste: un nivel barato (Llama 4 Scout en Groq) resuelve la mayoría de preguntas con el conocimiento embebido en el prompt; un nivel premium (Claude Sonnet) se encarga de las difíciles. Cada llamada se registra con tokens, coste y latencia.',
      },
      {
        en: 'Knowledge stays true by construction: player-facing guides and FAQs are generated from the game’s Luau configuration with visibility rules, so the bot never drifts from what is actually shipped.',
        es: 'El conocimiento es fiel por construcción: las guías y FAQs para jugadores se generan desde la configuración Luau del juego con reglas de visibilidad, así el bot nunca se desvía de lo que realmente está publicado.',
      },
    ],
    ai: {
      en: 'Agents all the way down: tickets are triaged by AI and opened as GitHub issues, a two-tier Claude investigation comments on them, and a single label lets an agent branch, fix and open the PR — reviewed, of course, by another agent and a human.',
      es: 'Agentes de principio a fin: los tickets se clasifican con IA y se abren como issues de GitHub, una investigación de Claude en dos niveles los comenta, y una sola etiqueta permite que un agente cree la rama, arregle y abra la PR — revisada, claro, por otro agente y por una persona.',
    },
    outcome: {
      en: 'Running in production on a VPS behind Caddy with auto-HTTPS, SSH auto-deploys from CI and daily backups — serving the game’s community and its development workflow every day.',
      es: 'En producción en un VPS tras Caddy con HTTPS automático, despliegues automáticos por SSH desde CI y backups diarios — dando servicio cada día a la comunidad del juego y a su flujo de desarrollo.',
    },
  },
  {
    slug: 'statement-extraction-api',
    title: 'Statement Extraction API',
    tagline: {
      en: 'Bank-statement PDFs in, reconciled JSON out — LLM extraction verified by deterministic accounting checks.',
      es: 'Entran PDFs de extractos bancarios, sale JSON conciliado — extracción con LLMs verificada con comprobaciones contables deterministas.',
    },
    kind: { en: 'AI product · Developer API', es: 'Producto de IA · API para developers' },
    year: '2026',
    role: { en: 'Founder & Engineer', es: 'Fundador & Engineer' },
    status: { en: 'Pre-launch', es: 'Pre-lanzamiento' },
    hue: 210,
    motif: 'ledger',
    stack: ['Python', 'FastAPI', 'Pydantic', 'SQLAlchemy', 'Claude', 'Gemini', 'PyMuPDF', 'Stripe', 'Alembic'],
    metrics: [
      { value: '6', label: { en: 'official SDK languages', es: 'lenguajes con SDK oficial' } },
      { value: '8', label: { en: 'architecture decision records', es: 'registros de decisiones (ADR)' } },
      { value: '3', label: { en: 'models benchmarked head-to-head', es: 'modelos comparados cara a cara' } },
    ],
    links: [],
    gallery: [],
    overview: {
      en: 'A self-serve, usage-based API for developers that turns bank statements into clean, structured data (JSON, CSV or XLSX), with a strategic focus on Spanish and Latin-American formats. Includes batch processing with signed webhooks, credit billing, a developer dashboard and SDKs in six languages.',
      es: 'Una API self-service y de pago por uso que convierte extractos bancarios en datos limpios y estructurados (JSON, CSV o XLSX), con foco estratégico en formatos de España y Latinoamérica. Incluye procesamiento por lotes con webhooks firmados, facturación por créditos, un dashboard para developers y SDKs en seis lenguajes.',
    },
    challenge: {
      en: 'LLMs are great at reading messy documents and terrible at guaranteeing numbers. In finance, “mostly right” is wrong — every extraction has to be provably consistent.',
      es: 'Los LLMs son excelentes leyendo documentos caóticos y pésimos garantizando cifras. En finanzas, “casi bien” es mal — cada extracción tiene que ser demostrablemente coherente.',
    },
    approach: [
      {
        en: 'AI extraction + deterministic reconciliation: the model returns structured output via forced tool-use, then plain code checks that opening balance plus transactions equals the closing balance and that the running balance is continuous row by row.',
        es: 'Extracción con IA + conciliación determinista: el modelo devuelve salida estructurada mediante tool-use forzado y después código plano comprueba que saldo inicial más movimientos sea igual al saldo final, y que el saldo acumulado sea continuo fila a fila.',
      },
      {
        en: 'The model is an implementation detail: a provider-switchable engine (Claude or Gemini) and a cheap-first router that uses native PDF text extraction whenever the document allows it.',
        es: 'El modelo es un detalle de implementación: un motor intercambiable de proveedor (Claude o Gemini) y un router que prioriza lo barato, usando la extracción nativa de texto del PDF siempre que el documento lo permite.',
      },
      {
        en: 'Production-grade surface: HMAC-signed webhooks, Stripe credits charged only on success, OAuth identities bound to provider+subject to prevent account takeover, CSRF guards, rate limiting and typed errors.',
        es: 'Superficie lista para producción: webhooks firmados con HMAC, créditos de Stripe que solo se cobran si la extracción tiene éxito, identidades OAuth ligadas a proveedor+sujeto para evitar secuestros de cuenta, protección CSRF, rate limiting y errores tipados.',
      },
    ],
    ai: {
      en: 'Model choice was driven by evals, not hype: a documented bake-off on a held-out corpus of real statements compared accuracy and cost per document — the mid-tier model won, because the largest one gave no measurable gain at ~1.8× the cost. Synthetic data is used for training only, never for benchmarking.',
      es: 'La elección de modelo la decidieron las evaluaciones, no el hype: una comparativa documentada sobre un corpus reservado de extractos reales midió precisión y coste por documento — ganó el modelo intermedio, porque el más grande no aportaba mejora medible a ~1,8× el coste. Los datos sintéticos solo se usan para entrenar, nunca para medir.',
    },
    outcome: {
      en: 'A complete product ready for launch — API, billing, dashboard, docs and SDKs — built as a solo founder with AI as the engineering team.',
      es: 'Un producto completo listo para lanzar — API, facturación, dashboard, documentación y SDKs — construido como fundador en solitario con la IA como equipo de ingeniería.',
    },
    note: {
      en: 'Codename. The product is being rebranded ahead of launch.',
      es: 'Nombre en clave. El producto se está renombrando antes del lanzamiento.',
    },
  },
  {
    slug: 'naruto-online-companion',
    title: 'Naruto Online Companion',
    tagline: {
      en: 'One codebase, three channels: a team-building assistant shipped as a desktop app, a PWA and a Claude artifact.',
      es: 'Un código, tres canales: un asistente para montar equipos publicado como app de escritorio, PWA y artifact de Claude.',
    },
    kind: { en: 'Product · Desktop & PWA', es: 'Producto · Escritorio y PWA' },
    year: '2026',
    role: { en: 'Creator', es: 'Creador' },
    status: { en: 'Live', es: 'Publicado' },
    hue: 8,
    motif: 'hexagon',
    stack: ['JavaScript', 'Tauri 2', 'Rust', 'PWA', 'Python', 'SQLite', 'Playwright', 'GitHub Actions'],
    metrics: [
      { value: '426', label: { en: 'hand-reviewed character sheets', es: 'fichas de personajes revisadas a mano' } },
      { value: '3', label: { en: 'distribution channels', es: 'canales de distribución' } },
      { value: '2', label: { en: 'languages (EN/ES)', es: 'idiomas (EN/ES)' } },
    ],
    links: [
      { label: { en: 'Open the web app', es: 'Abrir la web app' }, href: 'https://r3b0rnjhs.github.io/naruto-online-companion-web/' },
      {
        label: { en: 'Windows releases', es: 'Descargas para Windows' },
        href: 'https://github.com/r3b0rNjHs/noc-releases/releases/latest',
      },
    ],
    gallery: [
      { src: nocHome, alt: { en: 'Home screen with personalised next steps', es: 'Pantalla de inicio con próximos pasos personalizados' } },
      { src: nocTeams, alt: { en: 'Team recommendations for every game mode', es: 'Recomendaciones de equipos para cada modo de juego' } },
      { src: nocSheet, alt: { en: 'A hand-reviewed character sheet', es: 'Una ficha de personaje revisada a mano' } },
      { src: nocDark, alt: { en: 'Dark theme', es: 'Tema oscuro' } },
    ],
    overview: {
      en: 'A planning assistant for Naruto Online players: mark the ninjas you own and it tells you which teams to build for every game mode, what to get next and what is worth investing in — with all data stored locally and no accounts.',
      es: 'Un asistente de planificación para jugadores de Naruto Online: marcas los ninjas que tienes y te dice qué equipos montar para cada modo de juego, qué conseguir después y en qué merece la pena invertir — con todos los datos en local y sin cuentas.',
    },
    challenge: {
      en: 'Turn hundreds of characters, scattered community knowledge and complex team mechanics into clear, personalised advice — and deliver it to players on Windows, Android, iPhone and Mac without maintaining three apps.',
      es: 'Convertir cientos de personajes, conocimiento de la comunidad disperso y mecánicas de equipo complejas en consejos claros y personalizados — y llevarlos a jugadores en Windows, Android, iPhone y Mac sin mantener tres apps.',
    },
    approach: [
      {
        en: 'A Python data pipeline (standard library only, rate-limited scrapers) builds a SQLite knowledge base; Playwright handles pages that need a real browser.',
        es: 'Un pipeline de datos en Python (solo librería estándar, scrapers con rate limiting) construye una base de conocimiento SQLite; Playwright se encarga de las páginas que necesitan un navegador real.',
      },
      {
        en: 'One vanilla-JS web codebase targets three channels with feature flags: a Tauri 2 desktop app, an installable PWA on GitHub Pages and a Claude artifact.',
        es: 'Un único código web en JS vanilla apunta a tres canales con feature flags: una app de escritorio con Tauri 2, una PWA instalable en GitHub Pages y un artifact de Claude.',
      },
      {
        en: 'Signed auto-updates for the app and separately signed content packages, so data updates ship without reinstalling. Private source, public distribution — all published by CI.',
        es: 'Auto-actualizaciones firmadas para la app y paquetes de contenido firmados por separado, para publicar datos nuevos sin reinstalar. Código privado, distribución pública — todo publicado desde CI.',
      },
    ],
    ai: {
      en: 'Born as a Claude artifact and grown with Claude Code into a full product. A curated project memory keeps game rules, data contracts and conventions in context, and the app openly labels AI-suggested team combinations as untested.',
      es: 'Nació como un artifact de Claude y creció con Claude Code hasta ser un producto completo. Una memoria de proyecto curada mantiene en contexto las reglas del juego, los contratos de datos y las convenciones, y la app etiqueta abiertamente las combinaciones sugeridas por IA como no probadas.',
    },
    outcome: {
      en: 'A live, bilingual app with signed releases on Windows and an installable PWA for every other platform — maintained by one person.',
      es: 'Una app bilingüe en producción con releases firmadas en Windows y una PWA instalable para el resto de plataformas — mantenida por una sola persona.',
    },
    note: {
      en: 'Unofficial fan project, not affiliated with the game’s publishers.',
      es: 'Proyecto fan no oficial, sin relación con los editores del juego.',
    },
  },
  {
    slug: 'aion2-companion',
    title: 'Aion 2 Companion',
    tagline: {
      en: 'A Windows companion with a live DPS meter, pet tracker and boss timers — powered by real-time packet decoding.',
      es: 'Un companion para Windows con medidor de DPS en vivo, rastreador de mascotas y temporizadores de jefes — impulsado por decodificación de paquetes en tiempo real.',
    },
    kind: { en: 'Desktop app · Real-time data', es: 'App de escritorio · Datos en tiempo real' },
    year: '2026',
    role: { en: 'Creator', es: 'Creador' },
    status: { en: 'v4.8 · Live', es: 'v4.8 · Publicado' },
    hue: 45,
    motif: 'radar',
    stack: ['Python', 'Scapy', 'Npcap', 'Preact', 'WebView2', 'OpenCV', 'C', 'Inno Setup', 'Playwright'],
    metrics: [
      { value: '4.8', label: { en: 'current major release', es: 'versión actual' } },
      { value: '10+', label: { en: 'feature screens', es: 'pantallas de funcionalidad' } },
      { value: 'SHA‑256', label: { en: 'verified self-updates', es: 'auto-actualizaciones verificadas' } },
    ],
    links: [
      { label: { en: 'Download & docs', es: 'Descarga y documentación' }, href: 'https://github.com/r3b0rNjHs/aion2-companion-releases' },
    ],
    gallery: [
      {
        src: aionMap,
        alt: { en: 'Interactive pet map with spawns and teleports', es: 'Mapa interactivo de mascotas con apariciones y teletransportes' },
      },
      { src: aionDps, alt: { en: 'Live DPS meter by player and skill', es: 'Medidor de DPS en vivo por jugador y habilidad' } },
      { src: aionPets, alt: { en: 'Pet collection tracker', es: 'Rastreador de la colección de mascotas' } },
      { src: aionBosses, alt: { en: 'Field-boss timers per server', es: 'Temporizadores de jefes por servidor' } },
    ],
    overview: {
      en: 'A desktop companion for Aion 2 players: pet-soul tracking with an interactive map and farming plan, merchant inventory, field-boss timers with alerts and a live DPS meter with fight history and rotation checks — reading only the traffic the game already sends to the PC.',
      es: 'Un companion de escritorio para jugadores de Aion 2: seguimiento de almas de mascotas con mapa interactivo y plan de farmeo, inventario del mercader, temporizadores de jefes con alertas y un medidor de DPS en vivo con historial de combates y análisis de rotación — leyendo solo el tráfico que el juego ya envía al PC.',
    },
    challenge: {
      en: 'Decode a compressed, undocumented binary protocol in real time, turn it into a responsive UI on top of a running game, and ship it to non-technical players as a one-click install that keeps itself up to date.',
      es: 'Decodificar en tiempo real un protocolo binario comprimido y sin documentar, convertirlo en una interfaz fluida sobre un juego en ejecución y entregarlo a jugadores no técnicos como una instalación de un clic que se mantiene actualizada sola.',
    },
    approach: [
      {
        en: 'A feature-sliced Python backend (capture, combat, pets, merchant, bosses) publishes topics to a Preact UI hosted in WebView2 — no build step, instant reloads.',
        es: 'Un backend Python organizado por funcionalidades (captura, combate, mascotas, mercader, jefes) publica topics hacia una UI en Preact alojada en WebView2 — sin paso de build, recargas instantáneas.',
      },
      {
        en: 'A tiny C launcher embeds the official Python runtime; an Inno Setup installer and a portable ZIP are built on Linux CI with mingw-w64, and the self-updater verifies SHA-256 before installing.',
        es: 'Un pequeño lanzador en C embebe el runtime oficial de Python; un instalador Inno Setup y un ZIP portable se compilan en CI Linux con mingw-w64, y el auto-actualizador verifica SHA-256 antes de instalar.',
      },
      {
        en: 'CI clicks through every screen with Playwright on fixture data and screenshots it — the same screenshots you see here.',
        es: 'El CI recorre cada pantalla con Playwright sobre datos de prueba y la captura — las mismas capturas que ves aquí.',
      },
    ],
    ai: {
      en: 'Built with AI pair-programming end to end — from protocol analysis to UI — with a full rebuild for v4 that turned a script collection into a structured, tested desktop product.',
      es: 'Construido con pair-programming con IA de principio a fin — del análisis del protocolo a la UI — con una reconstrucción completa en la v4 que convirtió una colección de scripts en un producto de escritorio estructurado y testeado.',
    },
    outcome: {
      en: 'A polished, bilingual desktop app on its 4.8 release, with automated builds, UI tests and verified updates — open source under GPL-3.0 and crediting the community projects it builds on.',
      es: 'Una app de escritorio pulida y bilingüe en su versión 4.8, con builds automáticos, tests de UI y actualizaciones verificadas — open source bajo GPL-3.0 y con crédito a los proyectos de la comunidad en los que se apoya.',
    },
    note: {
      en: 'Unofficial fan project, not endorsed by the game’s publisher. Use at your own risk.',
      es: 'Proyecto fan no oficial, sin aval del editor del juego. Úsalo bajo tu responsabilidad.',
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
