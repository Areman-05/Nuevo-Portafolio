import { useEffect, useRef, useState } from "react"
import { Lang, useLang } from "../i18n"

const PHOTO = `${import.meta.env.BASE_URL}pablo.png`

type Cat = "design" | "ai" | "front" | "back" | "tools"
const STACK: { name: string; slug?: string; icon?: string; cat: Cat }[] = [
  { name: "Figma", slug: "figma", cat: "design" },
  { name: "Framer", slug: "framer", cat: "design" },
  { name: "Axure", icon: "axure.svg", cat: "design" },
  { name: "Miro", slug: "miro", cat: "design" },
  { name: "Mobbin", icon: "mobbin.svg", cat: "design" },
  { name: "v0", slug: "v0", cat: "ai" },
  { name: "HTML5", slug: "html5", cat: "front" },
  { name: "CSS", slug: "css", cat: "front" },
  { name: "JavaScript", slug: "javascript", cat: "front" },
  { name: "TypeScript", slug: "typescript", cat: "front" },
  { name: "React", slug: "react", cat: "front" },
  { name: "Next.js", slug: "nextdotjs", cat: "front" },
  { name: "Tailwind", slug: "tailwindcss", cat: "front" },
  { name: "Flutter", slug: "flutter", cat: "front" },
  { name: "Node.js", slug: "nodedotjs", cat: "back" },
  { name: "PHP", slug: "php", cat: "back" },
  { name: "Laravel", slug: "laravel", cat: "back" },
  { name: "MySQL", slug: "mysql", cat: "back" },
  { name: "Kotlin", slug: "kotlin", cat: "back" },
  { name: "Java", slug: "openjdk", cat: "back" },
  { name: "Python", slug: "python", cat: "back" },
  { name: "GitHub", slug: "github", cat: "tools" },
  { name: "WordPress", slug: "wordpress", cat: "tools" },
  { name: "VS Code", icon: "vscode.svg", cat: "tools" },
  { name: "Cursor", slug: "cursor", cat: "ai" },
  { name: "Android Studio", slug: "androidstudio", cat: "tools" },
  { name: "Antigravity", icon: "antigravity.svg", cat: "ai" },
]

type Copy = {
  h: [string, string, string]
  manifesto: string[]
  thinkTitle: string
  principles: { t: string; d: string }[]
  pathTitle: string
  kinds: { work: string; study: string }
  path: { years: string; title: string; place: string; kind: "work" | "study"; desc: string }[]
  stackTitle: string
  stackIntro: string
  cats: Record<"all" | Cat, string>
  outsideTitle: string
  cv: string
  outside: string
}

