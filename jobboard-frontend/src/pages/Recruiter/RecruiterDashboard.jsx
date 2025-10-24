import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/recruiter/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Jobs</h2>
        <Link to="/recruiter/create" className="px-3 py-1 bg-green-600 text-white rounded">Create Job</Link>
      </div>

      <div className="space-y-3">
        {jobs.map(j => (
          <div key={j._id} className="border p-4 rounded flex justify-between">
            <div>
              <h3 className="font-semibold">{j.title}</h3>
              <p className="text-sm text-gray-600">{j.applications?.length || 0} applicants</p>
            </div>
            <div>
              <Link to={`/jobs/${j._id}`} className="px-3 py-1 border rounded">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
