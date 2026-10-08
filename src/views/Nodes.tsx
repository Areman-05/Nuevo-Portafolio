import { useState } from "react"
import { sound } from "../utils/audio"

export default function Nodes() {
  const [copied, setCopied] = useState(false)
  const email = "pab4822@outlook.com"

  const copyEmail = async () => {
    sound.playSelect()
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] pb-32 pt-12 font-mono md:pt-24">
      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <span className="text-[9px] uppercase tracking-[0.26em] text-[#8f1018]">
            Contacto
          </span>
          <h1 className="mt-8 max-w-3xl text-3xl uppercase leading-tight tracking-tight text-[#f0ede6] sm:text-4xl md:text-5xl">
            Las buenas ideas empiezan
            <span className="block text-[#8f1018]">
              con una conversación clara.
            </span>
          </h1>
        </div>

        <p className="max-w-sm self-end text-xs leading-6 text-[#828079] md:col-span-3 md:col-start-10">
          Cuéntame qué quieres construir, qué problema necesitas resolver o en
          qué punto se encuentra tu producto.
        </p>
      </div>

      <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#686761]">
            Correo directo
          </span>
          <a
            href={`mailto:${email}`}
            onMouseEnter={() => sound.playTick()}
            className="mt-5 block break-all text-xl uppercase tracking-tight text-[#f0ede6] transition-colors hover:text-[#8f1018] sm:text-2xl md:text-3xl"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            onMouseEnter={() => sound.playTick()}
            className="mt-6 cursor-pointer text-[10px] uppercase tracking-[0.18em] text-[#828079] transition-colors hover:text-[#f0ede6]"
          >
            {copied ? "Correo copiado" : "Copiar dirección"}
          </button>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 md:col-span-5 md:grid-cols-1">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8f1018]">
              Proyectos
            </span>
            <p className="mt-3 text-xs leading-6 text-[#828079]">
              Producto digital, UX/UI, sistemas visuales y desarrollo frontend.
            </p>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8f1018]">
              Disponibilidad
            </span>
            <p className="mt-3 text-xs leading-6 text-[#828079]">
              Abierto a colaboraciones seleccionadas y nuevos retos en 2026.
            </p>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8f1018]">
              Ubicación
            </span>
            <p className="mt-3 text-xs leading-6 text-[#828079]">
              Barcelona · Trabajo remoto y colaboraciones internacionales.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-28 flex flex-col gap-6 text-[10px] uppercase tracking-[0.18em] text-[#686761] sm:flex-row sm:items-center sm:justify-between">
        <span>Respuesta habitual · 24—48 h</span>
        <div className="flex gap-8"></div>
      </div>
    </div>
  )
}
