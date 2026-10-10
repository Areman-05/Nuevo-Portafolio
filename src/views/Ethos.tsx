import { useEffect, useRef, useState } from "react"

const PHOTO = `${import.meta.env.BASE_URL}pablo.png`

const EXPERIENCE = [
  {
    role: "Desarrollador de software",
    company: "Solucions Socials Sostenibles",
    date: "oct 2025 — may 2026",
    desc: "Diseño e implementación de interfaces funcionales para plataformas logísticas. Desarrollo de lógica de negocio conectando frontend y backend con estructuras de datos optimizadas."
  }
]

const EDUCATION = [
  {
    title: "Desarrollo de Aplicaciones Multiplataforma",
    place: "La Salle Gràcia",
    date: "2024 — Actualidad",
  },
  {
    title: "Desarrollo de Aplicaciones Web",
    place: "La Salle Gràcia",
    date: "2026 — Actualidad",
  },
]

// Tools and languages
const STACK = [
  { name: "Figma", slug: "figma" },
  { name: "Framer", slug: "framer" },
  { name: "React", slug: "react" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS3", slug: "css3" },
  { name: "Kotlin", slug: "kotlin" },
  { name: "Python", slug: "python" },
  { name: "Java", slug: "java" },
  { name: "Git", slug: "git" },
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
    <span className={`inline-block ${className}`}>
      {text.split("").map((c, i) => (
        <span key={i} className="inline-block transition-transform duration-500 hover:-translate-y-2 hover:text-[#8f1018]">{c === " " ? "\u00a0" : c}</span>
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
      className="block aspect-[993/1568] w-full cursor-crosshair filter grayscale mix-blend-lighten opacity-80"
    />
  )
}

function SectionTitle({ num, title }: { num: string, title: string }) {
  return (
    <div className="mb-16 md:mb-24 flex items-baseline gap-6 border-b border-[#1a1a1a] pb-6">
      <span className="text-[10px] tracking-[0.35em] text-[#8f1018] font-bold">{num}</span>
      <h2 className="text-3xl uppercase tracking-widest text-[#56544e]">{title}</h2>
    </div>
  )
}

export default function Ethos() {
  return (
    <div className="animate-in fade-in duration-700 font-mono text-[#d8d5ce] px-6 md:px-12 pb-40">
      <section className="grid grid-cols-1 gap-16 pt-32 md:grid-cols-12 md:pt-48 min-h-screen">
        <div className="md:col-span-7 flex flex-col justify-center">
          <Reveal>
            <h1 className="text-[12vw] uppercase leading-[0.9] tracking-[0.02em] md:text-[7vw]">
              <span className="block text-[#56544e]">Diseño</span>
              <span className="block text-[#f0ede6]">y programo.</span>
              <span className="mt-4 block text-[#8f1018]">Con criterio.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2} className="mt-16 max-w-xl">
            <p className="text-lg leading-relaxed tracking-wide md:text-xl text-[#828079]">
              Empecé programando y acabé obsesionado con por qué algunas interfaces se entienden solas y otras no. Me formo en desarrollo multiplataforma y web en La Salle Gràcia, y hoy trabajo justo en ese cruce: diseño pensando en cómo se construye, y programo pensando en quien lo va a usar.
              <span className="mt-6 block">Me inspira la señalética de Barcelona: sistemas que orientan a miles de personas sin decir una palabra de más. Eso intento hacer en cada pantalla.</span>
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-4 md:col-start-9 md:mt-20">
          <BlurPortrait />
        </div>
      </section>

      <section className="mt-40 md:mt-64 max-w-5xl mx-auto">
        <SectionTitle num="01" title="Experiencia" />
        <div className="flex flex-col gap-12 md:gap-20">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8 items-start">
                <div className="md:col-span-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#56544e] group-hover:text-[#8f1018] transition-colors">{exp.date}</span>
                </div>
                <div className="md:col-span-9 flex flex-col gap-4">
                  <h3 className="text-2xl md:text-4xl uppercase tracking-wide text-[#f0ede6] group-hover:text-[#8f1018] transition-colors">
                    {exp.role}
                  </h3>
                  <span className="font-serif italic text-xl text-[#56544e]">{exp.company}</span>
                  <p className="max-w-2xl text-base leading-relaxed text-[#828079] mt-2">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-40 md:mt-64 max-w-5xl mx-auto">
        <SectionTitle num="02" title="Formación" />
        <div className="flex flex-col gap-8 md:gap-12">
          {EDUCATION.map((edu, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#1a1a1a] pb-8 gap-4 hover:border-[#8f1018] transition-colors">
                <h3 className="text-xl md:text-2xl uppercase tracking-widest text-[#d8d5ce] group-hover:translate-x-4 transition-transform duration-500">
                  {edu.title}
                </h3>
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-[#56544e]">
                  <span>{edu.place}</span>
                  <span className="w-1 h-1 bg-[#8f1018] rounded-full"></span>
                  <span className="group-hover:text-[#f0ede6] transition-colors">{edu.date}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-40 md:mt-64 max-w-5xl mx-auto">
        <SectionTitle num="03" title="Herramientas & Stack" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-16">
          {STACK.map((tool, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group flex flex-col items-center gap-6 cursor-crosshair">
                <div className="w-16 h-16 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                  <img src={`https://cdn.simpleicons.org/${tool.slug}/8f1018`} alt={tool.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#56544e] group-hover:text-[#f0ede6] transition-colors">
                  {tool.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
