import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 5173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
};

function resolveFile(pathname) {
  const clean = normalize(pathname).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]/, "");
  const relative = clean === "" ? "index.html" : clean;
  const direct = join(root, relative);
  if (existsSync(direct)) return direct;
  if (relative.startsWith("assets")) {
    const publicAsset = join(root, "public", relative);
    if (existsSync(publicAsset)) return publicAsset;
  }
  return null;
}

createServer((req, res) => {
  const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
  const filePath = resolveFile(decodeURIComponent(url.pathname));

  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Tarot gesture prototype: http://127.0.0.1:${port}`);
});
