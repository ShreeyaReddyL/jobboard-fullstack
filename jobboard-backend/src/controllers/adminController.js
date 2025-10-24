/** Get pending jobs */
export const getPendingJobs = async (req, res) => {
  try {
    const mockPendingJobs = [
      {
        _id: "job_1",
        title: "New Job Posting",
        company: "New Company",
        location: "Remote",
        description: "This is a new job posting waiting for approval",
        approved: false,
        recruiter: { name: "Jane Doe", email: "jane@newcompany.com" },
        createdAt: new Date()
      }
    ];
    
    res.json(mockPendingJobs);
  } catch (error) {
    console.error("Get pending jobs error:", error);
    res.status(500).json({ message: "Failed to get pending jobs" });
  }
};

/** Manage users: list */
export const listUsers = async (req, res) => {
  try {
    const mockUsers = [
      {
        _id: "user_1",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        blocked: false,
        createdAt: new Date()
      },
      {
        _id: "user_2", 
        name: "Jane Smith",
        email: "jane@example.com",
        role: "recruiter",
        blocked: false,
        createdAt: new Date()
      }
    ];
    
    res.json(mockUsers);
  } catch (error) {
    console.error("List users error:", error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

/** Block/unblock user */
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    res.json({ message: `User ${id} blocked/unblocked` });
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({ message: "Failed to block user" });
  }
};