import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * role can be a string or array.
 * Example: <RoleGuard role="recruiter"><RecruiterDashboard/></RoleGuard>
 */
export default function RoleGuard({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const allowed = Array.isArray(role) ? role : [role];
  if (!allowed.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
