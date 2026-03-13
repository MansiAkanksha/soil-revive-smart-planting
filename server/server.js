import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import recommendRoute from "./routes/recommend.js";
import authRoute from "./routes/auth.js";
import historyRoute from "./routes/history.js";
import globalStatsRoute from "./routes/globalStats.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from server/.env first, then fallback to project-root .env.
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "soilrevive_dev_secret_change_in_production";
  console.warn(
    "[WARN] JWT_SECRET not found. Using development fallback secret. Set JWT_SECRET in environment for production."
  );
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/recommend", recommendRoute);
app.use("/api/history", historyRoute);
app.use("/api/global-stats", globalStatsRoute);

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/soilrevive";
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("SoilRevive API Running");
});

// Centralized API error handler for production-safe responses.
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal server error" });
});

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
