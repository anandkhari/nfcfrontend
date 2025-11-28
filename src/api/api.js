import axios from "axios";
import { API_BASE_URL } from "../../"; // 👈 your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ ensures cookies (JWT) are sent automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional global handler for expired sessions
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("🔒 Session expired or unauthorized. Redirecting to login...");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
