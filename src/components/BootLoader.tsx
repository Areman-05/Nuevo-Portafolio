import { useEffect, useState } from "react"

const DURATION_MS = 3000

type Props = { onDone: () => void }

export default function BootLoader({ onDone }: Props) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setPct(100)
      const t = window.setTimeout(() => {
        setLeaving(true)
        window.setTimeout(onDone, 400)
      }, 200)
      return () => clearTimeout(t)
    }

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS)
      const eased = 1 - (1 - t) ** 3
      setPct(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
        return
      }
      setLeaving(true)
      window.setTimeout(onDone, 700)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div
      aria-hidden="true"
      className={`boot fixed inset-0 z-[200] flex items-end justify-start bg-[#060606] px-5 pb-10 font-mono text-[#f0ede6] md:px-8 md:pb-12 ${
        leaving ? "is-out" : ""
      }`}
    >
      <div className="boot-num tabular-nums">
        <span className="text-[22vw] leading-none tracking-[-0.04em] md:text-[12vw]">
          {String(pct).padStart(2, "0")}
        </span>
        <span className="ml-1 align-top text-[6vw] tracking-[0.08em] text-[#c8323a] md:text-[3vw]">%</span>
      </div>
      <style>{`
        .boot { transition: opacity .65s cubic-bezier(0.77,0,0.175,1), transform .65s cubic-bezier(0.77,0,0.175,1); }
        .boot.is-out { opacity: 0; transform: translateY(-4%); pointer-events: none; }
        .boot-num { transition: transform 1s cubic-bezier(0.19,1,0.22,1); }
        .boot.is-out .boot-num { transform: translateY(-12%); }
      `}</style>
    </div>
  )
}
