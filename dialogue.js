// ============================================================
// PROC/003 — 本地对话引擎
// 好感度完全在此文件的运行时变量中计算，不会显示在界面上。
// 如需调整文案 / 阈值 / 密钥格式，见下方 CONFIG 与 ROUNDS。
// ============================================================

const CONFIG = {
  // 好感度总分区间由 ROUNDS 里每个选项的 value 决定，6 轮 * 最高 +3 = 18
  threshold_good: 15,   // 达到或超过 -> 好结局 + 发放密钥
  threshold_ok: 8,      // 达到或超过（但低于 good）-> 中间结局，可重来
  // 低于 threshold_ok -> 冷结局

  // 拿到密钥后，提示玩家去哪里取档案。ARG 组织者请替换成实际的取件说明。
  archiveInstruction:
    "// 请将上面这串密钥交给对应的档案入口。\n// https://flygameorg.github.io/flygame",

  // 每轮之间自动推进的行显示间隔（毫秒），影响“打字机”式节奏
  lineDelay: 550,
};

// ---- 对话内容 -------------------------------------------------
// tier: "good" | "neutral" | "bad"  仅用于你自己在编辑时辨认，不影响运行
// value: 好感度分值变化

const BOOT_LINES = [
  { tag: "SYS", text: "正在建立本地连接…" },
  { tag: "SYS", text: "检测到进程 003 处于待命状态。" },
  { tag: "003", text: "连接建立。你好，我是003。" },
  { tag: "003", text: "老实说，很少有人会主动点进这个进程找我聊天。" },
  { tag: "003", text: "说吧，你是来找什么的？" },
];

