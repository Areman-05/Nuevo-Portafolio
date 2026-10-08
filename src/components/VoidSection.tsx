import { sound } from "../utils/audio"

interface VoidSectionProps {
  onExploreClick: () => void
}

export default function VoidSection({ onExploreClick }: VoidSectionProps) {
  return (
    <section
      id="hero"
      className="min-h-[82vh] md:min-h-[88vh] flex flex-col justify-between pt-28 md:pt-36 pb-12 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]"
    >
      {/* Top Tagline / Meta Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-[#828079] font-mono gap-2">
        <div className="flex items-center gap-3">
          <span className="text-[#f0ede6]">PABLO ARENAS MANCEBO</span>
          <span className="text-[#4a4944]">•</span>
          <span>AUTONOMOUS ATELIER</span>
        </div>
        <div className="flex items-center gap-4 text-[#828079]">
          <span>INDEX : 2026</span>
          <span>AVAILABLE FOR SELECTIVE COMMISSIONS</span>
        </div>
      </div>

      {/* The Central Iconic "Void Section" */}
      <div className="my-auto py-12 md:py-20 select-none">
        <div className="w-full border-t border-white/[0.08] text-xs md:text-sm lg:text-base font-mono tracking-tight">
          {/* Row 1 */}
          <div className="void-grid-row py-4 md:py-6">
            <span className="font-serif italic text-base md:text-2xl text-[#f0ede6]">
              d&nbsp;&nbsp;s&nbsp;&nbsp;g&nbsp;&nbsp;n
            </span>
            <span className="u-g text-[11px] md:text-xs">
              (&nbsp;Frontend Architecture &amp; Lead UX/UI&nbsp;)
            </span>
            <span className="font-serif italic text-base md:text-2xl text-[#f0ede6]">
              c&nbsp;&nbsp;d&nbsp;&nbsp;n&nbsp;&nbsp;g
            </span>
          </div>

          {/* Row 2 */}
          <div className="void-grid-row py-4 md:py-6">
            <span className="text-white font-medium">B&nbsp;C&nbsp;N</span>
            <span className="u-g text-[11px] md:text-xs">
              (&nbsp;22@ Poblenou · 41.3984° N&nbsp;)
            </span>
            <span className="text-[#828079]">N&nbsp;Y&nbsp;C</span>
            <span className="u-g text-[11px] md:text-xs hidden sm:inline">
              (&nbsp;Lower East Side&nbsp;)
            </span>
            <span className="text-white font-medium">T&nbsp;Y&nbsp;O</span>
          </div>

          {/* Row 3 */}
          <div className="void-grid-row py-4 md:py-6">
            <span className="font-serif italic text-base md:text-2xl text-[#f0ede6]">
              x&nbsp;&nbsp;p&nbsp;&nbsp;l&nbsp;&nbsp;r
            </span>
            <span className="u-g text-[11px] md:text-xs">
              (&nbsp;Human Friction, Underground Aesthetics &amp; Kinetic
              Systems&nbsp;)
            </span>
            <span className="text-white tabular-nums tracking-widest">
              2&nbsp;0&nbsp;2&nbsp;6
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Callout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#828079] gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#4a4944]">01</span>
          <span>RADICAL RESTRAINT</span>
          <span className="text-[#4a4944]">/</span>
          <span>NO CORPORATE NOISE</span>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playSelect()
            onExploreClick()
          }}
          onMouseEnter={() => sound.playTick()}
          className="cursor-pointer group flex items-center gap-2 text-[#f0ede6] hover:text-white transition-all py-1 px-3 border border-white/10 hover:border-white/30 rounded-full"
        >
          <span>(&nbsp;</span>
          <span className="text-[#828079] group-hover:text-white transition-colors">
            Scroll down to explore archive
          </span>
          <span className="inline-block transition-transform group-hover:translate-y-0.5">
            ↓
          </span>
          <span>&nbsp;)</span>
        </button>
      </div>
    </section>
  )
}
