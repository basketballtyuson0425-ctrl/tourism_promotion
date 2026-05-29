import { Router } from "express";
import { analyzeYoutubeData, getOpenAiAnalysisStatus } from "../openaiAnalysisClient.js";
import { loadSavedYoutubeVideos } from "../youtubeClient.js";

const router = Router();

router.get("/status", (req, res) => {
  res.json(getOpenAiAnalysisStatus());
});

router.post("/", async (req, res) => {
  const area = String(req.body?.area || "ise").toLowerCase();
  const compareArea = String(req.body?.compareArea || "miyajima").toLowerCase();
  const focus = String(req.body?.focus || "").trim();

  try {
    const primaryData = await loadSavedYoutubeVideos(area);

    if (!primaryData) {
      res.status(404).json({
        error: "Saved YouTube videos not found",
        message: "分析対象の保存済みYouTube動画データがありません。"
      });
      return;
    }

    const compareData = compareArea && compareArea !== area
      ? await loadSavedYoutubeVideos(compareArea)
      : null;
    const result = await analyzeYoutubeData({ primaryData, compareData, focus });

    if (!result.ok) {
      res.status(result.status || 500).json(result);
      return;
    }

    res.json({
      ...result,
      area: primaryData.area,
      label: primaryData.label,
      compareArea: compareData?.area || null,
      compareLabel: compareData?.label || null
    });
  } catch (error) {
    res.status(500).json({
      error: "OpenAI analysis failed",
      message: "OpenAI分析の処理中にエラーが発生しました。"
    });
  }
});

export default router;
