import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { Router } from "express";

const router = Router();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ideasPath = path.resolve(currentDir, "../../../data/ideas.yaml");

async function loadIdeas() {
  try {
    const yamlText = await readFile(ideasPath, "utf8");
    const parsed = yaml.load(yamlText);
    return Array.isArray(parsed?.ideas) ? parsed.ideas : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function saveIdeas(ideas) {
  const yamlText = yaml.dump({ ideas }, { lineWidth: -1, noRefs: true, sortKeys: false });
  await writeFile(ideasPath, yamlText, "utf8");
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

router.post("/", async (req, res) => {
  const title = String(req.body?.title || "").trim();
  const summary = String(req.body?.summary || "").trim();

  if (!title || !summary) {
    res.status(400).json({ error: "Invalid idea", message: "タイトルと内容を入力してください。" });
    return;
  }

  try {
    const ideas = await loadIdeas();
    const idea = {
      id: `idea-${Date.now()}`,
      title,
      summary,
      targetMarket: "米国",
      theme: String(req.body?.theme || "文化").trim(),
      priority: String(req.body?.priority || "中").trim(),
      status: "案",
      reason: String(req.body?.reason || "").trim(),
      sourceKeywords: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const nextIdeas = [...ideas, idea];
    await saveIdeas(nextIdeas);

    res.status(201).json({ idea, ideas: nextIdeas });
  } catch (error) {
    res.status(500).json({ error: "Idea save failed", message: "発信案を保存できませんでした。" });
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
