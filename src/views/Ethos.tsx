import { useEffect, useRef, useState } from "react"

const PHOTO = `${import.meta.env.BASE_URL}pablo.png`

const SOFT_SKILLS = [
  ["Escucha", "Antes de diseñar, entiendo. Las mejores soluciones salen de las preguntas correctas."],
  ["Criterio", "Saber qué quitar. Defiendo decisiones con argumentos, no con gustos."],
  ["Curiosidad", "Aprendo rápido y fuera de mi zona: arquitectura, tipografía, código, cine."],
  ["Constancia", "Pulo el último detalle aunque nadie lo pida. Ahí está la diferencia."],
]

const EXPERIENCE = [
  ["2024 — actualidad", "DAM · Desarrollo de Aplicaciones Multiplataforma", "La Salle Gràcia, Barcelona"],
  ["2026 — actualidad", "DAM", "La Salle Gràcia, Barcelona"],
]

const TOOL_GROUPS: [string, [string, string | null][]][] = [
  ["diseño", [["Figma", "figma"], ["Axure", null]]],
  ["web", [["HTML", "html5"], ["CSS", "css"], ["JavaScript", "javascript"], ["TypeScript", "typescript"], ["React", "react"], ["Vite", "vite"]]],
  ["móvil", [["Kotlin", "kotlin"], ["Flutter", "flutter"], ["React Native", "react"]]],
  ["back", [["Node.js", "nodedotjs"], ["MySQL", "mysql"]]],
  ["flujo", [["Git", "git"], ["GitHub", "github"], ["VS Code", null]]],
]

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{ transform: inView ? "none" : "translateY(110%)", transitionDelay: `${delay}s` }}
      >
        {children}
      </div>
    </div>
  )
}

function Letters({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`about-letters inline-block ${className}`}>
      {text.split("").map((c, i) => (
        <span key={i} className="about-letter inline-block">{c === " " ? "\u00a0" : c}</span>
      ))}
    </span>
  )
}

const VERT = `attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;uv.y=1.-uv.y;gl_Position=vec4(p,0.,1.);}`
const FRAG = `precision mediump float;varying vec2 uv;uniform sampler2D t;uniform vec2 m;uniform float h,time;uniform vec2 res;
float rand(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec2 d=(m-uv)*vec2(res.x/res.y,1.);
  float amt=mix(.045,smoothstep(0.,.32,length(d))*.045,h);
  vec3 c=vec3(0.);
  for(float i=0.;i<36.;i++){
    float a=i/36.*6.2831;
    vec2 q=vec2(cos(a),sin(a))*(rand(vec2(i,uv.x+uv.y+time*.01))*.8+.2);
    c+=texture2D(t,uv+q*amt).rgb;
  }
  c/=36.;
  float g=dot(c,vec3(.299,.587,.114));
  g=(g-.5)*1.12+.47;
  g+=(rand(uv*res+fract(time))-.5)*.07;
  gl_FragColor=vec4(vec3(g),1.);
}`

function BlurPortrait() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const target = useRef({ x: 0.5, y: 0.5, h: 0 })

  useEffect(() => {
    const cv = canvas.current!
    const gl = cv.getContext("webgl")
    if (!gl) return
    const sh = (type: number, src: string) => {
      const o = gl.createShader(type)!
      gl.shaderSource(o, src)
      gl.compileShader(o)
      return o
    }
    const pr = gl.createProgram()!
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(pr)
    gl.useProgram(pr)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, "p")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(pr, n)
    const tex = gl.createTexture()
    let ready = false
    const img = new Image()
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      ready = true
    }
    img.src = PHOTO
    const cur = { x: 0.5, y: 0.5, h: 0 }
    let raf = 0
    const draw = (now: number) => {
      const w = cv.clientWidth * devicePixelRatio, hh = cv.clientHeight * devicePixelRatio
      if (cv.width !== w || cv.height !== hh) { cv.width = w; cv.height = hh; gl.viewport(0, 0, w, hh) }
      const t = target.current
      cur.x += (t.x - cur.x) * 0.08
      cur.y += (t.y - cur.y) * 0.08
      cur.h += (t.h - cur.h) * 0.06
      if (ready) {
        gl.uniform2f(u("m"), cur.x, cur.y)
        gl.uniform1f(u("h"), cur.h)
        gl.uniform1f(u("time"), now / 1000)
        gl.uniform2f(u("res"), w, hh)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  const move = (e: React.MouseEvent) => {
    const r = canvas.current!.getBoundingClientRect()
    target.current.x = (e.clientX - r.left) / r.width
    target.current.y = (e.clientY - r.top) / r.height
  }

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label="Retrato de Pablo"
      onMouseMove={move}
      onMouseEnter={(e) => { move(e); target.current.h = 1 }}
      onMouseLeave={() => (target.current.h = 0)}
      className="block aspect-[993/1568] w-full cursor-crosshair"
    />
  )
}

