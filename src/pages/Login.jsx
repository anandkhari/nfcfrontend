import React, { useState } from "react";
import { LogIn, User, Lock } from "lucide-react";
import InputField from "../components/InputField";

import { API_BASE_URL } from "../../config";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "", // Can be email or username
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handles input change (updates state for both fields)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login-admin`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
  credentials: "include"
});

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // store token in localStorage
    localStorage.setItem("token", data.token);

    alert("✅ Login Successful! Redirecting...");
    // redirect to dashboard
    window.location.href = "/";

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    // Page container
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F8FC]">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl transition-all duration-300">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-center">
              <span className="text-2xl font-bold text-[#007A8A]">Scatch</span>
              <p className="text-xs text-gray-500 mt-1">
                NFC Profile Generator Login
              </p>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Log In to Dashboard
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email / Username Input */}
              <InputField
                label="Email / Username"
                name="email"
                type="text"
                icon={User}
                value={formData.loginIdentifier}
                onChange={handleChange}
              />

              {/* Password Input */}
              <InputField
                label="Password"
                name="password"
                type="password"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-sm text-right">
              <a
                href="#"
                className="font-medium text-[#007A8A] hover:text-[#00606B] transition duration-150"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent 
                         text-lg font-semibold rounded-lg shadow-md transition duration-300
                         ${loading
                           ? "bg-[#007A8A] opacity-70 cursor-not-allowed"
                           : "bg-[#007A8A] hover:bg-[#00606B] text-white"}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                         5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 
                         5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging In...
                </div>
              ) : (
                <span className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Log In to Dashboard
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
