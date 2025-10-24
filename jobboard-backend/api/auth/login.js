import jwt from "jsonwebtoken";

/** Generate token */
const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email
  }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" });
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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
    
    const token = generateToken(mockUser);
    
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
    res.status(500).json({ message: "Login failed" });
  }
}
