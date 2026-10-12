import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { sound } from "../utils/audio"
import { useLang } from "../i18n"

const GLYPHS = ["7", "#", "3", "%", "9", "&", "0", "@", "4", "?"]

function ScrambledLabel({
  label,
  itemIndex,
}: {
  label: string
  itemIndex: number
}) {
  const [activeCharacter, setActiveCharacter] = useState<number | null>(null)

  return (
    <span aria-hidden="true" className="flex">
      {Array.from(label).map((character, characterIndex) => (
        <span
          key={`${character}-${characterIndex}`}
          className="inline-block min-w-[0.55em] text-center transition-transform duration-150 hover:-translate-y-0.5"
          onMouseEnter={() => setActiveCharacter(characterIndex)}
          onMouseLeave={() => setActiveCharacter(null)}
        >
          {character === " "
            ? "\u00a0"
            : activeCharacter === characterIndex
              ? GLYPHS[(itemIndex * 3 + characterIndex) % GLYPHS.length]
              : character}
        </span>
      ))}
    </span>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Also covers clicking the link of the page you are already on
  const handleNavClick = () => {
    sound.playSelect()
    setOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const { t } = useLang()
  const navItems = [
    { name: t.work, path: "/work" },
    { name: t.about, path: "/ethos" },
    { name: t.contact, path: "/nodes" },
  ]

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 px-5 pb-6 mix-blend-difference text-[#f0ede6] md:px-8 md:pb-8"
        style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
      >
        <div className="flex w-full items-center justify-between uppercase">
          <NavLink
            to="/"
            aria-label="Pablo Arenas Mancebo"
            onClick={handleNavClick}
            onMouseEnter={() => sound.playTick()}
            className="group -my-4 flex shrink-0 items-center py-4 font-mono text-sm leading-none tracking-normal md:text-base"
          >
            <span className="md:hidden">Pablo Arenas<span className="text-[#c8323a]">.</span></span>
            <span className="hidden md:flex"><ScrambledLabel label="Pablo Arenas Mancebo" itemIndex={3} /></span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 font-mono text-base leading-none tracking-normal md:flex" aria-label="Navegación principal">
            {navItems.map((item, itemIndex) => (
              <NavLink
                key={item.path}
                to={item.path}
                aria-label={item.name}
                onClick={handleNavClick}
                onMouseEnter={() => sound.playTick()}
                className={({ isActive }) =>
                  `group -mx-2 -my-4 flex cursor-pointer items-center whitespace-nowrap px-2 py-4 transition-colors ${
                    isActive ? "text-white" : "text-[#828079] hover:text-[#f0ede6]"
                  }`
                }
              >
                <ScrambledLabel label={item.name} itemIndex={itemIndex} />
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              sound.playSelect()
              setOpen((o) => !o)
            }}
            className="-my-3 -mr-3 flex items-center gap-3 px-3 py-3 font-mono text-sm uppercase md:hidden"
          >
            {open ? t.close : t.menu}
            <span className="relative block h-2.5 w-5">
              <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#060606] px-5 pb-10 font-mono transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden ${
          open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        style={{ paddingTop: "calc(max(1.5rem, env(safe-area-inset-top)) + 5rem)" }}
      >
        <nav className="flex flex-col gap-2" aria-label="Navegación principal">
          {navItems.map((item, i) => (
            <span key={item.path} className="block overflow-hidden pt-[0.1em]">
              <NavLink
                to={item.path}
                onClick={handleNavClick}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `block text-[13vw] uppercase leading-[1] tracking-[0.04em] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isActive ? "text-[#c8323a]" : i === 1 ? "m-outline" : "text-[#f0ede6]"
                  }`
                }
                style={{ transform: open ? "none" : "translateY(110%)", transitionDelay: open ? `${0.25 + i * 0.08}s` : "0s" }}
              >
                {item.name}
              </NavLink>
            </span>
          ))}
        </nav>
        <span className="text-xs uppercase tracking-[0.12em] text-[#56544e]">Barcelona — 2026</span>
        <style>{`.m-outline { color: transparent; -webkit-text-stroke: 1px #f0ede6; }`}</style>
      </div>
    </>
  )
}
