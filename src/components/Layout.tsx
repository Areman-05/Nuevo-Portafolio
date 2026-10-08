import { useEffect } from "react"
import { Outlet, useLocation } from "react-router"
import AtmosphericBackground from "./AtmosphericBackground"
import Footer from "./Footer"
import Header from "./Header"
import ScrollRevealController from "./ScrollRevealController"

export default function Layout() {
  const { pathname } = useLocation()

  // Cada view empieza arriba; si no, al cambiar de ruta quedas a media página
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname])

  return (
    <div className="relative min-h-screen bg-[#060606] text-[#f0ede6] selection:bg-white selection:text-black">
      <AtmosphericBackground />
      <ScrollRevealController />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Outlet />
      </main>
      {/* Footer */}
      <div className="relative z-10">
        <Footer
          onBackToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </div>
    </div>
  )
}
