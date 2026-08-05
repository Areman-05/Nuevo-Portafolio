const STORAGE_KEY = 'portfolio-lang';
const LANG_HTML = { esp: 'es', cat: 'ca', eng: 'en' };
const LANG_ORDER = ['esp', 'cat', 'eng'];
const LANG_LABELS = { esp: 'ESP', cat: 'CAT', eng: 'ENG' };
const LANG_FLAGS = {
  esp: { src: 'imagenes/flags/es.svg', alt: 'Español' },
  cat: { src: 'imagenes/flags/cat.svg', alt: 'Català' },
  eng: { src: 'imagenes/flags/gb.svg', alt: 'English' }
};

const translations = {
  esp: {
    'meta.title.home': 'Pablo Arenas — Desarrollador Multiplataforma',
    'meta.title.about': 'Sobre Mí — Pablo Arenas',
    'meta.title.projects': 'Proyectos — Pablo Arenas',
    'meta.title.contact': 'Contacto — Pablo Arenas',
    'meta.title.azimut': 'Azimut Estructuras — Pablo Arenas',
    'nav.back': '← Volver',
    'nav.home': 'HOME',
    'nav.about': 'SOBRE MÍ',
    'nav.projects': 'PROYECTOS',
    'nav.contact': 'CONTACTO',
    'hero.eyebrow': 'Pablo Arenas',
    'hero.title1': 'Desarrollador',
    'hero.title2': 'Multiplataforma',
    'hero.subtitle': 'Creando soluciones tecnológicas innovadoras con código limpio y diseño centrado en el usuario.',
    'hero.ctaProjects': 'Ver Proyectos',
    'hero.ctaContact': 'Contactar',
    'hero.ctaTalk': 'Hablemos',
    'about.title': 'Sobre Mí',
    'about.tagline': 'Diseño y desarrollo de productos digitales con criterio técnico y atención a la experiencia de usuario.',
    'about.greeting': 'Hola, soy Pablo Arenas, desarrollador multiplataforma.',
    'about.welcome': 'Bienvenido a mi portfolio. Soy desarrollador multiplataforma, egresado de DAM, y actualmente curso DAW para reforzar mi especialización en desarrollo web. Trabajo en back-end, aplicaciones nativas y entornos web, con atención a la calidad del código, la usabilidad y los objetivos de cada proyecto.',
    'about.stat1.label': 'Año de experiencia',
    'about.stat2.label': 'Proyectos completados',
    'about.stat3.label': 'Tecnologías en mi stack',
    'about.lead': 'Soy Pablo Arenas, desarrollador multiplataforma egresado de DAM. Actualmente curso DAW para consolidar mi perfil en desarrollo web. Trabajo en back-end, aplicaciones nativas y entornos web, con un enfoque en soluciones sólidas, mantenibles y alineadas con los objetivos de negocio.',
    'about.p1': 'Priorizo que el software no solo funcione, sino que resulte claro y usable: interfaces ordenadas, flujos comprensibles y decisiones de diseño fundamentadas. Cuido la percepción de cada pantalla —jerarquía, espaciado y ritmo— porque la UI/UX es donde el desarrollo se traduce en valor para el usuario.',
    'experience.title': 'Mi experiencia laboral',
    'experience.subtitle': 'Roles en los que he aplicado desarrollo, diseño y trabajo directo con usuarios.',
    'experience.companyLabel': 'Empresa:',
    'experience.durationLabel': 'Duración:',
    'exp1.title': 'Desarrollador de Software',
    'exp1.company': 'Empresa d\'Inserció Solucions Socials Sostenibles (EISSS)',
    'exp1.dates': 'Oct. 2025 — Mayo 2026',
    'exp1.description': 'Diseño e implementación de interfaces funcionales con CSS, mejorando la usabilidad en aplicaciones de logística. Desarrollo de lógica de negocio en Java y Python, optimizando estructuras de datos entre backend y frontend. Monitorización del sistema y resolución de incidencias críticas para garantizar estabilidad y una experiencia fluida.',
    'exp2.title': 'Profesor de clases particulares',
    'exp2.company': 'Autónomo',
    'exp2.dates': '2022 — 2024',
    'exp2.description': 'Clases particulares a medida reforzando materias y preparación de exámenes. Explicación de conceptos de forma clara y adaptada al ritmo de cada alumno. Gestión de agenda, seguimiento del progreso y organización del trabajo de forma autónoma.',
    'about.downloadCv': 'Descargar CV',
    'skills.title': 'Habilidades',
    'skills.heroTitle': 'Mis habilidades clave',
    'skills.heroLead': 'Con formación en DAM y especialización en curso en DAW, abordo el ciclo de desarrollo completo para construir aplicaciones y sitios web robustos y responsivos.',
    'skill.mobile': 'Desarrollo Móvil',
    'skill.web': 'Desarrollo Web',
    'skill.lang': 'Lenguajes',
    'skill.backend': 'Back-end',
    'skill.tools': 'Herramientas',
    'projects.title': 'Proyectos',
    'projects.workTitle': 'Mis proyectos',
    'projects.lead1': 'Portfolio de aplicaciones móviles, desarrollo web y software',
    'projects.lead2': 'desarrollado en proyectos propios y en equipo.',
    'projects.more': 'Más proyectos →',
    'projects.upcoming.title': 'Más proyectos',
    'projects.upcoming.lead': 'Aquí irán las portadas de nuevas piezas del portfolio. De momento, el espacio está reservado.',
    'projects.upcoming.empty': 'Próximamente',
    'proj.breakerx.tagline': 'Web colaborativa · writeups y retos CTF',
    'proj.taskpulse.tagline': 'App de notas y tareas',
    'proj.vigorly.tagline': 'App de fitness · Jetpack Compose',
    'proj.workflowdesk.tagline': 'Clientes, proyectos y Kanban · offline',
    'proj.azimut.tagline': 'Arquitectura modular · web premium',
    'proj.worldscope.desc': 'Explorador global de países con datos, filtros y vista clara para descubrir información geográfica.',
    'proj.cinetrack.desc': 'Plataforma para seguir películas, descubrir títulos y mantener tu colección personal organizada.',
    'proj.taskpulse.desc': 'App Android para organizar tareas y notas con calendario, recordatorios, archivo automático y exportación local.',
    'proj.viewGithub': 'Ver en GitHub',
    'contact.title': 'Contacto',
    'contact.lead': '¿Tienes un proyecto en mente? Hablemos y diseñemos juntos la solución.',
    'contact.heroTitle': 'Creemos juntos',
    'contact.heroLead': 'Mi objetivo es crear y desarrollar experiencias web, así que siempre busco nuevas oportunidades para colaborar.',
    'contact.midText': 'Desarrollado con dedicación y código limpio. Gracias por pasarte — creemos algo realmente extraordinario juntos.',
    'contact.mid1': 'Desarrollado con dedicación y código limpio.',
    'contact.mid2': 'Gracias por pasarte — creemos algo realmente extraordinario',
    'contact.mid3': 'juntos.',
    'contact.midHome': 'Inicio',
    'contact.midProjects': 'Proyectos',
    'contact.midAbout': 'Sobre mí',
    'contact.labelEmail': 'Email',
    'contact.labelPhone': 'Teléfono',
    'form.name': 'Nombre*',
    'form.email': 'Email*',
    'form.subject': 'Asunto*',
    'form.message': 'Mensaje*',
    'form.submit': 'Enviar ahora →',
    'footer.rights': '© 2026 Pablo Arenas Mancebo. Todos los derechos reservados.',
    'footer.home': 'Inicio',
    'lang.aria': 'Idioma'
  },
  cat: {
    'meta.title.home': 'Pablo Arenas — Desenvolupador Multiplataforma',
    'meta.title.about': 'Sobre Mi — Pablo Arenas',
    'meta.title.projects': 'Projectes — Pablo Arenas',
    'meta.title.contact': 'Contacte — Pablo Arenas',
    'meta.title.azimut': 'Azimut Estructuras — Pablo Arenas',
    'nav.back': '← Tornar',
    'nav.home': 'HOME',
    'nav.about': 'SOBRE MI',
    'nav.projects': 'PROJECTES',
    'nav.contact': 'CONTACTE',
    'hero.eyebrow': 'Pablo Arenas',
    'hero.title1': 'Desenvolupador',
    'hero.title2': 'Multiplataforma',
    'hero.subtitle': 'Creant solucions tecnològiques innovadores amb codi net i disseny centrat en l\'usuari.',
    'hero.ctaProjects': 'Veure Projectes',
    'hero.ctaContact': 'Contactar',
    'hero.ctaTalk': 'Parlem',
    'about.title': 'Sobre Mi',
    'about.tagline': 'Disseny i desenvolupament de productes digitals amb criteri tècnic i atenció a l\'experiència d\'usuari.',
    'about.greeting': 'Hola, sóc el Pablo Arenas, desenvolupador multiplataforma.',
    'about.welcome': 'Benvingut al meu portfolio. Sóc desenvolupador multiplataforma, titulat de DAM, i actualment curso DAW per reforçar la meva especialització en desenvolupament web. Treballo en back-end, aplicacions natives i entorns web, amb atenció a la qualitat del codi, la usabilitat i els objectius de cada projecte.',
    'about.stat1.label': 'Any d\'experiència',
    'about.stat2.label': 'Projectes completats',
    'about.stat3.label': 'Tecnologies al meu stack',
    'about.lead': 'Sóc el Pablo Arenas, desenvolupador multiplataforma titulat de DAM. Actualment curso DAW per consolidar el meu perfil en desenvolupament web. Treballo en back-end, aplicacions natives i entorns web, amb un enfocament en solucions sòlides, mantenibles i alineades amb els objectius de negoci.',
    'about.p1': 'Prioritzo que el programari no només funcioni, sinó que resulti clar i usable: interfícies ordenades, fluxos comprensibles i decisions de disseny fonamentades. Cuido la percepció de cada pantalla —jerarquia, espaiat i ritme— perquè la UI/UX és on el desenvolupament es tradueix en valor per a l\'usuari.',
    'experience.title': 'La meva experiència laboral',
    'experience.subtitle': 'Rols en els quals he aplicat desenvolupament, disseny i treball directe amb usuaris.',
    'experience.companyLabel': 'Empresa:',
    'experience.durationLabel': 'Durada:',
    'exp1.title': 'Desenvolupador de Software',
    'exp1.company': 'Empresa d\'Inserció Solucions Socials Sostenibles (EISSS)',
    'exp1.dates': 'Oct. 2025 — Maig 2026',
    'exp1.description': 'Disseny i implementació d\'interfícies funcionals amb CSS, millorant la usabilitat en aplicacions de logística. Desenvolupament de lògica de negoci en Java i Python, optimitzant estructures de dades entre backend i frontend. Monitorització del sistema i resolució d\'incidències crítiques per garantir estabilitat i una experiència fluida.',
    'exp2.title': 'Professor de classes particulars',
    'exp2.company': 'Autònom',
    'exp2.dates': '2022 — 2024',
    'exp2.description': 'Classes particulars a mida reforçant matèries i preparació d\'exàmens. Explicació de conceptes de forma clara i adaptada al ritme de cada alumne. Gestió d\'agenda, seguiment del progrés i organització de la feina de forma autònoma.',
    'about.downloadCv': 'Descarregar CV',
    'skills.title': 'Habilitats',
    'skills.heroTitle': 'Les meves habilitats clau',
    'skills.heroLead': 'Amb formació en DAM i especialització en curs en DAW, abordo el cicle de desenvolupament complet per construir aplicacions i llocs web robustos i responsius.',
    'skill.mobile': 'Desenvolupament Mòbil',
    'skill.web': 'Desenvolupament Web',
    'skill.lang': 'Llenguatges',
    'skill.backend': 'Back-end',
    'skill.tools': 'Eines',
    'projects.title': 'Projectes',
    'projects.workTitle': 'Els meus projectes',
    'projects.lead1': 'Portfolio d\'aplicacions mòbils, desenvolupament web i programari',
    'projects.lead2': 'desenvolupat en projectes propis i en equip.',
    'projects.more': 'Més projectes →',
    'projects.upcoming.title': 'Més projectes',
    'projects.upcoming.lead': 'Aquí hi haurà les portades de noves peces del portfolio. De moment, l\'espai està reservat.',
    'projects.upcoming.empty': 'Properament',
    'proj.breakerx.tagline': 'Web col·laborativa · writeups i reptes CTF',
    'proj.taskpulse.tagline': 'App de notes i tasques',
    'proj.vigorly.tagline': 'App de fitness · Jetpack Compose',
    'proj.workflowdesk.tagline': 'Clients, projectes i Kanban · offline',
    'proj.azimut.tagline': 'Arquitectura modular · web premium',
    'proj.worldscope.desc': 'Explorador global de països amb dades, filtres i vista clara per descobrir informació geogràfica.',
    'proj.cinetrack.desc': 'Plataforma per seguir pel·lícules, descobrir títols i mantenir la teva col·lecció personal organitzada.',
    'proj.taskpulse.desc': 'App Android per organitzar tasques i notes amb calendari, recordatoris, arxiu automàtic i exportació local.',
    'proj.viewGithub': 'Veure a GitHub',
    'contact.title': 'Contacte',
    'contact.lead': 'Tens un projecte en ment? Parlem i dissenyem junts la solució.',
    'contact.heroTitle': 'Creem junts',
    'contact.heroLead': 'El meu objectiu és crear i desenvolupar experiències web, així que sempre busco noves oportunitats per col·laborar.',
    'contact.midText': 'Desenvolupat amb dedicació i codi net. Gràcies per passar — creem alguna cosa realment extraordinària junts.',
    'contact.mid1': 'Desenvolupat amb dedicació i codi net.',
    'contact.mid2': 'Gràcies per passar — creem alguna cosa realment extraordinària',
    'contact.mid3': 'junts.',
    'contact.midHome': 'Inici',
    'contact.midProjects': 'Projectes',
    'contact.midAbout': 'Sobre mi',
    'contact.labelEmail': 'Email',
    'contact.labelPhone': 'Telèfon',
    'form.name': 'Nom*',
    'form.email': 'Email*',
    'form.subject': 'Assumpte*',
    'form.message': 'Missatge*',
    'form.submit': 'Enviar ara →',
    'footer.rights': '© 2026 Pablo Arenas Mancebo. Tots els drets reservats.',
    'footer.home': 'Inici',
    'lang.aria': 'Idioma'
  },
  eng: {
    'meta.title.home': 'Pablo Arenas — Multiplatform Developer',
    'meta.title.about': 'About Me — Pablo Arenas',
    'meta.title.projects': 'Projects — Pablo Arenas',
    'meta.title.contact': 'Contact — Pablo Arenas',
    'meta.title.azimut': 'Azimut Estructuras — Pablo Arenas',
    'nav.back': '← Back',
    'nav.home': 'HOME',
    'nav.about': 'ABOUT ME',
    'nav.projects': 'PROJECTS',
    'nav.contact': 'CONTACT',
    'hero.eyebrow': 'Pablo Arenas',
    'hero.title1': 'Multiplatform',
    'hero.title2': 'Developer',
    'hero.subtitle': 'Building innovative tech solutions with clean code and user-centered design.',
    'hero.ctaProjects': 'View Projects',
    'hero.ctaContact': 'Get in Touch',
    'hero.ctaTalk': "Let's Talk",
    'about.title': 'About Me',
    'about.tagline': 'Design and development of digital products with technical judgment and a focus on user experience.',
    'about.greeting': 'Hello, I am Pablo Arenas, a multiplatform developer.',
    'about.welcome': 'Welcome to my portfolio. I am a multiplatform developer who completed DAM and I am currently studying DAW to strengthen my specialization in web development. I work across back-end, native applications and web environments, with attention to code quality, usability and each project\'s goals.',
    'about.stat1.label': 'Year of experience',
    'about.stat2.label': 'Projects completed',
    'about.stat3.label': 'Technologies in my stack',
    'about.lead': 'I am Pablo Arenas, a multiplatform developer who completed DAM. I am currently studying DAW to consolidate my profile in web development. I work across back-end, native applications and web environments, focused on solid, maintainable solutions aligned with business objectives.',
    'about.p1': 'I prioritize software that not only works, but is clear and usable: orderly interfaces, understandable flows and well-founded design decisions. I care about how each screen is perceived —hierarchy, spacing and rhythm— because UI/UX is where development turns into value for the user.',
    'experience.title': 'My Work Experience',
    'experience.subtitle': 'Roles where I have applied development, design and direct work with users.',
    'experience.companyLabel': 'Company:',
    'experience.durationLabel': 'Duration:',
    'exp1.title': 'Software Developer',
    'exp1.company': 'Empresa d\'Inserció Solucions Socials Sostenibles (EISSS)',
    'exp1.dates': 'Oct 2025 — May 2026',
    'exp1.description': 'Design and implementation of functional interfaces with CSS, improving usability in logistics applications. Business logic development in Java and Python, optimizing data structures between backend and frontend. System monitoring and resolution of critical incidents to ensure stability and a smooth experience.',
    'exp2.title': 'Private Tutor',
    'exp2.company': 'Self-employed',
    'exp2.dates': '2022 — 2024',
    'exp2.description': 'Tailored private lessons reinforcing subjects and exam preparation. Clear explanations adapted to each student\'s pace. Schedule management, progress tracking and self-organized work.',
    'about.downloadCv': 'Download CV',
    'skills.title': 'Skills',
    'skills.heroTitle': 'My Core Skills',
    'skills.heroLead': 'With a DAM background and DAW specialization underway, I cover the full development cycle to build robust, responsive applications and websites.',
    'skill.mobile': 'Mobile Development',
    'skill.web': 'Web Development',
    'skill.lang': 'Languages',
    'skill.backend': 'Back-end',
    'skill.tools': 'Tools',
    'projects.title': 'Projects',
    'projects.workTitle': 'My projects',
    'projects.lead1': 'Portfolio of mobile apps, web development and software',
    'projects.lead2': 'built in solo and team projects.',
    'projects.more': 'More projects →',
    'projects.upcoming.title': 'More projects',
    'projects.upcoming.lead': 'Cover images for new portfolio pieces will appear here. For now, the space is reserved.',
    'projects.upcoming.empty': 'Coming soon',
    'proj.breakerx.tagline': 'Collaborative web · writeups and CTF challenges',
    'proj.taskpulse.tagline': 'Notes and tasks app',
    'proj.vigorly.tagline': 'Fitness app · Jetpack Compose',
    'proj.workflowdesk.tagline': 'Clients, projects and Kanban · offline',
    'proj.azimut.tagline': 'Modular architecture · premium web',
    'proj.worldscope.desc': 'Global country explorer with data, filters and a clear view to discover geographic information.',
    'proj.cinetrack.desc': 'Platform to track movies, discover titles and keep your personal collection organized.',
    'proj.taskpulse.desc': 'Android app to organize tasks and notes with calendar, reminders, automatic archiving and local export.',
    'proj.viewGithub': 'View on GitHub',
    'contact.title': 'Contact',
    'contact.lead': 'Have a project in mind? Let\'s talk and design the solution together.',
    'contact.heroTitle': 'Let\'s Create Together',
    'contact.heroLead': 'My mission is to create and develop web experiences, so I\'m always looking for new opportunities to collaborate.',
    'contact.midText': 'Built with care and clean, efficient code. Thanks for stopping by — let\'s create something truly amazing together.',
    'contact.mid1': 'Built with care and clean, efficient code.',
    'contact.mid2': 'Thanks for stopping by — let\'s create something truly amazing',
    'contact.mid3': 'together.',
    'contact.midHome': 'Home',
    'contact.midProjects': 'Projects',
    'contact.midAbout': 'About',
    'contact.labelEmail': 'Email',
    'contact.labelPhone': 'Phone',
    'form.name': 'Name*',
    'form.email': 'Email*',
    'form.subject': 'Subject*',
    'form.message': 'Message*',
    'form.submit': 'Send Now →',
    'footer.rights': '© 2026 Pablo Arenas Mancebo. All rights reserved.',
    'footer.home': 'Home',
    'lang.aria': 'Language'
  }
};

function getStoredLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return translations[stored] ? stored : 'esp';
}

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  const assetPrefix = document.body.dataset.assetPrefix || '';

  document.documentElement.lang = LANG_HTML[lang];

  const page = document.body.dataset.page;
  if (page && t[`meta.title.${page}`]) {
    document.title = t[`meta.title.${page}`];
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    if (t[key] !== undefined) {
      el.alt = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (t[key] !== undefined) {
      el.setAttribute('aria-label', t[key]);
    }
  });

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    const flag = LANG_FLAGS[lang];
    const flagImg = langToggle.querySelector('.lang-toggle__flag');
    if (flag && flagImg) {
      flagImg.src = assetPrefix + flag.src;
      flagImg.alt = flag.alt;
    } else if (!flagImg) {
      langToggle.textContent = LANG_LABELS[lang];
    }
    if (t['lang.aria']) {
      const flagAlt = flag?.alt || LANG_LABELS[lang];
      langToggle.setAttribute('aria-label', `${t['lang.aria']}: ${flagAlt}`);
    }
  }
}

function cycleLanguage() {
  const current = getStoredLang();
  const currentIndex = LANG_ORDER.indexOf(current);
  const nextLang = LANG_ORDER[(currentIndex + 1) % LANG_ORDER.length];
  setLanguage(nextLang);
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  localStorage.setItem(STORAGE_KEY, lang);
  applyLanguage(lang);
}

function initI18n() {
  if (window.AZIMUT_I18N_PATCH) {
    Object.entries(window.AZIMUT_I18N_PATCH).forEach(([lang, keys]) => {
      if (translations[lang]) {
        Object.assign(translations[lang], keys);
      }
    });
  }

  const lang = getStoredLang();
  applyLanguage(lang);

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', cycleLanguage);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
