import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { Router } from "express";

const router = Router();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ideasPath = path.resolve(currentDir, "../../../data/ideas.yaml");

router.get("/", async (req, res) => {
  try {
    const yamlText = await readFile(ideasPath, "utf8");
    const parsed = yaml.load(yamlText);

    res.json({
      ideas: parsed?.ideas ?? []
    });
  } catch (error) {
    res.status(500).json({
      error: "Ideas load failed",
      message: "発信案データを読み込めませんでした。"
    });
  }
});

export default router;
