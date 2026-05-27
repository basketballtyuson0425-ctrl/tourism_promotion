import { searchTermsByArea } from "./data/searchTerms.js";

export function getSearchTerms(area) {
  return searchTermsByArea[area] ?? null;
}

export function getYoutubeApiStatus() {
  return {
    connected: Boolean(process.env.YOUTUBE_API_KEY),
    message: process.env.YOUTUBE_API_KEY
      ? "YouTube APIキーが設定されています。"
      : "現時点ではYouTube APIキー未設定のため、検索条件のみ返します。"
  };
}
