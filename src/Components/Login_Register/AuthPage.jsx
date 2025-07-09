import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const AuthPage = ({ initialIsLogin = true }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

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
