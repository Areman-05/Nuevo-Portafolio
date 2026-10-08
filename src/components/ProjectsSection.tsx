import { useEffect, useRef, useState } from "react"
import { Project } from "../types"
import { sound } from "../utils/audio"

interface ProjectsSectionProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
  onHoverProject: (project: Project | null) => void
}

export default function ProjectsSection({
  projects,
  onSelectProject,
}: ProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setActiveIndex(index)
          }
        })
      },
      {
        rootMargin: "-40% 0px -40% 0px",
      }
    )

    const sections = document.querySelectorAll(".project-scroll-section")
    sections.forEach((sec) => observer.observe(sec))

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("card-in")
          reveal.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    )
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect()
      const inView =
        rect.bottom > 0 &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight)
      if (inView) {
        sec.classList.add("card-in")
        return
      }
      reveal.observe(sec)
    })

    return () => {
      observer.disconnect()
      reveal.disconnect()
    }
  }, [projects])

  return (
    <section className="relative px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto text-[#f0ede6] font-mono">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 relative">
        
        {/* Project List (Left side, takes up most space) */}
        <div className="flex-1 pb-48 w-full md:pr-12 lg:pr-32" ref={containerRef}>
          {projects.map((project, idx) => (
            <article
              key={project.id}
              data-index={idx}
              className="project-scroll-section card-reveal relative py-16 md:py-32 flex flex-col group"
            >
              {/* Image Container - Clickable */}
              <div 
                className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/5 cursor-crosshair mb-8 group-hover:border-white/20 transition-colors duration-500"
                onClick={() => {
                  sound.playSelect()
                  onSelectProject(project)
                }}
                onMouseEnter={() => {
                  sound.playTick()
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-90 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
                />
              </div>

              {/* Text Content Below Image */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#828079]">
                  <span>{project.discipline}</span>
                  <span>{project.year}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#d8d5ce] group-hover:text-white transition-colors duration-500">
                  {project.title}
                </h2>
                
                <p className="text-sm text-[#828079] max-w-lg mt-2">
                  {project.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Sticky Sidebar (Right side) */}
        <div className="hidden md:block w-16 lg:w-24 shrink-0 pointer-events-none">
          <div className="sticky top-0 h-screen flex flex-col justify-center items-end">
            <div className="relative flex gap-6 h-[400px]">
              
              {/* Labels */}
              <div className="flex flex-col justify-between items-end text-[9px] uppercase tracking-[0.2em] text-[#56544e] h-full py-1">
                {projects.map((_, idx) => (
                  <span 
                    key={idx}
                    className={`transition-colors duration-500 ${activeIndex === idx ? "text-[#f0ede6]" : ""}`}
                  >
                    0{idx + 1}
                  </span>
                ))}
              </div>

              {/* Animated Progress Bar */}
              <div className="relative w-px bg-white/10 h-full">
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-[#8f1018] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ 
                    height: `${100 / projects.length}%`,
                    transform: `translate(-50%, ${activeIndex * 100}%)` 
                  }}
                />
                
                {/* Fixed Dots */}
                {projects.map((_, idx) => (
                  <div 
                    key={idx}
                    className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-white/20 rounded-full"
                    style={{ top: `${(idx * 100) / projects.length}%`, marginTop: '4px' }}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>

      <style>{`
        .card-reveal > div:first-child {
          clip-path: inset(18% 8% 18% 8%);
          transform: translateY(80px) scale(0.94);
          opacity: 0;
          transition: clip-path 1.3s cubic-bezier(0.77,0,0.175,1), transform 1.3s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease;
        }
        .card-reveal > div:first-child img { transform: scale(1.25); transition: transform 1.6s cubic-bezier(0.16,1,0.3,1), opacity 1.2s, filter 1.2s; }
        .card-reveal > div:last-child > * {
          opacity: 0;
          transform: translateY(30px);
          filter: blur(6px);
          transition: opacity 0.9s ease, transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.9s ease;
        }
        .card-in > div:first-child { clip-path: inset(0 0 0 0); transform: none; opacity: 1; }
        .card-in > div:first-child img { transform: scale(1); }
        .card-in:hover > div:first-child img { transform: scale(1.05); }
        .card-in > div:last-child > * { opacity: 1; transform: none; filter: none; }
        .card-in > div:last-child > :nth-child(1) { transition-delay: 0.35s; }
        .card-in > div:last-child > :nth-child(2) { transition-delay: 0.45s; }
        .card-in > div:last-child > :nth-child(3) { transition-delay: 0.55s; }
        @media (prefers-reduced-motion: reduce) {
          .card-reveal > div, .card-reveal > div * { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
