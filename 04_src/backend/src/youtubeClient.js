import { searchTermsByArea } from "./data/searchTerms.js";

const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
const defaultMaxResults = 5;
const maxAllowedResults = 10;

export function getSearchTerms(area) {
  return searchTermsByArea[area] ?? null;
}

function getYoutubeApiKey() {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();

  if (!apiKey || apiKey === "your_youtube_api_key_here") {
    return "";
  }

  return apiKey;
}

export function getYoutubeApiStatus() {
  const hasApiKey = Boolean(getYoutubeApiKey());

  return {
    connected: hasApiKey,
    message: hasApiKey
      ? "YouTube APIキーが設定されています。"
      : "現時点ではYouTube APIキー未設定のため、検索条件のみ返します。"
  };
}

function normalizeMaxResults(maxResults) {
  const parsed = Number(maxResults || defaultMaxResults);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return defaultMaxResults;
  }

  return Math.min(parsed, maxAllowedResults);
}

function selectSearchTerm(areaData, keyword) {
  if (keyword) {
    return areaData.terms.find((term) => term.keyword === keyword) ?? null;
  }

  return areaData.terms[0] ?? null;
}

function toVideoResult(item, keyword) {
  return {
    videoId: item.id?.videoId,
    title: item.snippet?.title,
    description: item.snippet?.description,
    channelId: item.snippet?.channelId,
    channelTitle: item.snippet?.channelTitle,
    publishedAt: item.snippet?.publishedAt,
    thumbnailUrl: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url,
    sourceKeyword: keyword
  };
}

export async function searchYoutubeVideos({ area, keyword, maxResults }) {
  const areaData = getSearchTerms(area);

  if (!areaData) {
    return {
      ok: false,
      status: 400,
      error: "Invalid area",
      message: "area は ise または miyajima を指定してください。"
    };
  }

  const selectedTerm = selectSearchTerm(areaData, keyword);

  if (!selectedTerm) {
    return {
      ok: false,
      status: 400,
      error: "Invalid keyword",
      message: "指定された検索語は、この地域の検索条件に含まれていません。"
    };
  }

  const apiKey = getYoutubeApiKey();

  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: "YouTube API key is not configured",
      message: "YOUTUBE_API_KEY が未設定のため、YouTube APIには接続していません。",
      area: areaData.area,
      label: areaData.label,
      keyword: selectedTerm.keyword,
      apiStatus: getYoutubeApiStatus()
    };
  }

  const requestUrl = new URL(youtubeSearchUrl);
  requestUrl.searchParams.set("part", "snippet");
  requestUrl.searchParams.set("q", selectedTerm.keyword);
  requestUrl.searchParams.set("type", "video");
  requestUrl.searchParams.set("order", "relevance");
  requestUrl.searchParams.set("maxResults", String(normalizeMaxResults(maxResults)));
  requestUrl.searchParams.set("key", apiKey);

  const response = await fetch(requestUrl);
  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data.error?.status || "YouTube API request failed",
      message: data.error?.message || "YouTube APIから動画検索結果を取得できませんでした。",
      area: areaData.area,
      label: areaData.label,
      keyword: selectedTerm.keyword,
      apiStatus: getYoutubeApiStatus()
    };
  }

  return {
    ok: true,
    area: areaData.area,
    label: areaData.label,
    keyword: selectedTerm.keyword,
    totalResults: data.pageInfo?.totalResults ?? 0,
    returnedResults: data.items?.length ?? 0,
    videos: (data.items || []).map((item) => toVideoResult(item, selectedTerm.keyword)),
    apiStatus: getYoutubeApiStatus()
  };
}
