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
    const { name, email, password, role } = req.body;
    
    // Mock validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Mock user creation
    const mockUser = {
      id: "user_" + Date.now(),
      name,
      email,
      role: role || "user"
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
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
}
