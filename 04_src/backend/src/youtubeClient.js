import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { searchTermsByArea } from "./data/searchTerms.js";

const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
const youtubeVideosUrl = "https://www.googleapis.com/youtube/v3/videos";
const defaultMaxResults = 5;
const maxAllowedResults = 10;
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const youtubeDataDir = path.resolve(currentDir, "../../data/youtube");

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

function toVideoResult(item, keyword, detailsById) {
  const videoId = item.id?.videoId;
  const details = detailsById.get(videoId) ?? {};
  const statistics = details.statistics ?? {};

  return {
    videoId,
    title: item.snippet?.title,
    description: item.snippet?.description,
    channelId: item.snippet?.channelId,
    channelTitle: item.snippet?.channelTitle,
    publishedAt: item.snippet?.publishedAt,
    thumbnailUrl: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url,
    sourceKeyword: keyword,
    viewCount: Number(statistics.viewCount || 0),
    likeCount: Number(statistics.likeCount || 0),
    commentCount: Number(statistics.commentCount || 0),
    duration: details.contentDetails?.duration ?? "",
    tags: details.snippet?.tags ?? []
  };
}

async function fetchVideoDetails(videoIds, apiKey) {
  if (videoIds.length === 0) {
    return new Map();
  }

  const requestUrl = new URL(youtubeVideosUrl);
  requestUrl.searchParams.set("part", "snippet,statistics,contentDetails");
  requestUrl.searchParams.set("id", videoIds.join(","));
  requestUrl.searchParams.set("key", apiKey);

  const response = await fetch(requestUrl);
  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data.error?.status || "YouTube video details request failed",
      message: data.error?.message || "YouTube APIから動画詳細を取得できませんでした。"
    };
  }

  return new Map((data.items || []).map((item) => [item.id, item]));
}

function getSavedVideosPath(area) {
  return path.join(youtubeDataDir, `${area}_videos.json`);
}

export async function saveYoutubeVideos(result) {
  await mkdir(youtubeDataDir, { recursive: true });

  const savedData = {
    savedAt: new Date().toISOString(),
    area: result.area,
    label: result.label,
    keyword: result.keyword,
    totalResults: result.totalResults,
    returnedResults: result.returnedResults,
    videos: result.videos
  };

  await writeFile(getSavedVideosPath(result.area), `${JSON.stringify(savedData, null, 2)}\n`, "utf8");

  return savedData;
}

export async function loadSavedYoutubeVideos(area) {
  const areaData = getSearchTerms(area);

  if (!areaData) {
    return null;
  }

  try {
    const jsonText = await readFile(getSavedVideosPath(area), "utf8");
    return JSON.parse(jsonText);
  } catch (error) {
    return null;
  }
}

export function buildYoutubeSummary(savedData) {
  const videos = savedData?.videos ?? [];
  const totals = videos.reduce((current, video) => ({
    viewCount: current.viewCount + Number(video.viewCount || 0),
    likeCount: current.likeCount + Number(video.likeCount || 0),
    commentCount: current.commentCount + Number(video.commentCount || 0)
  }), { viewCount: 0, likeCount: 0, commentCount: 0 });

  const topVideos = [...videos]
    .sort((a, b) => Number(b.viewCount || 0) - Number(a.viewCount || 0))
    .slice(0, 5);

  return {
    area: savedData.area,
    label: savedData.label,
    keyword: savedData.keyword,
    savedAt: savedData.savedAt,
    videoCount: videos.length,
    totalViewCount: totals.viewCount,
    totalLikeCount: totals.likeCount,
    totalCommentCount: totals.commentCount,
    topVideos
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

  const videoIds = (data.items || [])
    .map((item) => item.id?.videoId)
    .filter(Boolean);
  const detailsById = await fetchVideoDetails(videoIds, apiKey);

  if (detailsById.ok === false) {
    return {
      ...detailsById,
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
    videos: (data.items || []).map((item) => toVideoResult(item, selectedTerm.keyword, detailsById)),
    apiStatus: getYoutubeApiStatus()
  };
}
