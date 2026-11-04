export const locales = ['en', 'es'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'en';

/** Text that exists in both languages. */
export type L = Record<Lang, string>;

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'es' ? 'es' : 'en';
}

/**
 * Build a path for a given language. `path` is language-agnostic, e.g. "/work/pet-defense".
 * Page paths always end with a slash (matching the directory-style build GitHub Pages serves);
 * hashes and query strings are preserved.
 */
export function localePath(lang: Lang, path = '/'): string {
  const [, rawPath = '/', suffix = ''] = /^([^#?]*)(.*)$/.exec(path) ?? [];
  let clean = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  if (!clean.endsWith('/')) clean += '/';
  const prefixed = lang === defaultLang ? clean : `/${lang}${clean}`;
  return prefixed + suffix;
}

/** Path to a localised file such as a feed ("/rss.xml" → "/es/rss.xml"). Files never get a trailing slash. */
export function localeFile(lang: Lang, file: string): string {
  const clean = file.startsWith('/') ? file : `/${file}`;
  return lang === defaultLang ? clean : `/${lang}${clean}`;
}

/** Strip the language prefix from a pathname. */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/es(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export const ui = {
  en: {
    'meta.title': 'Jorge Hernández · AI Engineer & Systems Architect',
    'meta.description':
      'Jorge Hernández Suárez is an AI engineer and systems architect based in the Canary Islands. 7+ years building cloud platforms on AWS, Kubernetes and Terraform, and now products powered by LLMs, agents and MCP.',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.path': 'Path',
    'nav.contact': 'Contact',
    'nav.writing': 'Writing',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.skip': 'Skip to content',
    'theme.toggle': 'Toggle colour theme',
    'lang.switch': 'Leer en español',
    'lang.short': 'ES',
    'hero.status': 'Open to new opportunities',
    'hero.role': 'AI Engineer & Systems Architect',
    'hero.title.1': 'I design',
    'hero.title.2': 'AI‑native',
    'hero.title.3': 'systems',
    'hero.title.4': 'and ship them.',
    'hero.lede':
      'I’ve spent the last 7 years building cloud platforms and leading engineering teams. These days I build products where AI does real work, and I still write a lot of the code myself.',
    'hero.cta.work': 'See selected work',
    'hero.cta.contact': 'Get in touch',
    'hero.hint': 'Move to bend the field · click to send a signal',
    'hero.scroll': 'Scroll',
    'hero.local': 'Local time',
    'about.kicker': 'About',
    'about.title': 'Architect, engineer and team lead.',
    'about.portrait': 'Portrait',
    'about.portrait.soon': 'Signal incoming',
    'about.stat.years': 'years building production systems',
    'about.stat.cto': 'years from junior dev to CTO',
    'about.stat.players': 'players reached by Pet Defense before launch',
    'work.kicker': 'Selected work',
    'work.title': 'Recent projects.',
    'work.view': 'View case study',
    'work.cursor': 'View',
    'work.all': 'All projects',
    'work.private': 'Private repository',
    'project.back': 'Back to work',
    'project.role': 'Role',
    'project.year': 'Year',
    'project.stack': 'Stack',
    'project.links': 'Links',
    'project.overview': 'Overview',
    'project.challenge': 'The challenge',
    'project.approach': 'The approach',
    'project.highlights': 'Highlights',
    'project.outcome': 'Outcome',
    'project.ai': 'AI in the loop',
    'project.status': 'Status',
    'project.gallery': 'Gallery',
    'project.story': 'Read the full story',
    'project.next': 'Next project',
    'writing.kicker': 'Writing',
    'writing.title': 'Notes from building with AI.',
    'writing.lede': 'What I’ve learned building products with language models and coding agents, using examples from my own projects.',
    'writing.all': 'All articles',
    'writing.minutes': 'min read',
    'writing.back': 'All articles',
    'writing.rss': 'RSS feed',
    'writing.other': 'Keep reading',
    'path.kicker': 'Path',
    'path.title': 'From junior developer to CTO, and then AI.',
    'path.present': 'Present',
    'principles.kicker': 'Principles',
    'principles.title': 'How I like to work.',
    'stack.kicker': 'Toolbox',
    'contact.kicker': 'Contact',
    'contact.title.1': 'Got a project',
    'contact.title.2': 'in',
    'contact.title.3': 'mind?',
    'contact.lede':
      'I’m open to remote, hybrid or relocating. If you’re working on an AI product, a platform that has to scale or a team that needs technical direction, write to me.',
    'contact.copy': 'Copy email',
    'cv.download': 'Download CV (PDF)',
    'cv.view': 'View CV',
    'cv.title': 'CV',
    'cv.role': 'AI Engineer & Systems Architect · Full Stack',
    'cv.summary': 'Summary',
    'cv.skills': 'Skills',
    'cv.experience': 'Experience',
    'cv.projects': 'Selected projects',
    'cv.education': 'Education',
    'cv.languages': 'Languages',
    'cv.print': 'Print / save as PDF',
    'cv.back': 'Back',
    'cv.portfolio': 'Portfolio',
    'cv.close': 'Close CV',
    'contact.copied': 'Copied to clipboard',
    'footer.built': 'Designed and built by Jorge Hernández.',
    'footer.top': 'Back to top',
    'cmd.placeholder': 'Type a command or search…',
    'cmd.open': 'Open command palette',
    'cmd.hint': 'to open command palette',
    'cmd.empty': 'No results',
    'cmd.group.nav': 'Navigate',
    'cmd.group.actions': 'Actions',
    'cmd.group.links': 'Links',
    'cmd.theme': 'Toggle theme',
    'cmd.lang': 'Cambiar a español',
    'cmd.email': 'Copy email address',
    'cmd.home': 'Home',
    '404.title': 'Signal lost.',
    '404.text': 'This node doesn’t exist in the network. Let’s route you back.',
    '404.home': 'Return home',
  },
  es: {
    'meta.title': 'Jorge Hernández · AI Engineer & Systems Architect',
    'meta.description':
      'Jorge Hernández Suárez es AI engineer y arquitecto de sistemas en Canarias. Más de 7 años construyendo plataformas cloud con AWS, Kubernetes y Terraform, y ahora productos con LLMs, agentes y MCP.',
    'nav.work': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.path': 'Trayectoria',
    'nav.contact': 'Contacto',
    'nav.writing': 'Artículos',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'nav.skip': 'Saltar al contenido',
    'theme.toggle': 'Cambiar tema de color',
    'lang.switch': 'Read in English',
    'lang.short': 'EN',
    'hero.status': 'Abierto a nuevas oportunidades',
    'hero.role': 'AI Engineer & Systems Architect',
    'hero.title.1': 'Diseño sistemas',
    'hero.title.2': 'nativos de IA',
    'hero.title.3': '',
    'hero.title.4': 'y los despliego.',
    'hero.lede':
      'Llevo 7 años construyendo plataformas cloud y liderando equipos de ingeniería. Ahora construyo productos en los que la IA hace trabajo real, y sigo escribiendo buena parte del código.',
    'hero.cta.work': 'Ver proyectos',
    'hero.cta.contact': 'Hablemos',
    'hero.hint': 'Mueve el cursor para deformar el campo · haz clic para enviar una señal',
    'hero.scroll': 'Scroll',
    'hero.local': 'Hora local',
    'about.kicker': 'Sobre mí',
    'about.title': 'Arquitecto, ingeniero y líder de equipo.',
    'about.portrait': 'Retrato',
    'about.portrait.soon': 'Señal entrante',
    'about.stat.years': 'años construyendo sistemas en producción',
    'about.stat.cto': 'años de developer junior a CTO',
    'about.stat.players': 'jugadores alcanzados por Pet Defense antes del lanzamiento',
    'work.kicker': 'Proyectos',
    'work.title': 'Proyectos recientes.',
    'work.view': 'Ver caso de estudio',
    'work.cursor': 'Ver',
    'work.all': 'Todos los proyectos',
    'work.private': 'Repositorio privado',
    'project.back': 'Volver a proyectos',
    'project.role': 'Rol',
    'project.year': 'Año',
    'project.stack': 'Stack',
    'project.links': 'Enlaces',
    'project.overview': 'Resumen',
    'project.challenge': 'El reto',
    'project.approach': 'El enfoque',
    'project.highlights': 'Claves',
    'project.outcome': 'Resultado',
    'project.ai': 'La IA en el proceso',
    'project.status': 'Estado',
    'project.gallery': 'Galería',
    'project.story': 'Lee la historia completa',
    'project.next': 'Siguiente proyecto',
    'writing.kicker': 'Artículos',
    'writing.title': 'Notas sobre construir con IA.',
    'writing.lede':
      'Lo que he aprendido construyendo productos con modelos de lenguaje y agentes de código, con ejemplos de mis propios proyectos.',
    'writing.all': 'Todos los artículos',
    'writing.minutes': 'min de lectura',
    'writing.back': 'Todos los artículos',
    'writing.rss': 'Feed RSS',
    'writing.other': 'Sigue leyendo',
    'path.kicker': 'Trayectoria',
    'path.title': 'De developer junior a CTO, y después a la IA.',
    'path.present': 'Actualidad',
    'principles.kicker': 'Principios',
    'principles.title': 'Cómo me gusta trabajar.',
    'stack.kicker': 'Herramientas',
    'contact.kicker': 'Contacto',
    'contact.title.1': '¿Tienes un proyecto',
    'contact.title.2': 'en',
    'contact.title.3': 'mente?',
    'contact.lede':
      'Estoy abierto a remoto, híbrido o a cambiar de ciudad. Si estás con un producto de IA, una plataforma que tiene que escalar o un equipo que necesita dirección técnica, escríbeme.',
    'contact.copy': 'Copiar email',
    'cv.download': 'Descargar CV (PDF)',
    'cv.view': 'Ver CV',
    'cv.title': 'CV',
    'cv.role': 'AI Engineer & Systems Architect · Full Stack',
    'cv.summary': 'Perfil',
    'cv.skills': 'Competencias',
    'cv.experience': 'Experiencia',
    'cv.projects': 'Proyectos destacados',
    'cv.education': 'Formación',
    'cv.languages': 'Idiomas',
    'cv.print': 'Imprimir / guardar como PDF',
    'cv.back': 'Volver',
    'cv.portfolio': 'Portfolio',
    'cv.close': 'Cerrar CV',
    'contact.copied': 'Copiado al portapapeles',
    'footer.built': 'Diseñado y desarrollado por Jorge Hernández.',
    'footer.top': 'Volver arriba',
    'cmd.placeholder': 'Escribe un comando o busca…',
    'cmd.open': 'Abrir paleta de comandos',
    'cmd.hint': 'para abrir la paleta de comandos',
    'cmd.empty': 'Sin resultados',
    'cmd.group.nav': 'Navegar',
    'cmd.group.actions': 'Acciones',
    'cmd.group.links': 'Enlaces',
    'cmd.theme': 'Cambiar tema',
    'cmd.lang': 'Switch to English',
    'cmd.email': 'Copiar dirección de email',
    'cmd.home': 'Inicio',
    '404.title': 'Señal perdida.',
    '404.text': 'Este nodo no existe en la red. Te llevamos de vuelta.',
    '404.home': 'Volver al inicio',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}
