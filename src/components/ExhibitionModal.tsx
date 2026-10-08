import { useState, useEffect } from "react"
import { sound } from "../utils/audio"

interface ExhibitionModalProps {
  isOpen: boolean
  onClose: () => void
}

const EXHIBITION_ITEMS = [
  {
    title: "Spatial Void / 22@ Poblenou",
    city: "Barcelona",
    coords: "41.3984° N, 2.1994° E",
    caption:
      "Brutalist concrete architecture transformed into responsive web canvas.",
    image:
      "https://images.unsplash.com/photo-1737442981890-0a87ef3ce9f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Anti-Corporate Lookbook / SoHo",
    city: "New York",
    coords: "40.7128° N, 74.0060° W",
    caption:
      "High-contrast monochrome editorial layout with magnetic micro-gestures.",
    image:
      "https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Nocturnal Typography / Shibuya",
    city: "Tokyo",
    coords: "35.6762° N, 139.6503° E",
    caption: "Acoustic waveform type specimen with millisecond input latency.",
    image:
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Total Design Kinetic Grid / Noord",
    city: "Amsterdam",
    coords: "52.3676° N, 4.9041° E",
    caption: "Rigorous subpixel math combined with organic touch haptics.",
    image:
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
]

export default function ExhibitionModal({
  isOpen,
  onClose,
}: ExhibitionModalProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") {
        sound.playTick()
        setActiveIndex((prev) => (prev + 1) % EXHIBITION_ITEMS.length)
      }
      if (e.key === "ArrowLeft") {
        sound.playTick()
        setActiveIndex(
          (prev) =>
            (prev - 1 + EXHIBITION_ITEMS.length) % EXHIBITION_ITEMS.length,
        )
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const currentItem = EXHIBITION_ITEMS[activeIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-12 bg-black/95 backdrop-blur-2xl text-white font-mono"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6 text-xs text-[#828079]">
        <div className="flex items-center gap-4">
          <span className="text-white font-serif italic text-xl">
            Showreel &amp; Exhibition
          </span>
          <span className="u-g">
            (&nbsp;{activeIndex + 1} / {EXHIBITION_ITEMS.length}&nbsp;)
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playSelect()
            onClose()
          }}
          onMouseEnter={() => sound.playTick()}
          className="cursor-pointer text-xs text-white hover:text-[#828079] px-3 py-1 border border-white/20 hover:border-white/40 transition-colors"
        >
          (&nbsp;Close Exhibition ×&nbsp;)
        </button>
      </div>

      {/* Center Image Display */}
      <div className="my-auto py-6 max-w-5xl mx-auto w-full flex flex-col items-center">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-neutral-900 border border-white/20 shadow-2xl">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700"
          />
          <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-xs border border-white/20">
            {currentItem.coords}
          </div>
        </div>

        {/* Caption & Details */}
        <div className="w-full mt-6 flex flex-col md:flex-row justify-between items-baseline gap-4 border-t border-white/10 pt-4 text-xs">
          <div>
            <h3 className="font-serif italic text-2xl md:text-3xl text-white">
              {currentItem.title}
            </h3>
            <p className="text-[#828079] mt-1">{currentItem.caption}</p>
          </div>

          <div className="flex items-center gap-4 text-[#828079]">
            <span>Location: {currentItem.city}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playTick()
                  setActiveIndex(
                    (prev) =>
                      (prev - 1 + EXHIBITION_ITEMS.length) %
                      EXHIBITION_ITEMS.length,
                  )
                }}
                className="cursor-pointer px-2 py-1 border border-white/10 hover:border-white/40 text-white"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playTick()
                  setActiveIndex((prev) => (prev + 1) % EXHIBITION_ITEMS.length)
                }}
                className="cursor-pointer px-2 py-1 border border-white/10 hover:border-white/40 text-white"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex justify-between items-center text-[11px] text-[#828079] border-t border-white/10 pt-4">
        <span>USE KEYBOARD ARROWS (← / →) TO ADVANCE</span>
        <span>PABLO ARENAS MANCEBO // DIGITAL SHOWCASE</span>
      </div>
    </div>
  )
}
