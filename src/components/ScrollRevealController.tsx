import { useEffect } from "react"
import { useLocation } from "react-router"

export default function ScrollRevealController() {
  const location = useLocation()

  useEffect(() => {
    let observer: IntersectionObserver | undefined
    const frame = requestAnimationFrame(() => {
      const targets = document.querySelectorAll<HTMLElement>(
        "main > *:not([data-no-reveal]), footer > section, [data-scroll-reveal]",
      )

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle(
              "is-scroll-visible",
              entry.isIntersecting,
            )
          })
        },
        {
          threshold: 0,
          rootMargin: "0px 0px -10% 0px",
        },
      )

      targets.forEach((target) => {
        target.classList.add("scroll-reveal-target")
        observer?.observe(target)
      })
    })

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [location.pathname])

  return null
}
