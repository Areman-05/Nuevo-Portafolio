import { useNavigate } from "react-router"
import ProjectsSection from "../components/ProjectsSection"
import { getCases } from "../data/cases"
import { useLang } from "../i18n"

export default function Work() {
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <div data-no-reveal className="relative left-1/2 -mt-24 w-screen -translate-x-1/2">
      <ProjectsSection
        projects={getCases(lang)}
        onSelectProject={(project) => navigate(`/work/${project.id}`)}
        onHoverProject={() => {}}
      />
    </div>
  )
}
