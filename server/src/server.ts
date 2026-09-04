import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import prisma from "./config/database";
import authRoutes from "./routes/auth.routes";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import userRoutes from "./routes/user.routes";
import collectionRoutes from "./routes/collection.routes";
import documentRoutes from "./routes/document.routes";
import chatRoutes from "./routes/chat.routes";
import conversationRoutes from "./routes/conversation.routes";
import { isSupabaseStorageEnabled } from "./config/supabase";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.set("trust proxy", 1);

app.use(helmet());

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "ResearchPilot API is healthy 🚀",
      database: "connected",
      storage: isSupabaseStorageEnabled() ? "supabase" : "local-disk",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      success: false,
      message: "ResearchPilot API is unhealthy",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/conversations", conversationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);

  if (process.env.NODE_ENV === "production" && !isSupabaseStorageEnabled()) {
    console.warn(
      "⚠️ SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are missing. Uploaded PDFs will not persist across deploys."
    );
  }
});
