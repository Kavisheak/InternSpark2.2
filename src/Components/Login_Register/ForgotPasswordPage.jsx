import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost/InternBackend/api/request_reset.php', { email });
      setMessage(res.data.message + (res.data.reset_link ? ` Link: ${res.data.reset_link}` : ''));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error requesting reset.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-blue-800">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />
          <button type="submit" className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500">
            Request Reset
          </button>
        </form>
        {message && (
          <p className={`mt-3 text-sm ${message.includes("generated") ? "text-green-600" : "text-red-600"}`}>
        {message}
  </p>
)}

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
