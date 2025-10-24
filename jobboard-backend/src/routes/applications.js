import express from "express";
import { applyToJob, getApplicationsForJob, getUserApplications, updateApplicationStatus } from "../controllers/applicationController.js";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import { uploadResume } from "../middleware/upload.js";

const router = express.Router();

// apply (user) - multipart
router.post("/apply", protect, permit("user"), uploadResume.single("resume"), applyToJob);

// applicant -> list own
router.get("/me", protect, getUserApplications);

// recruiter -> applications for job
router.get("/job/:id", protect, permit("recruiter"), getApplicationsForJob);

// admin update status
router.patch("/:id/status", protect, permit("admin"), updateApplicationStatus);

export default router;