const cards = [
  ["愚者", "无畏旅人", "带着星尘与天真踏上未知路。新的开始正在召唤你，先行动，再让答案在路上显形。", "245, 203, 108", "/assets/tarot-jpg-q88/tarot-fool.jpg"],
  ["魔术师", "星盘术士", "意志、工具和时机已经聚齐。把想法化为仪式，你会看见可能性开始有形。", "125, 221, 255", "/assets/tarot-jpg-q88/tarot-magician.jpg"],
  ["女祭司", "月幕神谕", "沉默处藏着答案。别急着解释一切，直觉正在替你读懂更深的线索。", "185, 145, 255", "/assets/tarot-jpg-q88/tarot-high-priestess.jpg"],
  ["女皇", "繁星王后", "丰盛来自照料与创造。给关系、作品或身体一点耐心，它们会回馈你。", "255, 154, 190", "/assets/tarot-jpg-q88/tarot-empress.jpg"],
  ["皇帝", "黑金君王", "秩序需要边界，力量需要承担。现在适合立规矩、做决定、守住核心。", "255, 196, 94", "/assets/tarot-jpg-q88/tarot-emperor.jpg"],
  ["教皇", "圣钥导师", "传统不是束缚，而是一把可借用的钥匙。向可靠的智慧靠近，答案会更稳。", "232, 204, 138", "/assets/tarot-jpg-q88/tarot-hierophant.jpg"],
  ["恋人", "双星誓约", "选择不只关于爱，也关于你愿意成为什么样的人。诚实会让道路变清晰。", "255, 128, 155", "/assets/tarot-jpg-q88/tarot-lovers.jpg"],
  ["战车", "日冕骑士", "方向一旦确认，阻力也会变成推进力。收拢注意力，向前冲。", "120, 190, 255", "/assets/tarot-jpg-q88/tarot-chariot.jpg"],
  ["力量", "狮心守护", "真正的力量，是温柔地驯服风暴。别硬碰硬，稳定会赢。", "255, 174, 88", "/assets/tarot-jpg-q88/tarot-strength.jpg"],
  ["隐者", "提灯贤者", "退后一步，内在的灯会照亮路径。孤独不是停滞，是重新校准。", "176, 210, 255", "/assets/tarot-jpg-q88/tarot-hermit.jpg"],
  ["命运之轮", "星轨舞者", "变化已经在转动，顺势比掌控更重要。留意突然出现的新门。", "132, 235, 190", "/assets/tarot-jpg-q88/tarot-wheel-of-fortune.jpg"],
  ["正义", "天秤审判", "诚实会切开迷雾，平衡会回到你手中。按事实行动，不被情绪牵走。", "235, 235, 180", "/assets/tarot-jpg-q88/tarot-justice.jpg"],
  ["倒吊人", "逆光献祭者", "暂时停住不是失败，而是换一个角度看见真相。放下执念，局面会松动。", "152, 214, 232", "/assets/tarot-jpg-q88/tarot-hanged-man.jpg"],
  ["死神", "暮门旅者", "结束正在清空旧壳，为新的生命腾出位置。不要抓紧枯萎的东西。", "174, 174, 190", "/assets/tarot-jpg-q88/tarot-death.jpg"],
  ["节制", "星泉调和者", "两股力量需要被温柔混合。慢一点，找到比例，疗愈会自然发生。", "146, 224, 204", "/assets/tarot-jpg-q88/tarot-temperance.jpg"],
  ["恶魔", "影链诱惑者", "看清让你上瘾的交换，才有机会取回自由。欲望可以被照亮，也可以被选择。", "224, 112, 126", "/assets/tarot-jpg-q88/tarot-devil.jpg"],
  ["高塔", "雷火醒钟", "突如其来的震动会打碎不稳的结构。别急着修补，先看清什么本就该倒下。", "255, 176, 88", "/assets/tarot-jpg-q88/tarot-tower.jpg"],
  ["星星", "银河祈愿者", "希望不是幻觉，是黑夜里的航标。把愿望说清楚，它会开始靠近你。", "150, 205, 255", "/assets/tarot-jpg-q88/tarot-star.jpg"],
  ["月亮", "潮汐梦行者", "迷雾会放大恐惧，也会保护直觉。别急着定论，跟随细微的感受前进。", "160, 172, 255", "/assets/tarot-jpg-q88/tarot-moon.jpg"],
  ["太阳", "金昼祝福者", "清晰、热量和生命力正在回到你身上。把自己带到光里，答案会变简单。", "255, 212, 86", "/assets/tarot-jpg-q88/tarot-sun.jpg"],
  ["审判", "天号唤醒者", "某个更高的声音正在召回真正的你。回应它，旧故事就能被重新命名。", "206, 226, 255", "/assets/tarot-jpg-q88/tarot-judgement.jpg"],
  ["世界", "星环完成者", "一段旅程正在合拢成圆。庆祝完成，也准备带着经验进入新的循环。", "186, 224, 168", "/assets/tarot-jpg-q88/tarot-world.jpg"],
];

