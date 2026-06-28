const cards = [
  ["愚者", "无畏旅人", "带着星尘与天真踏上未知路。新的开始正在召唤你，先行动，再让答案在路上显形。", "245, 203, 108", "/assets/tarot-hd/tarot-fool.png"],
  ["魔术师", "星盘术士", "意志、工具和时机已经聚齐。把想法化为仪式，你会看见可能性开始有形。", "125, 221, 255", "/assets/tarot-hd/tarot-magician.png"],
  ["女祭司", "月幕神谕", "沉默处藏着答案。别急着解释一切，直觉正在替你读懂更深的线索。", "185, 145, 255", "/assets/tarot-hd/tarot-high-priestess.png"],
  ["女皇", "繁星王后", "丰盛来自照料与创造。给关系、作品或身体一点耐心，它们会回馈你。", "255, 154, 190", "/assets/tarot-hd/tarot-empress.png"],
  ["皇帝", "黑金君王", "秩序需要边界，力量需要承担。现在适合立规矩、做决定、守住核心。", "255, 196, 94", "/assets/tarot-hd/tarot-emperor.png"],
  ["教皇", "圣钥导师", "传统不是束缚，而是一把可借用的钥匙。向可靠的智慧靠近，答案会更稳。", "232, 204, 138", "/assets/tarot-hd/tarot-hierophant.png"],
  ["恋人", "双星誓约", "选择不只关于爱，也关于你愿意成为什么样的人。诚实会让道路变清晰。", "255, 128, 155", "/assets/tarot-hd/tarot-lovers.png"],
  ["战车", "日冕骑士", "方向一旦确认，阻力也会变成推进力。收拢注意力，向前冲。", "120, 190, 255", "/assets/tarot-hd/tarot-chariot.png"],
  ["力量", "狮心守护", "真正的力量，是温柔地驯服风暴。别硬碰硬，稳定会赢。", "255, 174, 88", "/assets/tarot-hd/tarot-strength.png"],
  ["隐者", "提灯贤者", "退后一步，内在的灯会照亮路径。孤独不是停滞，是重新校准。", "176, 210, 255", "/assets/tarot-hd/tarot-hermit.png"],
  ["命运之轮", "星轨舞者", "变化已经在转动，顺势比掌控更重要。留意突然出现的新门。", "132, 235, 190", "/assets/tarot-hd/tarot-wheel-of-fortune.png"],
  ["正义", "天秤审判", "诚实会切开迷雾，平衡会回到你手中。按事实行动，不被情绪牵走。", "235, 235, 180", "/assets/tarot-hd/tarot-justice.png"],
  ["倒吊人", "逆光献祭者", "暂时停住不是失败，而是换一个角度看见真相。放下执念，局面会松动。", "152, 214, 232", "/assets/tarot-hd/tarot-hanged-man.png"],
  ["死神", "暮门旅者", "结束正在清空旧壳，为新的生命腾出位置。不要抓紧枯萎的东西。", "174, 174, 190", "/assets/tarot-hd/tarot-death.png"],
  ["节制", "星泉调和者", "两股力量需要被温柔混合。慢一点，找到比例，疗愈会自然发生。", "146, 224, 204", "/assets/tarot-hd/tarot-temperance.png"],
  ["恶魔", "影链诱惑者", "看清让你上瘾的交换，才有机会取回自由。欲望可以被照亮，也可以被选择。", "224, 112, 126", "/assets/tarot-hd/tarot-devil.png"],
  ["高塔", "雷火醒钟", "突如其来的震动会打碎不稳的结构。别急着修补，先看清什么本就该倒下。", "255, 176, 88", "/assets/tarot-hd/tarot-tower.png"],
  ["星星", "银河祈愿者", "希望不是幻觉，是黑夜里的航标。把愿望说清楚，它会开始靠近你。", "150, 205, 255", "/assets/tarot-hd/tarot-star.png"],
  ["月亮", "潮汐梦行者", "迷雾会放大恐惧，也会保护直觉。别急着定论，跟随细微的感受前进。", "160, 172, 255", "/assets/tarot-hd/tarot-moon.png"],
  ["太阳", "金昼祝福者", "清晰、热量和生命力正在回到你身上。把自己带到光里，答案会变简单。", "255, 212, 86", "/assets/tarot-hd/tarot-sun.png"],
  ["审判", "天号唤醒者", "某个更高的声音正在召回真正的你。回应它，旧故事就能被重新命名。", "206, 226, 255", "/assets/tarot-hd/tarot-judgement.png"],
  ["世界", "星环完成者", "一段旅程正在合拢成圆。庆祝完成，也准备带着经验进入新的循环。", "186, 224, 168", "/assets/tarot-hd/tarot-world.png"],
];

