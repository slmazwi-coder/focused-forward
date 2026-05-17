import { execSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// 1. Run TanStack Start build
execSync("bun run build", { stdio: "inherit" });

// 2. Create Vercel Build Output API v3 structure
const out = ".vercel/output";
mkdirSync(join(out, "static"), { recursive: true });
mkdirSync(join(out, "functions", "_ssr.func"), { recursive: true });

// 3. Copy client assets → static
cpSync("dist/client", join(out, "static"), { recursive: true });

// 4. Copy server bundle → edge function
cpSync("dist/server", join(out, "functions", "_ssr.func"), { recursive: true });

// 5. Create edge-function entry that delegates to the TanStack Start server
writeFileSync(
  join(out, "functions", "_ssr.func", "index.js"),
  `import server from './server.js';
export default async function handler(request) {
  return server.fetch(request, {}, {});
}
`,
);

// 6. Mark the function as an edge function
writeFileSync(
  join(out, "functions", "_ssr.func", ".vc-config.json"),
  JSON.stringify({ runtime: "edge", entrypoint: "index.js" }),
);

// 7. Routing config: serve static files first, SSR everything else
writeFileSync(
  join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/_ssr" },
      ],
    },
    null,
    2,
  ),
);

console.log("Vercel Build Output API v3 structure created.");
