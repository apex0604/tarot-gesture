import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || "0.0.0.0";
const publicOrigin = process.env.PUBLIC_ORIGIN || "";
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const aiProvider = (process.env.AI_PROVIDER || "doubao").toLowerCase();
const doubaoBaseUrl = process.env.DOUBAO_BASE_URL || process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3";
const doubaoModel = process.env.DOUBAO_MODEL || process.env.ARK_MODEL || "doubao-seed-1-6-flash-250828";
const openaiModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const maxBodyBytes = Number(process.env.MAX_BODY_BYTES || 20_480);
const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX || 20);
const rateLimitBuckets = new Map();

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon",
};

function isInsideRoot(filePath) {
  const normalizedRoot = root.endsWith(sep) ? root : `${root}${sep}`;
  return filePath === root || filePath.startsWith(normalizedRoot);
}

function resolveFile(pathname) {
  const urlPath = decodeURIComponent(pathname).replace(/^\/+/, "");
  const relative = urlPath === "" ? "index.html" : urlPath;
  if (relative.split(/[\\/]/).some((part) => part.startsWith("."))) {
    return null;
  }

  const isPublicPath = relative === "index.html"
    || relative === "robots.txt"
    || relative.startsWith("src/")
    || relative.startsWith("assets/");
  if (!isPublicPath) return null;

  const candidates = [
    resolve(root, relative),
    relative.startsWith("assets/") ? resolve(root, "public", relative) : null,
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (!isInsideRoot(candidate)) continue;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }

  return null;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

function isRateLimited(req) {
  const key = getClientIp(req);
  const now = Date.now();
  const current = rateLimitBuckets.get(key);

  if (!current || now - current.startedAt > rateLimitWindowMs) {
    rateLimitBuckets.set(key, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > rateLimitMax;
}

function getCorsOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return "";
  if (allowedOrigins.length === 0) return "";
  return allowedOrigins.includes(origin) ? origin : "";
}

function writeHeaders(res, req, status, headers = {}) {
  const corsOrigin = getCorsOrigin(req);
  const baseHeaders = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(self), microphone=(), geolocation=()",
    ...headers,
  };

  if (corsOrigin) {
    baseHeaders["Access-Control-Allow-Origin"] = corsOrigin;
    baseHeaders["Vary"] = "Origin";
  }

  res.writeHead(status, baseHeaders);
}

function sendJson(req, res, status, payload) {
  writeHeaders(res, req, status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolveJson, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body, "utf8") > maxBodyBytes) {
        const error = new Error("Request body is too large");
        error.status = 413;
        reject(error);
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolveJson(body ? JSON.parse(body) : {});
      } catch {
        const error = new Error("Invalid JSON");
        error.status = 400;
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function extractOutputText(data) {
  if (typeof data.output_text === "string") return data.output_text.trim();

  return (data.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .join("\n")
    .trim();
}

function compactReading(text) {
  const clean = String(text || "")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (clean.length <= 260) return clean;
  return `${clean.slice(0, 257).trim()}...`;
}

async function createReading(payload) {
  const question = String(payload.question || "今日指引").slice(0, 120);
  const spreadName = String(payload.spreadName || "单张指引").slice(0, 40);
  const readingCards = Array.isArray(payload.cards) && payload.cards.length
    ? payload.cards.slice(0, 5).map((card) => ({
      position: String(card.position || "指引").slice(0, 30),
      cardName: String(card.cardName || "").slice(0, 40),
      cardRole: String(card.cardRole || "").slice(0, 60),
      cardMeaning: String(card.cardMeaning || "").slice(0, 220),
    }))
    : [{
      position: "指引",
      cardName: String(payload.cardName || "").slice(0, 40),
      cardRole: String(payload.cardRole || "").slice(0, 60),
      cardMeaning: String(payload.cardMeaning || "").slice(0, 220),
    }];
  const systemPrompt = [
    "你是塔罗解读助手。必须直接回应用户问题，不要只复述牌义。",
    "回答三段，每段一行：",
    "「牌阵回应：」综合所有位置说明牌阵如何回答问题。",
    "「现实提醒：」指出当前最该注意的机会、阻碍或心态。",
    "「下一步：」给一个具体可执行的小行动。",
    "总字数控制在220个中文字符以内。",
    "如果问题是赚钱、感情、工作、选择等具体方向，必须围绕该方向给具体建议。",
    "不要吓人，不要免责声明，不要项目符号。",
  ].join("\n");
  const cardLines = readingCards
    .map((card) => `${card.position}：${card.cardName}，${card.cardRole}，${card.cardMeaning}`)
    .join("\n");
  const userPrompt = [
    `用户问题：${question}`,
    `牌阵：${spreadName}`,
    `抽到的牌：\n${cardLines}`,
    "请把每个位置的含义串起来，转化成对这个问题的直接回应。",
  ].join("\n");

  if (aiProvider === "openai") {
    return createOpenAiReading(systemPrompt, userPrompt);
  }

  return createDoubaoReading(systemPrompt, userPrompt);
}

async function createDoubaoReading(systemPrompt, userPrompt) {
  const apiKey = process.env.DOUBAO_API_KEY || process.env.ARK_API_KEY;
  if (!apiKey) {
    const error = new Error("Missing DOUBAO_API_KEY or ARK_API_KEY");
    error.status = 503;
    throw error;
  }

  const response = await fetch(`${doubaoBaseUrl.replace(/\/$/, "")}/responses`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: doubaoModel,
      input: [
        { role: "system", content: [{ type: "input_text", text: systemPrompt }] },
        { role: "user", content: [{ type: "input_text", text: userPrompt }] },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error?.message || "Doubao request failed");
    error.status = response.status;
    throw error;
  }

  return compactReading(extractOutputText(data)) || "这张牌的信息已经出现，但智能解读暂时没有生成文字。";
}

async function createOpenAiReading(systemPrompt, userPrompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error("Missing OPENAI_API_KEY");
    error.status = 503;
    throw error;
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: openaiModel,
      input: [
        { role: "system", content: [{ type: "input_text", text: systemPrompt }] },
        { role: "user", content: [{ type: "input_text", text: userPrompt }] },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error?.message || "OpenAI request failed");
    error.status = response.status;
    throw error;
  }

  return compactReading(extractOutputText(data)) || "这张牌的信息已经出现，但智能解读暂时没有生成文字。";
}

function handleOptions(req, res) {
  const corsOrigin = getCorsOrigin(req);
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };

  if (corsOrigin) headers["Access-Control-Allow-Origin"] = corsOrigin;
  writeHeaders(res, req, 204, headers);
  res.end();
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", publicOrigin || `http://${req.headers.host || `${host}:${port}`}`);

  if (req.method === "OPTIONS") {
    handleOptions(req, res);
    return;
  }

  if (req.method === "GET" && url.pathname === "/healthz") {
    sendJson(req, res, 200, { ok: true, service: "tarot-gesture-public" });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/reading") {
    if (isRateLimited(req)) {
      sendJson(req, res, 429, { error: "Too many reading requests. Please try again later." });
      return;
    }

    try {
      const payload = await readJson(req);
      const reading = await createReading(payload);
      sendJson(req, res, 200, { reading });
    } catch (error) {
      const status = error.status || 500;
      console.error(`[api/reading] ${status}`, error.message || error);
      sendJson(req, res, status, { error: error.message || "Unable to create reading" });
    }
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    sendJson(req, res, 405, { error: "Method not allowed" });
    return;
  }

  const filePath = resolveFile(url.pathname);

  if (!filePath) {
    writeHeaders(res, req, 404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const extension = extname(filePath);
  const cacheControl = [".html", ".js", ".css", ".txt"].includes(extension)
    ? "no-cache"
    : "public, max-age=31536000, immutable";
  writeHeaders(res, req, 200, {
    "Content-Type": types[extension] || "application/octet-stream",
    "Cache-Control": cacheControl,
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(filePath).pipe(res);
}).listen(port, host, () => {
  const shownHost = host === "0.0.0.0" ? "127.0.0.1" : host;
  console.log(`Tarot public site listening on http://${shownHost}:${port}`);
});
