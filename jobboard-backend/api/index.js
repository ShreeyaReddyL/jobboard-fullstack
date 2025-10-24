export default function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Handle GET requests
    if (req.method === 'GET') {
      res.status(200).json({ 
        message: "JobBoard API is running",
        status: "OK",
        timestamp: new Date().toISOString(),
        endpoints: [
          "/api/hello",
          "/api/test",
          "/api/auth/login",
          "/api/auth/register", 
          "/api/jobs"
        ]
      });
      return;
    }

    // Handle other methods
    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}
