import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  description: { type: String },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  approved: { type: Boolean, default: false }, // admin must approve
  status: { type: String, enum: ["open","closed"], default: "open" },
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
