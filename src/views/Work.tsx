import { useNavigate } from "react-router"
import ProjectsSection from "../components/ProjectsSection"
import { CASES } from "../data/cases"

export default function Work() {
  const navigate = useNavigate()

  return (
    <div data-no-reveal className="relative left-1/2 -mt-24 w-screen -translate-x-1/2">
      <ProjectsSection
        projects={CASES}
        onSelectProject={(project) => navigate(`/work/${project.id}`)}
        onHoverProject={() => {}}
      />
    </div>
  )
}
