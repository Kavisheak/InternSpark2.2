import React, { useState } from 'react';

const LoginPage = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-200">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-700 p-3 rounded-full">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-blue-800 text-2xl font-semibold ml-2 tracking-wide">
              Internspark
            </span>
          </div>
          <h2 className="text-3xl font-bold text-blue-800 mb-1">Welcome Back</h2>
          <p className="text-blue-500 text-sm">Sign in to fuel your future team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-blue-800 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-blue-800 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="text-right">
            <button type="button" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-blue-700">Don't have an account? </span>
          <button
            onClick={onNavigateToRegister}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
