import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import PrivateRoute from "./components/PrivateRoute";
import RoleGuard from "./components/RoleGuard";

/* Recruiter pages */
import RecruiterDashboard from "./pages/Recruiter/RecruiterDashboard";
import CreateJob from "./pages/Recruiter/CreateJob";

/* Admin pages */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ApproveJobs from "./pages/Admin/ApproveJobs";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/apply/:jobId" element={
            <PrivateRoute>
              <Apply />
            </PrivateRoute>
          } />

          <Route path="/recruiter/dashboard" element={
            <PrivateRoute>
              <RoleGuard role="recruiter">
                <RecruiterDashboard />
              </RoleGuard>
            </PrivateRoute>
          } />
          <Route path="/recruiter/create" element={
            <PrivateRoute>
              <RoleGuard role="recruiter">
                <CreateJob />
              </RoleGuard>
            </PrivateRoute>
          } />

          <Route path="/admin" element={
            <PrivateRoute>
              <RoleGuard role="admin">
                <AdminDashboard />
              </RoleGuard>
            </PrivateRoute>
          } />
          <Route path="/admin/approve" element={
            <PrivateRoute>
              <RoleGuard role="admin">
                <ApproveJobs />
              </RoleGuard>
            </PrivateRoute>
          } />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
