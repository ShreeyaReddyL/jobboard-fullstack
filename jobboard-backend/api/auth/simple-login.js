export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Simple mock response without JWT
    res.status(200).json({ 
      success: true,
      message: "Login successful (mock)",
      user: { 
        id: "user_123", 
        name: "Test User", 
        email: email, 
        role: "user" 
      } 
    });
  } catch (error) {
    console.error("Simple login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
}
