import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coverLetter: { type: String },
  resumeUrl: { type: String }, // path to uploaded file or cloud URL
  status: { type: String, enum: ["applied","reviewed","accepted","rejected"], default: "applied" },
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
