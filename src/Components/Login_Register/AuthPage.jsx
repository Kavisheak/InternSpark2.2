import React, { useState, useEffect } from 'react';
// removed auto-redirect logic; keep simple auth page
// axios auto-login removed (checkRemember endpoint disabled)
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const AuthPage = ({ initialIsLogin = true }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  // Auto-login via checkRemember.php removed to avoid network errors in dev

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