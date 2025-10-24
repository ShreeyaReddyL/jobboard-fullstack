import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import JobCard from "../components/JobCard";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Add a timeout to prevent hanging on API call
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    api.get("/jobs")
      .then(res => {
        setJobs(res.data);
        setLoading(false);
        clearTimeout(timeoutId);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
        clearTimeout(timeoutId);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="text-lg text-gray-600">Loading amazing jobs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Find Your Dream Job
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover amazing opportunities from top companies. Your next career move starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="#jobs" 
              className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Jobs
            </Link>
            {user && user.role === 'recruiter' ? (
              <Link 
                to="/recruiter/create" 
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Post a Job
              </Link>
            ) : (
              <Link 
                to="/register" 
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div id="jobs-section" className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Job Opportunities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of the best job opportunities from leading companies worldwide.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Jobs Available</h3>
              <p className="text-gray-600 mb-6">
                We're working hard to bring you the best opportunities. Check back soon!
              </p>
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
                💡 <strong>Tip:</strong> Make sure your backend server is running to see job listings.
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
