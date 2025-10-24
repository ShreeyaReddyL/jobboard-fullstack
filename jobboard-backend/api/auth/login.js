export default async function handler(req, res) {
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

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Dynamically import JWT to avoid bundling issues
    const jwt = await import('jsonwebtoken');
    
    const { email, password } = req.body;
    
    // Mock validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Mock user lookup
    const mockUser = {
      id: "user_123",
      name: "Test User",
      email,
      role: "user"
    };
    
    // Generate token
    const token = jwt.default.sign({
      id: mockUser.id,
      role: mockUser.role,
      name: mockUser.name,
      email: mockUser.email
    }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" });
    
    res.status(200).json({ 
      token, 
      user: { 
        id: mockUser.id, 
        name: mockUser.name, 
        email: mockUser.email, 
        role: mockUser.role 
      } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
