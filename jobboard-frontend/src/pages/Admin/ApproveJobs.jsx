import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function ApproveJobs() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    api.get("/admin/pending-jobs")
      .then(res => setPending(res.data))
      .catch(err => console.error(err));
  }, []);

  const handle = async (id, action) => {
    try {
      await api.post(`/admin/jobs/${id}/${action}`);
      setPending(p => p.filter(x => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <div>
      <h3 className="text-xl mb-4">Pending Jobs</h3>
      <div className="space-y-3">
        {pending.map(j => (
          <div key={j._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{j.title}</h4>
              <p className="text-sm text-gray-600">{j.company}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handle(j._id, "approve")} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
              <button onClick={() => handle(j._id, "reject")} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
