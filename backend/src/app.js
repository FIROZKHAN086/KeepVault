import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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

import "./utils/health.cron.js";

export default app;
