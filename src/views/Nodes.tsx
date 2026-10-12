import { useEffect, useState } from "react"
import { sound } from "../utils/audio"
import { EMAIL, Icon, LINKS } from "../components/Social"
import { useLang } from "../i18n"

const C = {
  es: {
    intro: "Busco un equipo donde diseño y código vayan juntos. Escríbeme y te respondo en 24—48 h.",
    labels: { Correo: "Correo", Teléfono: "Teléfono" } as Record<string, string>,
    copy: "Copiar correo", copied: "Correo copiado ✓",
    sent1: "Mensaje", sent2: "recibido.", sentBody: "Gracias. Te respondo muy pronto.", again: "Escribir otro mensaje",
    name: "Nombre", subject: "Asunto", message: "Mensaje",
    send: "Enviar ahora", sending: "Enviando…", error: "No se pudo enviar. Prueba de nuevo o escríbeme al correo.",
  },
  ca: {
    intro: "Busco un equip on disseny i codi vagin junts. Escriu-me i et responc en 24—48 h.",
    labels: { Correo: "Correu", Teléfono: "Telèfon" } as Record<string, string>,
    copy: "Copiar correu", copied: "Correu copiat ✓",
    sent1: "Missatge", sent2: "rebut.", sentBody: "Gràcies. Et responc molt aviat.", again: "Escriure un altre missatge",
    name: "Nom", subject: "Assumpte", message: "Missatge",
    send: "Enviar ara", sending: "Enviant…", error: "No s'ha pogut enviar. Torna-ho a provar o escriu-me al correu.",
  },
  en: {
    intro: "I'm looking for a team where design and code go together. Write to me and I'll reply within 24—48 h.",
    labels: { Correo: "Email", Teléfono: "Phone" } as Record<string, string>,
    copy: "Copy email", copied: "Email copied ✓",
    sent1: "Message", sent2: "received.", sentBody: "Thank you. I'll get back to you soon.", again: "Write another message",
    name: "Name", subject: "Subject", message: "Message",
    send: "Send now", sending: "Sending…", error: "Couldn't send it. Try again or email me directly.",
  },
}

const FORM_ENDPOINT = "https://formspree.io/f/xdajdkvz"

type Status = "idle" | "sending" | "sent" | "error"

