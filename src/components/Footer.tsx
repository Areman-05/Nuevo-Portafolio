import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import { LANGS, useLang } from "../i18n"
import { sound } from "../utils/audio"
import { Icon, LINKS } from "./Social"

interface FooterProps {
  onBackToTop: () => void
}

function useBarcelonaTime() {
  const fmt = () =>
    new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Madrid" })
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

export default function Footer({ onBackToTop }: FooterProps) {
  const { pathname } = useLocation()
  const { lang, setLang, t } = useLang()
  const time = useBarcelonaTime()
  const onContact = pathname === "/nodes"

  return (
    <footer id="contact" data-cursor-light className="bg-[#f0ede6] font-mono text-[#090909]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {!onContact ? (
          <Link to="/nodes" onMouseEnter={() => sound.playTick()} className="group block pt-24 pb-20 md:pt-32 md:pb-28">
            <span className="block text-[11vw] leading-[0.95] uppercase tracking-[0.06em] md:text-[6.5vw]">
              {t.invite1}
              <br />
              <span className="f-outline">{t.invite2}</span> <span className="text-[#8f1018]">{t.invite3}</span>
              <span className="ml-[0.2em] inline-block text-[0.6em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                →
              </span>
            </span>
          </Link>
        ) : (
          <div className="pt-16" />
        )}

        <div className="grid grid-cols-2 items-center gap-y-10 pb-10 md:grid-cols-12">
          {/* Signature + clock */}
          <div className="col-span-2 flex items-baseline gap-6 md:col-span-4">
            <span className="text-base uppercase tracking-[0.06em]">
              Pablo Arenas<span className="text-[#8f1018]">.</span>
            </span>
            <span className="text-xs uppercase tracking-[0.12em] text-black/45">
              Barcelona <span className="tabular-nums text-black/70">{time}</span>
            </span>
          </div>

          {/* Social */}
          <ul className="col-span-2 flex items-center gap-2 md:col-span-4 md:justify-center">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-label={l.label}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onMouseEnter={() => sound.playTick()}
                  className="flex size-10 items-center justify-center text-black/60 transition-colors duration-500 hover:text-[#8f1018]"
                >
                  <Icon name={l.icon} className="size-[17px]" />
                </a>
              </li>
            ))}
          </ul>

          {/* Language + back to top */}
          <div className="col-span-2 flex items-center justify-between gap-8 md:col-span-4 md:justify-end">
            <div role="group" aria-label="Idioma" className="flex items-center gap-1 text-xs uppercase tracking-[0.12em]">
              {LANGS.map((l, i) => (
                <span key={l.code} className="flex items-center gap-1">
                  {i > 0 && <span className="text-black/20">/</span>}
                  <button
                    type="button"
                    aria-pressed={lang === l.code}
                    onClick={() => {
                      sound.playSelect()
                      setLang(l.code)
                    }}
                    className={`px-1 py-2 transition-colors ${lang === l.code ? "text-[#8f1018]" : "text-black/45 hover:text-black"}`}
                  >
                    {l.label}
                  </button>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playSelect()
                onBackToTop()
              }}
              className="text-xs uppercase tracking-[0.12em] text-black/50 transition-colors hover:text-[#8f1018]"
            >
              {t.top}
            </button>
          </div>
        </div>
      </div>
      <style>{`.f-outline { color: transparent; -webkit-text-stroke: 1px #090909; transition: -webkit-text-stroke-color .5s; } a:hover .f-outline { -webkit-text-stroke-color: #8f1018; }`}</style>
    </footer>
  )
}
