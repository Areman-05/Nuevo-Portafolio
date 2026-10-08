import { sound } from "../utils/audio"

interface FooterProps {
  onBackToTop: () => void
}

export default function Footer({ onBackToTop }: FooterProps) {
  return (
    <footer id="contact" className="font-mono">
      <section className="bg-[#f0ede6] px-6 py-16 text-[#090909] md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#8f1018]">
                Disponible para colaborar
              </span>
              <p className="mt-7 text-2xl uppercase leading-tight tracking-tight sm:text-3xl md:text-4xl">
                Si hay una idea,
                <span className="block">démosle una forma propia.</span>
              </p>
            </div>

            <p className="max-w-xs text-[11px] leading-5 text-black/55 md:col-span-3 md:col-start-10 md:pt-8">
              Proyectos digitales, colaboraciones y conversaciones con intención.
            </p>
          </div>

          <div className="mt-20 pb-16 md:pb-24"></div>

          <div className="flex flex-col gap-5 text-[9px] uppercase tracking-[0.12em] text-black/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Pablo Arenas Mancebo</span>
            <div className="flex items-center justify-between gap-8 sm:justify-end">
              <span>Barcelona / España</span>
              <button
                type="button"
                onClick={() => {
                  sound.playSelect()
                  onBackToTop()
                }}
                onMouseEnter={() => sound.playTick()}
                className="cursor-pointer transition-colors hover:text-[#8f1018]"
              >
                Volver arriba ↑
              </button>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
