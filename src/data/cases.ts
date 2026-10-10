// Case studies told as stories: problem → decisions → result.
// Edit freely — text marked with real context should be checked by Pablo.

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=${w}`

export interface CaseStudy {
  id: string
  number: string
  title: string
  outcome: string
  discipline: string
  year: string
  image: string
  images: string[]
  ready: boolean
  meta: { label: string; value: string }[]
  kicker?: string
  coverDark?: boolean
  captions?: string[]
  repo?: string
  flow?: {
    main: { name: string; q: string }[]
    branch: { name: string; q: string }[]
    shortcut: { name: string; q: string }[]
  }
  intro?: string
  story?: { heading: string; body?: string; list?: { t: string; d: string }[]; images: number[]; flow?: boolean }[]
  closing?: string
  idea?: string
  challenge?: string[]
  concept?: string[]
  directionIntro?: string
  resultSummary?: string
  context?: string
  problem?: string
  insight?: string
  decisions?: { title: string; body: string }[]
  build?: { body: string[]; stack: string[] }
  results?: { value: string; label: string }[]
  learned?: string
}

export const CASES: CaseStudy[] = [
  {
    id: "nau-22",
    number: "01",
    title: "NAU-22",
    kicker: "Galería de exposiciones",
    outcome: "Una web de sala: *la obra manda* y la interfaz se aparta.",
    discipline: "UX/UI · Frontend",
    year: "2026",
    image: `${import.meta.env.BASE_URL}work/nau-22-cover.webp`,
    images: [1, 2, 3, 4, 5, 6, 7].map(
      (n) => `${import.meta.env.BASE_URL}work/nau-22-${n}.webp`,
    ),
    captions: ["Inicio", "Programa", "Exposición", "Artistas", "Artista", "Journal", "Proyecto"],
    ready: true,
    coverDark: true,
    repo: "https://github.com/Areman-05/Nau-22",
    meta: [],
    intro: "Diseño UX/UI y desarrollo frontend para una galería de arte contemporáneo en el 22@ de Barcelona.",
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
    closing: "El mejor producto de galería es el que *no se disfraza de tienda.*",
  },
  {
    id: "proximo-2",
    number: "02",
    title: "Próximo proyecto",
    outcome: "En preparación.",
    discipline: "UX/UI · Frontend",
    year: "2026",
    image: "",
    images: [],
    ready: false,
    meta: [],
  },
  {
    id: "proximo-3",
    number: "03",
    title: "Próximo proyecto",
    outcome: "En preparación.",
    discipline: "UX/UI · Frontend",
    year: "2026",
    image: "",
    images: [],
    ready: false,
    meta: [],
  },
  {
    id: "proximo-4",
    number: "04",
    title: "Próximo proyecto",
    outcome: "En preparación.",
    discipline: "UX/UI · Frontend",
    year: "2026",
    image: "",
    images: [],
    ready: false,
    meta: [],
  },
  {
    id: "proximo-5",
    number: "05",
    title: "Próximo proyecto",
    outcome: "En preparación.",
    discipline: "UX/UI · Frontend",
    year: "2026",
    image: "",
    images: [],
    ready: false,
    meta: [],
  },
]
