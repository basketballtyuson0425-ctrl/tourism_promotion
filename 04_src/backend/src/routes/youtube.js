import { Router } from "express";
import { getSearchTerms, getYoutubeApiStatus } from "../youtubeClient.js";

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

export default router;
