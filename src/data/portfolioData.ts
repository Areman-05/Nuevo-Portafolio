import { Project, UrbanNode } from "../types"

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const PROJECTS: Project[] = [
  {
    id: "aura-poblenou",
    number: "01",
    title: "Aura 22@",
    subtitle:
      "Archivo Digital y Entorno Espacial para el Distrito Creativo de Poblenou",
    category: "UX/UI Espacial y WebGL",
    discipline: "Dirección de Arte y Arquitectura Frontend",
    city: "Barcelona (22@)",
    year: "2025",
    image: asset("projects/aura.svg"),
    secondaryImage: asset("projects/noord.svg"),
    client: "Institut d'Arquitectura Avançada de Catalunya / 22@ Collectif",
    role: "Frontend Engineer Principal y Diseñador Digital",
    summary:
      "Un archivo interactivo fluido de alta tensión que documenta la transformación arquitectónica de Barcelona. Eliminamos las UI corporativas a favor de tipografía cruda, mallas de datos táctiles y desplazamientos suaves en WebGL.",
    uxChallenge:
      "Equilibrar una estética underground hiperminimalista con una navegación ultrarrápida a través de más de 300 modelos espaciales y planos arquitectónicos sin desorientar al usuario.",
    uxSolution:
      "Diseño de un viewport espacial elástico con físicas cinéticas personalizadas y metamorfosis de tipografías variables basadas en la velocidad del scroll.",
    tokens: [
      "Viewport Espacial",
      "Serif Variable",
      "Físicas Elásticas",
      "Interfaz Zero-Chrome",
    ],
    stack: [
      "React 19",
      "Three.js / WebGL",
      "Tailwind CSS",
      "Canvas 2D",
      "Web Audio",
    ],
    metrics: [
      { label: "Latencia de Interacción", value: "< 8ms" },
      { label: "Activos Curados", value: "320+ Nodos" },
      { label: "Awwwards / FWA", value: "Sitio del Día" },
    ],
  },
  {
    id: "neo-shibuya",
    number: "02",
    title: "Tokio Subterráneo",
    subtitle: "Fundición Tipográfica Experimental y Matriz Sonora",
    category: "Motor Tipográfico y Audio",
    discipline: "Frontend Generativo y Sistemas UX",
    city: "Tokio (Shibuya)",
    year: "2025",
    image: asset("projects/tokio.svg"),
    secondaryImage: asset("projects/aura.svg"),
    client: "Katamaran Sound & Type Foundry (Tokio / Shibuya)",
    role: "Especialista Frontend UX y Tecnólogo Creativo",
    summary:
      "Un visor de especímenes vanguardista que une la cultura de los clubes subterráneos de Tokio con la tipografía brutalista japonesa. Cada glifo reacciona dinámicamente al audio y la tensión del cursor.",
    uxChallenge:
      "Permitir la exploración no lineal de fuentes tipográficas manteniendo una experiencia de compra intuitiva para marcas de moda de lujo.",
    uxSolution:
      "Diseño de una interfaz de escenario dividido con deslizadores táctiles de modulación de frecuencia y exportación instantánea de vectores en la memoria del navegador.",
    tokens: [
      "Glifos Reactivos",
      "Sintetizador de Audio",
      "Cuadrícula Bilingüe",
      "Interfaz OLED Oscura",
    ],
    stack: [
      "TypeScript",
      "Web Audio API",
      "SVG Morph",
      "Tailwind CSS",
      "Framer Physics",
    ],
    metrics: [
      { label: "Tasa de Fotogramas", value: "60 FPS fijos" },
      { label: "Especímenes", value: "18 Cortes de Fuente" },
      { label: "Usuarios Globales", value: "48K Diseñadores" },
    ],
  },
  {
    id: "raw-monolith",
    number: "03",
    title: "Monolito NYC",
    subtitle: "Atelier de Alta Moda Minimalista y Comercio Electrónico",
    category: "E-Commerce de Lujo y Sistemas",
    discipline: "Dirección de Diseño y Frontend Headless",
    city: "Nueva York (Lower East Side)",
    year: "2024",
    image: asset("projects/monolith.svg"),
    secondaryImage: asset("projects/tokio.svg"),
    client: "Monolith Garments / SoHo Studio",
    role: "Líder de UX/UI y Frontend Principal",
    summary:
      "Una experiencia radical anti-ecommerce construida para una casa de moda de vanguardia de edición limitada en el Bajo Manhattan. Reemplazamos los carritos estándar por editoriales fotográficos inmersivos y telemetría de tallas microscópica.",
    uxChallenge:
      "Transformar la narrativa editorial de alta costura en una UX transaccional fluida con fricción visual cero y un estricto tono de marca de lujo.",
    uxSolution:
      "Un lienzo progresivo de un solo flujo donde los productos se revelan mediante umbrales de scroll táctil y gestos magnéticos del cursor.",
    tokens: [
      "Diseño Editorial",
      "Microtelemetría",
      "Gestos Táctiles",
      "Checkout Instantáneo",
    ],
    stack: [
      "React 19",
      "Arquitectura Next.js",
      "Tailwind CSS",
      "Shopify Storefront API",
    ],
    metrics: [
      { label: "Aumento de Conversión", value: "+44.2%" },
      { label: "Tiempo de Compra", value: "38s promedio" },
      { label: "Puntaje Lighthouse", value: "100 / 100" },
    ],
  },
  {
    id: "noord-atelier",
    number: "04",
    title: "Laboratorio Noord",
    subtitle:
      "Portfolio Espacial e Identidad Cinética para Estudio de Diseño Industrial",
    category: "Identidad Cinética y Microinteracciones",
    discipline: "Sistemas de Diseño y Frontend Interactivo",
    city: "Ámsterdam (Noord)",
    year: "2026",
    image: asset("projects/noord.svg"),
    secondaryImage: asset("projects/monolith.svg"),
    client: "Atelier Noord / Het Archief",
    role: "Líder de Desarrollo Frontend Creativo",
    summary:
      "Un manifiesto visual cinético inspirado en el legado del Total Design de Wim Crouwel y la cultura de los almacenes industriales contemporáneos de Ámsterdam Noord. Sistemas de cuadrícula modulares que se expanden y contraen dinámicamente.",
    uxChallenge:
      "Diseñar cuadrículas responsivas que conserven proporciones matemáticas estrictas en móviles, tablets e instalaciones de proyección en museos ultraanchos.",
    uxSolution:
      "Desarrollo de una matriz de relación de aspecto personalizada con Container Queries de CSS y algoritmos de kerning dinámico.",
    tokens: [
      "Cuadrícula Dinámica",
      "Ritmo Matemático",
      "UI de Aluminio Pulido",
      "Háptica Táctil",
    ],
    stack: ["React", "CSS Container Queries", "Tailwind CSS", "Canvas API"],
    metrics: [
      { label: "Precisión de Malla", value: "Subpíxel 0.5px" },
      { label: "Cobertura de Pantallas", value: "De Móvil a 8K" },
      { label: "Tiempo de Carga", value: "0.4s FCP" },
    ],
  },
]

