import { useState } from "react"
import { NavLink } from "react-router"
import { sound } from "../utils/audio"

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
  // Also covers clicking the link of the page you are already on
  const handleNavClick = () => {
    sound.playSelect()
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  const navItems = [
    { name: "Trabajo", path: "/work" },
    { name: "Sobre mí", path: "/ethos" },
    { name: "Contacto", path: "/nodes" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 py-8 mix-blend-difference text-[#f0ede6] sm:px-5 md:px-8">
      <div className="flex w-full items-center justify-between uppercase">
        {/* Name on the Left */}
        <div className="shrink-0">
          <NavLink
            to="/"
            aria-label="Pablo Arenas Mancebo"
            onClick={handleNavClick}
            onMouseEnter={() => sound.playTick()}
            className="group -my-4 flex items-center py-4 font-mono text-xs leading-none tracking-normal sm:text-sm md:text-base"
          >
            <ScrambledLabel label="Pablo Arenas Mancebo" itemIndex={3} />
          </NavLink>
        </div>

        <nav
          className="flex items-center gap-2 font-mono text-xs leading-none tracking-normal sm:gap-5 sm:text-sm md:gap-8 md:text-base"
          aria-label="Navegación principal"
        >
          {navItems.map((item, itemIndex) => (
            <NavLink
              key={item.name}
              to={item.path}
              aria-label={item.name}
              onClick={handleNavClick}
              onMouseEnter={() => sound.playTick()}
              className={({ isActive }) =>
                `group -mx-2 -my-4 flex items-center whitespace-nowrap px-2 py-4 cursor-pointer transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-[#828079] hover:text-[#f0ede6]"
                }`
              }
            >
              <ScrambledLabel label={item.name} itemIndex={itemIndex} />
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