function Field({ id, label, type = "text", area, autoComplete }: { id: string; label: string; type?: string; area?: boolean; autoComplete?: string }) {
  const cls =
    "peer w-full resize-none border-0 border-b border-[#f0ede6]/20 bg-transparent pt-7 pb-3 text-lg text-[#f0ede6] outline-none transition-colors duration-500 placeholder-transparent focus:border-[#c8323a]"
  return (
    <div className="relative">
      {area ? (
        <textarea id={id} name={id} rows={4} required placeholder={label} className={cls} />
      ) : (
        <input id={id} name={id} type={type} required autoComplete={autoComplete} placeholder={label} className={cls} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-0 left-0 text-xs uppercase tracking-[0.12em] text-[#828079] transition-colors duration-500 peer-focus:text-[#c8323a]"
      >
        {label}
      </label>
    </div>
  )
}

export default function Nodes() {
  const { lang, t } = useLang()
  const c = C[lang]
  const [status, setStatus] = useState<Status>("idle")
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus("sending")
    sound.playSelect()
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
      if (!res.ok) throw new Error()
      form.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={`contact font-mono text-[#d8d5ce] ${ready ? "is-ready" : ""}`}>
      {/* Heading, in the language of the home quote */}
      <section className="flex min-h-[70vh] flex-col justify-center pt-16">
        <h1 className="flex flex-col text-[13vw] uppercase leading-[0.95] tracking-[0.06em] text-[#f0ede6] md:text-[8vw]">
          {[
            { t: t.invite1, cls: "" },
            { t: t.invite2, cls: "c-outline self-end" },
            { t: t.invite3, cls: "text-[#c8323a]" },
          ].map((l, i) => (
            <span key={l.t} className={`-mb-[0.2em] block overflow-hidden pt-[0.1em] pb-[0.2em] ${l.cls.includes("self-end") ? "self-end" : ""}`}>
              <span className={`c-line block ${l.cls.replace("self-end", "")}`} style={{ transitionDelay: `${0.1 + i * 0.12}s` }}>
                {l.t}
              </span>
            </span>
          ))}
        </h1>
        <p className="c-fade mt-12 max-w-[40ch] text-base leading-relaxed text-[#828079] md:text-lg">
          {c.intro}
        </p>
      </section>

      <section className="grid gap-24 py-32 md:grid-cols-12 md:gap-10">
        {/* Direct links */}
        <ul className="md:col-span-5">
          {LINKS.map((l) => (
            <li key={l.label} className="border-b border-[#f0ede6]/10 first:border-t">
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                onMouseEnter={() => sound.playTick()}
                className="group flex items-center justify-between gap-6 py-5"
              >
                <span className="flex items-center gap-4 text-xs uppercase tracking-[0.12em] text-[#828079] transition-colors duration-500 group-hover:text-[#f0ede6]">
                  <Icon name={l.icon} className="size-5 text-[#f0ede6] transition-colors duration-500 group-hover:text-[#c8323a]" />
                  {c.labels[l.label] ?? l.label}
                </span>
                <span className="flex items-baseline gap-3 text-right text-sm text-[#f0ede6] transition-colors duration-500 group-hover:text-[#c8323a] md:text-lg">
                  {l.value}
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </span>
              </a>
            </li>
          ))}
          <li className="pt-6">
            <button type="button" onClick={copy} className="text-xs uppercase tracking-[0.12em] text-[#828079] transition-colors hover:text-[#f0ede6]">
              {copied ? c.copied : c.copy}
            </button>
          </li>
        </ul>

        {/* Formspree form */}
        <div className="md:col-span-6 md:col-start-7">
          {status === "sent" ? (
            <div className="flex min-h-[420px] flex-col justify-center">
              <p className="text-4xl uppercase leading-[1.05] tracking-[0.04em] text-[#f0ede6] md:text-5xl">
                {c.sent1} <span className="text-[#c8323a]">{c.sent2}</span>
              </p>
              <p className="mt-6 text-base text-[#828079]">{c.sentBody}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-12 w-fit text-xs uppercase tracking-[0.12em] text-[#828079] transition-colors hover:text-[#f0ede6]"
              >
                {c.again}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-10">
              <div className="grid gap-10 md:grid-cols-2">
                <Field id="nombre" label={c.name} autoComplete="name" />
                <Field id="email" label="Email" type="email" autoComplete="email" />
              </div>
              <Field id="asunto" label={c.subject} />
              <Field id="mensaje" label={c.message} area />
              <input type="hidden" name="_subject" value="Nuevo mensaje — Portfolio" />
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex items-center gap-4 bg-[#f0ede6] px-8 py-5 text-sm uppercase tracking-[0.12em] text-[#060606] transition-colors duration-500 hover:bg-[#c8323a] hover:text-[#f0ede6] disabled:opacity-60"
                >
                  {status === "sending" ? c.sending : c.send}
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
                {status === "error" && (
                  <span className="text-sm text-[#c8323a]">{c.error}</span>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .contact .c-line { transform: translateY(110%); transition: transform 1.2s cubic-bezier(0.19,1,0.22,1); }
        .contact.is-ready .c-line { transform: none; }
        .contact .c-fade { opacity: 0; transition: opacity 1.2s ease .6s; }
        .contact.is-ready .c-fade { opacity: 1; }
        .c-outline { color: transparent; -webkit-text-stroke: 1px #f0ede6; }
        .contact input:-webkit-autofill, .contact textarea:-webkit-autofill {
          -webkit-text-fill-color: #f0ede6; transition: background-color 9999s;
        }
        @media (prefers-reduced-motion: reduce) { .contact .c-line, .contact .c-fade { transition: none; } }
      `}</style>
    </div>
  )
}