const COPY: Record<Lang, Copy> = {
  es: {
    h: ["Diseño", "y programo.", "Con criterio."],
    manifesto: [
      "Empecé programando y acabé obsesionado con por qué algunas interfaces se entienden solas y otras no.",
      "Hoy trabajo justo en ese cruce: diseño pensando en cómo se construye, y programo pensando en quien lo va a usar. Me inspira la señalética de Barcelona: sistemas que orientan a miles de personas sin decir una palabra de más.",
    ],
    thinkTitle: "Cómo pienso",
    principles: [
      { t: "Orientar antes que decorar", d: "Una interfaz funciona como una señal: tiene que entenderse de un vistazo." },
      { t: "Quitar hasta que funcione", d: "Antes de añadir, pregunto qué sobra. Lo que queda tiene que tener una razón." },
      { t: "Diseñar sabiendo construir", d: "Lo que dibujo, sé llevarlo a producción. Eso cambia cómo decido." },
      { t: "El detalle es el producto", d: "Una transición, un estado vacío, un error bien escrito. Ahí se nota el cuidado." },
    ],
    pathTitle: "Trayectoria",
    kinds: { work: "Experiencia", study: "Formación" },
    path: [
      { years: "2025—26", title: "Desarrollador de software", place: "Solucions Socials Sostenibles", kind: "work", desc: "Diseño e implementación de interfaces para plataformas logísticas. Lógica de negocio conectando frontend y backend con estructuras de datos pensadas para la interfaz." },
      { years: "2024—", title: "Desarrollo de Aplicaciones Multiplataforma", place: "La Salle Gràcia", kind: "study", desc: "Programación orientada a objetos, apps móviles y de escritorio, bases de datos y arquitectura de software." },
      { years: "2026—", title: "Desarrollo de Aplicaciones Web", place: "La Salle Gràcia", kind: "study", desc: "Desarrollo web cliente y servidor, diseño de interfaces, despliegue y accesibilidad." },
    ],
    stackTitle: "Herramientas",
    stackIntro: "Del primer boceto a producción.",
    cats: { all: "Todo", design: "Diseño", ai: "IA", front: "Frontend", back: "Backend", tools: "Plataformas" },
    outsideTitle: "Fuera de la pantalla",
    cv: "Descargar CV",
    outside: "Camino Barcelona mirando rótulos, flechas y tipografía de calle. Casi todas mis ideas empiezan ahí, no delante del ordenador.",
  },
  ca: {
    h: ["Dissenyo", "i programo.", "Amb criteri."],
    manifesto: [
      "Vaig començar programant i vaig acabar obsessionat amb per què algunes interfícies s'entenen soles i d'altres no.",
      "Avui treballo just en aquest encreuament: dissenyo pensant en com es construeix, i programo pensant en qui ho farà servir. M'inspira la senyalètica de Barcelona: sistemes que orienten milers de persones sense dir ni una paraula de més.",
    ],
    thinkTitle: "Com penso",
    principles: [
      { t: "Orientar abans que decorar", d: "Una interfície funciona com un senyal: s'ha d'entendre d'un cop d'ull." },
      { t: "Treure fins que funcioni", d: "Abans d'afegir, pregunto què sobra. El que queda ha de tenir una raó." },
      { t: "Dissenyar sabent construir", d: "El que dibuixo, sé portar-ho a producció. Això canvia com decideixo." },
      { t: "El detall és el producte", d: "Una transició, un estat buit, un error ben escrit. Aquí es nota la cura." },
    ],
    pathTitle: "Trajectòria",
    kinds: { work: "Experiència", study: "Formació" },
    path: [
      { years: "2025—26", title: "Desenvolupador de programari", place: "Solucions Socials Sostenibles", kind: "work", desc: "Disseny i implementació d'interfícies per a plataformes logístiques. Lògica de negoci connectant frontend i backend amb estructures de dades pensades per a la interfície." },
      { years: "2024—", title: "Desenvolupament d'Aplicacions Multiplataforma", place: "La Salle Gràcia", kind: "study", desc: "Programació orientada a objectes, apps mòbils i d'escriptori, bases de dades i arquitectura de programari." },
      { years: "2026—", title: "Desenvolupament d'Aplicacions Web", place: "La Salle Gràcia", kind: "study", desc: "Desenvolupament web client i servidor, disseny d'interfícies, desplegament i accessibilitat." },
    ],
    stackTitle: "Eines",
    stackIntro: "Del primer esbós a producció.",
    cats: { all: "Tot", design: "Disseny", ai: "IA", front: "Frontend", back: "Backend", tools: "Plataformes" },
    outsideTitle: "Fora de la pantalla",
    cv: "Descarregar CV",
    outside: "Camino per Barcelona mirant rètols, fletxes i tipografia de carrer. Gairebé totes les meves idees comencen allà, no davant de l'ordinador.",
  },
  en: {
    h: ["I design", "and build.", "With judgement."],
    manifesto: [
      "I started out coding and ended up obsessed with why some interfaces explain themselves and others don't.",
      "Today I work right at that intersection: I design thinking about how it's built, and I code thinking about who will use it. I'm inspired by Barcelona's wayfinding: systems that guide thousands of people without a single unnecessary word.",
    ],
    thinkTitle: "How I think",
    principles: [
      { t: "Guide before decorating", d: "An interface works like a sign: it has to be understood at a glance." },
      { t: "Remove until it works", d: "Before adding, I ask what's unnecessary. Whatever stays needs a reason." },
      { t: "Design knowing how to build", d: "What I draw, I can ship. That changes how I make decisions." },
      { t: "Detail is the product", d: "A transition, an empty state, a well-written error. That's where care shows." },
    ],
    pathTitle: "Path",
    kinds: { work: "Experience", study: "Education" },
    path: [
      { years: "2025—26", title: "Software developer", place: "Solucions Socials Sostenibles", kind: "work", desc: "Designed and built interfaces for logistics platforms. Business logic connecting frontend and backend with data structures shaped around the interface." },
      { years: "2024—", title: "Cross-platform Application Development", place: "La Salle Gràcia", kind: "study", desc: "Object-oriented programming, mobile and desktop apps, databases and software architecture." },
      { years: "2026—", title: "Web Application Development", place: "La Salle Gràcia", kind: "study", desc: "Client and server-side web development, interface design, deployment and accessibility." },
    ],
    stackTitle: "Tools",
    stackIntro: "From first sketch to production.",
    cats: { all: "All", design: "Design", ai: "AI", front: "Frontend", back: "Backend", tools: "Platforms" },
    outsideTitle: "Off screen",
    cv: "Download CV",
    outside: "I walk around Barcelona looking at signs, arrows and street lettering. Almost all my ideas start there, not in front of the computer.",
  },
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

function Title({ children }: { children: React.ReactNode }) {
  const [ref, on] = useInView<HTMLHeadingElement>()
  return (
    <h2 ref={ref} className="overflow-hidden pt-[0.1em] text-[9vw] uppercase leading-[0.95] tracking-[0.06em] text-[#f0ede6] md:text-[5vw]">
      <span className="block transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)]" style={{ transform: on ? "none" : "translateY(110%)" }}>
        {children}
      </span>
    </h2>
  )
}

function Principles({ items }: { items: Copy["principles"] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="mt-16 grid gap-12 md:grid-cols-12">
      <ul className="md:col-span-7">
        {items.map((p, i) => (
          <li key={p.t}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`block w-full py-4 text-left text-2xl uppercase leading-tight tracking-[0.04em] transition-all duration-500 md:text-4xl ${
                active === i ? "translate-x-3 text-[#f0ede6]" : "text-[#f0ede6]/20"
              }`}
            >
              {active === i && <span className="mr-4 text-[#c8323a]">→</span>}
              {p.t}
            </button>
          </li>
        ))}
      </ul>
      <div className="relative min-h-[8rem] md:col-span-4 md:col-start-9 md:self-center">
        {items.map((p, i) => (
          <p
            key={p.t}
            className="absolute inset-0 text-lg leading-relaxed text-[#828079] transition-all duration-700"
            style={{ opacity: active === i ? 1 : 0, transform: active === i ? "none" : "translateY(12px)" }}
          >
            {p.d}
          </p>
        ))}
      </div>
    </div>
  )
}

