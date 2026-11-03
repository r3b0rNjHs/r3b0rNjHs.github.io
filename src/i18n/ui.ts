export const locales = ['en', 'es'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'en';

/** Text that exists in both languages. */
export type L = Record<Lang, string>;

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'es' ? 'es' : 'en';
}

/** Build a path for a given language. `path` is language-agnostic, e.g. "/work/pet-defense". */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** Strip the language prefix from a pathname. */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/es(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export const ui = {
  en: {
    'meta.title': 'Jorge Hernández — AI Engineer & Systems Architect',
    'meta.description':
      'Jorge Hernández Suárez designs AI-native systems — from cloud infrastructure to autonomous agents — and ships them to production. 7+ years across AWS, Kubernetes, Terraform, MCP and LLM products.',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.path': 'Path',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.skip': 'Skip to content',
    'theme.toggle': 'Toggle colour theme',
    'lang.switch': 'Leer en español',
    'lang.short': 'ES',
    'hero.status': 'Available for new challenges',
    'hero.role': 'AI Engineer & Systems Architect',
    'hero.title.1': 'I design',
    'hero.title.2': 'AI‑native',
    'hero.title.3': 'systems',
    'hero.title.4': 'and ship them.',
    'hero.lede':
      'From cloud infrastructure to autonomous agents — I turn ambitious ideas into architectures that scale, and stay hands-on in the code that makes them real.',
    'hero.cta.work': 'See selected work',
    'hero.cta.contact': 'Get in touch',
    'hero.hint': 'Move to bend the field · click to send a signal',
    'hero.scroll': 'Scroll',
    'hero.local': 'Local time',
    'about.kicker': 'About',
    'about.title': 'Architect by trade, builder by instinct.',
    'about.portrait': 'Portrait',
    'about.portrait.soon': 'Signal incoming',
    'about.stat.years': 'years building production systems',
    'about.stat.cto': 'years from junior dev to CTO',
    'about.stat.players': 'players reached by an AI-built game',
    'work.kicker': 'Selected work',
    'work.title': 'Things I’ve architected, built and shipped.',
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
    'project.next': 'Next project',
    'path.kicker': 'Path',
    'path.title': 'From junior developer to CTO — and into AI.',
    'path.present': 'Present',
    'principles.kicker': 'How I work',
    'principles.title': 'Principles that survive contact with production.',
    'stack.kicker': 'Toolbox',
    'contact.kicker': 'Contact',
    'contact.title.1': 'Let’s build',
    'contact.title.2': 'something',
    'contact.title.3': 'intelligent.',
    'contact.lede':
      'Open to remote, hybrid and relocation. Whether it’s an AI product, a platform that needs to scale, or a team that needs direction — I’d love to hear about it.',
    'contact.copy': 'Copy email',
    'contact.copied': 'Copied to clipboard',
    'footer.built': 'Designed & engineered by Jorge Hernández, with an AI pair.',
    'footer.top': 'Back to top',
    'cmd.placeholder': 'Type a command or search…',
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
    'meta.title': 'Jorge Hernández — AI Engineer & Systems Architect',
    'meta.description':
      'Jorge Hernández Suárez diseña sistemas nativos de IA — desde la infraestructura cloud hasta agentes autónomos — y los lleva a producción. Más de 7 años con AWS, Kubernetes, Terraform, MCP y productos con LLMs.',
    'nav.work': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.path': 'Trayectoria',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'nav.skip': 'Saltar al contenido',
    'theme.toggle': 'Cambiar tema de color',
    'lang.switch': 'Read in English',
    'lang.short': 'EN',
    'hero.status': 'Disponible para nuevos retos',
    'hero.role': 'AI Engineer & Systems Architect',
    'hero.title.1': 'Diseño sistemas',
    'hero.title.2': 'nativos de IA',
    'hero.title.3': '',
    'hero.title.4': 'y los pongo en producción.',
    'hero.lede':
      'De la infraestructura cloud a los agentes autónomos — convierto ideas ambiciosas en arquitecturas que escalan, sin dejar de picar el código que las hace realidad.',
    'hero.cta.work': 'Ver proyectos',
    'hero.cta.contact': 'Hablemos',
    'hero.hint': 'Mueve el cursor para deformar el campo · haz clic para enviar una señal',
    'hero.scroll': 'Scroll',
    'hero.local': 'Hora local',
    'about.kicker': 'Sobre mí',
    'about.title': 'Arquitecto de oficio, constructor por instinto.',
    'about.portrait': 'Retrato',
    'about.portrait.soon': 'Señal entrante',
    'about.stat.years': 'años construyendo sistemas en producción',
    'about.stat.cto': 'años de developer junior a CTO',
    'about.stat.players': 'jugadores alcanzados por un juego construido con IA',
    'work.kicker': 'Proyectos',
    'work.title': 'Cosas que he diseñado, construido y lanzado.',
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
    'project.next': 'Siguiente proyecto',
    'path.kicker': 'Trayectoria',
    'path.title': 'De developer junior a CTO — y de ahí, a la IA.',
    'path.present': 'Actualidad',
    'principles.kicker': 'Cómo trabajo',
    'principles.title': 'Principios que sobreviven al contacto con producción.',
    'stack.kicker': 'Herramientas',
    'contact.kicker': 'Contacto',
    'contact.title.1': 'Construyamos',
    'contact.title.2': 'algo',
    'contact.title.3': 'inteligente.',
    'contact.lede':
      'Abierto a remoto, híbrido y reubicación. Ya sea un producto con IA, una plataforma que necesita escalar o un equipo que necesita dirección — me encantará escucharte.',
    'contact.copy': 'Copiar email',
    'contact.copied': 'Copiado al portapapeles',
    'footer.built': 'Diseñado y desarrollado por Jorge Hernández, con un compañero IA.',
    'footer.top': 'Volver arriba',
    'cmd.placeholder': 'Escribe un comando o busca…',
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
