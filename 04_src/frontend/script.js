const iseData = {
  name: "伊勢志摩",
  videoCount: "1,284",
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
  { market: "米国", language: "英語", reason: "現在のYouTube検索語と一致する重点市場" }
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
    target: "米国",
    theme: "自然",
    priority: "中",
    status: "案"
  },
  {
    title: "海女文化を体験型コンテンツとして発信する企画",
    text: "海女文化は伊勢志摩ならではの強みである。人物、食、地域文化を合わせて紹介することで、観光地としての独自性を出しやすい。",
    target: "米国",
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
const keywordList = document.querySelector("#keywordList");
const keywordDetailList = document.querySelector("#keywordDetailList");
const themeBars = document.querySelector("#themeBars");
const marketList = document.querySelector("#marketList");
const compareTable = document.querySelector("#compareTable");
const ideaCards = document.querySelector("#ideaCards");
const nextIdea = document.querySelector("#nextIdea");
const exportIdeas = document.querySelector("#exportIdeas");
const keywordInsightForm = document.querySelector("#keywordInsightForm");
const keywordInsightCards = document.querySelector("#keywordInsightCards");
const keywordInsightStatus = document.querySelector("#keywordInsightStatus");
const recommendTitle = document.querySelector("#recommendTitle");
const recommendText = document.querySelector("#recommendText");
const recommendSource = document.querySelector("#recommendSource");
const sideNote = document.querySelector(".side-note");
const collectActions = document.querySelector("#collectActions");
const collectArea = document.querySelector("#collectArea");
const collectYoutubeData = document.querySelector("#collectYoutubeData");
const collectStatus = document.querySelector("#collectStatus");

function setPage(pageName) {
  const text = pageText[pageName];
  pageEyebrow.textContent = text[0];
  pageTitle.textContent = text[1];
  if (collectActions) {
    collectActions.hidden = pageName !== "overview";
  }
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
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function setKeywordInsightStatus(message, state = "") {
  if (!keywordInsightStatus) return;

  keywordInsightStatus.textContent = message;
  keywordInsightStatus.classList.toggle("is-error", state === "error");
  keywordInsightStatus.classList.toggle("is-success", state === "success");
}

function renderKeywordInsightCards(insights) {
  if (!keywordInsightCards) return;

  if (!insights.length) {
    keywordInsightCards.innerHTML = `
      <div class="insight-empty">
        保存済みの読み取りメモはまだありません。
      </div>
    `;
    return;
  }

  keywordInsightCards.innerHTML = insights.map((insight) => `
    <div class="insight-card">
      <strong>${escapeHtml(insight.title)}</strong>
      <p>${escapeHtml(insight.detail)}</p>
      ${insight.source ? `<span class="insight-source">${escapeHtml(insight.source)}</span>` : ""}
    </div>
  `).join("");
}

async function loadKeywordInsights() {
  if (!keywordInsightCards) return;

  try {
    const response = await fetch("http://127.0.0.1:3001/api/keyword-insights");
    if (!response.ok) throw new Error("読み取りメモを読み込めませんでした。");

    const data = await response.json();
    renderKeywordInsightCards(data.insights || []);
    setKeywordInsightStatus("保存済みメモを表示中", "success");
  } catch (error) {
    renderKeywordInsightCards([]);
    setKeywordInsightStatus("バックエンド起動時に保存・表示できます。", "error");
  }
}

async function saveKeywordInsight(event) {
  event.preventDefault();
  if (!keywordInsightForm) return;

  const formData = new FormData(keywordInsightForm);
  const payload = {
    title: formData.get("title"),
    detail: formData.get("detail"),
    source: formData.get("source")
  };

  setKeywordInsightStatus("保存中です。");

  try {
    const response = await fetch("http://127.0.0.1:3001/api/keyword-insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "読み取りメモを保存できませんでした。");
    }

    keywordInsightForm.reset();
    renderKeywordInsightCards(data.insights || []);
    setKeywordInsightStatus("YAMLファイルに保存しました。", "success");
  } catch (error) {
    setKeywordInsightStatus(error.message || "読み取りメモを保存できませんでした。", "error");
  }
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
    ["保存済み動画", "43本", "35本"],
    ["合計再生数", "43,316,241回", "5,791,524回"],
    ["合計いいね数", "1,307,222件", "109,271件"],
    ["合計コメント数", "20,039件", "6,248件"],
    ["平均エンゲージメント率", "3.98%", "2.63%"],
    ["検索語数", "12語", "12語"],
    ["再生数上位", "Japan's Ama Divers...", "Miyajima Island..."]
  ];

  compareTable.innerHTML = rows.map((row, index) => `
    <div class="compare-row ${index === 0 ? "header" : ""}">
      <span>${row[0]}</span>
      <strong>${row[1]}</strong>
      <strong>${row[2]}</strong>
    </div>
  `).join("");
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("ja-JP");
}

function buildKeywordInsights(videos) {
  const keywordMap = new Map();

  videos.forEach((video) => {
    (video.tags || []).forEach((tag) => {
      const normalizedTag = String(tag || "").trim();
      if (!normalizedTag || normalizedTag.length > 28) return;

      const current = keywordMap.get(normalizedTag) || {
        label: normalizedTag,
        count: 0,
        viewCount: 0,
        sampleTitle: video.title
      };
      current.count += 1;
      current.viewCount += Number(video.viewCount || 0);
      keywordMap.set(normalizedTag, current);
    });
  });

  return [...keywordMap.values()]
    .sort((a, b) => b.count - a.count || b.viewCount - a.viewCount)
    .slice(0, 4)
    .map((item) => ({
      label: item.label,
      sub: `関連動画 ${item.count}本`,
      score: `${formatNumber(item.viewCount)}再生`,
      hint: `代表動画: ${item.sampleTitle}`
    }));
}

function renderKeywordInsightsFromVideos(videos) {
  const insights = buildKeywordInsights(videos);
  if (insights.length === 0) return;

  keywordList.innerHTML = insights.map((item) => `
    <div class="keyword-item">
      <div>
        <strong>${item.label}</strong>
        <span>${item.sub}</span>
      </div>
      <div class="score-pill">${item.score}</div>
    </div>
  `).join("");

  keywordDetailList.innerHTML = insights.map((item) => `
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

function renderCompareFromSummaries(iseSummary, miyajimaSummary) {
  const iseRate = iseSummary.avgEngagementRate?.toFixed(1) ?? "-";
  const miyajimaRate = miyajimaSummary.avgEngagementRate?.toFixed(1) ?? "-";

  const rows = [
    ["項目", "伊勢志摩", "宮島"],
    ["保存済み動画", `${formatNumber(iseSummary.videoCount)}本`, `${formatNumber(miyajimaSummary.videoCount)}本`],
    ["合計再生数", `${formatNumber(iseSummary.totalViewCount)}回`, `${formatNumber(miyajimaSummary.totalViewCount)}回`],
    ["合計いいね数", `${formatNumber(iseSummary.totalLikeCount)}件`, `${formatNumber(miyajimaSummary.totalLikeCount)}件`],
    ["合計コメント数", `${formatNumber(iseSummary.totalCommentCount)}件`, `${formatNumber(miyajimaSummary.totalCommentCount)}件`],
    ["平均エンゲージメント率", `${iseRate}%`, `${miyajimaRate}%`],
    ["検索語数", `${formatNumber(iseSummary.keywords?.length)}語`, `${formatNumber(miyajimaSummary.keywords?.length)}語`],
    ["再生数上位", iseSummary.topVideos?.[0]?.title || "-", miyajimaSummary.topVideos?.[0]?.title || "-"]
  ];

  compareTable.innerHTML = rows.map((row, index) => `
    <div class="compare-row ${index === 0 ? "header" : ""}">
      <span>${row[0]}</span>
      <strong>${row[1]}</strong>
      <strong>${row[2]}</strong>
    </div>
  `).join("");
}

function buildThemeBreakdown(videos) {
  const themes = [
    { label: "文化・神社", color: "#c64732", keywords: ["shrine", "temple", "culture", "history", "traditional", "heritage", "torii", "spiritual", "jinja"] },
    { label: "自然・景観", color: "#3578a8", keywords: ["nature", "sea", "ocean", "bay", "landscape", "national park", "scenery", "beach", "island"] },
    { label: "食・グルメ", color: "#2f6b54", keywords: ["food", "restaurant", "seafood", "cuisine", "eating", "oyster", "delicious", "ramen", "sushi"] },
    { label: "旅行・案内", color: "#b88a3a", keywords: ["itinerary", "ferry", "transportation", "day trip", "travel guide", "vlog", "access"] }
  ];

  const total = videos.length || 1;

  return themes.map((theme) => {
    const matched = videos.filter((video) => {
      const tags = (video.tags || []).map((t) => String(t).toLowerCase());
      return theme.keywords.some((kw) => tags.some((tag) => tag.includes(kw)));
    }).length;

    return {
      label: theme.label,
      value: Math.round((matched / total) * 100),
      color: theme.color
    };
  });
}

function renderThemeBarsFromVideos(videos) {
  const themes = buildThemeBreakdown(videos);
  if (themes.every((t) => t.value === 0)) return;

  themeBars.innerHTML = themes.map((item) => `
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

function renderTopVideosList(videos) {
  const panel = document.getElementById("topVideosPanel");
  const list = document.getElementById("topVideosList");
  if (!panel || !list) return;

  const top = [...videos]
    .sort((a, b) => Number(b.viewCount || 0) - Number(a.viewCount || 0))
    .slice(0, 5);

  if (top.length === 0) return;

  list.innerHTML = top.map((video, index) => `
    <div class="top-video-item">
      <span class="top-video-rank">${index + 1}</span>
      <div class="top-video-info">
        <strong class="top-video-title">${video.title}</strong>
        <div class="top-video-stats">
          <span>${formatNumber(video.viewCount)} 再生</span>
          <span>${formatNumber(video.likeCount)} いいね</span>
          <span>${formatNumber(video.commentCount)} コメント</span>
        </div>
      </div>
    </div>
  `).join("");

  panel.style.display = "";
}

function resetYoutubePanels() {
  const topVideosPanel = document.getElementById("topVideosPanel");
  const topVideosList = document.getElementById("topVideosList");
  const engagementPanel = document.getElementById("engagementPanel");
  const engagementVideosList = document.getElementById("engagementVideosList");
  const engagementAvg = document.getElementById("engagementAvg");

  if (topVideosPanel) topVideosPanel.style.display = "none";
  if (topVideosList) topVideosList.innerHTML = "";
  if (engagementPanel) engagementPanel.style.display = "none";
  if (engagementVideosList) engagementVideosList.innerHTML = "";
  if (engagementAvg) engagementAvg.textContent = "";
}

function renderEngagementPanel(engagement) {
  const panel = document.getElementById("engagementPanel");
  const list = document.getElementById("engagementVideosList");
  const avgEl = document.getElementById("engagementAvg");
  if (!panel || !list) return;

  if (avgEl) {
    avgEl.innerHTML = `平均エンゲージメント率 <strong>${engagement.avgEngagementRate}</strong>%`;
  }

  const top = engagement.topByEngagement;
  if (top.length === 0) return;

  list.innerHTML = top.map((video, index) => `
    <div class="top-video-item">
      <span class="top-video-rank">${index + 1}</span>
      <div class="top-video-info">
        <strong class="top-video-title">${video.title}</strong>
        <div class="top-video-stats">
          <span>${formatNumber(video.viewCount)} 再生</span>
          <span>${formatNumber(video.likeCount)} いいね</span>
          <span>${formatNumber(video.commentCount)} コメント</span>
          <span class="top-video-rate">エンゲージメント ${video.engagementRate}%</span>
        </div>
      </div>
    </div>
  `).join("");

  panel.style.display = "";
}

function renderIdea() {
  const idea = ideas[ideaIndex];
  recommendTitle.textContent = idea.title;
  recommendText.textContent = idea.text || idea.summary;
  if (recommendSource) {
    recommendSource.textContent = buildIdeaSourceText(idea);
  }
}

function renderIdeaCards() {
  ideaCards.innerHTML = ideas.map((idea) => `
    <article class="idea-card">
      <strong>${idea.title}</strong>
      <p>${idea.text || idea.summary}</p>
      <p class="idea-meta">対象: ${idea.target} / テーマ: ${idea.theme} / 優先度: ${idea.priority} / 状態: ${idea.status}</p>
      <p class="idea-source">${buildIdeaSourceText(idea)}</p>
    </article>
  `).join("");
}

function buildIdeaSourceText(idea) {
  const youtubeKeywords = idea.youtubeKeywords || [];
  if (youtubeKeywords.length > 0) {
    return `YouTube実データ: ${youtubeKeywords.join(" / ")}`;
  }

  const sourceKeywords = idea.sourceKeywords || [];
  if (sourceKeywords.length > 0) {
    return `参照キーワード: ${sourceKeywords.join(" / ")}`;
  }

  return "";
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

function findMatchingTags(videoTags, candidates) {
  const lowerTagMap = new Map(videoTags.map((tag) => [tag.toLowerCase(), tag]));

  return candidates
    .map((candidate) => lowerTagMap.get(candidate.toLowerCase()))
    .filter(Boolean)
    .slice(0, 3);
}

function applyYoutubeKeywordsToIdeas(videos) {
  const videoTags = [...new Set(videos.flatMap((video) => video.tags || []).map((tag) => String(tag).trim()).filter(Boolean))];
  if (videoTags.length === 0) return;

  ideas = ideas.map((idea) => {
    const title = idea.title || "";
    let candidates = ["japan", "travel", "Ise"];

    if (title.includes("伊勢神宮")) {
      candidates = ["ise jingu", "japanese culture", "Ise"];
    } else if (title.includes("英虞湾")) {
      candidates = ["Ise Shima", "travel", "mie prefecture"];
    } else if (title.includes("海女")) {
      candidates = ["AMA divers", "japanese food", "Ise Shima"];
    }

    return {
      ...idea,
      youtubeKeywords: findMatchingTags(videoTags, candidates)
    };
  });

  renderIdea();
  renderIdeaCards();
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

async function loadYoutubeDataFromApi() {
  try {
    const [iseSummaryResponse, miyajimaSummaryResponse, iseSavedResponse, iseEngagementResponse] = await Promise.all([
      fetch("http://127.0.0.1:3001/api/youtube/videos/summary?area=ise"),
      fetch("http://127.0.0.1:3001/api/youtube/videos/summary?area=miyajima"),
      fetch("http://127.0.0.1:3001/api/youtube/videos/saved?area=ise"),
      fetch("http://127.0.0.1:3001/api/youtube/videos/engagement?area=ise")
    ]);

    if (!iseSummaryResponse.ok) return;

    const iseSummary = await iseSummaryResponse.json();
    videoCount.textContent = formatNumber(iseSummary.videoCount);
    if (sideNote) {
      sideNote.innerHTML = '<span class="status-dot"></span>YouTube保存データ反映中';
    }

    if (iseSavedResponse.ok) {
      const iseSaved = await iseSavedResponse.json();
      const videos = iseSaved.videos || [];
      renderKeywordInsightsFromVideos(videos);
      renderThemeBarsFromVideos(videos);
      renderTopVideosList(videos);
      applyYoutubeKeywordsToIdeas(videos);
    }

    if (iseEngagementResponse.ok) {
      const engagement = await iseEngagementResponse.json();
      renderEngagementPanel(engagement);
    }

    if (miyajimaSummaryResponse.ok) {
      const miyajimaSummary = await miyajimaSummaryResponse.json();
      renderCompareFromSummaries(iseSummary, miyajimaSummary);
    }
  } catch (error) {
    console.info("保存済みYouTubeデータを読み込めないため、初期表示データで表示します。");
  }
}

function setCollectStatus(message, state = "") {
  if (!collectStatus) return;

  collectStatus.textContent = message;
  collectStatus.classList.toggle("is-error", state === "error");
  collectStatus.classList.toggle("is-success", state === "success");
}

function buildCollectUrl(area) {
  const url = new URL("http://127.0.0.1:3001/api/youtube/videos");
  url.searchParams.set("area", area);
  url.searchParams.set("allTerms", "true");
  url.searchParams.set("maxResults", "5");
  url.searchParams.set("save", "true");

  return url;
}

async function collectYoutubeDataFromApi() {
  const area = collectArea?.value || "ise";
  const areaLabel = area === "miyajima" ? "宮島" : "伊勢志摩";

  collectYoutubeData.disabled = true;
  setCollectStatus(`${areaLabel}のデータを取得中です。画面を閉じずに待ってください。`);

  try {
    const response = await fetch(buildCollectUrl(area));
    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.message || "YouTubeデータを取得できませんでした。");
    }

    resetYoutubePanels();
    await loadYoutubeDataFromApi();
    setCollectStatus(`${areaLabel}の動画データを${formatNumber(data.returnedResults)}本保存しました。`, "success");
  } catch (error) {
    setCollectStatus(error.message || "YouTubeデータを取得できませんでした。", "error");
  } finally {
    collectYoutubeData.disabled = false;
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

if (collectYoutubeData) {
  collectYoutubeData.addEventListener("click", collectYoutubeDataFromApi);
}

if (keywordInsightForm) {
  keywordInsightForm.addEventListener("submit", saveKeywordInsight);
}

renderDashboard(iseData);
renderMarkets();
renderKeywordDetails();
renderCompare();
renderIdea();
renderIdeaCards();

async function initializeData() {
  await loadIdeas();
  await loadKeywordInsights();
  await loadYoutubeDataFromApi();
}

initializeData();
