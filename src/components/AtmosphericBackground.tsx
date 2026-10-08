import { useEffect, useRef } from "react"

function hash2D(x: number, y: number) {
  let value = Math.imul(x, 374761393) + Math.imul(y, 668265263)
  value = Math.imul(value ^ (value >>> 13), 1274126177)
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295
}

function valueNoise(x: number, y: number) {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const xFade = (x - x0) ** 2 * (3 - 2 * (x - x0))
  const yFade = (y - y0) ** 2 * (3 - 2 * (y - y0))

  const top =
    hash2D(x0, y0) * (1 - xFade) + hash2D(x0 + 1, y0) * xFade
  const bottom =
    hash2D(x0, y0 + 1) * (1 - xFade) +
    hash2D(x0 + 1, y0 + 1) * xFade

  return top * (1 - yFade) + bottom * yFade
}

function fbm(x: number, y: number, octaves: number) {
  let value = 0
  let amplitude = 0.5
  let frequency = 1
  let totalAmplitude = 0

  for (let octave = 0; octave < octaves; octave += 1) {
    value += valueNoise(x * frequency, y * frequency) * amplitude
    totalAmplitude += amplitude
    amplitude *= 0.5
    frequency *= 2.05
  }

  return value / totalAmplitude
}

function smoothstep(edgeStart: number, edgeEnd: number, value: number) {
  const normalized = Math.min(
    1,
    Math.max(0, (value - edgeStart) / (edgeEnd - edgeStart)),
  )
  return normalized * normalized * (3 - 2 * normalized)
}

export default function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d", { alpha: true })
    if (!context) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let animationFrame = 0
    let lastFrame = 0
    let image: ImageData

    const resize = () => {
      const viewportWidth = Math.max(
        1,
        window.innerWidth || document.documentElement.clientWidth || 1,
      )
      const viewportHeight = Math.max(
        1,
        window.innerHeight || document.documentElement.clientHeight || 1,
      )
      const lowPowerDevice = (navigator.hardwareConcurrency || 4) <= 4
      const targetWidth = Math.min(
        lowPowerDevice ? 300 : 500,
        Math.max(250, Math.round(viewportWidth / 3)),
      )
      canvas.width = targetWidth
      canvas.height = Math.round(targetWidth * (viewportHeight / viewportWidth))
      image = context.createImageData(canvas.width, canvas.height)
      context.imageSmoothingEnabled = true
    }

    const render = (timestamp: number) => {
      if (!reducedMotion.matches && timestamp - lastFrame < 100) {
        animationFrame = requestAnimationFrame(render)
        return
      }

      lastFrame = timestamp
      const width = canvas.width
      const height = canvas.height
      const pixels = image.data
      const time = reducedMotion.matches ? 0 : timestamp / 1000

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const normalizedX = x / width
          const normalizedY = y / height
          
          const nx = x * 0.012
          const ny = y * 0.012
          
          const warp1 = fbm(nx + time * 0.008, ny - time * 0.005, 2)
          const warp2 = fbm(nx - warp1 * 1.5 + time * 0.01, ny + warp1 * 1.5 - time * 0.007, 2)
          
          const surfaceNoise = fbm(nx * 2.5 + warp2 * 3, ny * 2.5 - warp2 * 3, 3)
          
          const ridges = Math.sin(surfaceNoise * 26)
          const highlight = smoothstep(0.75, 1.0, ridges)
          const shadow = smoothstep(-1.0, -0.75, ridges)
          
          const topography = smoothstep(0.35, 0.65, warp2)
            
          const surfaceForm = topography * 25 + highlight * 32 - shadow * 12

          const edgeFalloff =
            0.82 +
            0.18 *
              Math.sin(Math.min(normalizedX, 1 - normalizedX) * Math.PI) *
              Math.sin(Math.min(normalizedY, 1 - normalizedY) * Math.PI)
              
          const gray = Math.max(
            0,
            Math.min(80, (6 + surfaceForm) * edgeFalloff),
          )
          const pixelIndex = (y * width + x) * 4

          pixels[pixelIndex] = gray
          pixels[pixelIndex + 1] = gray
          pixels[pixelIndex + 2] = gray
          pixels[pixelIndex + 3] = 220
        }
      }

      context.putImageData(image, 0, 0)

      if (!reducedMotion.matches) {
        animationFrame = requestAnimationFrame(render)
      }
    }

    resize()
    window.addEventListener("resize", resize)
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1] h-full w-full pointer-events-none opacity-70 mix-blend-screen"
    />
  )
}