const browseHint = "拖动牌组或按 ← → 浏览，按 ↑ / Enter 翻开当前牌";

const root = document.querySelector("#root");

root.innerHTML = `
  <main class="app-shell">
    <section class="sky" aria-hidden="true"></section>
    <header class="topbar">
      <div>
        <p class="eyebrow">Celestial Tarot</p>
        <h1>星河占卜</h1>
      </div>
      <div class="gesture-pill" id="gestureStatus">
        <span class="status-dot"></span>
        <span>备用操作</span>
      </div>
    </header>

    <section class="altar" aria-label="塔罗牌抽卡区">
      <div class="orbital-rings" aria-hidden="true"></div>
      <div class="reading-panel" id="readingPanel" aria-live="polite">
        <p>本次指引</p>
        <h2 id="activeName">等待翻牌</h2>
        <span id="activeRole">选择一张牌后揭示</span>
        <strong id="activeMeaning"></strong>
      </div>
      <div class="deck-stage" id="deckStage"></div>
      <div class="instruction" id="instruction">${browseHint}</div>
    </section>

    <aside class="control-panel">
      <video id="cameraPreview" playsinline muted></video>
      <canvas id="handCanvas" width="220" height="132"></canvas>
      <div class="telemetry">
        <div>
          <span>模式</span>
          <strong id="modeText">备用操作</strong>
        </div>
        <div>
          <span>手势</span>
          <strong id="gestureText">未检测</strong>
        </div>
      </div>
      <div class="actions">
        <button id="cameraButton" type="button">启用摄像头</button>
        <button id="resetButton" type="button">重新抽取</button>
      </div>
    </aside>

    <footer class="shortcut-bar">
      <span>拖动牌组或按 ← → 浏览</span>
      <span>按 ↑ / Enter 翻开当前牌</span>
    </footer>
  </main>
`;

const stage = document.querySelector("#deckStage");
const readingPanel = document.querySelector("#readingPanel");
const activeName = document.querySelector("#activeName");
const activeRole = document.querySelector("#activeRole");
const activeMeaning = document.querySelector("#activeMeaning");
const instruction = document.querySelector("#instruction");
const gestureStatus = document.querySelector("#gestureStatus span:last-child");
const modeText = document.querySelector("#modeText");
const gestureText = document.querySelector("#gestureText");
const cameraButton = document.querySelector("#cameraButton");
const resetButton = document.querySelector("#resetButton");
const video = document.querySelector("#cameraPreview");
const canvas = document.querySelector("#handCanvas");
const ctx = canvas.getContext("2d");

let activeIndex = 0;
let selectedIndex = null;
let deckCards = createRandomDeck();
let dragStart = null;
let dragOffset = 0;
let lastGestureX = null;
let lastGestureY = null;
let lastSelectAt = 0;
let lastResetAt = 0;
let detector = null;
let cameraStream = null;
let rafId = null;
const dragStep = 86;
const maxDragOffset = 170;
const gestureStep = 0.075;
const resetCooldown = 1200;

function hslToRgb(hue, saturation, lightness) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const segment = hue / 60;
  const x = chroma * (1 - Math.abs((segment % 2) - 1));
  const match = lightness - chroma / 2;
  const [r, g, b] =
    segment < 1 ? [chroma, x, 0] :
    segment < 2 ? [x, chroma, 0] :
    segment < 3 ? [0, chroma, x] :
    segment < 4 ? [0, x, chroma] :
    segment < 5 ? [x, 0, chroma] :
    [chroma, 0, x];

  return [r, g, b].map((value) => Math.round((value + match) * 255));
}

function randomGlowColor() {
  const hue = Math.random() * 360;
  const saturation = 0.62 + Math.random() * 0.24;
  const lightness = 0.58 + Math.random() * 0.16;
  return hslToRgb(hue, saturation, lightness).join(", ");
}

