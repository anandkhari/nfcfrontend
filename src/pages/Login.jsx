import React, { useState } from "react";
import { LogIn, User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "../components/InputField";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      console.log("✅ Login successful, navigating to:", from);
      navigate(from, { replace: true }); // redirect back to last protected page
    } catch (err) {
      setError(err.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-brand-light">
      {/* --- Left Branding Panel --- */}
      <div
        className="relative hidden w-1/2 flex-col items-center justify-center bg-brand-dark text-white lg:flex"
        style={{
          backgroundImage: "url('/trueline-login.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />{" "}
        {/* subtle overlay for contrast */}
      </div>

      {/* --- Right Login Panel --- */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            {/* Logo */}
            <img
              src="/logo.png"
              alt="Trueline Logo"
              className="mb-4 h-auto w-40 mx-auto lg:mx-0"
            />
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-brand-gray">
              Log in to the NFC Profile Generator
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-3 text-center text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <InputField
                label="Email"
                name="email"
                type="email"
                icon={User}
                value={formData.email}
                onChange={handleChange}
              />

              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  icon={Lock}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 cursor-pointer text-brand-gray"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-sm text-right">
              <a
                href="#"
                className="font-medium text-brand-orange hover:text-brand-orange-dark transition duration-150"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password}
              className={`group relative flex w-full items-center justify-between rounded-full px-4 py-2
  text-lg font-semibold text-white transition-all duration-300 shadow-lg
  ${
    loading || !formData.email || !formData.password
      ? "cursor-not-allowed bg-brand-orange/70"
      : "bg-brand-orange hover:bg-brand-orange-dark active:scale-95"
  }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Logging In...</span>
                </>
              ) : (
                <>
                  <span className="flex-1 text-center">
                    Log in to Dashboard
                  </span>

                  {/* White circular arrow aligned to right edge */}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5 text-brand-orange"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
