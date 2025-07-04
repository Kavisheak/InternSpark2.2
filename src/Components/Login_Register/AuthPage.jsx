import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

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
