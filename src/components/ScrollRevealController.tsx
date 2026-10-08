import { useEffect } from "react"
import { useLocation } from "react-router"

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < viewHeight &&
    rect.left < viewWidth
  )
}

export default function ScrollRevealController() {
  const location = useLocation()

  useEffect(() => {
    let observer: IntersectionObserver | undefined
    const frame = requestAnimationFrame(() => {
      const targets = [
        ...document.querySelectorAll<HTMLElement>(
          "main > *, footer > section, [data-scroll-reveal]",
        ),
      ]

      if (!targets.length) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("is-scroll-visible")
            observer?.unobserve(entry.target)
          })
        },
        {
          threshold: 0,
          rootMargin: "0px 0px -8% 0px",
        },
      )

      targets.forEach((target) => {
        target.classList.add("scroll-reveal-target")
        if (isInViewport(target)) {
          target.classList.add("is-scroll-visible")
          return
        }
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
