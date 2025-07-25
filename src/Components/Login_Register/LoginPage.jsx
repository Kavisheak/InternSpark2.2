import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost/InternBackend/api/login.php', {
        email,
        password
      },
    { withCredentials: true }
    );

      const data = response.data;

      if (data.success) {
        const { role, user_id, username } = data;
        localStorage.setItem('user', JSON.stringify({ username, role, user_id }));

        if (role === 'student') {
          navigate('/student');
        } else if (role === 'company') {
          navigate('/company');
        } else if (role === 'admin') {
          navigate('/admin');
        } else {
          setMessage('Unknown user role.');
        }
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Login error.');
      } else {
        setMessage('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-300">
      <div className="w-full max-w-md p-10 bg-white border border-blue-200 shadow-2xl rounded-2xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-700 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="ml-2 text-2xl font-semibold tracking-wide text-blue-800">
              Internspark
            </span>
          </div>
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-blue-900 placeholder-blue-400 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {message && <p className="text-sm text-red-600">{message}</p>}

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Sign In
          </button>
        </form>

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
