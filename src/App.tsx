import { RouterProvider } from "react-router"
import { LangProvider } from "./i18n"
import { router } from "./routes"

export default function App() {
  return (
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  )
}
