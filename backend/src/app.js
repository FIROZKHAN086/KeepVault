import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// import "./utils/health.cron.js";   // after Production on this
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ─── Static Frontend (Next.js export) ────────────────────
// In Docker: app.js is at /app/backend/src/app.js
// public/   is at /app/backend/public/
const publicDir = path.resolve(__dirname, "../public");
app.use(express.static(publicDir));

// ─── Middlewares ──────────────────────────────────────────
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ─── API Routes ───────────────────────────────────────────

// user routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

// document routes
import documentRoutes from "./routes/document.routes.js";
app.use("/api/documents", documentRoutes);

// health routes
import healthRoutes from "./routes/health.routes.js";
app.use("/api/health", healthRoutes);

// ─── SPA Catch-all ────────────────────────────────────────
// For any non-API route, serve index.html so client-side
// routing (login, register, dashboard, etc.) works correctly
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"), (err) => {
    if (err) {
      res.status(200).json({ message: "KeepVault API is running" });
    }
  });
});

export default app;
