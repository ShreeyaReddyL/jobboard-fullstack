import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = null;
    
    // Accept token in Authorization header as "Bearer <token>" or cookie
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret");
      
      // Mock user object
      const mockUser = {
        _id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        blocked: false
      };
      
      req.user = mockUser;
      next();
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Not authorized" });
  }
};