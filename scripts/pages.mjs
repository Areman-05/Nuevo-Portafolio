import { cpSync, copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")
const docs = join(root, "docs")
const viteIndexBackup = join(root, "index.vite.html")
const indexPath = join(root, "index.html")

const VITE_INDEX = `<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pablo Arenas Mancebo — Portfolio</title>
    <meta
      name="description"
      content="Pablo Arenas Mancebo. Diseño de interfaz, UX/UI y desarrollo front-end. Barcelona."
    />
</head>
  <body style="margin:0;background:#060606;color:#f0ede6;">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
`

// Guarda entrada de Vite si aún no existe
if (!existsSync(viteIndexBackup)) {
  const current = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : VITE_INDEX
  if (current.includes("/src/main.tsx")) {
    writeFileSync(viteIndexBackup, current)
  } else {
    writeFileSync(viteIndexBackup, VITE_INDEX)
  }
}

// Asegura index de desarrollo antes del build
writeFileSync(indexPath, readFileSync(viteIndexBackup, "utf8"))

execSync("npx vite build", { cwd: root, stdio: "inherit" })

function wipe(dir) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
}

// docs/ → Pages con carpeta /docs
wipe(docs)
cpSync(dist, docs, { recursive: true })
copyFileSync(join(docs, "index.html"), join(docs, "404.html"))

// Raíz del repo → Pages con carpeta / (root), que es lo que tienes ahora
const rootAssets = join(root, "assets")
wipe(rootAssets)
cpSync(join(dist, "assets"), rootAssets, { recursive: true })

for (const file of ["pablo.png", ".nojekyll"]) {
  const from = join(dist, file)
  if (existsSync(from)) copyFileSync(from, join(root, file))
}
// SPA fallback en la raíz (mismo HTML que index)
copyFileSync(join(dist, "index.html"), join(root, "404.html"))

const distProjects = join(dist, "projects")
const rootProjects = join(root, "projects")
if (existsSync(distProjects)) {
  wipe(rootProjects)
  cpSync(distProjects, rootProjects, { recursive: true })
}

// index.html de producción en la raíz (lo que GitHub Pages sirve)
copyFileSync(join(dist, "index.html"), indexPath)

console.log("OK: docs/ y raíz listos para GitHub Pages")
