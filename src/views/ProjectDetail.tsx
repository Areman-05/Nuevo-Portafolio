import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link, useParams } from "react-router"
import { CASES } from "../data/cases"

// Accent styles borrowed from the home quote: *red*  ~outline~  ^grey^
function Rich({ text }: { text?: string }) {
  if (!text) return null
  return (
    <>
      {text.split(/(\*[^*]+\*|~[^~]+~|\^[^^]+\^)/).map((part, i) => {
        const cls = { "*": "text-[#c8323a]", "~": "pd-outline", "^": "text-[#828079]" }[part[0]]
        return cls && part.length > 2 ? (
          <span key={i} className={cls}>{part.slice(1, -1)}</span>
        ) : (
          part
        )
      })}
    </>
  )
}

type Flow = NonNullable<(typeof CASES)[number]["flow"]>

// The user flow drawn as a metro map: red main line, grey branch, dashed shortcut
function FlowDiagram({ flow }: { flow: Flow }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const X0 = 70, X1 = 930, Y = 230
  const step = (X1 - X0) / (flow.main.length - 1)
  const mx = (i: number) => X0 + i * step
  const BY = 80
  const bx = [mx(1) + 40, mx(2) + 60]
  const SY = 380
  const sx = [mx(2) + 40, X1]

  return (
    <div ref={ref} className={`flow mt-20 md:mt-28 ${on ? "is-on" : ""}`}>
      <div className="-mx-6 overflow-x-auto px-6">
        <svg viewBox="0 0 1000 460" className="mx-auto block w-full min-w-[720px] font-mono" role="img" aria-label="Flujo de usuario de NAU-22">
          {/* branch: Journal */}
          <path
            className="flow-line flow-d1"
            d={`M ${mx(0)} ${Y} C ${mx(0) + 70} ${Y}, ${mx(0) + 80} ${BY}, ${mx(0) + 170} ${BY} L ${bx[1]} ${BY}`}
            fill="none" stroke="#f0ede6" strokeOpacity=".3" strokeWidth="3" pathLength={1}
          />
          {/* shortcut: dashed, reachable from every station */}
          <path className="flow-fade flow-d3" d={`M ${mx(0)} ${SY} L ${X1} ${SY}`} stroke="#f0ede6" strokeOpacity=".3" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
          {flow.main.slice(0, 4).map((_, i) => (
            <line key={i} className="flow-fade flow-d3" x1={mx(i)} y1={Y + 16} x2={mx(i)} y2={SY - 10} stroke="#f0ede6" strokeOpacity=".15" strokeDasharray="2 6" />
          ))}
          {/* main line */}
          <path className="flow-line" d={`M ${X0} ${Y} L ${X1} ${Y}`} stroke="#c8323a" strokeWidth="6" strokeLinecap="round" pathLength={1} />

          {/* main stations */}
          {flow.main.map((st, i) => {
            const last = i === flow.main.length - 1
            return (
              <g key={st.name} className="flow-st" style={{ transitionDelay: `${0.3 + i * 0.25}s` }}>
                {last ? (
                  <rect x={mx(i) - 13} y={Y - 13} width="26" height="26" fill="#c8323a" />
                ) : (
                  <circle cx={mx(i)} cy={Y} r={i === 0 ? 14 : 10} fill="#060606" stroke="#f0ede6" strokeWidth={i === 0 ? 4 : 3} />
                )}
                <text x={mx(i)} y={Y - 34} textAnchor="middle" fill="#f0ede6" fontSize="17" letterSpacing="2">{st.name.toUpperCase()}</text>
                <text x={mx(i)} y={Y + 44} textAnchor="middle" fill="#828079" fontSize="13">{st.q}</text>
              </g>
            )
          })}

          {/* branch stations */}
          {flow.branch.map((st, i) => (
            <g key={st.name} className="flow-st" style={{ transitionDelay: `${1.2 + i * 0.2}s` }}>
              <circle cx={bx[i]} cy={BY} r="8" fill="#060606" stroke="#f0ede6" strokeOpacity=".6" strokeWidth="3" />
              <text x={bx[i] + 20} y={BY - 14} fill="#d8d5ce" fontSize="15" letterSpacing="2">{st.name.toUpperCase()}</text>
              <text x={bx[i] + 20} y={BY + 22} fill="#56544e" fontSize="12">{st.q}</text>
            </g>
          ))}

          {/* shortcut stations */}
          {flow.shortcut.map((st, i) => (
            <g key={st.name} className="flow-st" style={{ transitionDelay: `${1.6 + i * 0.2}s` }}>
              <rect x={sx[i] - 8} y={SY - 8} width="16" height="16" transform={`rotate(45 ${sx[i]} ${SY})`} fill="#060606" stroke="#f0ede6" strokeWidth="2" />
              <text x={sx[i]} y={SY + 38} textAnchor="middle" fill="#d8d5ce" fontSize="15" letterSpacing="2">{st.name.toUpperCase()}</text>
              <text x={sx[i]} y={SY + 58} textAnchor="middle" fill="#56544e" fontSize="12">{st.q}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* legend */}
      <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4 text-xs uppercase tracking-[0.12em] text-[#828079]">
        <span className="flex items-center gap-3"><span className="h-[4px] w-8 bg-[#c8323a]" /> Viaje principal</span>
        <span className="flex items-center gap-3"><span className="h-[3px] w-8 bg-[#f0ede6]/30" /> Lectura</span>
        <span className="flex items-center gap-3"><span className="w-8 border-t-2 border-dotted border-[#f0ede6]/40" /> Atajo de visita, desde cualquier sección</span>
      </div>
    </div>
  )
}

function Shot({ src, caption, className = "", onOpen }: { src: string; caption?: string; className?: string; onOpen: (src: string, caption?: string) => void }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <figure className={`pd-r ${className}`}>
      <button
        type="button"
        data-cursor="Ampliar"
        onClick={() => onOpen(src, caption)}
        className={`pd-shot block aspect-[16/10] w-full bg-[#0d0d0d] ${loaded ? "is-loaded" : ""}`}
      >
        <img
          src={src}
          alt={caption ?? ""}
          decoding="async"
          onLoad={() => setLoaded(true)}
          ref={(el) => {
            if (el?.complete && el.naturalWidth) setLoaded(true)
          }}
          className="block h-full w-full object-contain"
        />
      </button>
      {caption && <figcaption className="mt-5 text-sm uppercase tracking-[0.12em] text-[#828079]">{caption}</figcaption>}
    </figure>
  )
}

function Lightbox({ src, caption, onClose }: { src: string; caption?: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      data-cursor="Cerrar"
      onClick={onClose}
      className="lb fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-[#060606]/95 p-4 backdrop-blur-sm md:p-12"
    >
      <img src={src} alt={caption ?? ""} className="lb-img max-h-[85vh] max-w-full object-contain shadow-2xl" />
      {caption && <span className="lb-img text-lg uppercase tracking-[0.12em] text-[#f0ede6]">{caption}</span>}
      <style>{`
        .lb { animation: lb-in .45s ease both; }
        .lb-img { animation: lb-img .7s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes lb-in { from { opacity: 0; } }
        @keyframes lb-img { from { opacity: 0; transform: translateY(24px); } }
      `}</style>
    </div>,
    document.body,
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const ref = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState<{ src: string; caption?: string } | null>(null)
  const openShot = (src: string, caption?: string) => setZoom({ src, caption })
  const index = CASES.findIndex((c) => c.id === id)
  const c = CASES[index]
  const next = CASES.find((x, i) => i > index && x.ready) ?? CASES.find((x) => x.ready && x.id !== id)

  useEffect(() => {
    window.scrollTo(0, 0)
    const els = ref.current?.querySelectorAll(".pd-r")
    if (!els) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("pd-in")),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [id])

  if (!c) return null

  if (!c.ready || !c.story) {
    return (
      <div className="flex min-h-[80vh] flex-col justify-center font-mono">
        <h1 className="text-[11vw] leading-[0.95] uppercase tracking-[0.02em] text-[#f0ede6]/25 md:text-[6vw]">{c.title}</h1>
        <Link to="/work" className="mt-10 text-sm text-[#828079] transition-colors hover:text-[#f0ede6]">← Volver</Link>
      </div>
    )
  }

  return (
    <div ref={ref} key={id} className="mx-auto max-w-[1180px] font-mono text-[#d8d5ce]">
      {/* Opening */}
      <header className="flex min-h-[calc(100vh-6rem)] flex-col justify-center">
        <h1 className="pd-r text-[18vw] leading-[0.9] uppercase tracking-[0.02em] text-[#f0ede6] md:text-[12vw] lg:text-[160px]">
          {c.title}
        </h1>
        <p className="pd-r mt-10 max-w-[22ch] text-2xl leading-snug text-[#f0ede6] md:text-4xl"><Rich text={c.outcome} /></p>
        <p className="pd-r mt-8 max-w-[52ch] text-base leading-relaxed text-[#828079]">{c.intro}</p>
        {c.repo && (
          <a href={c.repo} target="_blank" rel="noreferrer" className="pd-r pd-link mt-12 w-fit text-sm uppercase tracking-[0.12em] text-[#f0ede6]">
            Ver código en GitHub <span>↗</span>
          </a>
        )}
      </header>

      <Shot src={c.image} onOpen={openShot} />

      {/* Story: one idea per block, then its images */}
      {c.story.map((s) => (
        <section key={s.heading} className="pt-40 md:pt-56">
          <div className="grid gap-10 md:grid-cols-12">
            <h2 className="pd-r text-3xl leading-[1.1] uppercase tracking-[0.02em] text-[#f0ede6] md:col-span-6 md:text-5xl">
              <Rich text={s.heading} />
            </h2>
            <div className="md:col-span-5 md:col-start-8 md:pt-2">
              {s.body && <p className="pd-r text-base leading-relaxed text-[#828079] md:text-lg">{s.body}</p>}
              {s.list && (
                <ul className="flex flex-col gap-6">
                  {s.list.map((l) => (
                    <li key={l.t} className="pd-r">
                      <span className="block text-[#f0ede6] md:text-lg">{l.t}</span>
                      <span className="mt-1 block leading-relaxed text-[#828079]">{l.d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {s.flow && c.flow && <FlowDiagram flow={c.flow} />}

          {s.images.length > 0 && <div className={`mt-20 grid gap-6 md:mt-28 ${s.images.length > 1 ? "md:grid-cols-2 md:items-start" : ""}`}>
            {s.images.map((n, i) => (
              <Shot key={n} src={c.images[n]} caption={c.captions?.[n]} onOpen={openShot} className={s.images.length > 1 && i === 1 ? "md:mt-32" : ""} />
            ))}
          </div>}
        </section>
      ))}

      {/* Closing */}
      <section className="flex min-h-[70vh] items-center py-40">
        <p className="pd-r max-w-[20ch] text-3xl leading-[1.15] uppercase tracking-[0.02em] text-[#f0ede6] md:text-6xl">
          <Rich text={c.closing} />
        </p>
      </section>

      {next && (
        <Link to={`/work/${next.id}`} className="group block pb-40">
          <span className="block text-[14vw] leading-[0.9] uppercase tracking-[0.02em] text-[#f0ede6]/20 transition-colors duration-700 group-hover:text-[#f0ede6] md:text-[8vw]">
            {next.title} <span className="inline-block text-[0.5em] transition-transform duration-500 group-hover:translate-x-4">→</span>
          </span>
        </Link>
      )}

      {zoom && <Lightbox src={zoom.src} caption={zoom.caption} onClose={() => setZoom(null)} />}

      <style>{`
        .pd-link { position: relative; display: inline-block; }
        .pd-link span { display: inline-block; transition: transform .5s cubic-bezier(0.16,1,0.3,1); }
        .pd-link::after { content: ""; position: absolute; left: 0; bottom: -6px; height: 1px; width: 100%; background: #c8323a; transform: scaleX(0); transform-origin: left; transition: transform .6s cubic-bezier(0.16,1,0.3,1); }
        .pd-link:hover span { transform: translate(3px,-3px); }
        .pd-link:hover::after { transform: scaleX(1); }
        .flow-line { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 2s cubic-bezier(0.65,0,0.35,1); }
        .flow-d1 { transition-delay: .9s; }
        .flow.is-on .flow-line { stroke-dashoffset: 0; }
        .flow-fade, .flow-st { opacity: 0; transition: opacity .8s ease, transform .8s cubic-bezier(0.16,1,0.3,1); }
        .flow-st { transform: translateY(8px); }
        .flow-d3 { transition-delay: 1.5s; }
        .flow.is-on .flow-fade, .flow.is-on .flow-st { opacity: 1; transform: none; }
        .pd-outline { color: transparent; -webkit-text-stroke: 1px #f0ede6; }
        .pd-r { opacity: 0; transform: translateY(40px); transition: opacity 1.1s ease, transform 1.3s cubic-bezier(0.16,1,0.3,1); }
        .pd-r.pd-in { opacity: 1; transform: none; }
        .pd-shot { overflow: hidden; box-shadow: 0 40px 80px -30px rgba(0,0,0,.8); clip-path: inset(10% 0 0 0); transition: clip-path 1.4s cubic-bezier(0.77,0,0.175,1); }
        .pd-in .pd-shot.is-loaded { clip-path: inset(0); }
        .pd-shot img { opacity: 0; transition: opacity .9s ease .15s; }
        .pd-in .pd-shot.is-loaded img { opacity: 1; }
        .pd-in .pd-shot.is-loaded:hover img { opacity: .9; }
        @media (prefers-reduced-motion: reduce) { .pd-r, .pd-shot, .pd-shot img { transition: none; opacity: 1; transform: none; clip-path: none; } .lb, .lb-img { animation: none; } }
      `}</style>
    </div>
  )
}
