# 星河塔罗公网网站版

这是从 `tarot-gesture` 拆出的公网部署版本。原项目不受影响，本目录可以单独上传到服务器运行。

## 本地运行

PowerShell 示例：

```powershell
cd F:\codex专用\tarot-gesture-public
$env:DOUBAO_API_KEY="你的豆包或火山方舟 API Key"
npm start
```

打开：

```text
http://127.0.0.1:5173
```

健康检查：

```text
http://127.0.0.1:5173/healthz
```

## 生产环境变量

复制 `.env.example`，在服务器面板、PM2、Docker、宝塔、1Panel、云托管平台里配置同名环境变量。不要把真实 API Key 写进前端文件。

常用变量：

- `HOST`：公网部署用 `0.0.0.0`，本机调试可用 `127.0.0.1`
- `PORT`：服务监听端口，默认 `5173`
- `PUBLIC_ORIGIN`：你的正式域名，例如 `https://tarot.example.com`
- `AI_PROVIDER`：默认 `doubao`，也可设为 `openai`
- `DOUBAO_API_KEY` / `ARK_API_KEY`：豆包或火山方舟密钥
- `OPENAI_API_KEY`：仅 `AI_PROVIDER=openai` 时需要
- `RATE_LIMIT_MAX`：每个 IP 在一个窗口内最多请求多少次 AI 解读

## 推荐部署结构

浏览器访问：

```text
用户 -> HTTPS 域名 -> Nginx/Caddy/宝塔反向代理 -> Node 服务
```

Node 服务只负责：

- 返回网页、CSS、JS、图片资源
- 代理 `/api/reading` 到模型服务
- 保护 API Key 不暴露给浏览器

## Nginx 反向代理示例

```nginx
server {
  listen 80;
  server_name your-domain.example;

  location / {
    proxy_pass http://127.0.0.1:5173;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

正式上线建议启用 HTTPS。摄像头手势功能在公网环境通常也需要 HTTPS 才能正常授权。

## PM2 启动示例

```powershell
npm install -g pm2
pm2 start server.mjs --name tarot-gesture-public
pm2 save
```

Linux 服务器上也可以这样启动：

```bash
HOST=0.0.0.0 PORT=5173 DOUBAO_API_KEY="你的密钥" npm start
```

## 上线前检查

- 域名已解析到服务器
- 已配置 HTTPS 证书
- 真实 API Key 只存在服务器环境变量中
- `/healthz` 返回 `{ "ok": true }`
- 首页、牌面图片、`/api/reading` 能正常访问
- 如使用国内服务器，按实际运营主体完成 ICP 备案
- 准备隐私政策和用户协议，说明摄像头权限与 AI 解读用途
