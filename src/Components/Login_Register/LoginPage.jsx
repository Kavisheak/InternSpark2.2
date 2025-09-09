import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // safe fallback when prop not provided
  const goToRegister = typeof onNavigateToRegister === 'function' ? onNavigateToRegister : () => navigate('/register');

  // 🔹 Autofill if previously saved
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("rememberUser"));
    if (saved?.email) {
      setEmail(saved.email);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/InternBackend/api/login.php",
        { email, password, rememberMe },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.success) {
        const { role, user_id, username } = data;

        // ✅ store email for autofill next time
        if (rememberMe) {
          localStorage.setItem(
            "rememberUser",
            JSON.stringify({ email, username, user_id, role })
          );
        } else {
          localStorage.removeItem("rememberUser");
        }

        // Session vs local for the current login
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify({ username, role, user_id }));
        } else {
          sessionStorage.setItem("user", JSON.stringify({ username, role, user_id }));
        }

        // redirect by role
        if (role === "student") navigate("/student");
        else if (role === "company") navigate("/company/");
        else if (role === "admin") navigate("/admin");
        else setMessage("Unknown user role.");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReview = async () => {
    try {
      const res = await fetch("http://localhost/InternBackend/api/request_review.php", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Your review request has been sent to the admin.");
      } else {
        setMessage(data.message || "Failed to send review request.");
      }
    } catch {
      setMessage("Failed to send review request.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-300">
      <div className="w-full max-w-md p-10 bg-white border border-blue-200 shadow-2xl rounded-2xl">
        <div className="mb-8 text-center">
          <h2 className="mb-1 text-3xl font-bold text-blue-800">Welcome Back</h2>
          <p className="text-sm text-blue-500">Sign in to fuel your future team</p>
        </div>

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
                className="absolute inset-y-0 flex items-center text-blue-600 right-3 hover:text-blue-800 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-blue-800">
              Remember Me
            </label>
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
              onClick={goToRegister}
            className="font-medium text-blue-600 underline hover:text-blue-800"
          >
            Sign up
          </button>
        </div>

        {message === "Account suspended. Contact administrator." && (
          <div className="p-4 mt-4 border border-red-300 rounded bg-red-50">
            <div className="mb-2 font-semibold text-red-700">
              Your account has been suspended.
            </div>
            <div className="mb-2 text-gray-700">
              If you believe this is a mistake, you can request a review.
            </div>
            <button
              className="px-4 py-2 font-medium text-white bg-orange-600 rounded"
              onClick={handleRequestReview}
            >
              Contact Admin / Request Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;