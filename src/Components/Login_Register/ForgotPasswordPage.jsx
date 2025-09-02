import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    setSuccess(null);

    try {
      const res = await axios.post(
        'http://localhost/InternBackend/api/request_reset.php',
        { email }
      );

      setMessage(res.data.message);
      setSuccess(res.data.success); // ✅ backend should return {success: true/false}
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error requesting reset.';
      setMessage(errorMsg);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-blue-800">Forgot Password</h2>
        <p className="mb-4 text-sm text-gray-600">
          Enter your registered email. We’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-70"
          >
            {loading ? 'Sending...' : 'Request Reset'}
          </button>
        </form>

        {message && (
          <p
            className={`mt-3 text-sm text-center ${
              success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
