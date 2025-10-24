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

export const register = async (req, res) => {
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
      email,
      role: role || "user"
    };
    
    const token = generateToken(mockUser);
    
    res.json({ 
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
};

export const login = async (req, res) => {
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
    
    res.json({ 
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
};

export const getProfile = async (req, res) => {
  try {
    // Mock user profile
    const mockUser = {
      id: "user_123",
      name: "Test User",
      email: "test@example.com",
      role: "user"
    };
    
    res.json(mockUser);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Failed to get profile" });
  }
};