import { execSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// 1. Run TanStack Start build
execSync("bun run build", { stdio: "inherit" });

// 2. Create Vercel Build Output API v3 structure
const out = ".vercel/output";
const funcDir = join(out, "functions", "_ssr.func");
mkdirSync(join(out, "static"), { recursive: true });
mkdirSync(funcDir, { recursive: true });

// 3. Copy client assets to static directory
cpSync("dist/client", join(out, "static"), { recursive: true });

// 4. Copy server bundle into the serverless function directory
cpSync("dist/server", funcDir, { recursive: true });

// 5. Create Node.js serverless function entry (req/res → fetch adapter)
writeFileSync(
  join(funcDir, "index.mjs"),
  `import server from './server.js';

export default async function handler(req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = new URL(req.url || '/', protocol + '://' + host);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
  }

  const body =
    req.method !== 'GET' && req.method !== 'HEAD'
      ? await new Promise((resolve, reject) => {
          const chunks = [];
          req.on('data', (c) => chunks.push(c));
          req.on('end', () => resolve(Buffer.concat(chunks)));
          req.on('error', reject);
        })
      : undefined;

  const request = new Request(url.href, {
    method: req.method,
    headers,
    body,
    duplex: 'half',
  });

  const response = await server.fetch(request, {}, {});

  res.statusCode = response.status;
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }

  if (response.body) {
    const reader = response.body.getReader();
    const pump = async () => {
      while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        res.write(chunk);
      }
      res.end();
    };
    await pump();
  } else {
    res.end(await response.text());
  }
}
`,
);

// 6. Enable ESM for the function directory (server.js uses export syntax)
writeFileSync(
  join(funcDir, "package.json"),
  JSON.stringify({ type: "module" }),
);

// 7. Configure as Node.js serverless function
writeFileSync(
  join(funcDir, ".vc-config.json"),
  JSON.stringify({
    runtime: "nodejs22.x",
    handler: "index.mjs",
    launcherType: "Nodejs",
  }),
);

// 8. Routing: serve static files first, then SSR everything else
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

console.log("Vercel Build Output API v3 structure created (Node.js runtime).");