function Path({ items, kinds }: { items: Copy["path"]; kinds: Copy["kinds"] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <ul className="mt-16">
      {items.map((p, i) => {
        const on = open === i
        return (
          <li key={p.title} className="group">
            <button
              type="button"
              aria-expanded={on}
              onMouseEnter={() => setOpen(i)}
              onClick={() => setOpen(on ? null : i)}
              className="grid w-full grid-cols-12 items-baseline gap-4 py-8 text-left"
            >
              <span className={`col-span-12 text-4xl tracking-[0.02em] transition-colors duration-500 md:col-span-3 md:text-5xl ${on ? "text-[#c8323a]" : "path-outline"}`}>
                {p.years}
              </span>
              <span className="col-span-12 md:col-span-7">
                <span className={`block text-xl uppercase leading-tight tracking-[0.04em] transition-colors duration-500 md:text-3xl ${on ? "text-[#f0ede6]" : "text-[#f0ede6]/40"}`}>
                  {p.title}
                </span>
                <span className="mt-2 block text-sm text-[#828079]">{p.place}</span>
              </span>
              <span className="col-span-12 text-xs uppercase tracking-[0.12em] text-[#56544e] md:col-span-2 md:text-right">
                {kinds[p.kind]}
              </span>
            </button>
            <div className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="grid-cols-12 pb-10 text-base leading-relaxed text-[#828079] md:grid md:gap-4">
                  <span className="md:col-span-6 md:col-start-4">{p.desc}</span>
                </p>
              </div>
            </div>
            <span className="block h-px bg-[#f0ede6]/10">
              <span className="block h-px bg-[#c8323a] transition-transform duration-700 origin-left" style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function Stack({ copy }: { copy: Copy }) {
  const [cat, setCat] = useState<"all" | Cat>("all")
  const [hover, setHover] = useState<string | null>(null)
  const cats = Object.keys(copy.cats) as ("all" | Cat)[]
  return (
    <div className="mt-12">
      <div role="tablist" className="flex flex-wrap gap-x-8 gap-y-3 text-sm uppercase tracking-[0.12em]">
        {cats.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={cat === k}
            onClick={() => setCat(k)}
            className={`relative py-2 transition-colors duration-500 ${cat === k ? "text-[#f0ede6]" : "text-[#56544e] hover:text-[#d8d5ce]"}`}
          >
            {copy.cats[k]}
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[#c8323a] transition-transform duration-500" style={{ transform: cat === k ? "scaleX(1)" : "scaleX(0)" }} />
          </button>
        ))}
      </div>

      <ul className="mt-14 flex flex-wrap justify-center gap-x-4 gap-y-12">
        {STACK.map((tool) => {
          const match = cat === "all" || tool.cat === cat
          const lit = hover === tool.name
          return (
            <li
              key={tool.name}
              data-cursor-skip
              onMouseEnter={() => setHover(tool.name)}
              onMouseLeave={() => setHover(null)}
              className="flex w-[30%] flex-col items-center gap-4 transition-all duration-700 sm:w-[22%] md:w-[14.5%] lg:w-[11%]"
              style={{ opacity: match ? 1 : 0.12, transform: match ? "none" : "scale(.9)", filter: match ? "none" : "blur(1px)" }}
            >
              <span className={`flex size-14 items-center justify-center transition-transform duration-500 ${lit ? "-translate-y-2" : ""}`}>
                {tool.icon ? (
                  <span
                    role="img"
                    aria-hidden
                    className="size-10 transition-opacity duration-300"
                    style={{
                      opacity: lit ? 1 : 0.55,
                      backgroundColor: lit ? "#c8323a" : "#d8d5ce",
                      WebkitMask: `url(${import.meta.env.BASE_URL}icons/${tool.icon}) center / contain no-repeat`,
                      mask: `url(${import.meta.env.BASE_URL}icons/${tool.icon}) center / contain no-repeat`,
                    }}
                  />
                ) : tool.slug ? (
                  <img
                    src={`https://cdn.simpleicons.org/${tool.slug}/${lit ? "c8323a" : "d8d5ce"}`}
                    alt=""
                    loading="lazy"
                    data-cursor-skip
                    className="size-10 object-contain transition-opacity duration-300"
                    style={{ opacity: lit ? 1 : 0.55 }}
                  />
                ) : (
                  <span className={`flex size-10 items-center justify-center text-lg uppercase transition-colors duration-300 ${lit ? "text-[#c8323a]" : "text-[#d8d5ce]/55"}`}>
                    {tool.name.split(" ").length > 1 ? tool.name.split(" ").map((w) => w[0]).join("") : tool.name.slice(0, 2)}
                  </span>
                )}
              </span>
              <span className={`text-xs uppercase tracking-[0.1em] transition-colors duration-500 ${lit ? "text-[#f0ede6]" : "text-[#56544e]"}`}>
                {tool.name}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
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
    const dprCap = Math.min(devicePixelRatio || 1, 1.5)
    const draw = (now: number) => {
      if (document.hidden) {
        raf = requestAnimationFrame(draw)
        return
      }
      const w = cv.clientWidth * dprCap, hh = cv.clientHeight * dprCap
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
      aria-label="Pablo Arenas"
      onMouseMove={move}
      onMouseEnter={(e) => { move(e); target.current.h = 1 }}
      onMouseLeave={() => (target.current.h = 0)}
      className="block aspect-[993/1568] w-full cursor-crosshair filter grayscale mix-blend-lighten opacity-80"
    />
  )
}

export default function Ethos() {
  const { lang } = useLang()
  const c = COPY[lang]
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className={`ethos font-mono text-[#d8d5ce] ${ready ? "is-ready" : ""}`}>
      {/* Opening */}
      <section className="grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center gap-16 py-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1 className="flex flex-col text-[13vw] uppercase leading-[0.95] tracking-[0.06em] text-[#f0ede6] md:text-[6.4vw]">
            {c.h.map((line, i) => (
              <span key={i} className="-mb-[0.15em] block overflow-hidden pt-[0.1em] pb-[0.15em]">
                <span
                  className={`e-line block ${i === 1 ? "e-outline" : ""} ${i === 2 ? "text-[#c8323a]" : ""}`}
                  style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="e-fade mt-14 flex max-w-xl flex-col gap-6 text-base leading-relaxed text-[#828079] md:text-lg">
            {c.manifesto.map((m) => <p key={m}>{m}</p>)}
          </div>
          {/* CV: drop the file at public/cv-pablo-arenas.pdf */}
          <a
            href={`${import.meta.env.BASE_URL}cv-pablo-arenas.pdf`}
            download
            className="e-fade group mt-12 inline-flex items-center gap-4 bg-[#f0ede6] px-8 py-5 text-sm uppercase tracking-[0.12em] text-[#060606] transition-colors duration-500 hover:bg-[#c8323a] hover:text-[#f0ede6]"
          >
            {c.cv}
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-1">↓</span>
          </a>
        </div>
        <div className="e-fade md:col-span-4 md:col-start-9">
          <BlurPortrait />
        </div>
      </section>

      <section className="py-32 md:py-48">
        <Title>{c.thinkTitle}</Title>
        <Principles items={c.principles} />
      </section>

      <section className="py-32 md:py-48">
        <Title>{c.pathTitle}</Title>
        <Path items={c.path} kinds={c.kinds} />
      </section>

      <section className="py-32 md:py-48">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Title>{c.stackTitle}</Title>
          <p className="text-lg text-[#828079]">{c.stackIntro}</p>
        </div>
        <Stack copy={c} />
      </section>

      <section className="grid gap-10 pt-16 pb-40 md:grid-cols-12">
        <div className="md:col-span-5"><Title>{c.outsideTitle}</Title></div>
        <p className="max-w-[44ch] text-xl leading-relaxed text-[#d8d5ce] md:col-span-6 md:col-start-7 md:self-end md:text-2xl">{c.outside}</p>
      </section>

      <style>{`
        .ethos .e-line { transform: translateY(110%); transition: transform 1.2s cubic-bezier(0.19,1,0.22,1); }
        .ethos.is-ready .e-line { transform: none; }
        .ethos .e-fade { opacity: 0; transition: opacity 1.2s ease .6s; }
        .ethos.is-ready .e-fade { opacity: 1; }
        .e-outline { color: transparent; -webkit-text-stroke: 1px #f0ede6; }
        .path-outline { color: transparent; -webkit-text-stroke: 1px rgba(240,237,230,.35); }
        @media (prefers-reduced-motion: reduce) { .ethos .e-line, .ethos .e-fade { transition: none; } }
      `}</style>
    </div>
  )
}
