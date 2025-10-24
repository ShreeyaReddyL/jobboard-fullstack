import React from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/jobs", data); // backend expects job payload
      alert("Job posted");
      navigate("/recruiter/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("title")} placeholder="Job title" className="w-full p-2 border rounded" />
        <input {...register("company")} placeholder="Company name" className="w-full p-2 border rounded" />
        <input {...register("location")} placeholder="Location" className="w-full p-2 border rounded" />
        <textarea {...register("description")} placeholder="Description" className="w-full p-2 border rounded" rows={6} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </form>
    </div>
  );
}
