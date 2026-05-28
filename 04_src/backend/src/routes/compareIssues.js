import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { Router } from "express";

const router = Router();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const issuesPath = path.resolve(currentDir, "../../../data/compare_issues.yaml");

async function loadIssues() {
  try {
    const yamlText = await readFile(issuesPath, "utf8");
    const parsed = yaml.load(yamlText);

    return Array.isArray(parsed?.issues) ? parsed.issues : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function saveIssues(issues) {
  const yamlText = yaml.dump(
    { issues },
    {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    }
  );

  await writeFile(issuesPath, yamlText, "utf8");
}

function normalizeInput(body) {
  return {
    category: String(body.category || "").trim(),
    title: String(body.title || "").trim(),
    detail: String(body.detail || "").trim()
  };
}

router.get("/", async (req, res) => {
  try {
    const issues = await loadIssues();
    res.json({ issues });
  } catch (error) {
    res.status(500).json({
      error: "Compare issues load failed",
      message: "比較課題を読み込めませんでした。"
    });
  }
});

router.post("/", async (req, res) => {
  const input = normalizeInput(req.body || {});

  if (!input.category || !input.title || !input.detail) {
    res.status(400).json({
      error: "Invalid compare issue",
      message: "分類、見出し、内容を入力してください。"
    });
    return;
  }

  try {
    const issues = await loadIssues();
    const issue = {
      id: `issue-${Date.now()}`,
      category: input.category,
      title: input.title,
      detail: input.detail,
      createdAt: new Date().toISOString()
    };

    const nextIssues = [issue, ...issues];
    await saveIssues(nextIssues);

    res.status(201).json({ issue, issues: nextIssues });
  } catch (error) {
    res.status(500).json({
      error: "Compare issue save failed",
      message: "比較課題を保存できませんでした。"
    });
  }
});

export default router;
