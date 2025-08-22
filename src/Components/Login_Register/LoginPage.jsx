import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // 👈 import icons

const LoginPage = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/InternBackend/api/login.php",
        { email, password },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.success) {
        const { role, user_id, username } = data;
        localStorage.setItem(
          "user",
          JSON.stringify({ username, role, user_id })
        );

        if (role === "student") navigate("/student");
        else if (role === "company") navigate("/company");
        else if (role === "admin") navigate("/admin");
        else setMessage("Unknown user role.");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Login error.");
      } else {
        setMessage("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-300">
      <div className="w-full max-w-md p-10 bg-white border border-blue-200 shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-1 text-3xl font-bold text-blue-800">Welcome Back</h2>
          <p className="text-sm text-blue-500">Sign in to fuel your future team</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-blue-800">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-blue-900 placeholder-blue-400 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password with eye icon */}
          <div>
            <label className="block mb-1 text-sm text-blue-800">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-10 text-blue-900 placeholder-blue-400 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {message && <p className="text-sm text-red-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Forgot password + register */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-blue-700">Don't have an account? </span>
          <button
            onClick={onNavigateToRegister}
            className="font-medium text-blue-600 underline hover:text-blue-800"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
