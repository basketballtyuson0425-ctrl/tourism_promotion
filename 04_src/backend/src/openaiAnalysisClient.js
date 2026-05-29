const openaiResponsesUrl = "https://api.openai.com/v1/responses";
const defaultAnalysisModel = "gpt-5.4-mini";
const maxVideosPerArea = 12;

function getOpenAiApiKey() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return "";
  }

  return apiKey;
}

function getAnalysisModel() {
  return process.env.OPENAI_ANALYSIS_MODEL?.trim() || defaultAnalysisModel;
}

export function getOpenAiAnalysisStatus() {
  const hasApiKey = Boolean(getOpenAiApiKey());

  return {
    connected: hasApiKey,
    model: getAnalysisModel(),
    message: hasApiKey
      ? "OpenAI APIキーが設定されています。"
      : "OPENAI_API_KEY が未設定のため、OpenAI APIには接続していません。"
  };
}

function toNumber(value) {
  return Number(value || 0);
}

function engagementRate(video) {
  const views = toNumber(video.viewCount);
  const likes = toNumber(video.likeCount);
  const comments = toNumber(video.commentCount);

  return views > 0 ? Math.round(((likes + comments) / views) * 10000) / 100 : 0;
}

function compactText(value, maxLength = 220) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function compactVideo(video) {
  return {
    title: compactText(video.title, 120),
    description: compactText(video.description),
    channelTitle: video.channelTitle,
    publishedAt: video.publishedAt,
    sourceKeyword: video.sourceKeyword,
    viewCount: toNumber(video.viewCount),
    likeCount: toNumber(video.likeCount),
    commentCount: toNumber(video.commentCount),
    engagementRate: engagementRate(video),
    tags: (video.tags || []).slice(0, 12)
  };
}

function buildAreaInput(savedData) {
  const videos = savedData?.videos || [];
  const topByViews = [...videos]
    .sort((a, b) => toNumber(b.viewCount) - toNumber(a.viewCount))
    .slice(0, maxVideosPerArea)
    .map(compactVideo);
  const topByEngagement = [...videos]
    .filter((video) => toNumber(video.viewCount) >= 1000)
    .sort((a, b) => engagementRate(b) - engagementRate(a))
    .slice(0, maxVideosPerArea)
    .map(compactVideo);

  return {
    area: savedData.area,
    label: savedData.label,
    savedAt: savedData.savedAt,
    searchMode: savedData.searchMode,
    keywords: savedData.keywords || [],
    totalResults: toNumber(savedData.totalResults),
    returnedResults: toNumber(savedData.returnedResults || videos.length),
    topByViews,
    topByEngagement
  };
}

function buildPrompt({ primaryData, compareData, focus }) {
  const input = {
    focus: compactText(focus, 240),
    primaryArea: buildAreaInput(primaryData),
    compareArea: compareData ? buildAreaInput(compareData) : null
  };

  return [
    "あなたはインバウンド観光プロモーションの分析担当です。",
    "保存済みYouTubeデータをもとに、自治体・観光担当者が次に取る行動を考えやすい形で分析してください。",
    "推測しすぎず、入力データから読み取れることを優先してください。",
    "issuesは最大3件、ideasは最大3件にしてください。",
    "各項目は短く具体的に書いてください。",
    "必ず次のJSONだけを返してください。Markdownや説明文は付けないでください。",
    JSON.stringify({
      summary: "全体の要約を2から3文で書く",
      issues: [
        {
          title: "課題の見出し",
          detail: "なぜ課題と言えるか",
          evidence: "根拠にした動画傾向や数値"
        }
      ],
      ideas: [
        {
          title: "発信案のタイトル",
          summary: "発信案の内容",
          targetMarket: "米国",
          theme: "文化/自然/食/アクセスなど",
          priority: "高/中/低",
          reason: "この案を出す理由",
          sourceKeywords: ["根拠にした検索語やテーマ"]
        }
      ]
    }),
    "入力データ:",
    JSON.stringify(input)
  ].join("\n");
}

function extractOutputText(responseData) {
  if (responseData.output_text) {
    return responseData.output_text;
  }

  return (responseData.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .filter(Boolean)
    .join("\n");
}

function parseJsonOutput(text) {
  const cleaned = String(text || "")
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}

function normalizeAnalysis(analysis) {
  return {
    summary: String(analysis?.summary || "").trim(),
    issues: Array.isArray(analysis?.issues) ? analysis.issues.slice(0, 3) : [],
    ideas: Array.isArray(analysis?.ideas) ? analysis.ideas.slice(0, 3) : []
  };
}

export async function analyzeYoutubeData({ primaryData, compareData, focus }) {
  const apiKey = getOpenAiApiKey();

  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: "OpenAI API key is not configured",
      message: "OPENAI_API_KEY が未設定のため、OpenAI APIには接続していません。",
      apiStatus: getOpenAiAnalysisStatus()
    };
  }

  const response = await fetch(openaiResponsesUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: getAnalysisModel(),
      input: buildPrompt({ primaryData, compareData, focus }),
      max_output_tokens: 3000
    })
  });
  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data.error?.type || "OpenAI analysis request failed",
      message: data.error?.message || "OpenAI APIから分析結果を取得できませんでした。",
      apiStatus: getOpenAiAnalysisStatus()
    };
  }

  const outputText = extractOutputText(data);

  try {
    return {
      ok: true,
      model: getAnalysisModel(),
      analysis: normalizeAnalysis(parseJsonOutput(outputText)),
      rawText: outputText
    };
  } catch (error) {
    return {
      ok: false,
      status: 502,
      error: "OpenAI analysis parse failed",
      message: "OpenAI APIの返答をJSONとして読み取れませんでした。",
      rawText: outputText,
      apiStatus: getOpenAiAnalysisStatus()
    };
  }
}