function createRandomDeck() {
  const shuffled = cards.map((card) => ({
    card,
    glow: randomGlowColor(),
  }));

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function resetReading() {
  deckCards = createRandomDeck();
  activeIndex = 0;
  selectedIndex = null;
  dragOffset = 0;
  instruction.textContent = browseHint;
  renderDeck();
}

function distanceBetween(pointA, pointB) {
  return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
}

function isFist(points) {
  const wrist = points[0];
  const palmSize = distanceBetween(wrist, points[9]);
  const fingers = [
    [8, 6],
    [12, 10],
    [16, 14],
    [20, 18],
  ];
  const curledFingers = fingers.filter(([tipIndex, jointIndex]) => (
    distanceBetween(points[tipIndex], wrist) < distanceBetween(points[jointIndex], wrist) + palmSize * 0.12
  )).length;
  const thumbClosed = distanceBetween(points[4], points[5]) < palmSize * 1.35;

  return curledFingers >= 3 && thumbClosed;
}

function renderDeck() {
  stage.innerHTML = "";
  const dragUnit = dragOffset / 180;
  deckCards.forEach(({ card, glow }, index) => {
    const visualOffset = index - activeIndex + dragUnit;
    const distance = Math.abs(visualOffset);
    const isSelected = selectedIndex === index;
    const isActive = index === activeIndex;
    const arc = Math.min(distance, 5);
    const node = document.createElement("button");
    node.type = "button";
    node.className = `tarot-card ${isActive ? "is-active" : ""} ${isSelected ? "is-selected" : ""}`;
    node.style.setProperty("--x", `${visualOffset * 154}px`);
    node.style.setProperty("--z", `${90 - Math.round(distance * 8)}`);
    node.style.setProperty("--scale", `${Math.max(0.64, 1 - distance * 0.065)}`);
    node.style.setProperty("--rot", `${visualOffset * -6}deg`);
    node.style.setProperty("--tilt", `${visualOffset * -9}deg`);
    node.style.setProperty("--y", `${arc * arc * 5}px`);
    node.style.setProperty("--opacity", `${Math.max(0.16, 1 - distance * 0.15)}`);
    node.style.setProperty("--glow", glow);
    node.style.setProperty("--card-image", `url("${card[4]}")`);
    node.setAttribute("aria-label", `选择${card[0]}`);
    node.innerHTML = `
      <span class="card-aura"></span>
      <span class="card-inner">
        <span class="card-face card-back"></span>
        <span class="card-face card-front">
          <span class="card-art"></span>
          <span class="card-copy">
            <strong>${card[0]}</strong>
            <em>${card[1]}</em>
          </span>
        </span>
      </span>
    `;
    node.addEventListener("click", () => {
      if (index === activeIndex) selectActive();
      else setActive(index);
    });
    stage.appendChild(node);
  });
  updateReadingPanel();
}

function updateReadingPanel() {
  if (selectedIndex === null) {
    readingPanel.classList.remove("is-revealed");
    activeName.textContent = "等待翻牌";
    activeRole.textContent = "选择一张牌后揭示";
    activeMeaning.textContent = "";
    return;
  }

  const [name, role, meaning] = deckCards[selectedIndex].card;
  readingPanel.classList.add("is-revealed");
  activeName.textContent = name;
  activeRole.textContent = role;
  activeMeaning.textContent = meaning;
}

function setActive(index) {
  activeIndex = (index + deckCards.length) % deckCards.length;
  selectedIndex = null;
  dragOffset = 0;
  instruction.textContent = browseHint;
  renderDeck();
}

function move(delta) {
  setActive(activeIndex + delta);
}

function moveDuringDrag(delta) {
  activeIndex = (activeIndex + delta + deckCards.length) % deckCards.length;
  selectedIndex = null;
  instruction.textContent = browseHint;
}

function selectActive() {
  selectedIndex = activeIndex;
  const [name, role, meaning] = deckCards[activeIndex].card;
  instruction.textContent = `${name} · ${role}：${meaning}`;
  renderDeck();
}

stage.addEventListener("pointerdown", (event) => {
  dragStart = event.clientX;
  dragOffset = 0;
  stage.classList.add("is-dragging");
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener("pointermove", (event) => {
  if (dragStart === null) return;
  const dx = event.clientX - dragStart;
  const steps = Math.trunc(dx / dragStep);

  if (steps !== 0) {
    moveDuringDrag(-steps);
    dragStart += steps * dragStep;
  }

  dragOffset = Math.max(-maxDragOffset, Math.min(maxDragOffset, event.clientX - dragStart));
  renderDeck();
});

stage.addEventListener("pointerup", () => {
  if (dragStart === null) return;
  stage.classList.remove("is-dragging");
  dragStart = null;
  dragOffset = 0;
  renderDeck();
});

stage.addEventListener("pointercancel", () => {
  dragStart = null;
  dragOffset = 0;
  stage.classList.remove("is-dragging");
  renderDeck();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") move(1);
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowUp" || event.key === "Enter") selectActive();
  if (event.code === "Space") {
    event.preventDefault();
    resetReading();
  }
});

resetButton.addEventListener("click", () => {
  resetReading();
});

cameraButton.addEventListener("click", async () => {
  if (cameraStream) {
    stopCamera();
    return;
  }
  await startCamera();
});

async function startCamera() {
  try {
    updateMode("正在加载手势模型", "准备中");
    const vision = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/vision_bundle.mjs");
    const fileset = await vision.FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm",
    );
    detector = await vision.HandLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 1,
    });
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 400, facingMode: "user" },
      audio: false,
    });
    video.srcObject = cameraStream;
    await video.play();
    cameraButton.textContent = "关闭摄像头";
    updateMode("摄像头手势", "寻找手掌");
    rafId = requestAnimationFrame(readHands);
  } catch (error) {
    console.error(error);
    updateMode("备用操作", "摄像头不可用");
    instruction.textContent = "摄像头或手势模型不可用，可以继续拖动牌组或使用键盘抽卡";
  }
}

