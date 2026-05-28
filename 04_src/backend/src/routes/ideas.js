import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { Router } from "express";

const router = Router();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ideasPath = path.resolve(currentDir, "../../../data/ideas.yaml");

async function loadIdeas() {
  const yamlText = await readFile(ideasPath, "utf8");
  const parsed = yaml.load(yamlText);

  return parsed?.ideas ?? [];
}

function escapeCsvValue(value) {
  return `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;
}

function ideasToCsv(ideas) {
  const headers = [
    "id",
    "title",
    "summary",
    "targetMarket",
    "theme",
    "priority",
    "status",
    "reason",
    "sourceKeywords"
  ];

  const rows = ideas.map((idea) => [
    idea.id,
    idea.title,
    idea.summary,
    idea.targetMarket,
    idea.theme,
    idea.priority,
    idea.status,
    idea.reason,
    (idea.sourceKeywords || []).join(" / ")
  ]);

  return [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
}

router.get("/", async (req, res) => {
  try {
    const ideas = await loadIdeas();

    res.json({ ideas });
  } catch (error) {
    res.status(500).json({
      error: "Ideas load failed",
      message: "発信案データを読み込めませんでした。"
    });
  }
});

router.get("/csv", async (req, res) => {
  try {
    const ideas = await loadIdeas();
    const csv = ideasToCsv(ideas);

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=\"ideas.csv\"");
    res.send(`\uFEFF${csv}`);
  } catch (error) {
    res.status(500).json({
      error: "Ideas CSV export failed",
      message: "発信案データをCSVで出力できませんでした。"
    });
  }
});

export default router;
