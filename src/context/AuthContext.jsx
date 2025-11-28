import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const navigate = useNavigate();

  // ✅ Check auth on load using cookie
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/auth/check-auth`, {
        withCredentials: true,
      });

      if (res.data?.valid) {
        setIsAuthenticated(true);
        setUser(res.data.user || null);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.warn("Auth check failed:", err.response?.data || err.message);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  }, []);

  // 🔁 Run on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/login-admin`,
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data.user || null);
      setIsAuthenticated(true);
      setHasFetched(true);
      toast.success("Login successful");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err.message);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setHasFetched(true);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        hasFetched,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
