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
    'hero.title1': 'Desarrollador',
    'hero.title2': 'Multiplataforma',
    'hero.subtitle': 'Creando soluciones tecnológicas innovadoras con código limpio y diseño centrado en el usuario.',
    'hero.ctaProjects': 'Ver Proyectos',
    'hero.ctaContact': 'Contactar',
    'about.title': 'Sobre Mí',
    'about.lead': 'Desarrollador multiplataforma en formación, apasionado por crear soluciones tecnológicas que marquen la diferencia.',
    'about.p1': 'Actualmente estudio el ciclo superior de Desarrollo de Aplicaciones Multiplataforma (DAM) en La Salle Gràcia, Barcelona. Durante mi formación he adquirido habilidades sólidas en programación, resolución de problemas y trabajo en equipo.',
    'about.p2': 'Me considero una persona curiosa, responsable y con facilidad para aprender y adaptarme a nuevos entornos. Mi objetivo es seguir creciendo como desarrollador y aplicar mis conocimientos en proyectos que me permitan evolucionar profesional y personalmente.',
    'experience.title': 'Experiencia',
    'exp1.title': 'Desarrollador de software',
    'exp1.type': 'Jornada parcial',
    'exp1.dates': 'Oct. 2025 — Abr. 2026',
    'exp1.duration': '· 7 meses',
    'exp1.location': 'Barcelona, Cataluña, España · Presencial',
    'exp1.desc': 'Desempeño el cargo de programador en JavaScript y PHP, participando en el desarrollo del ERP corporativo y en el mantenimiento de las aplicaciones internas de la empresa. Colaboro con el equipo en la mejora continua de los sistemas y en la implantación de soluciones que optimizan los procesos de la organización.',
    'exp2.title': 'Profesor de clases particulares',
    'exp2.company': 'Autónomo',
    'exp2.dates': '2022 — 2024',
    'exp2.duration': '· 2 años',
    'exp2.location': 'Barcelona, Cataluña, España · Presencial',
    'exp2.desc': 'Impartí clases particulares de forma autónoma, ayudando a estudiantes a consolidar conocimientos y a preparar materias. Esta experiencia me permitió desarrollar la capacidad de explicar conceptos de forma clara, adaptarme a distintos ritmos de aprendizaje y organizar el trabajo de manera autónoma.',
    'about.downloadCv': 'Descargar CV',
    'skills.title': 'Habilidades',
    'skill.mobile': 'Desarrollo Móvil',
    'skill.web': 'Desarrollo Web',
    'skill.lang': 'Lenguajes',
    'skill.backend': 'Back-end',
    'skill.tools': 'Herramientas',
    'projects.title': 'Proyectos',
    'proj.worldscope.desc': 'Explorador global de países con datos, filtros y vista clara para descubrir información geográfica.',
    'proj.cinetrack.desc': 'Plataforma para seguir películas, descubrir títulos y mantener tu colección personal organizada.',
    'proj.taskpulse.desc': 'App Android para organizar tareas y notas con calendario, recordatorios, archivo automático y exportación local.',
    'proj.viewGithub': 'Ver en GitHub',
    'contact.title': 'Contacto',
    'contact.lead': '¿Tienes un proyecto en mente? Hablemos y diseñemos juntos la solución.',
    'contact.labelEmail': 'Email',
    'contact.labelPhone': 'Teléfono',
    'form.name': 'Nombre',
    'form.email': 'Email',
    'form.subject': 'Asunto',
    'form.message': 'Mensaje',
    'form.submit': 'Enviar mensaje',
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
    'hero.title1': 'Desenvolupador',
    'hero.title2': 'Multiplataforma',
    'hero.subtitle': 'Creant solucions tecnològiques innovadores amb codi net i disseny centrat en l\'usuari.',
    'hero.ctaProjects': 'Veure Projectes',
    'hero.ctaContact': 'Contactar',
    'about.title': 'Sobre Mi',
    'about.lead': 'Desenvolupador multiplataforma en formació, apassionat per crear solucions tecnològiques que marquin la diferència.',
    'about.p1': 'Actualment estudio el cicle superior de Desenvolupament d\'Aplicacions Multiplataforma (DAM) a La Salle Gràcia, Barcelona. Durant la meva formació he adquirit habilitats sòlides en programació, resolució de problemes i treball en equip.',
    'about.p2': 'Em considero una persona curiosa, responsable i amb facilitat per aprendre i adaptar-me a nous entorns. El meu objectiu és seguir creixent com a desenvolupador i aplicar els meus coneixements en projectes que em permetin evolucionar professional i personalment.',
    'experience.title': 'Experiència',
    'exp1.title': 'Desenvolupador de programari',
    'exp1.type': 'Jornada parcial',
    'exp1.dates': 'Oct. 2025 — Abr. 2026',
    'exp1.duration': '· 7 mesos',
    'exp1.location': 'Barcelona, Catalunya, Espanya · Presencial',
    'exp1.desc': 'Exerceixo el càrrec de programador en JavaScript i PHP, participant en el desenvolupament de l\'ERP corporatiu i en el manteniment de les aplicacions internes de l\'empresa. Col·laboro amb l\'equip en la millora contínua dels sistemes i en la implantació de solucions que optimitzen els processos de l\'organització.',
    'exp2.title': 'Professor de classes particulars',
    'exp2.company': 'Autònom',
    'exp2.dates': '2022 — 2024',
    'exp2.duration': '· 2 anys',
    'exp2.location': 'Barcelona, Catalunya, Espanya · Presencial',
    'exp2.desc': 'Vaig impartir classes particulars de forma autònoma, ajudant estudiants a consolidar coneixements i a preparar matèries. Aquesta experiència em va permetre desenvolupar la capacitat d\'explicar conceptes de forma clara, adaptar-me a diferents ritmes d\'aprenentatge i organitzar la feina de manera autònoma.',
    'about.downloadCv': 'Descarregar CV',
    'skills.title': 'Habilitats',
    'skill.mobile': 'Desenvolupament Mòbil',
    'skill.web': 'Desenvolupament Web',
    'skill.lang': 'Llenguatges',
    'skill.backend': 'Back-end',
    'skill.tools': 'Eines',
    'projects.title': 'Projectes',
    'proj.worldscope.desc': 'Explorador global de països amb dades, filtres i vista clara per descobrir informació geogràfica.',
    'proj.cinetrack.desc': 'Plataforma per seguir pel·lícules, descobrir títols i mantenir la teva col·lecció personal organitzada.',
    'proj.taskpulse.desc': 'App Android per organitzar tasques i notes amb calendari, recordatoris, arxiu automàtic i exportació local.',
    'proj.viewGithub': 'Veure a GitHub',
    'contact.title': 'Contacte',
    'contact.lead': 'Tens un projecte en ment? Parlem i dissenyem junts la solució.',
    'contact.labelEmail': 'Email',
    'contact.labelPhone': 'Telèfon',
    'form.name': 'Nom',
    'form.email': 'Email',
    'form.subject': 'Assumpte',
    'form.message': 'Missatge',
    'form.submit': 'Enviar missatge',
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
    'hero.title1': 'Multiplatform',
    'hero.title2': 'Developer',
    'hero.subtitle': 'Building innovative tech solutions with clean code and user-centered design.',
    'hero.ctaProjects': 'View Projects',
    'hero.ctaContact': 'Get in Touch',
    'about.title': 'About Me',
    'about.lead': 'Multiplatform developer in training, passionate about creating technology solutions that make a difference.',
    'about.p1': 'I am currently studying the Higher Degree in Multiplatform Application Development (DAM) at La Salle Gràcia, Barcelona. During my training I have gained solid skills in programming, problem solving and teamwork.',
    'about.p2': 'I consider myself curious, responsible and quick to learn and adapt to new environments. My goal is to keep growing as a developer and apply my knowledge in projects that allow me to evolve professionally and personally.',
    'experience.title': 'Experience',
    'exp1.title': 'Software Developer',
    'exp1.type': 'Part-time',
    'exp1.dates': 'Oct 2025 — Apr 2026',
    'exp1.duration': '· 7 months',
    'exp1.location': 'Barcelona, Catalonia, Spain · On-site',
    'exp1.desc': 'I work as a JavaScript and PHP developer, contributing to the corporate ERP and maintaining the company\'s internal applications. I collaborate with the team on continuous system improvements and implementing solutions that optimize organizational processes.',
    'exp2.title': 'Private Tutor',
    'exp2.company': 'Self-employed',
    'exp2.dates': '2022 — 2024',
    'exp2.duration': '· 2 years',
    'exp2.location': 'Barcelona, Catalonia, Spain · On-site',
    'exp2.desc': 'I provided private tutoring independently, helping students consolidate knowledge and prepare for subjects. This experience helped me explain concepts clearly, adapt to different learning paces and organize work autonomously.',
    'about.downloadCv': 'Download CV',
    'skills.title': 'Skills',
    'skill.mobile': 'Mobile Development',
    'skill.web': 'Web Development',
    'skill.lang': 'Languages',
    'skill.backend': 'Back-end',
    'skill.tools': 'Tools',
    'projects.title': 'Projects',
    'proj.worldscope.desc': 'Global country explorer with data, filters and a clear view to discover geographic information.',
    'proj.cinetrack.desc': 'Platform to track movies, discover titles and keep your personal collection organized.',
    'proj.taskpulse.desc': 'Android app to organize tasks and notes with calendar, reminders, automatic archiving and local export.',
    'proj.viewGithub': 'View on GitHub',
    'contact.title': 'Contact',
    'contact.lead': 'Have a project in mind? Let\'s talk and design the solution together.',
    'contact.labelEmail': 'Email',
    'contact.labelPhone': 'Phone',
    'form.name': 'Name',
    'form.email': 'Email',
    'form.subject': 'Subject',
    'form.message': 'Message',
    'form.submit': 'Send message',
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
