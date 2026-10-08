export default function MonumentalStatement() {
  return (
    <section
      id="statement"
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="flex justify-between items-center text-xs font-mono text-[#828079] mb-12">
        <span className="tracking-widest uppercase">PHILOSOPHY // 002</span>
        <span className="u-g">( The Tension Between Code &amp; Instinct )</span>
      </div>

      {/* Main Massive Calligraphic Headline */}
      <div className="space-y-4 md:space-y-6">
        <h2 className="calligraphic-title text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] text-[#f0ede6] leading-[0.9] max-w-5xl">
          The screen is not a neutral surface,
        </h2>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pt-2">
          <p className="calligraphic-title text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] text-[#828079] leading-[0.9]">
            it is an architecture of human instinct.
          </p>
        </div>
      </div>

      {/* Secondary Stanza & Metadata */}
      <div className="mt-16 md:mt-24 pt-8 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-xs font-mono">
        <div className="md:col-span-4 text-[#828079] space-y-3">
          <p className="leading-relaxed">
            Born out of the underground industrial warehouses of Barcelona's 22@
            and refined across the raw creative frequencies of New York, Tokyo,
            and Amsterdam.
          </p>
          <p className="leading-relaxed text-[#f0ede6]">
            I construct digital environments where mathematical frontend
            precision serves visceral UX clarity. Zero corporatism. Pure spatial
            tension.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9 flex flex-col justify-between h-full gap-6 text-right md:text-right">
          <div className="space-y-1">
            <span className="text-[#828079] block">
              DISCIPLINARY CONVERGENCE
            </span>
            <span className="text-white block font-medium">
              Frontend Engineering × Lead UX/UI
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 text-[#828079]">
            <span>Q&nbsp;t</span>
            <span className="u-g">(&nbsp;Pablo Arenas Mancebo&nbsp;)</span>
            <span className="text-white tabular-nums">
              2&nbsp;0&nbsp;2&nbsp;6
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
