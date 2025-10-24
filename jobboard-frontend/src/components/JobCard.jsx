import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 font-semibold">{job.company}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 flex items-center gap-1">
                📍 {job.location}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {job.company?.charAt(0)?.toUpperCase() || 'J'}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description?.slice(0, 120)}{job.description?.length > 120 ? "..." : ""}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              Full-time
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Remote
            </span>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-3">
          <Link 
            to={`/jobs/${job._id}`} 
            className="flex-1 px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            View Details
          </Link>
          <Link 
            to={`/apply/${job._id}`} 
            className="flex-1 px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
