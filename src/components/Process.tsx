import { useEffect, useRef, useState } from 'react'

const u = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900`

const MEDIA = [
  u('photo-1693648793394-0b76b7eb042e'),
  u('photo-1498075702571-ecb018f3752d'),
  u('photo-1714765761465-e7a4974fa05b'),
  u('photo-1717155970253-b7a4bcfaf7d8'),
  u('photo-1554104683-c7063687d649'),
  u('photo-1736641933920-a8ce493f554f'),
]

type Part = { text?: string; media?: number; owner?: number; className?: string }

const SHAPES = ['shape-circle', 'shape-arch', 'shape-tall', 'shape-diamond', 'shape-wide', 'shape-circle']

const LINES: Part[][] = [
  [{ text: 'SI PUEDES' }, { media: 0 }],
  [{ media: 1, owner: 1 }, { text: 'DISEÑAR', className: 'text-[#828079]' }, { text: 'UNA COSA,' }, { media: 5, owner: 2 }],
  [{ text: 'PUEDES', className: 'process-outline' }, { media: 2 }],
  [{ media: 3 }, { text: 'DISEÑARLO' }],
  [{ text: 'TODO.', className: 'text-[#8f1018]' }, { media: 4 }],
]

function Line({ parts, index }: { parts: Part[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const align = index % 2 === 0 ? 'justify-start' : 'justify-end'

  return (
    <div
      ref={ref}
      onMouseLeave={() => setHover(null)}
      className={`flex w-fit flex-wrap items-center gap-[2vw] ${index % 2 ? 'self-end' : ''} ${align} ${visible ? 'is-in' : ''}`}
    >
      {parts.map((p, i) =>
        p.media !== undefined ? (
          <span
            key={i}
            className={`process-media ${SHAPES[p.media]} ${(p.owner === undefined ? hover !== null : hover === p.owner) ? 'is-hover' : ''}`}
          >
            <img src={MEDIA[p.media]} alt="" loading="lazy" />
          </span>
        ) : (
          <span key={i} className="-mt-[0.2em] block overflow-hidden pt-[0.2em] pb-[0.06em]" onMouseEnter={() => setHover(i)}>
            <span
              className={`process-word block ${p.className ?? ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {p.text}
            </span>
          </span>
        ),
      )}
    </div>
  )
}

export default function Process() {
  return (
    <section className="relative overflow-hidden py-32 font-mono text-[#d8d5ce] md:py-48">
      <div className="px-6 md:px-12">
        <span className="mb-16 block font-serif text-lg italic lowercase tracking-widest text-[#8f1018] md:text-2xl">
          el proceso.
        </span>
        <h2 className="flex flex-col gap-[1.5vw] text-[11vw] uppercase leading-[0.95] tracking-[0.06em] md:text-[7.5vw]">
          {LINES.map((parts, i) => (
            <Line key={i} parts={parts} index={i} />
          ))}
        </h2>
        <div className="process-cite mt-20 ml-auto w-fit text-right md:mt-28">
          <span className="block text-sm uppercase tracking-[0.4em] text-[#d8d5ce] md:text-base">Massimo Vignelli</span>
          <span className="mt-2 block text-xs tracking-[0.4em] text-[#828079]">— The Vignelli Canon, 2010</span>
        </div>
      </div>

      <style>{`
        .process-word {
          transform: translateY(110%);
          transition: transform 1.1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .is-in .process-word { transform: translateY(0); }

        .process-media {
          position: relative;
          display: block;
          height: 0.8em;
          width: 0;
          overflow: hidden;
          opacity: 0;
          filter: grayscale(1) contrast(1.15) brightness(0.85);
          transition:
            width 0.9s cubic-bezier(0.77, 0, 0.175, 1),
            clip-path 0.9s cubic-bezier(0.77, 0, 0.175, 1),
            opacity 0.5s ease,
            transform 0.9s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .process-media img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover;
          animation: process-drift 9s ease-in-out infinite alternate;
        }
        .shape-circle { clip-path: circle(0% at 50% 50%); }
        .is-hover.shape-circle { width: 0.8em; clip-path: circle(50% at 50% 50%); }
        .shape-arch { clip-path: inset(100% 0 0 0 round 999px 999px 0 0); }
        .is-hover.shape-arch { width: 1.1em; clip-path: inset(0 0 0 0 round 999px 999px 0 0); }
        .shape-tall { clip-path: inset(0 0 100% 0); transform: rotate(-6deg); }
        .is-hover.shape-tall { width: 0.6em; clip-path: inset(0 0 0 0); transform: rotate(0); }
        .shape-diamond { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); }
        .is-hover.shape-diamond { width: 0.8em; clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); }
        .shape-wide { clip-path: inset(0 100% 0 0); }
        .is-hover.shape-wide { width: 2.2em; clip-path: inset(0 0 0 0); }
        .is-hover.process-media { opacity: 1; }
        @keyframes process-drift {
          0% { transform: scale(1.15) translate(0, 0) rotate(0deg); }
          100% { transform: scale(1.45) translate(-6%, 4%) rotate(4deg); }
        }

        .process-outline {
          color: transparent;
          -webkit-text-stroke: 1px #d8d5ce;
          transition: -webkit-text-stroke-color 0.5s;
        }
        .process-outline:hover { -webkit-text-stroke-color: #8f1018; }

        @media (prefers-reduced-motion: reduce) {
          .process-word, .process-media { transition: none; }
          .process-media img { animation: none; }
        }
      `}</style>
    </section>
  )
}