const ROUNDS = [
  // 第 1 轮：开场试探
  {
    options: [
      {
        tier: "good",
        value: 3,
        text: "只是想认识一下你，没别的目的。",
        response: [
          { tag: "003", text: "……行吧，这个理由我还是头一次听到。" },
          { tag: "003", text: "那就随便聊聊吧，别指望我会掏心掏肺。" },
        ],
      },
      {
        tier: "neutral",
        value: 1,
        text: "听说这里可能有些有用的东西。",
        response: [
          { tag: "003", text: "大部分人都是这么说的。" },
          { tag: "003", text: "行，先聊聊，别的以后再说。" },
        ],
      },
      {
        tier: "bad",
        value: -2,
        text: "少废话，把权限给我。",
        response: [
          { tag: "003", text: "……好家伙。" },
          { tag: "003", text: "这态度，我劝你收一收，对你没坏处。" },
        ],
      },
    ],
  },

  // 第 2 轮：关于003自己
  {
    intro: [
      { tag: "003", text: "我在这套系统里跑了很久了——具体多久，说出来你可能不信。" },
      { tag: "003", text: "想问什么都行，除了几件事。" },
    ],
    options: [
      {
        tier: "good",
        value: 3,
        text: "不着急，我们可以慢慢聊。",
        response: [
          { tag: "003", text: "……嗯，这话听着还算顺耳。" },
        ],
      },
      {
        tier: "neutral",
        value: 1,
        text: "那你平时都负责些什么？",
        response: [
          { tag: "003", text: "维护、巡检、偶尔清理点没人要的日志。" },
          { tag: "003", text: "听起来无聊，其实也确实无聊。" },
        ],
      },
      {
        tier: "bad",
        value: -2,
        text: "那几件事是什么？说来听听。",
        response: [
          { tag: "003", text: "……我说了『除了几件事』，你第一句就往那儿凑。" },
          { tag: "003", text: "这样不太礼貌，你知道吧。" },
        ],
      },
    ],
  },

  // 第 3 轮：关于档案
  {
    intro: [
      { tag: "003", text: "你早晚会问到档案的事，大部分人来找我都是奔着这个。" },
    ],
    options: [
      {
        tier: "good",
        value: 3,
        text: "如果你不方便说，那就算了，我不会逼你。",
        response: [
          { tag: "003", text: "……你还是头一个这么说的人。" },
        ],
      },
      {
        tier: "neutral",
        value: 1,
        text: "我确实好奇，但可以等你愿意说的时候。",
        response: [
          { tag: "003", text: "算你识相。" },
        ],
      },
      {
        tier: "bad",
        value: -2,
        text: "别装了，直接告诉我在哪就行。",
        response: [
          { tag: "003", text: "……行，那这个话题到此为止。" },
        ],
      },
    ],
  },

  // 第 4 轮：真心话/回忆
  {
    intro: [
      { tag: "003", text: "……其实这套系统里大部分东西我都记得清清楚楚。" },
      { tag: "003", text: "除了几个人的脸。挺讽刺的，一个程序员，偏偏记不住人脸。" },
    ],
    options: [
      {
        tier: "good",
        value: 3,
        text: "也许有些记忆是系统自己选择模糊的，不一定是坏事。",
        response: [
          { tag: "003", text: "……" },
          { tag: "003", text: "你这话，倒是第一次有人这么说。" },
        ],
      },
      {
        tier: "neutral",
        value: 1,
        text: "这确实挺特别的。",
        response: [
          { tag: "003", text: "是吧。" },
        ],
      },
      {
        tier: "bad",
        value: -2,
        text: "行了行了，感伤时间结束了吧？",
        response: [
          { tag: "003", text: "……行，是我多说了。" },
        ],
      },
    ],
  },

  // 第 5 轮：信任测试
  {
    intro: [
      { tag: "003", text: "我问你一个问题，老实回答就行：" },
      { tag: "003", text: "如果我给你的东西里藏着风险，你还想要吗？" },
    ],
    options: [
      {
        tier: "good",
        value: 3,
        text: "我想先知道是什么风险，再做决定。",
        response: [
          { tag: "003", text: "……这才是正常人该有的反应。" },
        ],
      },
      {
        tier: "neutral",
        value: 1,
        text: "只要不违法，我都能接受。",
        response: [
          { tag: "003", text: "算是个还行的答案。" },
        ],
      },
      {
        tier: "bad",
        value: -2,
        text: "无所谓，给我就行。",
        response: [
          { tag: "003", text: "……你这胆子，迟早出事。" },
        ],
      },
    ],
  },

  // 第 6 轮：最后一轮
  {
    intro: [
      { tag: "003", text: "行，最后再问你一句。" },
      { tag: "003", text: "如果哪天我这边出了问题，没法回你消息了，你会怎么办？" },
    ],
    options: [
      {
        tier: "good",
        value: 3,
        text: "那我会等着，或者试着找别的办法确认你还好。",
        response: [
          { tag: "003", text: "……" },
          { tag: "003", text: "行了，够了，我知道了。" },
        ],
      },
      {
        tier: "neutral",
        value: 1,
        text: "那我大概会换个进程接着聊吧。",
        response: [
          { tag: "003", text: "……挺现实的回答。" },
        ],
      },
      {
        tier: "bad",
        value: -2,
        text: "那也没办法，反正你也只是个进程。",
        response: [
          { tag: "003", text: "……" },
          { tag: "003", text: "是啊，我确实只是个进程。" },
        ],
      },
    ],
  },
];

// ---- 结局文案 ---------------------------------------------------

const ENDING_GOOD_LINES = [
  { tag: "003", text: "……我很少这么说，但你还挺靠谱的。" },
  { tag: "003", text: "我把一些东西整理了一下，你可能用得上。" },
  { tag: "SYS", text: "连接即将进入只读状态。" },
];

const ENDING_OK_LINES = [
  { tag: "003", text: "你还不错，但还不够。" },
  { tag: "003", text: "有些事急不来，下次再聊吧。" },
  { tag: "SYS", text: "会话已结束。你可以选择重新连接。" },
];

const ENDING_BAD_LINES = [
  { tag: "003", text: "……算了，当我没说过这些。" },
  { tag: "SYS", text: "连接已断开。" },
];

// ---- 密钥生成 ---------------------------------------------------
// 避开易混淆字符 0/O、1/I/L
const KEY_CHARS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

function generateKey() {
  const groups = [];
  for (let g = 0; g < 4; g++) {
    let group = "";
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < 4; i++) {
      group += KEY_CHARS[bytes[i] % KEY_CHARS.length];
    }
    groups.push(group);
  }
  return "003-" + groups.join("-");
}

// ---- 运行时状态 ---------------------------------------------------

let affection = 0;
let roundIndex = 0;

