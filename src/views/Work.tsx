import { useState } from "react"
import ProjectsSection from "../components/ProjectsSection"
import ProjectModal from "../components/ProjectModal"
import { PROJECTS } from "../data/portfolioData"
import { Project } from "../types"

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="animate-in fade-in duration-700">
      <div className="pt-12 md:pt-24 pb-32">
        <ProjectsSection
          projects={PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
          onHoverProject={() => {}}
        />
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
