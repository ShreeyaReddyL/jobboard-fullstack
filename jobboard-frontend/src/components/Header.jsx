import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors duration-200">
              🚀 JobBoard
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Find Jobs
              </Link>
              {user?.role === "recruiter" && (
                <Link to="/recruiter/create" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                  Post Job
                </Link>
              )}
              {user?.role === "admin" && (
                <Link to="/admin" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white font-medium">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="px-4 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium border border-white/30 rounded-full hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
