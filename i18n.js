const STORAGE_KEY = 'portfolio-lang';
const LANG_HTML = { esp: 'es', cat: 'ca', eng: 'en' };
const LANG_ORDER = ['esp', 'cat', 'eng'];
const LANG_LABELS = { esp: 'ESP', cat: 'CAT', eng: 'ENG' };

const translations = {
  esp: {
    'meta.title.home': 'Pablo Arenas — Desarrollador Multiplataforma',
    'meta.title.about': 'Sobre Mí — Pablo Arenas',
    'meta.title.projects': 'Proyectos — Pablo Arenas',
    'meta.title.contact': 'Contacto — Pablo Arenas',
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
    'about.tagline': 'Transformando ideas en experiencias digitales interactivas.',
    'about.greeting': 'Hola, soy Pablo — desarrollador multiplataforma apasionado por crear.',
    'about.welcome': 'Bienvenido a mi portfolio. Soy desarrollador multiplataforma (DAM), formado en La Salle Gràcia (Barcelona). Me muevo con soltura en back-end, desarrollo nativo y web para construir soluciones coherentes, con especial atención a la experiencia de usuario.',
    'about.stat1.label': 'Año de experiencia',
    'about.stat2.label': 'Proyectos completados',
    'about.stat3.label': 'Tecnologías en mi stack',
    'about.lead': 'Soy desarrollador multiplataforma (DAM), formado en La Salle Gràcia (Barcelona). Me siento cómodo en todo el ciclo del software —back-end, desarrollo nativo y web— porque entender cada parte del proyecto me ayuda a construir soluciones más coherentes.',
    'about.p1': 'Disfruto de la lógica de negocio, pero donde más disfruto es cuando el código se nota en la experiencia del usuario: pantallas claras, fluidas y fáciles de usar. Soy curioso, responsable y me adapto con rapidez a nuevos entornos y herramientas. Busco aportar en equipos reales, con especial interés en diseño UI/UX, sin cerrarme a otras vías del desarrollo.',
    'experience.title': 'Experiencia',
    'exp1.title': 'Desarrollador de Software',
    'exp1.company': 'Empresa d\'Inserció Solucions Socials Sostenibles (EISS)',
    'exp1.dates': 'Oct. 2025 — Abr. 2026',
    'exp1.duration': '· 8 meses',
    'exp1.location': 'Barcelona (Presencial)',
    'exp1.bullet1.label': 'Frontend & UX:',
    'exp1.bullet1.text': 'Diseño e implementación de interfaces funcionales con CSS, mejorando la usabilidad de aplicaciones de logística.',
    'exp1.bullet2.label': 'Lógica & Datos:',
    'exp1.bullet2.text': 'Desarrollo de la lógica de negocio en Java y Python, optimizando estructuras de datos para conectar backend y frontend.',
    'exp1.bullet3.label': 'Soporte Técnico:',
    'exp1.bullet3.text': 'Monitorización del sistema y resolución de incidencias críticas, garantizando estabilidad y una experiencia fluida para el usuario.',
    'exp2.title': 'Profesor de clases particulares',
    'exp2.company': 'Autónomo',
    'exp2.dates': '2022 — 2024',
    'exp2.duration': '· 2 años',
    'exp2.location': 'Barcelona (Presencial)',
    'exp2.bullet1.label': 'Docencia:',
    'exp2.bullet1.text': 'Clases particulares a medida, reforzando materias y preparación de exámenes.',
    'exp2.bullet2.label': 'Comunicación:',
    'exp2.bullet2.text': 'Explicación de conceptos de forma clara y adaptada al ritmo de cada alumno.',
    'exp2.bullet3.label': 'Autonomía:',
    'exp2.bullet3.text': 'Gestión de agenda, seguimiento del progreso y organización del trabajo sin supervisión directa.',
    'about.downloadCv': 'Descargar CV',
    'skills.title': 'Habilidades',
    'skills.heroTitle': 'Mis habilidades clave',
    'skills.heroLead': 'Como desarrollador multiplataforma, trabajo en todo el ciclo para construir aplicaciones y webs responsivas.',
    'skill.mobile': 'Desarrollo Móvil',
    'skill.web': 'Desarrollo Web',
    'skill.lang': 'Lenguajes',
    'skill.backend': 'Back-end',
    'skill.tools': 'Herramientas',
    'projects.title': 'Proyectos',
    'projects.workTitle': 'Mis proyectos',
    'projects.lead1': 'Portfolio de aplicaciones móviles, desarrollo web y software',
    'projects.lead2': 'desarrollado en proyectos propios y en equipo.',
    'proj.breakerx.tagline': 'Web colaborativa · writeups y retos CTF',
    'proj.taskpulse.tagline': 'App de notas y tareas',
    'proj.worldscope.desc': 'Explorador global de países con datos, filtros y vista clara para descubrir información geográfica.',
    'proj.cinetrack.desc': 'Plataforma para seguir películas, descubrir títulos y mantener tu colección personal organizada.',
    'proj.taskpulse.desc': 'App Android para organizar tareas y notas con calendario, recordatorios, archivo automático y exportación local.',
    'proj.viewGithub': 'Ver en GitHub',
    'contact.title': 'Contacto',
    'contact.lead': '¿Tienes un proyecto en mente? Hablemos y diseñemos juntos la solución.',
    'contact.heroTitle': 'Creemos juntos',
    'contact.heroLead': 'Mi objetivo es crear y desarrollar experiencias web, así que siempre busco nuevas oportunidades para colaborar.',
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
    'footer.rights': '© 2025 Pablo Arenas Mancebo. Todos los derechos reservados.',
    'footer.home': 'Inicio',
    'lang.aria': 'Idioma'
  },
  cat: {
    'meta.title.home': 'Pablo Arenas — Desenvolupador Multiplataforma',
    'meta.title.about': 'Sobre Mi — Pablo Arenas',
    'meta.title.projects': 'Projectes — Pablo Arenas',
    'meta.title.contact': 'Contacte — Pablo Arenas',
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
    'about.tagline': 'Transformant idees en experiències digitals interactives.',
    'about.greeting': 'Hola, sóc en Pablo — desenvolupador multiplataforma amb passió per crear.',
    'about.welcome': 'Benvingut al meu portfolio. Sóc desenvolupador multiplataforma (DAM), format a La Salle Gràcia (Barcelona). Em mouc amb soltesa en back-end, desenvolupament natiu i web per construir solucions coherents, amb especial atenció a l\'experiència d\'usuari.',
    'about.stat1.label': 'Any d\'experiència',
    'about.stat2.label': 'Projectes completats',
    'about.stat3.label': 'Tecnologies al meu stack',
    'about.lead': 'Sóc desenvolupador multiplataforma (DAM), format a La Salle Gràcia (Barcelona). Em sento còmode en tot el cicle del programari —back-end, desenvolupament natiu i web— perquè entendre cada part del projecte m\'ajuda a construir solucions més coherents.',
    'about.p1': 'Gaudeixo de la lògica de negoci, però on més gaudeixo és quan el codi es nota en l\'experiència de l\'usuari: pantalles clares, fluides i fàcils d\'usar. Sóc curiós, responsable i m\'adapto amb rapidesa a nous entorns i eines. Busco aportar en equips reals, amb especial interès en disseny UI/UX, sense tancar-me a altres vies del desenvolupament.',
    'experience.title': 'Experiència',
    'exp1.title': 'Desenvolupador de Software',
    'exp1.company': 'Empresa d\'Inserció Solucions Socials Sostenibles (EISS)',
    'exp1.dates': 'Oct. 2025 — Abr. 2026',
    'exp1.duration': '· 8 mesos',
    'exp1.location': 'Barcelona (Presencial)',
    'exp1.bullet1.label': 'Frontend & UX:',
    'exp1.bullet1.text': 'Disseny i implementació d\'interfícies funcionals amb CSS, millorant la usabilitat d\'aplicacions de logística.',
    'exp1.bullet2.label': 'Lògica & Dades:',
    'exp1.bullet2.text': 'Desenvolupament de la lògica de negoci en Java i Python, optimitzant estructures de dades per connectar backend i frontend.',
    'exp1.bullet3.label': 'Suport Tècnic:',
    'exp1.bullet3.text': 'Monitorització del sistema i resolució d\'incidències crítiques, garantint estabilitat i una experiència fluida per a l\'usuari.',
    'exp2.title': 'Professor de classes particulars',
    'exp2.company': 'Autònom',
    'exp2.dates': '2022 — 2024',
    'exp2.duration': '· 2 anys',
    'exp2.location': 'Barcelona (Presencial)',
    'exp2.bullet1.label': 'Docència:',
    'exp2.bullet1.text': 'Classes particulars a mida, reforçant matèries i preparació d\'exàmens.',
    'exp2.bullet2.label': 'Comunicació:',
    'exp2.bullet2.text': 'Explicació de conceptes de forma clara i adaptada al ritme de cada alumne.',
    'exp2.bullet3.label': 'Autonomia:',
    'exp2.bullet3.text': 'Gestió d\'agenda, seguiment del progrés i organització de la feina sense supervisió directa.',
    'about.downloadCv': 'Descarregar CV',
    'skills.title': 'Habilitats',
    'skills.heroTitle': 'Les meves habilitats clau',
    'skills.heroLead': 'Com a desenvolupador multiplataforma, treballo en tot el cicle per construir aplicacions i webs responsives.',
    'skill.mobile': 'Desenvolupament Mòbil',
    'skill.web': 'Desenvolupament Web',
    'skill.lang': 'Llenguatges',
    'skill.backend': 'Back-end',
    'skill.tools': 'Eines',
    'projects.title': 'Projectes',
    'projects.workTitle': 'Els meus projectes',
    'projects.lead1': 'Portfolio d\'aplicacions mòbils, desenvolupament web i programari',
    'projects.lead2': 'desenvolupat en projectes propis i en equip.',
    'proj.breakerx.tagline': 'Web col·laborativa · writeups i reptes CTF',
    'proj.taskpulse.tagline': 'App de notes i tasques',
    'proj.worldscope.desc': 'Explorador global de països amb dades, filtres i vista clara per descobrir informació geogràfica.',
    'proj.cinetrack.desc': 'Plataforma per seguir pel·lícules, descobrir títols i mantenir la teva col·lecció personal organitzada.',
    'proj.taskpulse.desc': 'App Android per organitzar tasques i notes amb calendari, recordatoris, arxiu automàtic i exportació local.',
    'proj.viewGithub': 'Veure a GitHub',
    'contact.title': 'Contacte',
    'contact.lead': 'Tens un projecte en ment? Parlem i dissenyem junts la solució.',
    'contact.heroTitle': 'Creem junts',
    'contact.heroLead': 'El meu objectiu és crear i desenvolupar experiències web, així que sempre busco noves oportunitats per col·laborar.',
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
    'footer.rights': '© 2025 Pablo Arenas Mancebo. Tots els drets reservats.',
    'footer.home': 'Inici',
    'lang.aria': 'Idioma'
  },
  eng: {
    'meta.title.home': 'Pablo Arenas — Multiplatform Developer',
    'meta.title.about': 'About Me — Pablo Arenas',
    'meta.title.projects': 'Projects — Pablo Arenas',
    'meta.title.contact': 'Contact — Pablo Arenas',
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
    'about.tagline': 'Turning ideas into interactive digital experiences.',
    'about.greeting': 'Hi, I\'m Pablo — a passionate multiplatform developer.',
    'about.welcome': 'Welcome to my portfolio. I am a multiplatform developer (DAM), trained at La Salle Gràcia (Barcelona). I work comfortably across back-end, native and web development to build coherent solutions with a strong focus on user experience.',
    'about.stat1.label': 'Year of experience',
    'about.stat2.label': 'Projects completed',
    'about.stat3.label': 'Technologies in my stack',
    'about.lead': 'I am a multiplatform developer (DAM), trained at La Salle Gràcia (Barcelona). I am comfortable across the full software cycle —back-end, native and web development— because understanding each layer helps me build more coherent solutions.',
    'about.p1': 'I enjoy business logic, but I am most motivated when code shows up in the user experience: clear, smooth and easy-to-use interfaces. I am curious, responsible and quick to adapt to new environments and tools. I want to contribute on real teams, with a strong interest in UI/UX design, while staying open to other development paths.',
    'experience.title': 'Experience',
    'exp1.title': 'Software Developer',
    'exp1.company': 'Empresa d\'Inserció Solucions Socials Sostenibles (EISS)',
    'exp1.dates': 'Oct 2025 — Apr 2026',
    'exp1.duration': '· 8 months',
    'exp1.location': 'Barcelona (On-site)',
    'exp1.bullet1.label': 'Frontend & UX:',
    'exp1.bullet1.text': 'Design and implementation of functional interfaces with CSS, improving usability of logistics applications.',
    'exp1.bullet2.label': 'Logic & Data:',
    'exp1.bullet2.text': 'Business logic development in Java and Python, optimizing data structures to connect backend and frontend.',
    'exp1.bullet3.label': 'Technical Support:',
    'exp1.bullet3.text': 'System monitoring and resolution of critical incidents, ensuring stability and a smooth user experience.',
    'exp2.title': 'Private Tutor',
    'exp2.company': 'Self-employed',
    'exp2.dates': '2022 — 2024',
    'exp2.duration': '· 2 years',
    'exp2.location': 'Barcelona (On-site)',
    'exp2.bullet1.label': 'Teaching:',
    'exp2.bullet1.text': 'Tailored private lessons, reinforcing subjects and exam preparation.',
    'exp2.bullet2.label': 'Communication:',
    'exp2.bullet2.text': 'Clear explanations adapted to each student\'s learning pace.',
    'exp2.bullet3.label': 'Autonomy:',
    'exp2.bullet3.text': 'Schedule management, progress tracking and self-organized work without direct supervision.',
    'about.downloadCv': 'Download CV',
    'skills.title': 'Skills',
    'skills.heroTitle': 'My Core Skills',
    'skills.heroLead': 'As a multiplatform developer, I work across the full stack to build responsive apps and websites.',
    'skill.mobile': 'Mobile Development',
    'skill.web': 'Web Development',
    'skill.lang': 'Languages',
    'skill.backend': 'Back-end',
    'skill.tools': 'Tools',
    'projects.title': 'Projects',
    'projects.workTitle': 'My projects',
    'projects.lead1': 'Portfolio of mobile apps, web development and software',
    'projects.lead2': 'built in solo and team projects.',
    'proj.breakerx.tagline': 'Collaborative web · writeups and CTF challenges',
    'proj.taskpulse.tagline': 'Notes and tasks app',
    'proj.worldscope.desc': 'Global country explorer with data, filters and a clear view to discover geographic information.',
    'proj.cinetrack.desc': 'Platform to track movies, discover titles and keep your personal collection organized.',
    'proj.taskpulse.desc': 'Android app to organize tasks and notes with calendar, reminders, automatic archiving and local export.',
    'proj.viewGithub': 'View on GitHub',
    'contact.title': 'Contact',
    'contact.lead': 'Have a project in mind? Let\'s talk and design the solution together.',
    'contact.heroTitle': 'Let\'s Create Together',
    'contact.heroLead': 'My mission is to create and develop web experiences, so I\'m always looking for new opportunities to collaborate.',
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
    'footer.rights': '© 2025 Pablo Arenas Mancebo. All rights reserved.',
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

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.textContent = LANG_LABELS[lang];
    if (t['lang.aria']) {
      langToggle.setAttribute('aria-label', `${t['lang.aria']}: ${LANG_LABELS[lang]}`);
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
