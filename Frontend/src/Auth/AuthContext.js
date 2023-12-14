import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Ваша логика аутентификации

  const login = (token) => {
    // Ваш код для сохранения токена или других данных аутентификации
    console.log('User logged in:', token);
  };

  const logout = () => {
    // Ваш код для выхода из системы
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};