export const URBAN_NODES: UrbanNode[] = [
  {
    id: "bcn",
    city: "Barcelona",
    district: "22@ Poblenou",
    code: "BCN",
    coords: "41.3984° N, 2.1994° E",
    timezone: "Europe/Madrid",
    offsetHours: 1,
    aesthetic:
      "Ladrillo Industrial, Audio Subterráneo, Luz Mediterránea sobre Acero Pulido",
    ethos:
      "Donde las fábricas textiles del siglo XIX se encuentran con laboratorios digitales de vanguardia. Un espíritu underground que trata el código no como burocracia, sino como material escultórico táctil.",
    tags: [
      "22@ Poblenou",
      "Hormigón Crudo",
      "Can Ricart",
      "Techno Underground",
      "UI Espacial",
    ],
    image: asset("projects/aura.svg"),
  },
  {
    id: "nyc",
    city: "Nueva York",
    district: "Lower East Side",
    code: "NYC",
    coords: "40.7128° N, 74.0060° W",
    timezone: "America/New_York",
    offsetHours: -5,
    aesthetic:
      "Escaleras de Incendio Brutalistas, Disciplina de Cuadrícula Estricta",
    ethos:
      "La intensidad implacable del bajo Manhattan. Tipografía monocromática sin concesiones que rechaza la decoración innecesaria a favor de la claridad estructural y la inmediatez visceral.",
    tags: [
      "SoHo",
      "LES",
      "Cuadrículas Inflexibles",
      "Anti-Corporativo",
      "Deploys Nocturnos",
    ],
    image: asset("projects/monolith.svg"),
  },
]
