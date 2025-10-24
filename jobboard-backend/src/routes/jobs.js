import express from "express";
import { createJob, listJobs, getJob, getRecruiterJobs, approveJob, rejectJob } from "../controllers/jobController.js";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";

const router = express.Router();

router.get("/", listJobs);
router.get("/:id", getJob);

// recruiter routes
router.post("/", protect, permit("recruiter"), createJob);
router.get("/recruiter/my-jobs", protect, permit("recruiter"), getRecruiterJobs);

// admin routes
router.post("/:id/approve", protect, permit("admin"), approveJob);
router.delete("/:id", protect, permit("admin"), rejectJob);

export default router;