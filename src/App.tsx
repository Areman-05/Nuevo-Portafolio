import { useCallback, useState } from "react"
import { RouterProvider } from "react-router"
import BootLoader from "./components/BootLoader"
import { LangProvider } from "./i18n"
import { router } from "./routes"

const BOOT_KEY = "pa-boot-seen"

export default function App() {
  const [booting, setBooting] = useState(() => {
    if (typeof sessionStorage === "undefined") return true
    return sessionStorage.getItem(BOOT_KEY) !== "1"
  })

  const finish = useCallback(() => {
    sessionStorage.setItem(BOOT_KEY, "1")
    setBooting(false)
  }, [])

  return (
    <LangProvider>
      {booting && <BootLoader onDone={finish} />}
      <RouterProvider router={router} />
    </LangProvider>
  )
}
