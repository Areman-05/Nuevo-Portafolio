import { useEffect, useRef, useState } from "react"
import { useLang } from "../i18n"

type Mode = "idle" | "link" | "view" | "text"

const SIZE: Record<Mode, number> = { idle: 28, link: 48, view: 84, text: 4 }

function preferNativeCursor() {
  const cores = navigator.hardwareConcurrency || 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  // Only fall back on clearly constrained devices; keep craft cursor for typical laptops
  return cores <= 2 || (typeof memory === "number" && memory <= 4) || !!saveData || reducedMotion
}

// Signage-style cursor: red dot + trailing frame. DOM-only updates (no React on move).
export default function Cursor() {
  const { t } = useLang()
  const viewLabel = useRef(t.cursorView)
  viewLabel.current = t.cursorView
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const labelEl = useRef<HTMLSpanElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches || preferNativeCursor()) return

    setEnabled(true)
    document.documentElement.classList.add("has-cursor")

    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let raf = 0
    let running = true
    let mode: Mode = "idle"
    let label = ""
    let light = false
    let down = false
    let hitQueued = false
    let lastTarget: EventTarget | null = null

    const paintBox = () => {
      const el = box.current
      const lab = labelEl.current
      if (!el) return
      const size = SIZE[mode]
      const isText = mode === "text"
      const isView = mode === "view"
      el.style.width = `${isText ? 2 : size}px`
      el.style.height = `${isText ? 26 : size}px`
      el.style.borderColor = isView ? "transparent" : light ? "#8f1018" : "rgba(240,237,230,0.55)"
      el.style.background = isView || isText ? (light ? "#8f1018" : "#f0ede6") : "transparent"
      el.style.color = light ? "#f0ede6" : "#060606"
      el.style.transform = `translate(-50%, -50%) scale(${down ? 0.8 : 1}) rotate(${mode === "link" ? 45 : 0}deg)`
      if (lab) {
        lab.textContent = isView ? label : ""
        lab.style.display = isView ? "block" : "none"
      }
      if (dot.current) {
        const inner = dot.current.firstElementChild as HTMLElement | null
        if (inner) inner.style.opacity = isView || isText ? "0" : "1"
      }
    }

    const apply = (next: Mode, nextLabel = "", nextLight = false) => {
      if (mode === next && label === nextLabel && light === nextLight) return
      mode = next
      label = nextLabel
      light = nextLight
      paintBox()
    }

    const resolveHit = (hit: HTMLElement) => {
      const nextLight = !!hit.closest("[data-cursor-light]")
      if (hit.closest("[data-cursor-skip]")) {
        apply("idle", "", nextLight)
        return
      }
      const custom = hit.closest<HTMLElement>("[data-cursor]")
      if (custom?.dataset.cursor) {
        apply("view", custom.dataset.cursor, nextLight)
        return
      }
      if (hit.closest("a, button")) {
        apply("link", "", nextLight)
        return
      }
      if (hit.closest("img")) {
        apply("view", viewLabel.current, nextLight)
        return
      }
      if (hit.closest("p, h1, h2, h3")) {
        apply("text", "", nextLight)
        return
      }
      apply("idle", "", nextLight)
    }

    const move = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      lastTarget = e.target
      if (hitQueued) return
      hitQueued = true
      requestAnimationFrame(() => {
        hitQueued = false
        if (lastTarget instanceof HTMLElement) resolveHit(lastTarget)
      })
    }

    const loop = () => {
      if (!running) return
      if (!document.hidden) {
        pos.x += (target.x - pos.x) * 0.18
        pos.y += (target.y - pos.y) * 0.18
        if (frame.current) {
          frame.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }
      }
      raf = requestAnimationFrame(loop)
    }

    const onDown = () => {
      down = true
      paintBox()
    }
    const onUp = () => {
      down = false
      paintBox()
    }
    const onLeave = () => {
      target.x = target.y = -100
      if (dot.current) dot.current.style.transform = "translate3d(-100px,-100px,0)"
    }

    paintBox()
    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    document.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.removeEventListener("pointerleave", onLeave)
      document.documentElement.classList.remove("has-cursor")
    }
  }, [])

  if (!enabled) return null

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div ref={frame} className="absolute top-0 left-0 will-change-transform">
        <div
          ref={box}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-solid font-mono text-[10px] uppercase tracking-[0.3em] transition-[width,height,background-color,border-color,color,transform] duration-300 ease-out"
          style={{ width: 28, height: 28, borderColor: "rgba(240,237,230,0.55)", background: "transparent" }}
        >
          <span ref={labelEl} className="pl-[0.3em]" style={{ display: "none" }} />
        </div>
      </div>
      <div ref={dot} className="absolute top-0 left-0 will-change-transform">
        <div className="size-[6px] -translate-x-1/2 -translate-y-1/2 bg-[#8f1018] transition-opacity duration-200" />
      </div>
    </div>
  )
}
