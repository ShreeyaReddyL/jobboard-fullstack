import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/approve" className="p-4 border rounded">Approve Jobs</Link>
        <Link to="/admin/users" className="p-4 border rounded">Manage Users</Link>
      </div>
    </div>
  );
}
