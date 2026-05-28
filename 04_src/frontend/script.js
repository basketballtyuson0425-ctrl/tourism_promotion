const iseData = {
  name: "伊勢志摩",
  videoCount: "1,284",
  targetMarketCount: 5,
  positiveRate: 71,
  growthTopic: "海女体験",
  keywords: [
    { label: "伊勢神宮", sub: "日本文化・早朝参拝", score: "+24%", hint: "文化体験の入口として見せやすい" },
    { label: "英虞湾", sub: "クルーズ・夕景", score: "+42%", hint: "短い動画でも景色の魅力が伝わりやすい" },
    { label: "伊勢海老", sub: "食体験・海鮮", score: "+18%", hint: "旅行目的になりやすい食のテーマ" },
    { label: "海女体験", sub: "地域文化・体験型観光", score: "+61%", hint: "伊勢志摩らしさを強く出せる体験" }
  ],
  themes: [
    { label: "文化", value: 78, color: "#c64732" },
    { label: "自然", value: 71, color: "#3578a8" },
    { label: "食", value: 76, color: "#2f6b54" },
    { label: "交通・移動", value: 42, color: "#b88a3a" }
  ]
};

const miyajimaData = {
  name: "広島県（宮島）",
  videoCount: "2,460",
  targetMarketCount: 5,
  positiveRate: 79,
  growthTopic: "厳島神社",
  keywords: [
    { label: "厳島神社", sub: "神社・世界遺産", score: "+48%" },
    { label: "海上鳥居", sub: "海景観・写真映え", score: "+44%" },
    { label: "牡蠣", sub: "海鮮・食文化", score: "+31%" },
    { label: "フェリー移動", sub: "アクセス・旅程", score: "+22%" }
  ],
  themes: [
    { label: "神社・文化", value: 86, color: "#c64732" },
    { label: "海景観", value: 82, color: "#3578a8" },
    { label: "食", value: 74, color: "#2f6b54" },
    { label: "交通・移動", value: 58, color: "#b88a3a" }
  ]
};

const targetMarkets = [
  { market: "中国", language: "中国語（簡体字）", reason: "客数・消費額ともに重要市場" },
  { market: "台湾", language: "中国語（繁体字）", reason: "客数・消費額の上位市場" },
  { market: "韓国", language: "韓国語", reason: "訪日客数が多い近隣市場" },
  { market: "米国", language: "英語", reason: "消費額が大きい重点市場" },
  { market: "香港", language: "中国語（繁体字）・広東語表現", reason: "客数・消費額の上位市場" }
];

const fallbackIdeas = [
  {
    title: "早朝の伊勢神宮と食体験を組み合わせた動画企画",
    text: "文化体験と食の組み合わせは、海外旅行者に伊勢志摩らしさを伝えやすい。早朝参拝、周辺散策、海産物の食体験を1本の旅行動画として見せる。",
    target: "米国",
    theme: "文化",
    priority: "高",
    status: "案"
  },
  {
    title: "英虞湾クルーズを短い動画で見せる企画",
    text: "自然景観は言葉が少なくても伝わりやすい。夕景、船上体験、宿泊先までの流れを短い動画にまとめ、初めて見る人にも魅力が伝わる構成にする。",
    target: "台湾",
    theme: "自然",
    priority: "中",
    status: "案"
  },
  {
    title: "海女文化を体験型コンテンツとして発信する企画",
    text: "海女文化は伊勢志摩ならではの強みである。人物、食、地域文化を合わせて紹介することで、観光地としての独自性を出しやすい。",
    target: "香港",
    theme: "食",
    priority: "中",
    status: "案"
  }
];

let ideas = fallbackIdeas;

const pageText = {
  overview: ["YouTube旅行投稿の分析", "伊勢志摩の海外向け発信を考える"],
  keywords: ["キーワード分析", "海外旅行者が反応する言葉を整理する"],
  compare: ["地域比較", "宮島と比べて発信の伸びしろを見る"],
  ideas: ["施策提案", "分析結果から次の発信案を考える"]
};

let ideaIndex = 0;

