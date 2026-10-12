import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

export default defineConfig(({ command }) => ({
  // En local, raíz. En build, GitHub Pages: https://areman-05.github.io/Nuevo-Portafolio/
  base: command === "build" ? "/Nuevo-Portafolio/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
}))
