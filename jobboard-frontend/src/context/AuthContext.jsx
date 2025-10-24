import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role, email }
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // store user from token; backend must embed role
        setUser({ id: decoded.id, email: decoded.email, role: decoded.role, name: decoded.name });
        localStorage.setItem("token", token);
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      // backend returns { token, user? } or just token
      setToken(data.token);
      localStorage.setItem("token", data.token);
      toast.success("Logged in");
      return { ok: true };
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Login failed");
      return { ok: false };
    }
  };

  const register = async (payload) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      toast.success("Registered");
      return { ok: true };
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Registration failed");
      return { ok: false };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
