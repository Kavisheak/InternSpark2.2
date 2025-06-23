
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Components/Login_Register/LoginPage';
import RegisterPage from './Components/Login_Register/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/LoginPage" replace />} />
          
          {/* Login page route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Registration page route */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<RegisterPage />} /> {/* Alternative route */}
          
          {/* Catch-all route for 404 - redirects to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

