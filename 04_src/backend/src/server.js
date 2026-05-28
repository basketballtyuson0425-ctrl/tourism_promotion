import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import compareIssuesRouter from "./routes/compareIssues.js";
import ideasRouter from "./routes/ideas.js";
import keywordInsightsRouter from "./routes/keywordInsights.js";
import youtubeRouter from "./routes/youtube.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(currentDir, "../../frontend");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());
app.use(express.static(frontendDir));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "tourism-promotion-backend"
  });
});

app.use("/api/youtube", youtubeRouter);
app.use("/api/ideas", ideasRouter);
app.use("/api/keyword-insights", keywordInsightsRouter);
app.use("/api/compare-issues", compareIssuesRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "指定されたAPIは存在しません。"
  });
});

const server = app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the running backend, or set another PORT in .env.`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});
