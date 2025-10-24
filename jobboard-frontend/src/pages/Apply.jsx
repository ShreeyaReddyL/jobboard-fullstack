import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Apply() {
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload resume");
      return;
    }
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("coverLetter", coverLetter);
    formData.append("jobId", jobId);

    setLoading(true);
    try {
      await api.post(`/applications/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Application submitted");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Apply failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Apply for Job</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Resume (PDF / DOCX)</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} className="mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Cover Letter</label>
          <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="w-full p-2 border rounded" rows={6} />
        </div>

        <button disabled={loading} type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
