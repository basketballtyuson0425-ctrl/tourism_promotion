const iseData = {
  name: "伊勢志摩",
  videoCount: "1,284",
  foreignRate: 38,
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

const nisekoData = {
  name: "ニセコ",
  videoCount: "3,120",
  foreignRate: 82,
  positiveRate: 81,
  growthTopic: "滞在型旅行",
  keywords: [
    { label: "スキーリゾート", sub: "冬季旅行・長期滞在", score: "+56%" },
    { label: "高級宿泊", sub: "欧米向けリゾート", score: "+38%" },
    { label: "自然体験", sub: "雪景色・アクティビティ", score: "+44%" },
    { label: "英語レビュー", sub: "海外旅行者の投稿", score: "+63%" }
  ],
  themes: [
    { label: "自然", value: 86, color: "#3578a8" },
    { label: "宿泊", value: 82, color: "#2f6b54" },
    { label: "海外発信", value: 88, color: "#c64732" },
    { label: "食", value: 64, color: "#b88a3a" }
  ]
};

const ideas = [
  {
    title: "早朝の伊勢神宮と食体験を組み合わせた動画企画",
    text: "文化体験と食の組み合わせは、海外旅行者に伊勢志摩らしさを伝えやすい。早朝参拝、周辺散策、海産物の食体験を1本の旅行動画として見せる。",
    target: "日本文化に関心がある海外旅行者"
  },
  {
    title: "英虞湾クルーズを短い動画で見せる企画",
    text: "自然景観は言葉が少なくても伝わりやすい。夕景、船上体験、宿泊先までの流れを短い動画にまとめ、初めて見る人にも魅力が伝わる構成にする。",
    target: "自然景観やリゾート滞在に関心がある層"
  },
  {
    title: "海女文化を体験型コンテンツとして発信する企画",
    text: "海女文化は伊勢志摩ならではの強みである。人物、食、地域文化を合わせて紹介することで、観光地としての独自性を出しやすい。",
    target: "地域文化や食体験を重視する旅行者"
  }
];

const pageText = {
  overview: ["YouTube旅行投稿の分析", "伊勢志摩の海外向け発信を考える"],
  keywords: ["キーワード分析", "海外旅行者が反応する言葉を整理する"],
  compare: ["地域比較", "ニセコと比べて発信の伸びしろを見る"],
  ideas: ["施策提案", "分析結果から次の発信案を考える"]
};

let showingNiseko = false;
let ideaIndex = 0;

const pageEyebrow = document.querySelector("#pageEyebrow");
const pageTitle = document.querySelector("#pageTitle");
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const videoCount = document.querySelector("#videoCount");
const foreignRate = document.querySelector("#foreignRate");
const positiveRate = document.querySelector("#positiveRate");
const growthTopic = document.querySelector("#growthTopic");
const keywordList = document.querySelector("#keywordList");
const keywordDetailList = document.querySelector("#keywordDetailList");
const themeBars = document.querySelector("#themeBars");
const compareTable = document.querySelector("#compareTable");
const ideaCards = document.querySelector("#ideaCards");
const toggleData = document.querySelector("#toggleData");
const goIdeas = document.querySelector("#goIdeas");
const nextIdea = document.querySelector("#nextIdea");
const recommendTitle = document.querySelector("#recommendTitle");
const recommendText = document.querySelector("#recommendText");

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
  foreignRate.textContent = data.foreignRate;
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
    ["項目", "伊勢志摩", "ニセコ"],
    ["分析対象動画", "1,284本", "3,120本"],
    ["海外視聴比率", "38%", "82%"],
    ["好意的な反応", "71%", "81%"],
    ["強いテーマ", "文化・食", "自然・滞在"],
    ["改善余地", "海外向け発信量", "高単価化の継続"]
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
  recommendText.textContent = idea.text;
}

function renderIdeaCards() {
  ideaCards.innerHTML = ideas.map((idea) => `
    <article class="idea-card">
      <strong>${idea.title}</strong>
      <p>${idea.text}</p>
      <p>対象: ${idea.target}</p>
    </article>
  `).join("");
}

navItems.forEach((item) => {
  item.addEventListener("click", () => setPage(item.dataset.page));
});

toggleData.addEventListener("click", () => {
  showingNiseko = !showingNiseko;
  renderDashboard(showingNiseko ? nisekoData : iseData);
  toggleData.textContent = showingNiseko ? "伊勢志摩に戻す" : "ニセコ比較を表示";
});

goIdeas.addEventListener("click", () => setPage("ideas"));

nextIdea.addEventListener("click", () => {
  ideaIndex = (ideaIndex + 1) % ideas.length;
  renderIdea();
});

renderDashboard(iseData);
renderKeywordDetails();
renderCompare();
renderIdea();
renderIdeaCards();
