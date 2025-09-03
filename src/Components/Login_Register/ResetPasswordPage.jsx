import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || ""; // get token from URL

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState({ label: "", color: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validate password strength
  const validatePassword = (pwd) => {
    const tests = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[@$!%*?&]/];
    const score = tests.reduce((acc, test) => acc + test.test(pwd), 0);

    if (score <= 2) return { label: "Weak", color: "text-red-500" };
    if (score <= 4) return { label: "Medium", color: "text-yellow-500" };
    return { label: "Strong", color: "text-green-500" };
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setStrength(validatePassword(pwd));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    if (strength.label === "Weak") {
      setError("Password is too weak. Please make it stronger.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "http://localhost/InternBackend/api/reset_password.php",
        {
          token: token,
          password: password,
        }
      );

      if (response.data.success) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // redirect to login page
        }, 2000);
      } else {
        setError(response.data.message || "Error resetting password.");
      }
    } catch (err) {
      setError("Server error. Try again later.",err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-300">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-blue-600">
            Reset Password
          </h1>
          <p className="text-sm text-blue-500">Create a secure new password</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-blue-600">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Enter your new password"
                className="w-full px-4 py-3 text-blue-600 placeholder-blue-400 border border-blue-200 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-blue-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {strength.label && (
              <div className="flex items-center justify-between mt-2">
                <span className={`text-sm font-medium ${strength.color}`}>
                  Password strength: {strength.label}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-blue-600">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 text-blue-600 placeholder-blue-400 border border-blue-200 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute text-blue-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Reset Password
          </button>
        </div>

        {error && (
          <div className="p-3 mt-4 border border-red-200 rounded-lg bg-red-50">
            <p className="text-sm text-center text-red-600">{error}</p>
          </div>
        )}

        {message && (
          <div className="p-3 mt-4 border border-green-200 rounded-lg bg-green-50">
            <p className="text-sm text-center text-green-600">{message}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <span className="text-blue-500">Remember your password? </span>
          <a href="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;