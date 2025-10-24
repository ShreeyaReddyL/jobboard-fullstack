import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Import controllers directly
import { register, login, getProfile } from "./controllers/authController.js";
import { createJob, listJobs, getJob, getRecruiterJobs, approveJob, rejectJob } from "./controllers/jobController.js";
import { applyToJob, getApplicationsForJob, getUserApplications, updateApplicationStatus } from "./controllers/applicationController.js";
import { getPendingJobs, listUsers, blockUser } from "./controllers/adminController.js";
import { protect } from "./middleware/auth.js";
import { permit } from "./middleware/roles.js";
import { uploadResume } from "./middleware/upload.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

// Auth routes
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.get("/api/auth/profile", protect, getProfile);

// Job routes
app.get("/api/jobs", listJobs);
app.get("/api/jobs/:id", getJob);
app.post("/api/jobs", protect, permit("recruiter"), createJob);
app.get("/api/jobs/recruiter/my-jobs", protect, permit("recruiter"), getRecruiterJobs);
app.post("/api/jobs/:id/approve", protect, permit("admin"), approveJob);
app.delete("/api/jobs/:id", protect, permit("admin"), rejectJob);

// Application routes
app.post("/api/applications/apply", protect, permit("user"), uploadResume.single("resume"), applyToJob);
app.get("/api/applications/me", protect, getUserApplications);
app.get("/api/applications/job/:id", protect, permit("recruiter"), getApplicationsForJob);
app.patch("/api/applications/:id/status", protect, permit("admin"), updateApplicationStatus);

// Admin routes
app.get("/api/admin/pending-jobs", protect, permit("admin"), getPendingJobs);
app.get("/api/admin/users", protect, permit("admin"), listUsers);
app.post("/api/admin/users/:id/block", protect, permit("admin"), blockUser);

// health check
app.get("/", (req, res) => res.json({ message: "JobBoard API is running" }));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));