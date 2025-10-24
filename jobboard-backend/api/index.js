import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../src/config/db.js";

// Import routes
import authRoutes from "../src/routes/auth.js";
import jobRoutes from "../src/routes/jobs.js";
import appRoutes from "../src/routes/applications.js";
import adminRoutes from "../src/routes/admin.js";
import errorHandler from "../src/middleware/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to database (optional for development)
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log("Running in mock mode - no database connection");
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// static uploads (serve resumes)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", appRoutes);
app.use("/api/admin", adminRoutes);

// health check
app.get("/", (req, res) => res.json({ message: "JobBoard API is running" }));

// error handler
app.use(errorHandler);

export default app;
