import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { searchTermsByArea } from "./data/searchTerms.js";

const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
const youtubeVideosUrl = "https://www.googleapis.com/youtube/v3/videos";
const defaultMaxResults = 5;
const maxAllowedResults = 10;
const maxAllowedTermLimit = 12;
const maxVideoIdsPerDetailsRequest = 50;
const defaultSearchDelayMs = 6500;
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

function normalizeTermLimit(termLimit) {
  const parsed = Number(termLimit);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return maxAllowedTermLimit;
  }

  return Math.min(parsed, maxAllowedTermLimit);
}

function normalizeSearchDelayMs(searchDelayMs) {
  const parsed = Number(searchDelayMs);

  if (!Number.isInteger(parsed) || parsed < 0) {
    return defaultSearchDelayMs;
  }

  return Math.min(parsed, 30000);
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function selectSearchTerms(areaData, keyword, allTerms, termLimit) {
  if (allTerms) {
    const limit = (termLimit !== undefined && termLimit !== null && String(termLimit) !== "")
      ? normalizeTermLimit(termLimit)
      : areaData.terms.length;
    return areaData.terms.slice(0, limit);
  }

  if (keyword) {
    const selectedTerm = areaData.terms.find((term) => term.keyword === keyword);
    return selectedTerm ? [selectedTerm] : [];
  }

  return areaData.terms[0] ? [areaData.terms[0]] : [];
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

  const detailsById = new Map();

  for (let index = 0; index < videoIds.length; index += maxVideoIdsPerDetailsRequest) {
    const chunk = videoIds.slice(index, index + maxVideoIdsPerDetailsRequest);
    const requestUrl = new URL(youtubeVideosUrl);
    requestUrl.searchParams.set("part", "snippet,statistics,contentDetails");
    requestUrl.searchParams.set("id", chunk.join(","));
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

    (data.items || []).forEach((item) => {
      detailsById.set(item.id, item);
    });
  }

  return detailsById;
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
    keywords: result.keywords,
    searchMode: result.searchMode,
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

  const avgEngagementRate = videos.length > 0
    ? videos.reduce((sum, video) => {
        const views = Number(video.viewCount || 0);
        const likes = Number(video.likeCount || 0);
        const comments = Number(video.commentCount || 0);
        return sum + (views > 0 ? ((likes + comments) / views) * 100 : 0);
      }, 0) / videos.length
    : 0;

  return {
    area: savedData.area,
    label: savedData.label,
    keyword: savedData.keyword,
    keywords: savedData.keywords || [savedData.keyword].filter(Boolean),
    searchMode: savedData.searchMode || "singleTerm",
    savedAt: savedData.savedAt,
    videoCount: videos.length,
    totalViewCount: totals.viewCount,
    totalLikeCount: totals.likeCount,
    totalCommentCount: totals.commentCount,
    avgEngagementRate: Math.round(avgEngagementRate * 100) / 100,
    topVideos
  };
}

export function buildEngagementAnalysis(savedData) {
  const videos = savedData?.videos ?? [];

  const withEngagement = videos.map((video) => {
    const views = Number(video.viewCount || 0);
    const likes = Number(video.likeCount || 0);
    const comments = Number(video.commentCount || 0);
    const rate = views > 0 ? ((likes + comments) / views) * 100 : 0;

    return {
      videoId: video.videoId,
      title: video.title,
      thumbnailUrl: video.thumbnailUrl,
      viewCount: views,
      likeCount: likes,
      commentCount: comments,
      engagementRate: Math.round(rate * 100) / 100,
      sourceKeyword: video.sourceKeyword
    };
  });

  const avg = withEngagement.length > 0
    ? withEngagement.reduce((sum, v) => sum + v.engagementRate, 0) / withEngagement.length
    : 0;

  const topByViews = [...withEngagement]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  const topByEngagement = [...withEngagement]
    .filter((v) => v.viewCount >= 1000)
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 5);

  return {
    area: savedData.area,
    label: savedData.label,
    videoCount: videos.length,
    avgEngagementRate: Math.round(avg * 100) / 100,
    topByViews,
    topByEngagement
  };
}

async function fetchSearchItems(term, maxResults, apiKey) {
  const requestUrl = new URL(youtubeSearchUrl);
  requestUrl.searchParams.set("part", "snippet");
  requestUrl.searchParams.set("q", term.keyword);
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
      message: data.error?.message || "YouTube APIから動画検索結果を取得できませんでした。"
    };
  }

  return {
    ok: true,
    totalResults: data.pageInfo?.totalResults ?? 0,
    items: data.items || []
  };
}

export async function searchYoutubeVideos({ area, keyword, maxResults, allTerms, termLimit, searchDelayMs }) {
  const areaData = getSearchTerms(area);

  if (!areaData) {
    return {
      ok: false,
      status: 400,
      error: "Invalid area",
      message: "area は ise または miyajima を指定してください。"
    };
  }

  const selectedTerms = selectSearchTerms(areaData, keyword, allTerms, termLimit);

  if (selectedTerms.length === 0) {
    return {
      ok: false,
      status: 400,
      error: "Invalid keyword",
      message: "指定された検索語は、この地域の検索条件に含まれていません。"
    };
  }

  const apiKey = getYoutubeApiKey();
  const keywords = selectedTerms.map((term) => term.keyword);

  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: "YouTube API key is not configured",
      message: "YOUTUBE_API_KEY が未設定のため、YouTube APIには接続していません。",
      area: areaData.area,
      label: areaData.label,
      keyword: selectedTerms[0]?.keyword ?? "",
      keywords,
      apiStatus: getYoutubeApiStatus()
    };
  }

  const itemsByVideoId = new Map();
  let totalResults = 0;
  const delayMs = selectedTerms.length > 1 ? normalizeSearchDelayMs(searchDelayMs) : 0;

  for (const [index, term] of selectedTerms.entries()) {
    if (index > 0 && delayMs > 0) {
      await wait(delayMs);
    }

    const searchResult = await fetchSearchItems(term, maxResults, apiKey);

    if (!searchResult.ok) {
      return {
        ...searchResult,
        area: areaData.area,
        label: areaData.label,
        keyword: term.keyword,
        keywords,
        apiStatus: getYoutubeApiStatus()
      };
    }

    totalResults += searchResult.totalResults;
    searchResult.items.forEach((item) => {
      const videoId = item.id?.videoId;
      if (videoId && !itemsByVideoId.has(videoId)) {
        itemsByVideoId.set(videoId, {
          ...item,
          sourceKeyword: term.keyword
        });
      }
    });
  }

  const searchItems = [...itemsByVideoId.values()];
  const videoIds = searchItems
    .map((item) => item.id?.videoId)
    .filter(Boolean);
  const detailsById = await fetchVideoDetails(videoIds, apiKey);

  if (detailsById.ok === false) {
    return {
      ...detailsById,
      area: areaData.area,
      label: areaData.label,
      keyword: selectedTerms[0]?.keyword ?? "",
      keywords,
      apiStatus: getYoutubeApiStatus()
    };
  }

  return {
    ok: true,
    area: areaData.area,
    label: areaData.label,
    keyword: selectedTerms[0]?.keyword ?? "",
    keywords,
    searchMode: selectedTerms.length > 1 ? "allTerms" : "singleTerm",
    searchDelayMs: delayMs,
    totalResults,
    returnedResults: searchItems.length,
    videos: searchItems.map((item) => toVideoResult(item, item.sourceKeyword, detailsById)),
    apiStatus: getYoutubeApiStatus()
  };
}
