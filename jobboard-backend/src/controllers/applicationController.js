/** Apply to job (with resume file) */
export const applyToJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    
    const mockApplication = {
      _id: "app_" + Date.now(),
      job: jobId,
      applicant: "user_123",
      coverLetter: coverLetter || "",
      resumeUrl: req.file ? `/uploads/${req.file.filename}` : null,
      status: "pending",
      createdAt: new Date()
    };
    
    res.status(201).json(mockApplication);
  } catch (error) {
    console.error("Apply to job error:", error);
    res.status(500).json({ message: "Failed to apply to job" });
  }
};

/** Get applications for a job (recruiter) */
export const getApplicationsForJob = async (req, res) => {
  try {
    const mockApplications = [
      {
        _id: "app_1",
        job: req.params.id,
        applicant: { name: "John Doe", email: "john@example.com" },
        coverLetter: "I am very interested in this position...",
        resumeUrl: "/uploads/resume1.pdf",
        status: "pending",
        createdAt: new Date()
      }
    ];
    
    res.json(mockApplications);
  } catch (error) {
    console.error("Get applications error:", error);
    res.status(500).json({ message: "Failed to get applications" });
  }
};

/** User: get own applications */
export const getUserApplications = async (req, res) => {
  try {
    const mockApplications = [
      {
        _id: "app_1",
        job: {
          _id: "job_1",
          title: "Frontend Developer",
          company: "Tech Corp"
        },
        coverLetter: "I am very interested in this position...",
        status: "pending",
        createdAt: new Date()
      }
    ];
    
    res.json(mockApplications);
  } catch (error) {
    console.error("Get user applications error:", error);
    res.status(500).json({ message: "Failed to get user applications" });
  }
};

/** Admin: update status */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const mockApplication = {
      _id: id,
      status,
      updatedAt: new Date()
    };
    
    res.json({ message: "Status updated", application: mockApplication });
  } catch (error) {
    console.error("Update application status error:", error);
    res.status(500).json({ message: "Failed to update application status" });
  }
};