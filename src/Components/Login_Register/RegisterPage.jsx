import React, { useState } from 'react';

const RegisterPage = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'student', // match your DB roles: 'student' or 'company'
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      setMessage('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      const response = await fetch('http://localhost/InternBackend/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          role: formData.role,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Account created successfully! Please sign in.');
        onNavigateToLogin();
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
    }
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

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block mb-1 text-sm text-blue-800">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
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
            <label className="block mb-1 text-sm text-blue-800">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
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
              required
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

          {message && <p className="text-sm text-red-600">{message}</p>}

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