const pageEyebrow = document.querySelector("#pageEyebrow");
const pageTitle = document.querySelector("#pageTitle");
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const videoCount = document.querySelector("#videoCount");
const targetMarketCount = document.querySelector("#targetMarketCount");
const positiveRate = document.querySelector("#positiveRate");
const growthTopic = document.querySelector("#growthTopic");
const keywordList = document.querySelector("#keywordList");
const keywordDetailList = document.querySelector("#keywordDetailList");
const themeBars = document.querySelector("#themeBars");
const marketList = document.querySelector("#marketList");
const languageList = document.querySelector("#languageList");
const compareTable = document.querySelector("#compareTable");
const ideaCards = document.querySelector("#ideaCards");
const nextIdea = document.querySelector("#nextIdea");
const exportIdeas = document.querySelector("#exportIdeas");
const recommendTitle = document.querySelector("#recommendTitle");
const recommendText = document.querySelector("#recommendText");
const sideNote = document.querySelector(".side-note");
const totalViewCount = document.querySelector("#totalViewCount");
const totalLikeCount = document.querySelector("#totalLikeCount");
const totalCommentCount = document.querySelector("#totalCommentCount");
const topVideoTitle = document.querySelector("#topVideoTitle");
const youtubeDataSource = document.querySelector("#youtubeDataSource");

function setPage(pageName) {
  const text = pageText[pageName];
  pageEyebrow.textContent = text[0];
  pageTitle.textContent = text[1];
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === pageName);
  });

  pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.pagePanel === pageName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDashboard(data) {
  videoCount.textContent = data.videoCount;
  targetMarketCount.textContent = data.targetMarketCount;
  positiveRate.textContent = data.positiveRate;
  growthTopic.textContent = data.growthTopic;

  keywordList.innerHTML = data.keywords.map((item) => `
    <div class="keyword-item">
      <div>
        <strong>${item.label}</strong>
        <span>${item.sub}</span>
      </div>
      <div class="score-pill">${item.score}</div>
    </div>
  `).join("");

  themeBars.innerHTML = data.themes.map((item) => `
    <div class="bar-row">
      <div class="bar-label">
        <span>${item.label}</span>
        <strong>${item.value}%</strong>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${item.value}%; background: ${item.color};"></div>
      </div>
    </div>
  `).join("");
}

function renderMarkets() {
  marketList.innerHTML = targetMarkets.map((item) => `
    <div class="market-card">
      <strong>${item.market}</strong>
      <span>${item.language}</span>
      <span>${item.reason}</span>
    </div>
  `).join("");

  languageList.innerHTML = targetMarkets.map((item) => `
    <div class="language-card">
      <strong>${item.market}</strong>
      <span>${item.language}</span>
    </div>
  `).join("");
}

function renderKeywordDetails() {
  keywordDetailList.innerHTML = iseData.keywords.map((item) => `
    <div class="detail-card">
      <div>
        <strong>${item.label}</strong>
        <p>${item.sub}</p>
        <p>${item.hint}</p>
      </div>
      <div class="detail-meta">${item.score}</div>
    </div>
  `).join("");
}

function renderCompare() {
  const rows = [
    ["項目", "伊勢志摩", "宮島"],
    ["分析対象動画", "1,284本", "2,460本"],
    ["海外向け動画発信数", "486本", "1,380本"],
    ["対象市場", "5市場", "5市場"],
    ["好意的な反応", "71%", "79%"],
    ["強いテーマ", "神社・海景観・食", "神社・海景観・食"],
    ["改善余地", "アクセス情報の見せ方", "混雑分散・滞在時間の拡大"]
  ];

  compareTable.innerHTML = rows.map((row, index) => `
    <div class="compare-row ${index === 0 ? "header" : ""}">
      <span>${row[0]}</span>
      <strong>${row[1]}</strong>
      <strong>${row[2]}</strong>
    </div>
  `).join("");
}

function renderIdea() {
  const idea = ideas[ideaIndex];
  recommendTitle.textContent = idea.title;
  recommendText.textContent = idea.text || idea.summary;
}

function renderIdeaCards() {
  ideaCards.innerHTML = ideas.map((idea) => `
    <article class="idea-card">
      <strong>${idea.title}</strong>
      <p>${idea.text || idea.summary}</p>
      <p class="idea-meta">対象: ${idea.target} / テーマ: ${idea.theme} / 優先度: ${idea.priority} / 状態: ${idea.status}</p>
    </article>
  `).join("");
}

function parseIdeasYaml(yamlText) {
  const parsedIdeas = [];
  let currentIdea = null;
  let currentListKey = null;

  yamlText.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "ideas:") return;

    if (trimmed.startsWith("- id:")) {
      currentIdea = { id: trimmed.replace("- id:", "").trim(), sourceKeywords: [] };
      parsedIdeas.push(currentIdea);
      currentListKey = null;
      return;
    }

    if (!currentIdea) return;

    if (trimmed.endsWith(":")) {
      currentListKey = trimmed.replace(":", "");
      currentIdea[currentListKey] = [];
      return;
    }

    if (trimmed.startsWith("- ") && currentListKey) {
      currentIdea[currentListKey].push(trimmed.replace("- ", "").trim());
      return;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    currentIdea[key] = value;
    currentListKey = null;
  });

  return parsedIdeas.map((idea) => ({
    id: idea.id,
    title: idea.title,
    text: idea.summary,
    target: idea.targetMarket,
    theme: idea.theme,
    priority: idea.priority,
    status: idea.status,
    reason: idea.reason,
    sourceKeywords: idea.sourceKeywords || []
  })).filter((idea) => idea.title && idea.text);
}

