import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";


dotenv.config();

const app = express();


app.use(express.static(path.join(process.cwd(), "public")));

// ─── Middlewares ──────────────────────────────────────────
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5000"], credentials: true }));
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
