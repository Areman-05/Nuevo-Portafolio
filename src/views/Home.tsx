import { useEffect, useRef, useState } from "react"

const u = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900`

type Word = { text: string; cls?: string; img?: string; shape?: string; side?: "l" | "r" }

const LINES: { word: Word; end?: boolean }[] = [
  { word: { text: "Si puedes", img: u("photo-1693648793394-0b76b7eb042e"), shape: "shape-circle", side: "r" } },
  { end: true, word: { text: "diseñar", cls: "text-[#828079]", img: u("photo-1498075702571-ecb018f3752d"), shape: "shape-arch", side: "l" } },
  { end: true, word: { text: "una cosa," } },
  { word: { text: "puedes", cls: "home-outline", img: u("photo-1714765761465-e7a4974fa05b"), shape: "shape-tall", side: "r" } },
  { end: true, word: { text: "diseñarlo", img: u("photo-1717155970253-b7a4bcfaf7d8"), shape: "shape-diamond", side: "l" } },
  { word: { text: "todo.", cls: "text-[#8f1018]", img: u("photo-1554104683-c7063687d649"), shape: "shape-wide", side: "r" } },
]

function HoverWord({ w, delay }: { w: Word; delay: number }) {
  const [on, setOn] = useState(false)
  const media = w.img && (
    <span data-cursor-skip className={`home-media ${w.shape} ${on ? "is-on" : ""}`}>
      <img src={w.img} alt="" loading="lazy" />
    </span>
  )
  return (
    <span className="flex items-center gap-[2vw]" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      {w.side === "l" && media}
      <span className="block overflow-hidden pt-[0.1em] pb-[0.04em]">
        <span className={`home-word q block cursor-default ${w.cls ?? ""}`} style={{ transitionDelay: `${delay}s` }}>
          {w.text}
        </span>
      </span>
      {w.side === "r" && media}
    </span>
  )
}

// Letters grow near the cursor, like a magnifier sliding over the sign
function Magnify({ text }: { text: string }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([])
  const move = (e: React.MouseEvent) => {
    refs.current.forEach((el) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const d = Math.abs(e.clientX - (r.left + r.width / 2))
      const k = Math.max(0, 1 - d / (r.width * 2.2))
      el.style.transform = `scale(${1 + k * k * 0.32})`
    })
  }
  const leave = () => refs.current.forEach((el) => el && (el.style.transform = ""))
  return (
    <span onMouseMove={move} onMouseLeave={leave} className="inline-flex" aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          aria-hidden="true"
          className="inline-block origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Home() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.4 },
    )
    document.querySelectorAll(".q-line").forEach((el) => io.observe(el))
    return () => {
      cancelAnimationFrame(id)
      io.disconnect()
    }
  }, [])

  return (
    <div className={`home font-mono text-[#d8d5ce] ${ready ? "is-ready" : ""}`}>
      <section className="pb-40">
        {/* Name: same type and left/right rhythm as the quote */}
        <div className="flex min-h-[calc(100vh-6rem)] flex-col justify-center">
          <p className="flex flex-col text-[15vw] uppercase leading-[0.9] tracking-[0.06em] text-[#f0ede6] md:text-[11vw]">
            <span className="block -mt-[0.35em] overflow-hidden pt-[0.45em]">
              <span className="home-word block"><Magnify text="Pablo" /></span>
            </span>
            <span className="block self-end -mt-[0.35em] overflow-hidden pt-[0.45em]">
              <span className="home-word block" style={{ transitionDelay: ".12s" }}>
                <Magnify text="Arenas" /><span className="text-[#8f1018]">.</span>
              </span>
            </span>
          </p>
          <div className="home-fade mt-10 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-[#828079]">
            <span className="h-px w-12 bg-[#8f1018]" />
            Diseño y programo interfaces que se entienden solas
          </div>
        </div>

        {/* Quote */}
        <h1 className="mt-24 flex flex-col gap-[1.2vw] text-[11vw] uppercase leading-[0.95] tracking-[0.06em] md:mt-40 md:text-[7.5vw]">
          {LINES.map((l, i) => (
            <span key={i} className={`q-line flex ${l.end ? "justify-end" : ""}`}>
              <HoverWord w={l.word} delay={i * 0.1} />
            </span>
          ))}
        </h1>

        <div className="mt-16 flex items-center justify-end gap-4 text-xs uppercase tracking-[0.4em] text-[#828079]">
          Massimo Vignelli, 2010
          <span className="h-px w-12 bg-[#8f1018]" />
        </div>
      </section>

      <style>{`
        .home-word { transform: translateY(110%); transition: transform 1.2s cubic-bezier(0.19,1,0.22,1); }
        .is-ready .home-word:not(.q) , .q-line.is-in .home-word { transform: none; }
        .home-fade { opacity: 0; transition: opacity 1.2s ease .8s; }
        .is-ready .home-fade { opacity: 1; }
        .home-media {
          position: relative; display: block; height: 0.8em; width: 0; overflow: hidden; opacity: 0;
          filter: grayscale(1) contrast(1.15) brightness(0.85);
          transition: width .9s cubic-bezier(.77,0,.175,1), clip-path .9s cubic-bezier(.77,0,.175,1), opacity .5s ease, transform .9s cubic-bezier(.19,1,.22,1);
        }
        .home-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: home-drift 9s ease-in-out infinite alternate; }
        .home-media.is-on { opacity: 1; }
        .shape-circle { clip-path: circle(0% at 50% 50%); }
        .shape-circle.is-on { width: .8em; clip-path: circle(50% at 50% 50%); }
        .shape-arch { clip-path: inset(100% 0 0 0 round 999px 999px 0 0); }
        .shape-arch.is-on { width: 1.1em; clip-path: inset(0 0 0 0 round 999px 999px 0 0); }
        .shape-tall { clip-path: inset(0 0 100% 0); transform: rotate(-6deg); }
        .shape-tall.is-on { width: .6em; clip-path: inset(0 0 0 0); transform: rotate(0); }
        .shape-diamond { clip-path: polygon(50% 50%,50% 50%,50% 50%,50% 50%); }
        .shape-diamond.is-on { width: .8em; clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%); }
        .shape-wide { clip-path: inset(0 100% 0 0); }
        .shape-wide.is-on { width: 2.2em; clip-path: inset(0 0 0 0); }
        @keyframes home-drift { 0% { transform: scale(1.1); } 100% { transform: scale(1.35) translate(-4%,3%); } }
        .home-outline { color: transparent; -webkit-text-stroke: 1px #d8d5ce; transition: -webkit-text-stroke-color .5s; }
        .home-outline:hover { -webkit-text-stroke-color: #8f1018; }
        @media (prefers-reduced-motion: reduce) { .home-word, .home-fade, .home-media { transition: none; } .home-media img { animation: none; } }
      `}</style>
    </div>
  )
}
