import express from "express";
import { getPendingJobs, listUsers, blockUser } from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";

const router = express.Router();

router.get("/pending-jobs", protect, permit("admin"), getPendingJobs);
router.get("/users", protect, permit("admin"), listUsers);
router.post("/users/:id/block", protect, permit("admin"), blockUser);

export default router;