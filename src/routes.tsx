import { createBrowserRouter } from "react-router"
import Layout from "./components/Layout"
import Home from "./views/Home"
import Work from "./views/Work"
import Ethos from "./views/Ethos"
import Nodes from "./views/Nodes"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "work", Component: Work },
      { path: "ethos", Component: Ethos },
      { path: "nodes", Component: Nodes },
    ],
  },
])