export default function Ethos() {
  return (
    <div className="animate-in fade-in duration-700 font-mono text-[#d8d5ce]">
      <section className="grid grid-cols-1 gap-16 pt-12 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-7">
          <span className="mb-12 block font-serif text-lg italic lowercase tracking-widest text-[#8f1018] md:text-2xl">sobre mí.</span>
          <h1 className="text-[16vw] uppercase leading-[0.85] tracking-[0.02em] md:text-[9vw]">
            <Reveal><Letters text="Hola," /></Reveal>
            <Reveal delay={0.1}>
              <Letters text="soy " />
              <span className="font-serif italic normal-case tracking-normal text-[#8f1018]"><Letters text="Pablo." /></span>
            </Reveal>
          </h1>
          <Reveal delay={0.3} className="mt-16 max-w-xl">
            <p className="text-lg leading-relaxed tracking-wide md:text-xl">
              Diseñador UX/UI y desarrollador frontend. Trabajo en el punto donde el diseño deja de ser una imagen y se
              convierte en algo que se usa, se toca y responde.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-4 md:col-start-9 md:mt-40">
          <BlurPortrait />
        </div>
      </section>

      {/* Manifiesto: persona + diseñador */}
      <section className="mt-48 md:mt-72">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <span className="block font-serif text-7xl italic leading-none text-[#8f1018] md:text-8xl">i.</span>
            <span className="mt-4 block text-[10px] uppercase tracking-[0.35em] text-[#56544e]">persona</span>
          </div>
          <p className="about-prose text-3xl leading-[1.15] tracking-wide md:col-span-9 md:text-5xl">
            Vivo en Barcelona y me fijo en <em>cómo</em> están hechas las cosas: una señal en el metro, el ritmo de
            una fachada, el peso de una letra. Tranquilo, observador y <em>obsesivo</em> con lo que casi nadie ve.
          </p>
        </div>

        <div className="mt-40 grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="about-prose order-2 text-3xl leading-[1.15] tracking-wide text-[#828079] md:order-1 md:col-span-8 md:col-start-3 md:text-right md:text-5xl">
            Diseño desde <em>quien</em> usa, no desde la pantalla. Cada decisión tiene un porqué y cada
            interacción una <em>intención</em>; lo demás, sobra.
          </p>
          <div className="order-1 md:order-2 md:col-span-2 md:text-right">
            <span className="block font-serif text-7xl italic leading-none text-[#8f1018] md:text-8xl">ii.</span>
            <span className="mt-4 block text-[10px] uppercase tracking-[0.35em] text-[#56544e]">diseñador</span>
          </div>
        </div>
      </section>

      {/* Cómo trabajo: acordeón tipográfico */}
      <section className="mt-56">
        <div className="mb-16 flex items-baseline justify-between">
          <span className="font-serif text-2xl italic lowercase tracking-widest text-[#8f1018] md:text-3xl">cómo trabajo.</span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#56544e]">0{SOFT_SKILLS.length} principios</span>
        </div>
        {SOFT_SKILLS.map(([t, d], i) => (
          <div key={t} className={`about-skill group flex flex-col py-2 ${i % 2 ? "items-end text-right" : ""}`}>
            <div className="flex items-baseline gap-6">
              <span className="text-[10px] tracking-[0.3em] text-[#56544e] transition-colors duration-500 group-hover:text-[#8f1018]">0{i + 1}</span>
              <h3 className="about-skill-title text-[13vw] uppercase leading-[0.95] tracking-[0.04em] md:text-[7vw]">{t}</h3>
            </div>
            <div className="about-skill-body grid">
              <p className="overflow-hidden">
                <span className="block max-w-md pb-6 text-sm leading-relaxed tracking-wide text-[#d8d5ce] md:text-base">{d}</span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Trayectoria */}
      <section className="mt-56">
        <span className="mb-16 block font-serif text-2xl italic lowercase tracking-widest text-[#8f1018] md:text-3xl">trayectoria.</span>
        <div className="flex flex-col gap-20">
          {EXPERIENCE.map(([y, r, c]) => {
            const [from, to] = y.split(" — ")
            return (
              <div key={y + r} className="group grid grid-cols-1 items-end gap-6 md:grid-cols-12">
                <span className="about-year text-[22vw] leading-[0.8] tracking-tight md:col-span-6 md:text-[11vw]">{from}</span>
                <div className="md:col-span-6 md:pb-4">
                  <span className="block text-[10px] uppercase tracking-[0.35em] text-[#8f1018]">→ {to}</span>
                  <span className="mt-3 block text-xl uppercase tracking-[0.08em] md:text-2xl">{r}</span>
                  <span className="mt-1 block font-serif text-lg italic text-[#828079]">{c}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Herramientas */}
      <section className="mt-56 pb-40">
        <div className="mb-20 flex items-baseline justify-between">
          <span className="font-serif text-2xl italic lowercase tracking-widest text-[#8f1018] md:text-3xl">herramientas.</span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#56544e]">lo que uso a diario</span>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-20 md:grid-cols-5 md:gap-x-10">
          {TOOL_GROUPS.map(([g, items], gi) => (
            <div key={g} className={gi % 2 ? "md:mt-24" : ""}>
              <div className="mb-8 flex items-baseline gap-3">
                <span className="font-serif text-5xl italic leading-none text-[#3a3935] md:text-6xl">{gi + 1}</span>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#828079]">{g}</span>
              </div>
              <ul className="flex flex-col gap-4">
                {items.map(([name, slug]) => (
                  <li key={name} className="tool-item group relative flex items-center gap-3 text-base uppercase tracking-[0.14em] text-[#828079] md:text-lg">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {slug ? (
                        <span className="relative h-full w-full">
                          <img src={`https://cdn.simpleicons.org/${slug}/3a3935`} alt="" className="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0" />
                          <img src={`https://cdn.simpleicons.org/${slug}/8f1018`} alt="" className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </span>
                      ) : (
                        <span className="font-serif text-lg italic normal-case text-[#3a3935] transition-colors duration-300 group-hover:text-[#8f1018]">{name[0]}</span>
                      )}
                    </span>
                    <span className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-[#f0ede6]">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .about-sharp {
          -webkit-mask-image: radial-gradient(circle var(--r) at var(--x, 50%) var(--y, 50%), #000 55%, transparent 100%);
          mask-image: radial-gradient(circle var(--r) at var(--x, 50%) var(--y, 50%), #000 55%, transparent 100%);
        }
        @property --r { syntax: '<length>'; inherits: true; initial-value: 0px; }
        .about-letter {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s;
        }
        .about-letter:hover {
          transform: translateY(-0.08em) skewX(-8deg);
          color: #8f1018;
        }
        .about-prose em {
          font-family: var(--font-serif, Georgia, serif);
          font-style: italic;
          color: #f0ede6;
          background: linear-gradient(#8f1018, #8f1018) no-repeat 0 92% / 0 1px;
          transition: background-size 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-prose em:hover { background-size: 100% 1px; }
        .about-skill-body { grid-template-rows: 0fr; transition: grid-template-rows 0.7s cubic-bezier(0.16,1,0.3,1); }
        .about-skill:hover .about-skill-body { grid-template-rows: 1fr; }
        .about-skill-title {
          color: transparent;
          -webkit-text-stroke: 1px #56544e;
          background: linear-gradient(#f0ede6, #f0ede6) no-repeat 0 0 / 0% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          transition: background-size 0.9s cubic-bezier(0.77,0,0.175,1), -webkit-text-stroke-color 0.5s;
        }
        .about-skill:nth-child(odd) .about-skill-title { background-position: 100% 0; }
        .about-skill:hover .about-skill-title { background-size: 100% 100%; -webkit-text-stroke-color: #f0ede6; }
        .about-year {
          color: transparent;
          -webkit-text-stroke: 1px #3a3935;
          transition: -webkit-text-stroke-color 0.6s, color 0.6s;
        }
        .group:hover .about-year { color: #8f1018; -webkit-text-stroke-color: #8f1018; }
        .process-outline-soft { color: transparent; -webkit-text-stroke: 1px #d8d5ce; }
        .about-marquee-track { animation: about-marquee 30s linear infinite; }
        .about-marquee:hover .about-marquee-track { animation-play-state: paused; }
        @keyframes about-marquee { to { transform: translateX(-100%); } }
        .about-aurora {
          background:
            radial-gradient(40% 30% at 30% 30%, rgba(143,16,24,0.35), transparent 70%),
            radial-gradient(45% 35% at 70% 60%, rgba(216,213,206,0.28), transparent 70%),
            radial-gradient(35% 30% at 40% 85%, rgba(6,6,6,0.6), transparent 70%);
          filter: blur(40px);
          mix-blend-mode: soft-light;
          animation: about-aurora 14s ease-in-out infinite alternate;
        }
        @keyframes about-aurora {
          0% { transform: translate(-6%, -4%) rotate(0deg) scale(1); }
          50% { transform: translate(5%, 3%) rotate(8deg) scale(1.1); }
          100% { transform: translate(-3%, 6%) rotate(-6deg) scale(1.05); }
        }
        .about-portrait { transition: --r 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  )
}
