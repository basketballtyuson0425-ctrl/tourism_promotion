import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ideasRouter from "./routes/ideas.js";
import youtubeRouter from "./routes/youtube.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "tourism-promotion-backend"
  });
});

app.use("/api/youtube", youtubeRouter);
app.use("/api/ideas", ideasRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "指定されたAPIは存在しません。"
  });
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