const browseHint = "拖动牌组或按 ← → 浏览，按 ↑ / Enter 翻开当前牌";
const spreads = [
  { id: "single", name: "单张指引", positions: ["指引"] },
  { id: "timeline", name: "三张牌", positions: ["过去", "现在", "未来"] },
  { id: "choice", name: "选择牌阵", positions: ["现状", "阻碍", "建议"] },
  { id: "relationship", name: "关系牌阵", positions: ["自己", "对方", "关系趋势"] },
];

const root = document.querySelector("#root");

root.innerHTML = `
  <main class="app-shell">
    <section class="sky" aria-hidden="true"></section>
    <header class="topbar">
      <div>
        <p class="eyebrow">Celestial Tarot</p>
        <h1>星河占卜</h1>
      </div>
      <div class="intro-wrap">
        <button class="intro-trigger" id="tarotIntroButton" type="button" aria-expanded="false" aria-controls="tarotIntroPanel">塔罗介绍</button>
        <section class="intro-panel" id="tarotIntroPanel" hidden>
          <h2>塔罗介绍</h2>
          <p>塔罗是一套以图像、象征和牌阵位置进行自我观察的工具。它不负责替你决定未来，更适合帮助你整理问题、看见情绪、发现当前局面里的选择。</p>
          <p>使用时先写下一个具体问题，再选择牌阵。抽到的牌会结合位置给出方向：单张牌适合今日指引，三张牌适合看变化脉络，选择牌阵适合比较阻碍和下一步。</p>
          <p>解读可以当作灵感和提醒。真正重要的是你看到牌面后产生的联想，以及你愿意采取的那个小行动。</p>
        </section>
      </div>
      <div class="gesture-pill" id="gestureStatus">
        <span class="status-dot"></span>
        <span>备用操作</span>
      </div>
    </header>

    <form class="question-panel" id="questionForm">
      <label for="questionInput">提问</label>
      <div class="question-row">
        <input
          id="questionInput"
          type="text"
          maxlength="80"
          autocomplete="off"
          placeholder="把想问的事写在这里"
        />
        <button id="questionButton" type="submit">开始占卜</button>
      </div>
      <p id="questionPrompt">也可以先不写，直接抽一张今日指引。</p>
    </form>

    <nav class="flow-guide" aria-label="占卜流程">
      <span class="flow-step" data-flow-step="question">
        <b>1</b>
        <span>写下问题</span>
      </span>
      <span class="flow-step" data-flow-step="spread">
        <b>2</b>
        <span>选择牌阵</span>
      </span>
      <span class="flow-step" data-flow-step="draw">
        <b>3</b>
        <span>抽取牌面</span>
      </span>
      <span class="flow-step" data-flow-step="reading">
        <b>4</b>
        <span>查看解读</span>
      </span>
    </nav>

    <section class="spread-panel" aria-label="牌阵选择">
      ${spreads.map((spread) => `
        <button class="spread-option" type="button" data-spread-id="${spread.id}">
          <strong>${spread.name}</strong>
          <span>${spread.positions.join(" / ")}</span>
        </button>
      `).join("")}
    </section>

    <section class="altar" aria-label="塔罗牌抽卡区">
      <div class="orbital-rings" aria-hidden="true"></div>
      <div class="reading-panel" id="readingPanel" aria-live="polite">
        <p>本次指引</p>
        <span class="active-question" id="activeQuestion"></span>
        <h2 id="activeName">等待翻牌</h2>
        <span id="activeRole">选择一张牌后揭示</span>
        <strong id="activeMeaning"></strong>
        <div class="spread-result" id="spreadResult"></div>
        <div class="ai-reading" id="aiReading" hidden>
          <span>诡秘之主回应</span>
          <p id="aiReadingText"></p>
        </div>
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
const tarotIntroButton = document.querySelector("#tarotIntroButton");
const tarotIntroPanel = document.querySelector("#tarotIntroPanel");
document.body.appendChild(tarotIntroPanel);
const readingPanel = document.querySelector("#readingPanel");
const activeName = document.querySelector("#activeName");
const activeRole = document.querySelector("#activeRole");
const activeMeaning = document.querySelector("#activeMeaning");
const instruction = document.querySelector("#instruction");
const gestureStatus = document.querySelector("#gestureStatus span:last-child");
const modeText = document.querySelector("#modeText");
const gestureText = document.querySelector("#gestureText");
const questionForm = document.querySelector("#questionForm");
const questionInput = document.querySelector("#questionInput");
const questionPrompt = document.querySelector("#questionPrompt");
const activeQuestion = document.querySelector("#activeQuestion");
const spreadButtons = [...document.querySelectorAll(".spread-option")];
const flowSteps = [...document.querySelectorAll(".flow-step")];
const spreadResult = document.querySelector("#spreadResult");
const aiReading = document.querySelector("#aiReading");
const aiReadingText = document.querySelector("#aiReadingText");
const cameraButton = document.querySelector("#cameraButton");
const resetButton = document.querySelector("#resetButton");
const video = document.querySelector("#cameraPreview");
const canvas = document.querySelector("#handCanvas");
const ctx = canvas.getContext("2d");

let activeIndex = 0;
let selectedIndex = null;
let currentQuestion = "";
let activeSpreadId = null;
let ritualStarted = false;
let drawnCards = [];
let readingRequestId = 0;
let deckCards = createRandomDeck();
let dragStart = null;
let dragOffset = 0;
let lastGestureX = null;
let lastGestureY = null;
let gestureAnchorY = null;
let fistStartedAt = null;
let lastSelectAt = 0;
let lastResetAt = 0;
let detector = null;
let cameraStream = null;
let rafId = null;
let touchStart = null;
let touchMoved = false;
let touchMovedByStep = false;
let deckRenderFrame = null;
let deckCardNodes = [];
const gestureStep = 0.075;
const selectGestureStep = 0.065;
const selectCooldown = 900;
const resetHoldMs = 700;
const resetCooldown = 2500;
const touchSwipeStep = 48;
const touchSelectStep = 56;

function getCardSpacing() {
  if (window.matchMedia("(max-width: 430px)").matches) {
    return Math.max(108, Math.min(142, window.innerWidth * 0.34));
  }

  if (window.matchMedia("(max-width: 960px)").matches) {
    return Math.max(132, Math.min(174, window.innerWidth * 0.32));
  }

  return 220;
}

function getDragStep() {
  const spacing = getCardSpacing();
  if (window.matchMedia("(max-width: 960px)").matches) {
    return Math.max(58, Math.min(92, spacing * 0.58));
  }

  return Math.max(108, spacing * 0.5);
}

function getMaxDragOffset() {
  return getDragStep() * 1.12;
}

function scheduleRenderDeck() {
  if (deckRenderFrame !== null) return;
  deckRenderFrame = requestAnimationFrame(() => {
    deckRenderFrame = null;
    renderDeck();
  });
}

function getActiveSpread() {
  return spreads.find((spread) => spread.id === activeSpreadId) || spreads[0];
}

function getNextPosition() {
  return getActiveSpread().positions[drawnCards.length];
}

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
  readingRequestId += 1;
  deckCards = createRandomDeck();
  deckCardNodes = [];
  stage.dataset.mode = "";
  stage.innerHTML = "";
  activeIndex = 0;
  selectedIndex = null;
  drawnCards = [];
  dragOffset = 0;
  setQuestionFromInput();
  instruction.textContent = ritualStarted ? getSpreadHint() : "请选择牌阵，祭坛会为你展开牌组。";
  renderDeck();
}

function getFlowState() {
  const spread = getActiveSpread();
  const spreadComplete = ritualStarted && drawnCards.length >= spread.positions.length;

  if (spreadComplete) return "reading";
  if (ritualStarted) return "draw";
  if (currentQuestion) return "spread";
  return "question";
}

function updateFlowGuide() {
  const order = ["question", "spread", "draw", "reading"];
  const activeStep = getFlowState();
  const activeIndexInFlow = order.indexOf(activeStep);

  flowSteps.forEach((step) => {
    const stepName = step.dataset.flowStep;
    const stepIndex = order.indexOf(stepName);
    step.classList.toggle("is-active", stepName === activeStep);
    step.classList.toggle("is-complete", stepIndex < activeIndexInFlow);
  });
}

function getSpreadHint() {
  if (!ritualStarted) return "请选择牌阵，祭坛会为你展开牌组。";
  const spread = getActiveSpread();
  const nextPosition = getNextPosition();
  if (!nextPosition) return `${spread.name}已完成，可以重新抽取或切换牌阵。`;
  return `${browseHint}，为「${nextPosition}」抽牌`;
}

function getQuestionFromInput() {
  return questionInput.value.trim().replace(/\s+/g, " ");
}

function setQuestionFromInput() {
  currentQuestion = getQuestionFromInput();
  questionPrompt.textContent = currentQuestion
    ? `本次问题：${currentQuestion}`
    : "也可以先不写，直接抽一张今日指引。";
  updateFlowGuide();
}

function setAiReading(text, isVisible = true) {
  aiReading.hidden = !isVisible;
  aiReadingText.textContent = text;
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
  const thumbClosed = distanceBetween(points[4], points[5]) < palmSize * 1.18;

  return curledFingers >= 4 && thumbClosed;
}

function renderDeck() {
  updateFlowGuide();
  stage.classList.toggle("is-ritual", !ritualStarted);
  if (!ritualStarted) {
    deckCardNodes = [];
    if (stage.dataset.mode !== "ritual") {
      stage.dataset.mode = "ritual";
      stage.innerHTML = `
        <div class="ritual-table" aria-label="等待选择牌阵的仪式祭坛">
          <img src="/assets/ritual-altar-sharp.png" alt="" />
        </div>
      `;
    }
    updateReadingPanel();
    return;
  }

  if (stage.dataset.mode !== "deck") {
    stage.dataset.mode = "deck";
    stage.innerHTML = "";
    deckCardNodes = [];
  }

  const dragUnit = dragOffset / 180;
  deckCards.forEach(({ card, glow }, index) => {
    const visualOffset = index - activeIndex + dragUnit;
    const distance = Math.abs(visualOffset);
    const isSelected = drawnCards.some((drawnCard) => drawnCard.cardIndex === index);
    const isActive = index === activeIndex;
    const arc = Math.min(distance, 5);
    let node = deckCardNodes[index];
    if (!node) {
      node = document.createElement("button");
      node.type = "button";
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
      deckCardNodes[index] = node;
      stage.appendChild(node);
    }
    node.className = `tarot-card ${isActive ? "is-active" : ""} ${isSelected ? "is-selected" : ""}`;
    node.style.setProperty("--x", `${visualOffset * getCardSpacing()}px`);
    node.style.setProperty("--z", `${90 - Math.round(distance * 8)}`);
    node.style.setProperty("--scale", `${Math.max(0.64, 1 - distance * 0.065)}`);
    node.style.setProperty("--rot", `${visualOffset * -6}deg`);
    node.style.setProperty("--tilt", `${visualOffset * -9}deg`);
    node.style.setProperty("--y", `${arc * arc * 5}px`);
    node.style.setProperty("--opacity", `${Math.max(0.16, 1 - distance * 0.15)}`);
    node.style.setProperty("--glow", glow);
    node.style.setProperty("--card-image", `url("${card[4]}")`);
  });
  updateReadingPanel();
}

function updateReadingPanel() {
  if (!drawnCards.length) {
    readingPanel.classList.remove("is-revealed");
    activeQuestion.textContent = currentQuestion ? `本次问题：${currentQuestion}` : "";
    activeName.textContent = "等待翻牌";
    activeRole.textContent = ritualStarted ? `当前牌阵：${getActiveSpread().name}` : "先选择一个牌阵";
    activeMeaning.textContent = "";
    spreadResult.innerHTML = "";
    setAiReading("", false);
    return;
  }

  const spread = getActiveSpread();
  const lastDrawn = drawnCards[drawnCards.length - 1];
  const [name, role, meaning] = deckCards[lastDrawn.cardIndex].card;
  readingPanel.classList.add("is-revealed");
  activeQuestion.textContent = currentQuestion ? `本次问题：${currentQuestion}` : "今日指引";
  activeName.textContent = spread.positions.length === 1 ? name : spread.name;
  activeRole.textContent = spread.positions.length === 1 ? role : `${drawnCards.length} / ${spread.positions.length} 已抽取`;
  activeMeaning.textContent = spread.positions.length === 1 ? meaning : "";
  spreadResult.innerHTML = drawnCards.map((drawnCard) => {
    const [drawnName, drawnRole, drawnMeaning] = deckCards[drawnCard.cardIndex].card;
    return `
      <article>
        <span>${drawnCard.position}</span>
        <strong>${drawnName} · ${drawnRole}</strong>
        <p>${drawnMeaning}</p>
      </article>
    `;
  }).join("");
}

async function requestAiReading() {
  const requestId = ++readingRequestId;
  const spread = getActiveSpread();
  if (drawnCards.length < spread.positions.length) return;
  const readingCards = drawnCards.map((drawnCard) => {
    const [cardName, cardRole, cardMeaning] = deckCards[drawnCard.cardIndex].card;
    return {
      position: drawnCard.position,
      cardName,
      cardRole,
      cardMeaning,
    };
  });

  setAiReading("灰雾之上正在聆听你的问题...");

  try {
    const response = await fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: currentQuestion || "今日指引",
        spreadName: spread.name,
        cards: readingCards,
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "诡秘回应生成失败");
    if (requestId === readingRequestId) setAiReading(data.reading);
  } catch (error) {
    if (requestId !== readingRequestId) return;
    const message = error.message.includes("DOUBAO_API_KEY") || error.message.includes("ARK_API_KEY")
      ? "还没有配置豆包 API Key。配置 DOUBAO_API_KEY 或 ARK_API_KEY 后，智能体会在这里给出结合问题和牌面的解读。"
      : error.message.includes("OPENAI_API_KEY")
        ? "还没有配置 OPENAI_API_KEY。配置后，智能体会在这里给出结合问题和牌面的解读。"
      : `诡秘之主暂未回应：${error.message}`;
    setAiReading(message);
  }
}

function setActive(index) {
  if (!ritualStarted) return;
  activeIndex = (index + deckCards.length) % deckCards.length;
  selectedIndex = drawnCards.find((drawnCard) => drawnCard.cardIndex === activeIndex)?.cardIndex ?? null;
  dragOffset = 0;
  instruction.textContent = getSpreadHint();
  renderDeck();
}

function move(delta) {
  setActive(activeIndex + delta);
}

function moveDuringDrag(delta) {
  if (!ritualStarted) return;
  activeIndex = (activeIndex + delta + deckCards.length) % deckCards.length;
  selectedIndex = drawnCards.find((drawnCard) => drawnCard.cardIndex === activeIndex)?.cardIndex ?? null;
  instruction.textContent = getSpreadHint();
}

function selectActive() {
  if (!ritualStarted) {
    instruction.textContent = "请先选择一个牌阵，让祭坛展开牌组。";
    return;
  }
  setQuestionFromInput();
  const spread = getActiveSpread();
  const existingDrawn = drawnCards.find((drawnCard) => drawnCard.cardIndex === activeIndex);
  if (existingDrawn) {
    selectedIndex = activeIndex;
    instruction.textContent = `${existingDrawn.position}：${deckCards[activeIndex].card[0]} · ${deckCards[activeIndex].card[1]}`;
    renderDeck();
    return;
  }

  const nextPosition = getNextPosition();
  if (!nextPosition) {
    instruction.textContent = `${spread.name}已完成，按空格或“重新抽取”开始新一轮。`;
    return;
  }

  selectedIndex = activeIndex;
  drawnCards = spread.positions.length === 1
    ? [{ position: nextPosition, cardIndex: activeIndex }]
    : [...drawnCards, { position: nextPosition, cardIndex: activeIndex }];

  const [name, role] = deckCards[activeIndex].card;
  const upcomingPosition = getNextPosition();
  instruction.textContent = upcomingPosition
    ? `${nextPosition}：${name} · ${role}。继续为「${upcomingPosition}」抽牌。`
    : `${spread.name}完成，正在生成整组解读。`;
  renderDeck();
  if (drawnCards.length === spread.positions.length) requestAiReading();
}

stage.addEventListener("pointerdown", (event) => {
  if (!ritualStarted) return;
  dragStart = event.clientX;
  touchStart = event.pointerType === "touch"
    ? { x: event.clientX, y: event.clientY, time: performance.now() }
    : null;
  touchMoved = false;
  touchMovedByStep = false;
  dragOffset = 0;
  stage.classList.add("is-dragging");
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener("pointermove", (event) => {
  if (dragStart === null) return;
  if (event.cancelable) event.preventDefault();
  const dragStep = getDragStep();
  const dx = event.clientX - dragStart;
  const steps = Math.trunc(dx / dragStep);

  if (steps !== 0) {
    moveDuringDrag(-steps);
    dragStart += steps * dragStep;
    touchMoved = true;
    touchMovedByStep = true;
  }

  const maxDragOffset = getMaxDragOffset();
  dragOffset = Math.max(-maxDragOffset, Math.min(maxDragOffset, event.clientX - dragStart));
  if (Math.abs(dragOffset) > 8) touchMoved = true;
  scheduleRenderDeck();
});

stage.addEventListener("pointerup", (event) => {
  if (dragStart === null) return;
  const gesture = touchStart && event.pointerType === "touch"
    ? {
        dx: event.clientX - touchStart.x,
        dy: event.clientY - touchStart.y,
        elapsed: performance.now() - touchStart.time,
      }
    : null;
  stage.classList.remove("is-dragging");
  dragStart = null;
  const releaseOffset = dragOffset;
  dragOffset = 0;
  touchStart = null;

  if (gesture) {
    const isHorizontalSwipe = Math.abs(gesture.dx) > touchSwipeStep && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.25;
    const isUpSwipe = gesture.dy < -touchSelectStep && Math.abs(gesture.dy) > Math.abs(gesture.dx) * 1.15;
    const isTap = !touchMoved && Math.abs(gesture.dx) < 10 && Math.abs(gesture.dy) < 10 && gesture.elapsed < 360;

    if (isHorizontalSwipe && !touchMovedByStep) {
      move(gesture.dx < 0 ? 1 : -1);
      instruction.textContent = getSpreadHint();
      return;
    }

    if (touchMovedByStep && Math.abs(releaseOffset) > getDragStep() * 0.42) {
      move(releaseOffset < 0 ? 1 : -1);
      instruction.textContent = getSpreadHint();
      return;
    }

    if (isUpSwipe || isTap) {
      selectActive();
      return;
    }
  }

  renderDeck();
});

stage.addEventListener("pointercancel", () => {
  dragStart = null;
  dragOffset = 0;
  touchStart = null;
  touchMovedByStep = false;
  stage.classList.remove("is-dragging");
  renderDeck();
});

window.addEventListener("keydown", (event) => {
  if (event.target === questionInput) return;
  if (event.key === "Escape" && !tarotIntroPanel.hidden) {
    tarotIntroPanel.hidden = true;
    tarotIntroButton.setAttribute("aria-expanded", "false");
    return;
  }
  if (event.key === "ArrowRight") move(1);
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowUp" || event.key === "Enter") selectActive();
  if (event.code === "Space") {
    event.preventDefault();
    resetReading();
  }
});

window.addEventListener("resize", scheduleRenderDeck);

tarotIntroButton.addEventListener("click", () => {
  const shouldOpen = tarotIntroPanel.hidden;
  tarotIntroPanel.hidden = !shouldOpen;
  tarotIntroButton.setAttribute("aria-expanded", String(shouldOpen));
  if (shouldOpen) {
    tarotIntroPanel.scrollTop = 0;
  }
});

document.addEventListener("click", (event) => {
  if (tarotIntroPanel.hidden) return;
  if (event.target.closest(".intro-wrap")) return;
  if (event.target.closest("#tarotIntroPanel")) return;
  tarotIntroPanel.hidden = true;
  tarotIntroButton.setAttribute("aria-expanded", "false");
});

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setQuestionFromInput();
  selectedIndex = null;
  drawnCards = [];
  readingRequestId += 1;
  instruction.textContent = currentQuestion
    ? ritualStarted
      ? `带着“${currentQuestion}”开始${getActiveSpread().name}，${getSpreadHint()}。`
      : `带着“${currentQuestion}”选择一个牌阵，祭坛会为你展开牌组。`
    : getSpreadHint();
  questionInput.blur();
  renderDeck();
});

spreadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeSpreadId = button.dataset.spreadId;
    ritualStarted = true;
    spreadButtons.forEach((spreadButton) => {
      spreadButton.classList.toggle("is-active", spreadButton === button);
    });
    resetReading();
  });
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
    if (!window.isSecureContext) {
      throw new Error("摄像头手势需要 HTTPS 或 localhost 环境");
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("当前浏览器不支持摄像头访问");
    }

    updateMode("正在加载手势模型", "准备中");
    const vision = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/vision_bundle.mjs");
    const fileset = await vision.FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm",
    );
    const detectorOptions = {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      },
      runningMode: "VIDEO",
      numHands: 1,
    };
    try {
      detector = await vision.HandLandmarker.createFromOptions(fileset, {
        ...detectorOptions,
        baseOptions: { ...detectorOptions.baseOptions, delegate: "GPU" },
      });
    } catch {
      detector = await vision.HandLandmarker.createFromOptions(fileset, {
        ...detectorOptions,
        baseOptions: { ...detectorOptions.baseOptions, delegate: "CPU" },
      });
    }
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
    instruction.textContent = `${error.message}。仍可直接滑动牌组：左右滑浏览，上滑或点按抽牌。`;
    stopCamera(false);
  }
}

function stopCamera(shouldUpdateMode = true) {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  detector = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  video.srcObject = null;
  cameraButton.textContent = "启用摄像头";
  if (shouldUpdateMode) updateMode("备用操作", "未检测");
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
    gestureAnchorY = null;
    fistStartedAt = null;
    gestureText.textContent = "未检测";
    rafId = requestAnimationFrame(readHands);
    return;
  }

  const palm = result.landmarks[0][9];
  const x = 1 - palm.x;
  const y = palm.y;
  drawHand(result.landmarks[0]);

  if (isFist(result.landmarks[0])) {
    fistStartedAt ??= now;
    lastGestureX = x;
    lastGestureY = y;
    gestureAnchorY = y;
    if (now - fistStartedAt < resetHoldMs || now - lastResetAt <= resetCooldown) {
      gestureText.textContent = "鎻℃嫵淇濇寔";
      rafId = requestAnimationFrame(readHands);
      return;
    }
    resetReading();
    lastResetAt = now;
    fistStartedAt = null;
    lastGestureX = x;
    lastGestureY = y;
    gestureText.textContent = "握拳重抽";
    rafId = requestAnimationFrame(readHands);
    return;
  }
  fistStartedAt = null;

  if (lastGestureX !== null) {
    const dx = x - lastGestureX;
    const dyFromAnchor = y - (gestureAnchorY ?? y);
    const canSelect = now - lastSelectAt > selectCooldown;
    const steps = Math.trunc(dx / gestureStep);

    if (steps !== 0) {
      moveDuringDrag(steps);
      lastGestureX += steps * gestureStep;
      gestureAnchorY = y;
      gestureText.textContent = steps > 0 ? "向右滑动" : "向左滑动";
      renderDeck();
    } else if (dyFromAnchor < -selectGestureStep && canSelect) {
      selectActive();
      lastSelectAt = now;
      gestureAnchorY = y;
      gestureText.textContent = "向上确认";
    } else {
      gestureText.textContent = "追踪中";
    }
  }

  if (lastGestureX === null) lastGestureX = x;
  if (gestureAnchorY === null) gestureAnchorY = y;
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

instruction.textContent = "请选择牌阵，祭坛会为你展开牌组。";
renderDeck();
