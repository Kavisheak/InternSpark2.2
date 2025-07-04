import React, { useState } from 'react';

const RegisterPage = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    userType: 'Student looking for internships',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    console.log('Registration attempt:', formData);
    alert('Account created successfully! Please sign in.');
    onNavigateToLogin();
  };

  const inputClass =
    "w-full px-4 py-3 bg-blue-50 border border-blue-300 text-blue-900 placeholder-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gray-300">
      <div className="w-full max-w-md p-10 bg-white border border-blue-200 shadow-2xl rounded-2xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-700 rounded-full">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H8m8 4H8m4 4H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4"
                />
              </svg>
            </div>
            <span className="ml-2 text-2xl font-semibold tracking-wide text-blue-800">
              Internspark
            </span>
          </div>
          <h2 className="mb-1 text-3xl font-bold text-blue-800">Create Account</h2>
          <p className="text-sm text-blue-500">Join thousands of aspiring interns</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-blue-800">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-blue-800">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-blue-800">I am a</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Student looking for internships">
                Student looking for internships
              </option>
              <option value="Company hiring interns">Company hiring interns</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-blue-800">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-blue-800">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={inputClass}
              required
            />
          </div>

          <div className="flex items-start text-sm text-blue-700">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1 mr-2"
            />
            <span>
              I agree to the{' '}
              <button type="button" className="text-blue-600 underline hover:text-blue-800">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-blue-600 underline hover:text-blue-800">
                Privacy Policy
              </button>
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-blue-700">Already have an account? </span>
          <button
            onClick={onNavigateToLogin}
            className="font-medium text-blue-600 underline hover:text-blue-800"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
