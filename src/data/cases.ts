// Case studies, told as stories. Shared data + copy per language.
// Accent markup in copy: *red*  ~outline~  ^grey^
import { Lang } from "../i18n"

type Station = { name: string; q: string }

export interface CaseCopy {
  title: string
  kicker?: string
  outcome: string
  discipline: string
  intro?: string
  story?: { heading: string; body?: string; list?: { t: string; d: string }[]; images: number[]; flow?: boolean }[]
  closing?: string
  captions?: string[]
  flow?: { main: Station[]; branch: Station[]; shortcut: Station[] }
}

interface CaseBase {
  id: string
  number: string
  year: string
  image: string
  images: string[]
  ready: boolean
  coverDark?: boolean
  repo?: string
  live?: string
  copy: Record<Lang, CaseCopy>
}

export type CaseStudy = Omit<CaseBase, "copy"> & CaseCopy

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

const NAU: CaseBase = {
  id: "nau-22",
  number: "01",
  year: "2026",
  image: asset("work/nau-22-cover.webp"),
  images: [1, 2, 3, 4, 5, 6, 7].map((n) => asset(`work/nau-22-${n}.webp`)),
  ready: true,
  coverDark: true,
  repo: "https://github.com/Areman-05/Nau-22",
  live: "https://areman-05.github.io/Nau-22/",
  copy: {
    es: {
      title: "NAU-22",
      kicker: "Galería de exposiciones",
      outcome: "Una web de sala: *la obra manda* y la interfaz se aparta.",
      discipline: "UX/UI · Frontend",
      intro: "Diseño UX/UI y desarrollo frontend para una galería de arte contemporáneo en el 22@ de Barcelona.",
      captions: ["Inicio", "Programa", "Exposición", "Artistas", "Artista", "Journal", "Proyecto"],
      story: [
        {
          heading: "No es una tienda. ~Es entrar en sala.~",
          body: "Las webs de galería suelen ser listados fríos o interfaces que se ponen delante de la obra. NAU-22 hace lo contrario: muestra qué hay colgado, quién lo hace y cómo llegar. Sin carrito ni ruido.",
          images: [0],
        },
        {
          heading: "Cinco preguntas, ^una por ruta.^",
          body: "Qué hay hoy, qué se expone, quién lo hace, qué se publica y cómo visitar la nau. Consultar una obra es un gesto secundario: un correo con la pieza, el artista y la exposición ya escritos.",
          images: [1, 2],
        },
        {
          heading: "Un recorrido, *no un menú.*",
          body: "Cada sección responde a una pregunta y lleva a la siguiente. El viaje principal acaba en una consulta con contexto; desde cualquier punto, la visita está a un paso.",
          images: [],
          flow: true,
        },
        {
          heading: "La interfaz como *pared.*",
          list: [
            { t: "La obra manda", d: "Imágenes a escala de sala, fondo neutro y texto mínimo." },
            { t: "Cartelas, no fichas", d: "Artista, título, año y técnica. Tono de sala, no de campaña." },
            { t: "Un recorrido", d: "Del programa al artista y de ahí a la visita, siempre con vuelta atrás clara." },
            { t: "Honestidad", d: "El proyecto se explica con el edificio, el manifiesto y los datos de visita." },
          ],
          images: [3, 4],
        },
        {
          heading: "Sin CMS. ^Sin backend.^ ~Sin ruido.~",
          body: "Next.js, React, TypeScript y Tailwind. El contenido vive tipado y validado con tests, la web está en español e inglés, y la animación aparece solo donde aporta presencia.",
          images: [5, 6],
        },
      ],
      closing: "El mejor producto de galería es el que *no se disfraza de tienda.*",
      flow: {
        main: [
          { name: "Inicio", q: "¿Qué hay hoy?" },
          { name: "Programa", q: "Qué se expone" },
          { name: "Ficha expo", q: "Obras" },
          { name: "Artista", q: "Quién + archivo" },
          { name: "Consulta", q: "Correo con contexto" },
        ],
        branch: [
          { name: "Journal", q: "Qué se publica" },
          { name: "Artículo", q: "Noticia" },
        ],
        shortcut: [
          { name: "Proyecto", q: "Manifiesto" },
          { name: "Visitar", q: "Cómo llegar" },
        ],
      },
    },
    ca: {
      title: "NAU-22",
      kicker: "Galeria d'exposicions",
      outcome: "Una web de sala: *l'obra mana* i la interfície s'aparta.",
      discipline: "UX/UI · Frontend",
      intro: "Disseny UX/UI i desenvolupament frontend per a una galeria d'art contemporani al 22@ de Barcelona.",
      captions: ["Inici", "Programa", "Exposició", "Artistes", "Artista", "Journal", "Projecte"],
      story: [
        {
          heading: "No és una botiga. ~És entrar a sala.~",
          body: "Les webs de galeria solen ser llistats freds o interfícies que es posen davant de l'obra. NAU-22 fa el contrari: mostra què hi ha penjat, qui ho fa i com arribar-hi. Sense carretó ni soroll.",
          images: [0],
        },
        {
          heading: "Cinc preguntes, ^una per ruta.^",
          body: "Què hi ha avui, què s'exposa, qui ho fa, què es publica i com visitar la nau. Consultar una obra és un gest secundari: un correu amb la peça, l'artista i l'exposició ja escrits.",
          images: [1, 2],
        },
        {
          heading: "Un recorregut, *no un menú.*",
          body: "Cada secció respon a una pregunta i porta a la següent. El viatge principal acaba en una consulta amb context; des de qualsevol punt, la visita és a un pas.",
          images: [],
          flow: true,
        },
        {
          heading: "La interfície com a *paret.*",
          list: [
            { t: "L'obra mana", d: "Imatges a escala de sala, fons neutre i text mínim." },
            { t: "Cartel·les, no fitxes", d: "Artista, títol, any i tècnica. To de sala, no de campanya." },
            { t: "Un recorregut", d: "Del programa a l'artista i d'aquí a la visita, sempre amb tornada enrere clara." },
            { t: "Honestedat", d: "El projecte s'explica amb l'edifici, el manifest i les dades de visita." },
          ],
          images: [3, 4],
        },
        {
          heading: "Sense CMS. ^Sense backend.^ ~Sense soroll.~",
          body: "Next.js, React, TypeScript i Tailwind. El contingut viu tipat i validat amb tests, la web és en castellà i anglès, i l'animació apareix només on aporta presència.",
          images: [5, 6],
        },
      ],
      closing: "El millor producte de galeria és el que *no es disfressa de botiga.*",
      flow: {
        main: [
          { name: "Inici", q: "Què hi ha avui?" },
          { name: "Programa", q: "Què s'exposa" },
          { name: "Fitxa expo", q: "Obres" },
          { name: "Artista", q: "Qui + arxiu" },
          { name: "Consulta", q: "Correu amb context" },
        ],
        branch: [
          { name: "Journal", q: "Què es publica" },
          { name: "Article", q: "Notícia" },
        ],
        shortcut: [
          { name: "Projecte", q: "Manifest" },
          { name: "Visitar", q: "Com arribar-hi" },
        ],
      },
    },
    en: {
      title: "NAU-22",
      kicker: "Exhibition gallery",
      outcome: "A gallery-room website: *the work leads* and the interface steps aside.",
      discipline: "UX/UI · Frontend",
      intro: "UX/UI design and frontend development for a contemporary art gallery in Barcelona's 22@ district.",
      captions: ["Home", "Programme", "Exhibition", "Artists", "Artist", "Journal", "Project"],
      story: [
        {
          heading: "Not a shop. ~Walking into the room.~",
          body: "Gallery websites tend to be cold listings or interfaces that get in front of the art. NAU-22 does the opposite: it shows what's on the walls, who made it and how to get there. No cart, no noise.",
          images: [0],
        },
        {
          heading: "Five questions, ^one per route.^",
          body: "What's on today, what's exhibited, who makes it, what's published and how to visit the nau. Enquiring about a work is a secondary gesture: an email with the piece, artist and exhibition already filled in.",
          images: [1, 2],
        },
        {
          heading: "A journey, *not a menu.*",
          body: "Each section answers one question and leads to the next. The main journey ends in an enquiry with context; from anywhere, the visit is one step away.",
          images: [],
          flow: true,
        },
        {
          heading: "The interface as a *wall.*",
          list: [
            { t: "The work leads", d: "Room-scale images, neutral background, minimal text." },
            { t: "Labels, not product cards", d: "Artist, title, year and medium. A gallery tone, not a campaign." },
            { t: "A journey", d: "From programme to artist to visit, always with a clear way back." },
            { t: "Honesty", d: "The project is explained through the building, the manifesto and visiting details." },
          ],
          images: [3, 4],
        },
        {
          heading: "No CMS. ^No backend.^ ~No noise.~",
          body: "Next.js, React, TypeScript and Tailwind. Content lives typed and validated by tests, the site is in Spanish and English, and animation appears only where it adds presence.",
          images: [5, 6],
        },
      ],
      closing: "The best gallery product is the one that *doesn't dress up as a shop.*",
      flow: {
        main: [
          { name: "Home", q: "What's on today?" },
          { name: "Programme", q: "What's exhibited" },
          { name: "Exhibition", q: "Works" },
          { name: "Artist", q: "Who + archive" },
          { name: "Enquiry", q: "Email with context" },
        ],
        branch: [
          { name: "Journal", q: "What's published" },
          { name: "Article", q: "News" },
        ],
        shortcut: [
          { name: "Project", q: "Manifesto" },
          { name: "Visit", q: "Getting there" },
        ],
      },
    },
  },
}

const upcoming = (n: number): CaseBase => {
  const c = (title: string, outcome: string): CaseCopy => ({ title, outcome, discipline: "UX/UI · Frontend" })
  return {
    id: `proximo-${n}`,
    number: `0${n}`,
    year: "2026",
    image: "",
    images: [],
    ready: false,
    copy: {
      es: c("Próximo proyecto", "En preparación"),
      ca: c("Proper projecte", "En preparació"),
      en: c("Next project", "In progress"),
    },
  }
}

const BASE: CaseBase[] = [NAU, upcoming(2), upcoming(3), upcoming(4), upcoming(5)]

export function getCases(lang: Lang): CaseStudy[] {
  return BASE.map(({ copy, ...rest }) => ({ ...rest, ...copy[lang] }))
}