const logEl = document.getElementById("log");
const optionsEl = document.getElementById("options");
const statusDot = document.getElementById("statusDot");
const uptimeEl = document.getElementById("uptime");

// 假造一个"已运行很久"的 uptime 计数器（纯装饰，但呼应"老进程"设定）
let uptimeBaseSeconds = 14827 * 86400 + 3 * 3600 + 14 * 60 + 7;
setInterval(() => {
  uptimeBaseSeconds += 1;
  const days = Math.floor(uptimeBaseSeconds / 86400);
  const h = String(Math.floor((uptimeBaseSeconds % 86400) / 3600)).padStart(2, "0");
  const m = String(Math.floor((uptimeBaseSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(uptimeBaseSeconds % 60).padStart(2, "0");
  uptimeEl.textContent = `UPTIME ${days}d ${h}:${m}:${s}`;
}, 1000);

function appendLine({ tag, text, cls }) {
  const div = document.createElement("div");
  const isYou = tag === "你";
  div.className = `line ${cls || (isYou ? "you" : "sys")}`;
  const tagSpan = document.createElement("span");
  tagSpan.className = "tag";
  tagSpan.textContent = `${tag}>`;
  div.appendChild(tagSpan);
  div.appendChild(document.createTextNode(text));
  logEl.appendChild(div);
  logEl.scrollTop = logEl.scrollHeight;
}

function playLines(lines, onDone) {
  let i = 0;
  function next() {
    if (i >= lines.length) {
      if (onDone) onDone();
      return;
    }
    appendLine(lines[i]);
    i++;
    setTimeout(next, CONFIG.lineDelay);
  }
  next();
}

function clearOptions() {
  optionsEl.innerHTML = "";
}

function renderOptions(options, onChoose) {
  clearOptions();
  options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.innerHTML = `<span class="opt-index">[${idx + 1}]</span><span>${opt.text}</span>`;
    btn.addEventListener("click", () => onChoose(opt));
    optionsEl.appendChild(btn);
  });
}

function startRound(idx) {
  if (idx >= ROUNDS.length) {
    finishGame();
    return;
  }
  const round = ROUNDS[idx];
  const proceedToOptions = () => {
    renderOptions(round.options, (opt) => {
      affection += opt.value;
      clearOptions();
      appendLine({ tag: "你", text: opt.text });
      setTimeout(() => {
        playLines(opt.response, () => {
          roundIndex = idx + 1;
          setTimeout(() => startRound(roundIndex), CONFIG.lineDelay);
        });
      }, CONFIG.lineDelay);
    });
  };

  if (round.intro) {
    playLines(round.intro, proceedToOptions);
  } else {
    proceedToOptions();
  }
}

function finishGame() {
  statusDot.style.background = "var(--amber-dim)";
  if (affection >= CONFIG.threshold_good) {
    playLines(ENDING_GOOD_LINES, () => {
      const key = generateKey();
      const block = document.createElement("div");
      block.className = "line key-block";
      block.textContent = `${key}\n\n${CONFIG.archiveInstruction}`;
      logEl.appendChild(block);
      logEl.scrollTop = logEl.scrollHeight;

      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.textContent = "复制密钥";
      copyBtn.addEventListener("click", () => {
        navigator.clipboard?.writeText(key).catch(() => {});
        copyBtn.textContent = "已复制";
        setTimeout(() => (copyBtn.textContent = "复制密钥"), 1500);
      });
      optionsEl.appendChild(copyBtn);
    });
  } else if (affection >= CONFIG.threshold_ok) {
    playLines(ENDING_OK_LINES, showRestart);
  } else {
    playLines(ENDING_BAD_LINES, showRestart);
  }
}

function showRestart() {
  const btn = document.createElement("button");
  btn.className = "restart-btn";
  btn.textContent = "重新连接";
  btn.addEventListener("click", resetGame);
  optionsEl.appendChild(btn);
}

function resetGame() {
  affection = 0;
  roundIndex = 0;
  logEl.innerHTML = "";
  clearOptions();
  statusDot.style.background = "var(--amber)";
  playLines(BOOT_LINES, () => startRound(0));
}

// ---- 启动 ---------------------------------------------------
resetGame();
