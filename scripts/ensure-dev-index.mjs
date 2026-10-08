import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const indexPath = join(root, "index.html")
const viteIndexBackup = join(root, "index.vite.html")

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

const current = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : ""
if (!current.includes("/src/main.tsx")) {
  const source = existsSync(viteIndexBackup)
    ? readFileSync(viteIndexBackup, "utf8")
    : VITE_INDEX
  writeFileSync(indexPath, source)
  console.log("Restaurado index.html de desarrollo (Vite)")
}
