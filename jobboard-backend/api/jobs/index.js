export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Mock jobs data
    const mockJobs = [
      {
        _id: "job_1",
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "Remote",
        description: "We are looking for a skilled frontend developer...",
        recruiter: { name: "John Doe", email: "john@techcorp.com" },
        approved: true,
        status: "open",
        createdAt: new Date()
      },
      {
        _id: "job_2", 
        title: "Backend Developer",
        company: "StartupXYZ",
        location: "San Francisco, CA",
        description: "Join our growing team as a backend developer...",
        recruiter: { name: "Jane Smith", email: "jane@startupxyz.com" },
        approved: true,
        status: "open",
        createdAt: new Date()
      }
    ];
    
    res.status(200).json(mockJobs);
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ 
      message: "Failed to get jobs",
      error: error.message
    });
  }
}
