import { useEffect, useRef, useState } from "react"

type Mode = "idle" | "link" | "view" | "text"

// Signage-style cursor: exact red dot + square frame that trails with inertia
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>("idle")
  const [label, setLabel] = useState("")
  const [down, setDown] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [light, setLight] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches) return
    setEnabled(true)
    document.documentElement.classList.add("has-cursor")

    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let raf = 0

    const move = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`

      const t = e.target as HTMLElement
      setLight(!!t.closest("[data-cursor-light]"))
      const el = t.closest<HTMLElement>("[data-cursor-skip], [data-cursor], a, button, img, p, h1, h2, h3")
      const custom = el?.dataset.cursor
      if (el?.hasAttribute("data-cursor-skip")) {
        setMode("idle")
      } else if (custom) {
        setMode("view")
        setLabel(custom)
      } else if (el?.matches("a, button")) {
        setMode("link")
      } else if (el?.matches("img")) {
        setMode("view")
        setLabel("Ver")
      } else if (el?.matches("p, h1, h2, h3")) {
        setMode("text")
      } else {
        setMode("idle")
      }
    }

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      if (frame.current) frame.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    const onLeave = () => {
      target.x = target.y = -100
      if (dot.current) dot.current.style.transform = "translate3d(-100px,-100px,0)"
    }

    window.addEventListener("pointermove", move)
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    document.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.removeEventListener("pointerleave", onLeave)
      document.documentElement.classList.remove("has-cursor")
    }
  }, [])

  if (!enabled) return null

  const size = { idle: 28, link: 48, view: 84, text: 4 }[mode]

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div ref={frame} className="absolute top-0 left-0 will-change-transform">
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#060606] transition-[width,height,background-color,border-color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: mode === "text" ? 2 : size,
            height: mode === "text" ? 26 : size,
            border: `1px solid ${mode === "view" ? "transparent" : light ? "#8f1018" : "rgba(240,237,230,0.55)"}`,
            background: mode === "view" || mode === "text" ? (light ? "#8f1018" : "#f0ede6") : "transparent",
            color: light ? "#f0ede6" : "#060606",
            transform: `translate(-50%, -50%) scale(${down ? 0.8 : 1}) rotate(${mode === "link" ? 45 : 0}deg)`,
          }}
        >
          {mode === "view" && <span className="pl-[0.3em]">{label}</span>}
        </div>
      </div>
      <div ref={dot} className="absolute top-0 left-0 will-change-transform">
        <div
          className="size-[6px] -translate-x-1/2 -translate-y-1/2 bg-[#8f1018] transition-opacity duration-300"
          style={{ opacity: mode === "view" || mode === "text" ? 0 : 1 }}
        />
      </div>
    </div>
  )
}
