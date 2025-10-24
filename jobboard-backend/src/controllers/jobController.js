/** Create job (recruiter) */
export const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;
    
    const mockJob = {
      _id: "job_" + Date.now(),
      title,
      company,
      location,
      description,
      recruiter: "user_123",
      approved: false,
      createdAt: new Date()
    };
    
    res.status(201).json(mockJob);
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

/** Get all approved jobs (public) */
export const listJobs = async (req, res) => {
  try {
    const mockJobs = [
      {
        _id: "1",
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "Remote",
        description: "We are looking for a skilled frontend developer to join our team.",
        approved: true,
        recruiter: { name: "John Doe", email: "john@techcorp.com" }
      },
      {
        _id: "2",
        title: "Backend Developer", 
        company: "StartupXYZ",
        location: "New York",
        description: "Join our growing startup as a backend developer.",
        approved: true,
        recruiter: { name: "Jane Smith", email: "jane@startupxyz.com" }
      },
      {
        _id: "3",
        title: "Full Stack Developer",
        company: "Innovation Labs",
        location: "San Francisco",
        description: "We are looking for a full stack developer with experience in React and Node.js.",
        approved: true,
        recruiter: { name: "Mike Johnson", email: "mike@innovationlabs.com" }
      }
    ];
    
    res.json(mockJobs);
  } catch (error) {
    console.error("List jobs error:", error);
    res.status(500).json({ message: "Failed to get jobs" });
  }
};

/** Get job details by id (any) */
export const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    const mockJob = {
      _id: id,
      title: "Full Stack Developer",
      company: "Tech Corp",
      location: "San Francisco",
      description: "We are looking for a full stack developer with experience in React and Node.js. You will be working on our main product and collaborating with a talented team.",
      approved: true,
      recruiter: { name: "John Doe", email: "john@techcorp.com" },
      createdAt: new Date()
    };
    
    res.json(mockJob);
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({ message: "Failed to get job" });
  }
};

/** Recruiter: get own jobs (includes draft/unapproved) */
export const getRecruiterJobs = async (req, res) => {
  try {
    const mockJobs = [
      {
        _id: "1",
        title: "My Job Posting",
        company: "My Company",
        location: "Remote",
        description: "This is my job posting",
        approved: true,
        recruiter: { name: "Test User" }
      }
    ];
    
    res.json(mockJobs);
  } catch (error) {
    console.error("Get recruiter jobs error:", error);
    res.status(500).json({ message: "Failed to get recruiter jobs" });
  }
};

/** Admin: approve/reject */
export const approveJob = async (req, res) => {
  try {
    res.json({ message: "Job approved" });
  } catch (error) {
    console.error("Approve job error:", error);
    res.status(500).json({ message: "Failed to approve job" });
  }
};

export const rejectJob = async (req, res) => {
  try {
    res.json({ message: "Job rejected/deleted" });
  } catch (error) {
    console.error("Reject job error:", error);
    res.status(500).json({ message: "Failed to reject job" });
  }
};