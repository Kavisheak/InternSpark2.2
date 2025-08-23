import React, { useState } from "react";

const ResetPassword = () => {
  // In a real app, you'd get the token from URL params
  const token = "demo-token";
  
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState({ label: "", color: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      // In a real app, you'd make an API call here
      console.log("Resetting password with token:", token, "and password:", password);
      setMessage("Password reset successful!");
    } catch {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-blue-600 mb-2">Reset Password</h1>
          <p className="text-blue-500 text-sm">Create a secure new password</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-blue-600 font-medium mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Enter your new password"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 014.243 4.243m4.242-4.242L21 12c-1.274 4.057-5.064 7-9.542 7m-4.243-4.242L8.464 15.536M16.122 14.122L21 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </button>
            </div>
            {strength.label && (
              <div className="flex items-center justify-between mt-2">
                <span className={`text-sm font-medium ${strength.color}`}>
                  Password strength: {strength.label}
                </span>
                <div className="flex space-x-1">
                  {[1,2,3].map((i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${
                      strength.label === "Strong" ? "bg-green-500" :
                      strength.label === "Medium" && i <= 2 ? "bg-yellow-500" :
                      strength.label === "Weak" && i === 1 ? "bg-red-500" : "bg-gray-300"
                    }`} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-blue-600 font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showConfirm ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 014.243 4.243m4.242-4.242L21 12c-1.274 4.057-5.064 7-9.542 7m-4.243-4.242L8.464 15.536M16.122 14.122L21 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Reset Password
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}
        
        {message && (
          <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200">
            <p className="text-green-600 text-sm text-center">{message}</p>
          </div>
        )}

        <div className="text-center mt-6">
          <span className="text-blue-500">Remember your password? </span>
          <a href="#" className="text-blue-600 font-medium hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;