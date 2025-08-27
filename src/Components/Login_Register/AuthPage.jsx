import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';   // 👈 to redirect
import axios from 'axios';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';


const AuthPage = ({ initialIsLogin = true }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  // ✅ Auto-login check (remember me)
  useEffect(() => {
    axios
      .get("http://localhost/InternBackend/api/checkRemember.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.loggedIn) {
          // Store user in localStorage
          localStorage.setItem("user", JSON.stringify(res.data));

          // Redirect based on role
          if (res.data.role === "student") navigate("/student");
          else if (res.data.role === "company") navigate("/company");
          else if (res.data.role === "admin") navigate("/admin");
        }
      })
      .catch((err) => {
        console.error("Auto-login check failed", err);
      });
  }, [navigate]);

  const handleNavigateToRegisterPage = () => setIsLogin(false);
  const handleNavigateToLoginPage = () => setIsLogin(true);

  return (
    <>
      {isLogin ? (
        <LoginPage onNavigateToRegister={handleNavigateToRegisterPage} />
      ) : (
        <RegisterPage onNavigateToLogin={handleNavigateToLoginPage} />
      )}
    </>
  );
};

export default AuthPage;
