import { Router } from "express";
import { getSearchTerms, getYoutubeApiStatus, searchYoutubeVideos } from "../youtubeClient.js";

const router = Router();

router.get("/status", (req, res) => {
  res.json(getYoutubeApiStatus());
});

router.get("/search-terms", (req, res) => {
  const area = String(req.query.area || "").toLowerCase();
  const result = getSearchTerms(area);

  if (!result) {
    res.status(400).json({
      error: "Invalid area",
      message: "area は ise または miyajima を指定してください。"
    });
    return;
  }

  res.json({
    ...result,
    apiStatus: getYoutubeApiStatus()
  });
});

router.get("/videos", async (req, res) => {
  try {
    const result = await searchYoutubeVideos({
      area: String(req.query.area || "").toLowerCase(),
      keyword: req.query.keyword ? String(req.query.keyword) : "",
      maxResults: req.query.maxResults
    });

    if (!result.ok) {
      res.status(result.status).json(result);
      return;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "YouTube video search failed",
      message: "YouTube動画検索の処理中にエラーが発生しました。"
    });
  }
});

export default router;
