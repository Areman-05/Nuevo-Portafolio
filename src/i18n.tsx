import { createContext, useContext, useEffect, useState } from "react"

export type Lang = "es" | "ca" | "en"
export const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
  { code: "en", label: "EN" },
]

const DICT = {
  es: {
    work: "Trabajo",
    about: "Sobre mí",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
    invite1: "¿Diseñamos",
    invite2: "algo",
    invite3: "juntos?",
    top: "Volver arriba ↑",
    cursorOpen: "Abrir",
    cursorSoon: "Pronto",
    cursorZoom: "Ampliar",
    cursorClose: "Cerrar",
    cursorView: "Ver",
    back: "Volver",
    viewCode: "Ver código en GitHub",
    flowLabel: "Flujo de usuario",
    flowMain: "Viaje principal",
    flowRead: "Lectura",
    flowShortcut: "Atajo de visita, desde cualquier sección",
    homeTag: "Diseño y programo interfaces que se entienden solas",
    quote: ["Si puedes", "diseñar", "una cosa,", "puedes", "diseñarlo", "todo."],
  },
  ca: {
    work: "Treball",
    about: "Sobre mi",
    contact: "Contacte",
    menu: "Menú",
    close: "Tancar",
    invite1: "Dissenyem",
    invite2: "alguna cosa",
    invite3: "junts?",
    top: "Tornar a dalt ↑",
    cursorOpen: "Obrir",
    cursorSoon: "Aviat",
    cursorZoom: "Ampliar",
    cursorClose: "Tancar",
    cursorView: "Veure",
    back: "Tornar",
    viewCode: "Veure el codi a GitHub",
    flowLabel: "Flux d'usuari",
    flowMain: "Viatge principal",
    flowRead: "Lectura",
    flowShortcut: "Drecera de visita, des de qualsevol secció",
    homeTag: "Dissenyo i programo interfícies que s'entenen soles",
    quote: ["Si pots", "dissenyar", "una cosa,", "pots", "dissenyar-ho", "tot."],
  },
  en: {
    work: "Work",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    invite1: "Shall we",
    invite2: "design",
    invite3: "together?",
    top: "Back to top ↑",
    cursorOpen: "Open",
    cursorSoon: "Soon",
    cursorZoom: "Zoom",
    cursorClose: "Close",
    cursorView: "View",
    back: "Back",
    viewCode: "View code on GitHub",
    flowLabel: "User flow",
    flowMain: "Main journey",
    flowRead: "Reading",
    flowShortcut: "Visit shortcut, from any section",
    homeTag: "I design and build interfaces that explain themselves",
    quote: ["If you can", "design", "one thing,", "you can", "design", "everything."],
  },
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof DICT)["es"] }
const g = globalThis as unknown as { __langCtx?: React.Context<Ctx | null> }
const LangContext = (g.__langCtx ??= createContext<Ctx | null>(null))

const FALLBACK: Ctx = { lang: "es", setLang: () => {}, t: DICT.es }

function readLang(): Lang {
  try {
    const stored = window.localStorage.getItem("lang") as Lang | null
    return stored === "ca" || stored === "en" || stored === "es" ? stored : "es"
  } catch {
    return "es"
  }
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(readLang)
  useEffect(() => {
    window.localStorage.setItem("lang", lang)
    document.documentElement.lang = lang
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang, t: DICT[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext) ?? FALLBACK
}
