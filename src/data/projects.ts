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
  /** How AI was used to build or power the project. */
  ai: L;
  outcome: L;
  note?: L;
}

export const projects: Project[] = [
  {
    slug: 'pet-defense',
    title: 'Pet Defense',
    tagline: {
      en: 'A complete Roblox game designed, built and launched by a two-person studio, with AI built into the whole production process.',
      es: 'Un juego completo de Roblox diseñado, construido y lanzado por un estudio de dos personas, con la IA integrada en todo el proceso de producción.',
    },
    kind: { en: 'Game · AI-native pipeline', es: 'Videojuego · Pipeline nativo de IA' },
    year: '2026',
    role: { en: 'Founder & Technical Lead', es: 'Fundador & Technical Lead' },
    status: { en: 'Live on Roblox', es: 'Publicado en Roblox' },
    hue: 28,
    motif: 'orbits',
    stack: ['Luau', 'Rojo', 'Wally', 'ProfileStore', 'Python', 'Roblox Open Cloud', 'Claude Code', 'GitHub Actions'],
    metrics: [
      { value: '32k', label: { en: 'players reached in pre-launch campaigns', es: 'jugadores alcanzados en campañas pre-lanzamiento' } },
      { value: '138k', label: { en: 'lines of Luau', es: 'líneas de Luau' } },
      { value: '2', label: { en: 'people on the team', es: 'personas en el equipo' } },
      { value: '9', label: { en: 'architecture decision records', es: 'registros de decisiones (ADR)' } },
    ],
    links: [{ label: { en: 'Play on Roblox', es: 'Jugar en Roblox' }, href: 'https://www.roblox.com/games/127844763631870/PET-DEFENSE' }],
    gallery: [
      { src: petIsland, alt: { en: 'Pet Defense key art, tropical island biome', es: 'Arte de Pet Defense, bioma de isla tropical' } },
      { src: petTundra, alt: { en: 'Pet Defense key art, frozen tundra biome', es: 'Arte de Pet Defense, bioma de tundra helada' } },
      {
        src: petAbyss,
        alt: { en: 'Pet Defense key art, The Abyss roguelike mode', es: 'Arte de Pet Defense, modo roguelike The Abyss' },
      },
    ],
    overview: {
      en: 'A pet-rescue idle game for Roblox. Players rescue, heal and collect pets, grow their sanctuary, find rare species and evolve them through four stages. It also has raids, expeditions, co-op battles, a season pass and a full live-ops economy.',
      es: 'Un idle de rescate de mascotas para Roblox. Los jugadores rescatan, curan y coleccionan mascotas, amplían su santuario, descubren especies raras y las evolucionan en cuatro etapas. También tiene raids, expediciones, batallas cooperativas, pase de temporada y una economía live-ops completa.',
    },
    challenge: {
      en: 'We wanted to ship a game with the scope of a mid-size studio (dozens of connected systems, multiplayer, monetisation and live operations) with only two people, and keep the code clean enough to reuse in our next games.',
      es: 'Queríamos lanzar un juego con el alcance de un estudio mediano (decenas de sistemas conectados, multijugador, monetización y operaciones en vivo) siendo solo dos personas, y mantener el código lo bastante limpio para reutilizarlo en los siguientes juegos.',
    },
    approach: [
      {
        en: 'The code is split into a reusable Core (data, currency, inventory, progression, shop, networking) shared by server, client and GUI, and a game layer on top. Modules are strictly typed, with more than 90 shared types.',
        es: 'El código se divide en un Core reutilizable (datos, moneda, inventario, progresión, tienda, red) compartido por servidor, cliente y GUI, y una capa de juego encima. Los módulos están estrictamente tipados, con más de 90 tipos compartidos.',
      },
      {
        en: 'The server owns the game state to prevent cheating. Content is driven by config, so new species, biomes and shop items don’t need code changes. Players share a social hub and each one gets a private instanced sanctuary.',
        es: 'El servidor es el dueño del estado del juego para evitar trampas. El contenido se define por configuración, así que nuevas especies, biomas o artículos no requieren tocar código. Los jugadores comparten un hub social y cada uno tiene su propio santuario instanciado.',
      },
      {
        en: 'I wrote the live-ops tooling in Python: balance and XP simulators, Roblox Open Cloud automation and a pipeline that generates the pet thumbnails.',
        es: 'Escribí las herramientas de live-ops en Python: simuladores de balance y XP, automatización con Roblox Open Cloud y un pipeline que genera las miniaturas de las mascotas.',
      },
    ],
    ai: {
      en: 'Claude Code is part of the daily workflow. The repo has its own commands, rules and templates, hooks that load context at the start of each session, a hook that blocks any push with debug flags on, Claude reviews on every pull request, and a CI step that turns each merge into social media drafts through our agent platform.',
      es: 'Claude Code forma parte del trabajo diario. El repo tiene sus propios comandos, reglas y plantillas, hooks que cargan contexto al empezar cada sesión, un hook que bloquea cualquier push con flags de debug activos, revisión de Claude en cada pull request y un paso de CI que convierte cada merge en borradores para redes sociales mediante nuestra plataforma de agentes.',
    },
    outcome: {
      en: 'A complete game, live on Roblox and run by two people. Pre-launch marketing campaigns reached 32,000 players, and the core systems are ready to reuse in the studio’s next titles.',
      es: 'Un juego completo, publicado en Roblox y gestionado por dos personas. Las campañas de marketing previas al lanzamiento alcanzaron a 32.000 jugadores, y los sistemas base están listos para reutilizarse en los siguientes juegos del estudio.',
    },
  },
  {
    slug: 'yoqze-agents',
    title: 'Yoqze Agents',
    tagline: {
      en: 'An AI agent platform that handles community support, ticket triage, automated fixes and content drafts. Running in production.',
      es: 'Una plataforma de agentes de IA que se encarga del soporte a la comunidad, el triaje de tickets, los arreglos automáticos y los borradores de contenido. En producción.',
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
      en: 'The agents behind the studio. A Discord assistant answers players using a knowledge base generated from the game’s own config. There is also moderation, AI triage of support tickets into GitHub issues, Claude investigations and fixes, and a pipeline that turns commits into social posts. Everything can be monitored from an admin dashboard.',
      es: 'Los agentes que hay detrás del estudio. Un asistente en Discord responde a los jugadores con una base de conocimiento generada desde la propia configuración del juego. Además hay moderación, triaje de tickets con IA hacia issues de GitHub, investigaciones y arreglos con Claude, y un pipeline que convierte commits en publicaciones para redes. Todo se supervisa desde un dashboard de administración.',
    },
    challenge: {
      en: 'A two-person studio can’t staff support and marketing. The goal was to cover both with agents while keeping LLM costs and wrong answers under control, and without tying the platform to a single game or channel.',
      es: 'Un estudio de dos personas no puede dedicar a nadie a soporte y marketing. El objetivo era cubrir ambas cosas con agentes, manteniendo bajo control el coste de los LLMs y las respuestas erróneas, y sin atar la plataforma a un único juego o canal.',
    },
    approach: [
      {
        en: 'The core doesn’t know about Discord. An adapter normalises incoming messages for the orchestrator and the agent registry. Each project has its own folder with config, prompts, knowledge and sync rules, and a single bot instance routes messages by community.',
        es: 'El núcleo no sabe nada de Discord. Un adaptador normaliza los mensajes que entran para el orquestador y el registro de agentes. Cada proyecto tiene su carpeta con configuración, prompts, conocimiento y reglas de sincronización, y una sola instancia del bot enruta los mensajes por comunidad.',
      },
      {
        en: 'Two model tiers to keep costs down. A cheap model (Llama 4 Scout on Groq) answers most questions with the knowledge embedded in the prompt, and Claude Sonnet takes the harder ones. Every call is logged with tokens, cost and latency.',
        es: 'Dos niveles de modelo para contener el coste. Un modelo barato (Llama 4 Scout en Groq) responde la mayoría de preguntas con el conocimiento incluido en el prompt, y Claude Sonnet se encarga de las difíciles. Cada llamada queda registrada con tokens, coste y latencia.',
      },
      {
        en: 'The guides and FAQs the bot uses are generated from the game’s Luau configuration, with rules for what players are allowed to see. When the game changes, the bot’s knowledge changes with it.',
        es: 'Las guías y FAQs que usa el bot se generan a partir de la configuración Luau del juego, con reglas sobre lo que pueden ver los jugadores. Cuando cambia el juego, cambia también lo que sabe el bot.',
      },
    ],
    ai: {
      en: 'Support tickets are classified by AI and opened as GitHub issues. A two-step Claude investigation adds its findings as a comment, and adding a label lets an agent create a branch, write the fix and open a pull request, which then gets reviewed by another agent and by a person.',
      es: 'Los tickets de soporte se clasifican con IA y se abren como issues de GitHub. Una investigación de Claude en dos pasos deja sus conclusiones en un comentario, y al añadir una etiqueta un agente crea la rama, escribe el arreglo y abre la pull request, que después revisan otro agente y una persona.',
    },
    outcome: {
      en: 'It runs on a VPS behind Caddy with automatic HTTPS, deploys over SSH from CI and backs up daily. It serves the game’s community and our development workflow every day.',
      es: 'Funciona en un VPS detrás de Caddy con HTTPS automático, se despliega por SSH desde CI y hace backups diarios. Da servicio cada día a la comunidad del juego y a nuestro flujo de desarrollo.',
    },
  },
  {
    slug: 'statement-extraction-api',
    title: 'Statement Extraction API',
    tagline: {
      en: 'An API that turns bank statement PDFs into reconciled JSON. An LLM extracts the data and plain accounting checks verify it.',
      es: 'Una API que convierte extractos bancarios en PDF en JSON conciliado. Un LLM extrae los datos y unas comprobaciones contables deterministas los verifican.',
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
      en: 'A self-serve, pay-per-use API for developers that turns bank statements into structured data (JSON, CSV or XLSX), focused on Spanish and Latin American formats. It includes batch processing with signed webhooks, credit billing, a developer dashboard and SDKs in six languages.',
      es: 'Una API self-service y de pago por uso que convierte extractos bancarios en datos estructurados (JSON, CSV o XLSX), centrada en formatos de España y Latinoamérica. Incluye procesamiento por lotes con webhooks firmados, facturación por créditos, un dashboard para developers y SDKs en seis lenguajes.',
    },
    challenge: {
      en: 'LLMs read messy documents very well, but they can’t guarantee the numbers add up. With financial data, a single wrong figure makes the whole extraction useless, so every result has to be checked.',
      es: 'Los LLMs leen muy bien documentos desordenados, pero no garantizan que las cifras cuadren. Con datos financieros, una sola cifra mal hace inútil toda la extracción, así que cada resultado tiene que comprobarse.',
    },
    approach: [
      {
        en: 'The model returns structured output through forced tool use. Then plain code checks that the opening balance plus all transactions equals the closing balance, and that the running balance is consistent on every row.',
        es: 'El modelo devuelve una salida estructurada mediante tool use forzado. Después, código normal comprueba que el saldo inicial más los movimientos dé el saldo final y que el saldo acumulado cuadre en cada fila.',
      },
      {
        en: 'The provider can be switched between Claude and Gemini. A router tries the cheap path first and uses the PDF’s native text whenever the document allows it.',
        es: 'El proveedor se puede cambiar entre Claude y Gemini. Un router prueba primero la vía barata y usa el texto nativo del PDF siempre que el documento lo permite.',
      },
      {
        en: 'The rest is the usual production work: HMAC-signed webhooks, Stripe credits charged only when an extraction succeeds, OAuth identities tied to provider and subject to prevent account takeover, CSRF protection, rate limiting and typed errors.',
        es: 'El resto es el trabajo habitual de producción: webhooks firmados con HMAC, créditos de Stripe que solo se cobran si la extracción sale bien, identidades OAuth ligadas a proveedor y sujeto para evitar robos de cuenta, protección CSRF, rate limiting y errores tipados.',
      },
    ],
    ai: {
      en: 'I chose the model with evals. I compared accuracy and cost per document on a held-out set of real statements, and the mid-tier model won: the largest one was about 1.8× more expensive with no measurable improvement. Synthetic data is only used for training, never for measuring.',
      es: 'Elegí el modelo con evaluaciones. Comparé precisión y coste por documento sobre un conjunto reservado de extractos reales, y ganó el modelo intermedio: el más grande costaba 1,8 veces más sin una mejora medible. Los datos sintéticos solo se usan para entrenar, nunca para medir.',
    },
    outcome: {
      en: 'A complete product ready to launch, with API, billing, dashboard, docs and SDKs. I built it on my own, working with coding agents throughout.',
      es: 'Un producto completo listo para lanzar, con API, facturación, dashboard, documentación y SDKs. Lo he construido yo solo, trabajando con agentes de código en todo momento.',
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
      en: 'A team-building assistant that ships from a single codebase as a desktop app, a PWA and a Claude artifact.',
      es: 'Un asistente para montar equipos que se publica desde un mismo código como app de escritorio, PWA y artifact de Claude.',
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
      en: 'A planning assistant for Naruto Online players. You mark the ninjas you own and it suggests which teams to build for each game mode, what to get next and what’s worth upgrading. All data stays on your device and there are no accounts.',
      es: 'Un asistente de planificación para jugadores de Naruto Online. Marcas los ninjas que tienes y te sugiere qué equipos montar para cada modo de juego, qué conseguir después y en qué merece la pena invertir. Los datos se quedan en tu dispositivo y no hay cuentas.',
    },
    challenge: {
      en: 'Turning hundreds of characters, scattered community knowledge and complex team mechanics into simple, personal advice, and getting it to players on Windows, Android, iPhone and Mac without maintaining three separate apps.',
      es: 'Convertir cientos de personajes, conocimiento de la comunidad disperso y mecánicas de equipo complejas en consejos sencillos y personalizados, y llevarlos a jugadores de Windows, Android, iPhone y Mac sin mantener tres apps distintas.',
    },
    approach: [
      {
        en: 'A Python data pipeline (standard library only, with rate-limited scrapers) builds a SQLite knowledge base. Playwright handles the pages that need a real browser.',
        es: 'Un pipeline de datos en Python (solo librería estándar, con scrapers con rate limiting) construye una base de conocimiento en SQLite. Playwright se encarga de las páginas que necesitan un navegador real.',
      },
      {
        en: 'A single vanilla JS codebase targets three channels through feature flags: a Tauri 2 desktop app, an installable PWA on GitHub Pages and a Claude artifact.',
        es: 'Un único código en JS vanilla llega a tres canales mediante feature flags: una app de escritorio con Tauri 2, una PWA instalable en GitHub Pages y un artifact de Claude.',
      },
      {
        en: 'The app updates itself with signed releases, and content packages are signed separately so new data ships without reinstalling. The source is private and CI publishes everything to the public repos.',
        es: 'La app se actualiza sola con releases firmadas, y los paquetes de contenido se firman por separado para publicar datos nuevos sin reinstalar. El código es privado y el CI lo publica todo en los repos públicos.',
      },
    ],
    ai: {
      en: 'It started as a Claude artifact and I kept developing it with Claude Code until it became a full product. A project memory file keeps the game rules, data contracts and conventions in context, and the app clearly marks AI-suggested team combinations as untested.',
      es: 'Empezó como un artifact de Claude y lo seguí desarrollando con Claude Code hasta convertirlo en un producto completo. Un fichero de memoria del proyecto mantiene en contexto las reglas del juego, los contratos de datos y las convenciones, y la app marca claramente como no probadas las combinaciones sugeridas por IA.',
    },
    outcome: {
      en: 'A bilingual app with signed Windows releases and an installable PWA for everything else. I maintain it on my own.',
      es: 'Una app bilingüe con releases firmadas para Windows y una PWA instalable para el resto. La mantengo yo solo.',
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
      en: 'A Windows companion app with a live DPS meter, pet tracker and boss timers, built on real-time packet decoding.',
      es: 'Una app companion para Windows con medidor de DPS en vivo, rastreador de mascotas y temporizadores de jefes, basada en decodificar paquetes en tiempo real.',
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
      en: 'A desktop app for Aion 2 players. It tracks pet souls on an interactive map with a farming plan, shows the merchant’s stock, alerts you before field bosses spawn and includes a live DPS meter with fight history and rotation checks. It only reads the traffic the game already sends to your PC.',
      es: 'Una app de escritorio para jugadores de Aion 2. Sigue las almas de mascotas en un mapa interactivo con plan de farmeo, muestra el stock del mercader, avisa antes de que aparezcan los jefes de campo e incluye un medidor de DPS en vivo con historial de combates y análisis de rotación. Solo lee el tráfico que el juego ya envía a tu PC.',
    },
    challenge: {
      en: 'Decoding a compressed, undocumented binary protocol in real time, showing it in a responsive UI on top of a running game, and shipping it to non-technical players as a one-click install that keeps itself updated.',
      es: 'Decodificar en tiempo real un protocolo binario comprimido y sin documentar, mostrarlo en una interfaz fluida encima de un juego en marcha y entregarlo a jugadores no técnicos como una instalación de un clic que se actualiza sola.',
    },
    approach: [
      {
        en: 'The Python backend is split by feature (capture, combat, pets, merchant, bosses) and publishes topics to a Preact UI running in WebView2, with no build step.',
        es: 'El backend en Python está dividido por funcionalidades (captura, combate, mascotas, mercader, jefes) y publica topics hacia una UI en Preact que corre en WebView2, sin paso de build.',
      },
      {
        en: 'A small C launcher embeds the official Python runtime. The Inno Setup installer and a portable ZIP are built on Linux CI with mingw-w64, and the updater checks the SHA-256 before installing.',
        es: 'Un pequeño lanzador en C incluye el runtime oficial de Python. El instalador de Inno Setup y un ZIP portable se compilan en CI sobre Linux con mingw-w64, y el actualizador comprueba el SHA-256 antes de instalar.',
      },
      {
        en: 'CI opens every screen with Playwright using test data and takes a screenshot. The screenshots on this page come from there.',
        es: 'El CI abre cada pantalla con Playwright usando datos de prueba y hace una captura. Las capturas de esta página salen de ahí.',
      },
    ],
    ai: {
      en: 'I built it pair-programming with AI, from analysing the protocol to the UI. Version 4 was a full rewrite that turned a set of scripts into a structured, tested desktop app.',
      es: 'Lo construí programando en pareja con IA, desde el análisis del protocolo hasta la interfaz. La versión 4 fue una reescritura completa que convirtió un conjunto de scripts en una app de escritorio estructurada y con tests.',
    },
    outcome: {
      en: 'A bilingual desktop app, now on version 4.8, with automated builds, UI tests and verified updates. It’s open source under GPL-3.0 and credits the community projects it builds on.',
      es: 'Una app de escritorio bilingüe, ya en la versión 4.8, con builds automáticos, tests de interfaz y actualizaciones verificadas. Es open source bajo GPL-3.0 y da crédito a los proyectos de la comunidad en los que se basa.',
    },
    note: {
      en: 'Unofficial fan project, not endorsed by the game’s publisher. Use at your own risk.',
      es: 'Proyecto fan no oficial, sin aval del editor del juego. Úsalo bajo tu responsabilidad.',
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
