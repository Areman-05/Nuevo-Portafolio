import { useState } from "react"
import { NavLink } from "react-router"
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
  const handleNavClick = () => {
    sound.playSelect()
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  const { t } = useLang()
  const navItems = [
    { name: t.work, path: "/work" },
    { name: t.about, path: "/ethos" },
    { name: t.contact, path: "/nodes" },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-5 pb-6 mix-blend-difference text-[#f0ede6] md:px-8 md:pb-8"
      style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
    >
      <div className="flex w-full items-center justify-between gap-3 uppercase">
        <NavLink
          to="/"
          aria-label="Pablo Arenas Mancebo"
          onClick={handleNavClick}
          onMouseEnter={() => sound.playTick()}
          className="group -my-4 flex shrink-0 items-center py-4 font-mono text-sm leading-none tracking-normal md:text-base"
        >
          <span className="md:hidden">
            Pablo Arenas<span className="text-[#c8323a]">.</span>
          </span>
          <span className="hidden md:flex">
            <ScrambledLabel label="Pablo Arenas Mancebo" itemIndex={3} />
          </span>
        </NavLink>

        <nav
          className="flex min-w-0 items-center justify-end gap-3 font-mono text-[11px] leading-none tracking-normal sm:gap-5 sm:text-sm md:gap-8 md:text-base"
          aria-label="Navegación principal"
        >
          {navItems.map((item, itemIndex) => (
            <NavLink
              key={item.path}
              to={item.path}
              aria-label={item.name}
              onClick={handleNavClick}
              onMouseEnter={() => sound.playTick()}
              className={({ isActive }) =>
                `group -mx-1 -my-4 flex cursor-pointer items-center whitespace-nowrap px-1 py-4 transition-colors sm:mx-0 sm:px-2 ${
                  isActive ? "text-white" : "text-[#828079] hover:text-[#f0ede6]"
                }`
              }
            >
              <span className="md:hidden">{item.name}</span>
              <span className="hidden md:flex">
                <ScrambledLabel label={item.name} itemIndex={itemIndex} />
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
