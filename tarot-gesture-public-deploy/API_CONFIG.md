# API 配置

公网版本默认使用豆包/火山方舟的 OpenAI 兼容接口生成塔罗解读。

PowerShell 启动示例：

```powershell
$env:DOUBAO_API_KEY="你的豆包或火山方舟 API Key"
$env:DOUBAO_MODEL="doubao-seed-1-6-flash-250828"
$env:HOST="0.0.0.0"
$env:PORT="5173"
npm start
```

可选环境变量：

- `AI_PROVIDER`：默认 `doubao`。如果要切换 OpenAI，设为 `openai`
- `DOUBAO_API_KEY` 或 `ARK_API_KEY`：豆包/火山方舟 API Key
- `DOUBAO_MODEL` 或 `ARK_MODEL`：模型名，例如 `doubao-seed-1-6-flash-250828`
- `DOUBAO_BASE_URL` 或 `ARK_BASE_URL`：默认 `https://ark.cn-beijing.volces.com/api/v3`
- `OPENAI_API_KEY`：仅 `AI_PROVIDER=openai` 时使用
- `OPENAI_MODEL`：仅 `AI_PROVIDER=openai` 时使用，默认 `gpt-4.1-mini`
- `HOST`：公网部署用 `0.0.0.0`
- `PORT`：监听端口，默认 `5173`
- `PUBLIC_ORIGIN`：正式域名，例如 `https://tarot.example.com`
- `ALLOWED_ORIGINS`：允许跨域调用 API 的域名，多个用英文逗号分隔
- `RATE_LIMIT_WINDOW_MS`：限流窗口，默认 60000 毫秒
- `RATE_LIMIT_MAX`：每个 IP 在限流窗口内最多调用 `/api/reading` 的次数，默认 20
- `MAX_BODY_BYTES`：请求体最大字节数，默认 20480

前端只调用同源的 `/api/reading`。真实 API Key 必须只放在服务器环境变量里，不能写入 `src/main.js` 或任何浏览器可访问的文件。
