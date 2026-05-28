import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { Router } from "express";

const router = Router();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const insightsPath = path.resolve(currentDir, "../../../data/keyword_insights.yaml");

async function loadInsights() {
  try {
    const yamlText = await readFile(insightsPath, "utf8");
    const parsed = yaml.load(yamlText);

    return Array.isArray(parsed?.insights) ? parsed.insights : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function saveInsights(insights) {
  const yamlText = yaml.dump(
    { insights },
    {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    }
  );

  await writeFile(insightsPath, yamlText, "utf8");
}

function normalizeInput(body) {
  return {
    title: String(body.title || "").trim(),
    detail: String(body.detail || "").trim(),
    source: String(body.source || "").trim()
  };
}

router.get("/", async (req, res) => {
  try {
    const insights = await loadInsights();
    res.json({ insights });
  } catch (error) {
    res.status(500).json({
      error: "Keyword insights load failed",
      message: "読み取りメモを読み込めませんでした。"
    });
  }
});

router.post("/", async (req, res) => {
  const input = normalizeInput(req.body || {});

  if (!input.title || !input.detail) {
    res.status(400).json({
      error: "Invalid keyword insight",
      message: "見出しと内容を入力してください。"
    });
    return;
  }

  try {
    const insights = await loadInsights();
    const insight = {
      id: `insight-${Date.now()}`,
      title: input.title,
      detail: input.detail,
      source: input.source,
      createdAt: new Date().toISOString()
    };

    const nextInsights = [insight, ...insights];
    await saveInsights(nextInsights);

    res.status(201).json({ insight, insights: nextInsights });
  } catch (error) {
    res.status(500).json({
      error: "Keyword insight save failed",
      message: "読み取りメモを保存できませんでした。"
    });
  }
});

export default router;
