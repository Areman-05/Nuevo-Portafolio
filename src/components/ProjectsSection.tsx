import { useEffect, useRef, useState } from "react"
import { CaseStudy } from "../data/cases"
import { sound } from "../utils/audio"

interface ProjectsSectionProps {
  projects: CaseStudy[]
  onSelectProject: (project: CaseStudy) => void
  onHoverProject: (project: CaseStudy | null) => void
}

const TICKS_PER = 6

export default function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const max = r.height - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, -r.top / max)) : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const n = projects.length
  const active = Math.min(n - 1, Math.floor(progress * n))
  const total = n * TICKS_PER + 1
  const current = Math.round(progress * (total - 1))
  const state = (i: number) => (i === active ? "in" : i < active ? "past" : "next")

  const go = (idx: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const max = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((idx + 0.5) / n) * max, behavior: "smooth" })
  }

  const open = () => {
    const p = projects[active]
    if (!p.ready) return
    sound.playSelect()
    onSelectProject(p)
  }

  return (
    <section ref={ref} className="relative font-mono text-[#f0ede6]" style={{ height: `${n * 90 + 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Tick ruler */}
        <nav aria-label="Proyectos" className="absolute top-1/2 left-5 z-30 -translate-y-1/2 lg:left-10">
          <ul className="flex flex-col gap-[10px]">
            {Array.from({ length: total }).map((_, i) => {
              const major = i % TICKS_PER === 0
              const here = i === current
              const dist = Math.abs(i - current)
              return (
                <li key={i} className="relative flex h-px items-center">
                  {here && (
                    <span className="absolute -left-3.5 h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-[#8f1018]" />
                  )}
                  <button
                    tabIndex={major ? 0 : -1}
                    aria-label={major ? `Proyecto ${i / TICKS_PER + 1}` : undefined}
                    onClick={() => major && go(Math.min(i / TICKS_PER, n - 1))}
                    className={`block h-px transition-all duration-300 ${major ? "cursor-pointer" : "pointer-events-none"}`}
                    style={{
                      width: here ? 16 : major ? 10 : dist < 3 ? 6 : 3,
                      background: here ? "#f0ede6" : `rgba(240,237,230,${major ? 0.6 : dist < 3 ? 0.4 : 0.18})`,
                    }}
                  />
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative mx-auto w-full max-w-[1500px] pr-6 pl-16 md:pr-12 md:pl-28 lg:pl-40">
          {/* Image frame: starts at ~30%, text runs over it */}
          <div
            data-cursor={projects[active].ready ? "Abrir" : "Pronto"}
            onClick={open}
            className="relative mt-[22vh] aspect-[16/10] max-h-[68vh] overflow-hidden bg-[#0b0b0b] md:mt-[6vh] md:ml-[30%]"
          >
            {projects.map((p, i) => (
              <div key={p.id} className="gal-img absolute inset-0" data-state={state(i)}>
                {p.image ? (
                  <img src={p.image} alt={p.title} className={`h-full w-full object-cover ${p.coverDark ? "invert" : ""}`} />
                ) : (
                  <div className="gal-empty h-full w-full" />
                )}
              </div>
            ))}
          </div>

          {/* Text: label, two-line title, one small line */}
          <div className="pointer-events-none absolute top-0 right-6 left-16 z-10 md:right-auto md:left-28 lg:left-40">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#f0ede6]">Trabajo</span>
            <div className="relative mt-5">
              {projects.map((p, i) => (
                <div key={p.id} className={`gal-txt ${i === 0 ? "relative" : "absolute inset-x-0 top-0"}`} data-state={state(i)}>
                  <h2 className="max-w-[16ch] overflow-hidden pt-[0.08em] text-[9vw] uppercase leading-[1.02] tracking-[0.02em] text-[#f0ede6] md:text-[3.6vw]">
                    <span className="gal-line block">
                      {p.title}
                      <span className="mx-[0.3em] inline-block translate-y-[-0.12em] align-middle text-[0.4em]">▸</span>
                      {p.kicker ?? (p.ready ? "" : "En preparación")}
                    </span>
                  </h2>
                  <span className="gal-meta mt-5 block text-[11px] font-medium uppercase tracking-[0.3em] text-[#f0ede6]/45">
                    {p.discipline}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gal-img { transition: clip-path 1.1s cubic-bezier(0.77,0,0.175,1); }
        .gal-img img { transition: transform 1.6s cubic-bezier(0.16,1,0.3,1); }
        .gal-img[data-state="next"] { clip-path: inset(100% 0 0 0); }
        .gal-img[data-state="next"] img { transform: scale(1.12); }
        .gal-img[data-state="in"] { clip-path: inset(0); z-index: 2; }
        .gal-img[data-state="past"] { clip-path: inset(0 0 100% 0); }
        [data-cursor="Abrir"]:hover .gal-img[data-state="in"] img { transform: scale(1.03); }
        .gal-empty {
          background-color: #0b0b0b;
          background-image: repeating-linear-gradient(135deg, rgba(240,237,230,0.035) 0 1px, transparent 1px 14px);
        }
        .gal-line { transition: transform 1s cubic-bezier(0.19,1,0.22,1); }
        .gal-txt[data-state="next"] .gal-line { transform: translateY(110%); }
        .gal-txt[data-state="past"] .gal-line { transform: translateY(-110%); }
        .gal-txt:not([data-state="in"]) { pointer-events: none; }
        .gal-meta { transition: opacity .6s ease, transform .8s cubic-bezier(0.16,1,0.3,1); }
        .gal-txt:not([data-state="in"]) .gal-meta { opacity: 0; transform: translateY(12px); }
        .gal-txt[data-state="in"] .gal-meta { transition-delay: .25s; }
        .gal-cta span { display: inline-block; transition: transform .5s cubic-bezier(0.16,1,0.3,1); }
        .gal-cta:hover span { transform: translateX(6px); }
        @media (prefers-reduced-motion: reduce) { .gal-img, .gal-img img, .gal-line, .gal-meta { transition: none; } }
      `}</style>
    </section>
  )
}
