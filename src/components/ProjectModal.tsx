import { useEffect } from "react"
import { Project } from "../types"
import { sound } from "../utils/audio"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (project) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0a0a0a] border border-white/20 p-6 md:p-12 text-[#f0ede6] font-mono shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar / Close */}
        <div className="flex justify-between items-center border-b border-white/[0.08] pb-6 mb-8 text-xs text-[#828079]">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">{project.number}</span>
            <span>//</span>
            <span>{project.city}</span>
            <span>//</span>
            <span>{project.year}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playSelect()
              onClose()
            }}
            onMouseEnter={() => sound.playTick()}
            className="cursor-pointer text-xs text-[#828079] hover:text-white px-3 py-1 border border-white/10 hover:border-white/40 transition-colors"
          >
            (&nbsp;Close Case Study ×&nbsp;)
          </button>
        </div>

        {/* Header Section */}
        <div className="space-y-4 mb-10">
          <div className="text-xs uppercase text-[#828079] tracking-widest">
            {project.category} — {project.discipline}
          </div>
          <h2
            id="modal-project-title"
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white"
          >
            {project.title}
          </h2>
          <p className="text-sm md:text-base text-[#828079] max-w-2xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900 border border-white/10 mb-10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>

        {/* Project Metadata Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/[0.08] mb-10 text-xs">
          <div>
            <span className="text-[#828079] block mb-1">
              CLIENT / COLLABORATOR
            </span>
            <span className="text-white">{project.client}</span>
          </div>
          <div>
            <span className="text-[#828079] block mb-1">
              DISCIPLINE &amp; ROLE
            </span>
            <span className="text-white">{project.role}</span>
          </div>
          <div>
            <span className="text-[#828079] block mb-1">
              LOCATION &amp; HUB
            </span>
            <span className="text-white">{project.city}</span>
          </div>
          <div>
            <span className="text-[#828079] block mb-1">CHRONOLOGY</span>
            <span className="text-white">{project.year}</span>
          </div>
        </div>

        {/* UX/UI Deep Dive (Demonstrating Frontend UX specialization) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-xs leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
              [ 01 // UX Architecture &amp; Challenge ]
            </h3>
            <p className="text-[#828079]">{project.uxChallenge}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
              [ 02 // Frontend Engineering &amp; Solution ]
            </h3>
            <p className="text-[#828079]">{project.uxSolution}</p>
          </div>
        </div>

        {/* Secondary Image if present */}
        {project.secondaryImage && (
          <div className="relative aspect-[21/9] overflow-hidden bg-neutral-900 border border-white/10 mb-10">
            <img
              src={project.secondaryImage}
              alt={`${project.title} secondary artifact`}
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        )}

        {/* Tokens & Stack */}
        <div className="space-y-6 pt-6 border-t border-white/[0.08] mb-10 text-xs">
          <div>
            <span className="text-[#828079] block mb-3 uppercase tracking-wider">
              UX Tokens &amp; Interaction Systems :
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tokens.map((token) => (
                <span
                  key={token}
                  className="px-2.5 py-1 bg-white/[0.05] border border-white/10 text-white"
                >
                  {token}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[#828079] block mb-3 uppercase tracking-wider">
              Frontend &amp; Creative Tech Stack :
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 bg-white/[0.08] border border-white/20 text-[#f0ede6]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-white/[0.02] border border-white/10 mb-8">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <span className="text-[10px] text-[#828079] uppercase block mb-1">
                {metric.label}
              </span>
              <span className="font-serif italic text-2xl text-white">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-white/[0.08] text-xs">
          <span className="text-[#828079]">
            COMMISSIONED WORK // PABLO ARENAS MANCEBO
          </span>
          <button
            type="button"
            onClick={() => {
              sound.playSelect()
              onClose()
            }}
            className="cursor-pointer text-white underline underline-offset-4 hover:text-[#828079] transition-colors"
          >
            Return to Portfolio Index ↑
          </button>
        </div>
      </div>
    </div>
  )
}