function stopCamera() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  detector = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  video.srcObject = null;
  cameraButton.textContent = "启用摄像头";
  updateMode("备用操作", "未检测");
}

function updateMode(mode, gesture) {
  modeText.textContent = mode;
  gestureText.textContent = gesture;
  gestureStatus.textContent = mode === "摄像头手势" ? "手势已启用" : mode;
}

function readHands(now) {
  if (!detector || !video.videoWidth) {
    rafId = requestAnimationFrame(readHands);
    return;
  }

  const result = detector.detectForVideo(video, now);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (!result.landmarks.length) {
    lastGestureX = null;
    lastGestureY = null;
    gestureText.textContent = "未检测";
    rafId = requestAnimationFrame(readHands);
    return;
  }

  const palm = result.landmarks[0][9];
  const x = 1 - palm.x;
  const y = palm.y;
  drawHand(result.landmarks[0]);

  if (isFist(result.landmarks[0]) && now - lastResetAt > resetCooldown) {
    resetReading();
    lastResetAt = now;
    lastGestureX = x;
    lastGestureY = y;
    gestureText.textContent = "握拳重抽";
    rafId = requestAnimationFrame(readHands);
    return;
  }

  if (lastGestureX !== null) {
    const dx = x - lastGestureX;
    const dy = y - lastGestureY;
    const canSelect = now - lastSelectAt > 1200;
    const steps = Math.trunc(dx / gestureStep);

    if (steps !== 0) {
      moveDuringDrag(steps);
      lastGestureX += steps * gestureStep;
      gestureText.textContent = steps > 0 ? "向右滑动" : "向左滑动";
      renderDeck();
    } else if (dy < -0.115 && canSelect) {
      selectActive();
      lastSelectAt = now;
      gestureText.textContent = "向上确认";
    } else {
      gestureText.textContent = "追踪中";
    }
  }

  if (lastGestureX === null) lastGestureX = x;
  lastGestureY = y;
  rafId = requestAnimationFrame(readHands);
}

function drawHand(points) {
  ctx.save();
  ctx.fillStyle = "rgba(246, 206, 117, .95)";
  ctx.strokeStyle = "rgba(246, 206, 117, .42)";
  ctx.lineWidth = 2;
  points.forEach((point) => {
    const px = (1 - point.x) * canvas.width;
    const py = point.y * canvas.height;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

renderDeck();