function normalizeIdea(idea) {
  return {
    id: idea.id,
    title: idea.title,
    text: idea.text || idea.summary,
    target: idea.target || idea.targetMarket,
    theme: idea.theme,
    priority: idea.priority,
    status: idea.status,
    reason: idea.reason,
    sourceKeywords: idea.sourceKeywords || []
  };
}

function applyLoadedIdeas(loadedIdeas) {
  const normalizedIdeas = loadedIdeas.map(normalizeIdea).filter((idea) => idea.title && idea.text);

  if (normalizedIdeas.length === 0) return false;

  ideas = normalizedIdeas;
  ideaIndex = 0;
  renderIdea();
  renderIdeaCards();
  return true;
}

async function loadIdeasFromApi() {
  try {
    const response = await fetch("http://127.0.0.1:3001/api/ideas");
    if (!response.ok) return false;

    const data = await response.json();
    return applyLoadedIdeas(data.ideas || []);
  } catch (error) {
    console.info("バックエンドから発信案を読み込めないため、ideas.yamlを確認します。");
    return false;
  }
}

async function loadIdeasFromYaml() {
  try {
    const response = await fetch("../data/ideas.yaml");
    if (!response.ok) return false;

    const yamlText = await response.text();
    const loadedIdeas = parseIdeasYaml(yamlText);
    return applyLoadedIdeas(loadedIdeas);
  } catch (error) {
    console.info("ideas.yamlを読み込めないため、画面内の初期データを表示します。");
    return false;
  }
}

async function loadIdeas() {
  const loadedFromApi = await loadIdeasFromApi();
  if (loadedFromApi) return;

  await loadIdeasFromYaml();
}

async function loadYoutubeSummaryFromApi() {
  try {
    const response = await fetch("http://127.0.0.1:3001/api/youtube/videos/summary?area=ise");
    if (!response.ok) return;

    const summary = await response.json();
    videoCount.textContent = summary.videoCount.toLocaleString("ja-JP");
    totalViewCount.textContent = summary.totalViewCount.toLocaleString("ja-JP");
    totalLikeCount.textContent = summary.totalLikeCount.toLocaleString("ja-JP");
    totalCommentCount.textContent = summary.totalCommentCount.toLocaleString("ja-JP");
    const keywordLabel = summary.searchMode === "allTerms" ? `複数検索語 ${summary.keywords.length}件` : summary.keyword;
    youtubeDataSource.textContent = `${summary.label} / ${keywordLabel}`;
    topVideoTitle.textContent = `再生数上位: ${summary.topVideos?.[0]?.title || "データなし"}`;
    if (sideNote) {
      sideNote.innerHTML = '<span class="status-dot"></span>YouTube保存データ反映中';
    }
  } catch (error) {
    console.info("保存済みYouTubeデータを読み込めないため、サンプルデータで表示します。");
  }
}

function downloadIdeasCsv() {
  const headers = ["title", "summary", "targetMarket", "theme", "priority", "status", "reason", "sourceKeywords"];
  const rows = ideas.map((idea) => [
    idea.title,
    idea.text || idea.summary,
    idea.target,
    idea.theme,
    idea.priority,
    idea.status,
    idea.reason || "",
    (idea.sourceKeywords || []).join(" / ")
  ]);

  const csv = [headers, ...rows].map((row) =>
    row.map((value) => `"${String(value ?? "").replaceAll("\"", "\"\"")}"`).join(",")
  ).join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ideas.csv";
  link.click();
  URL.revokeObjectURL(url);
}

navItems.forEach((item) => {
  item.addEventListener("click", () => setPage(item.dataset.page));
});

nextIdea.addEventListener("click", () => {
  ideaIndex = (ideaIndex + 1) % ideas.length;
  renderIdea();
});

exportIdeas.addEventListener("click", downloadIdeasCsv);

renderDashboard(iseData);
renderMarkets();
renderKeywordDetails();
renderCompare();
renderIdea();
renderIdeaCards();
loadIdeas();
loadYoutubeSummaryFromApi();
