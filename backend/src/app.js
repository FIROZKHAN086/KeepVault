import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import "./utils/health.cron.js";   // after Production on this
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

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

export default app;
