import React, { createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // логика аутентификации

  const login = (token) => {
    // код для сохранения токена или других данных аутентификации в cookie
    document.cookie = `token=${token}; path=/`;
    console.log('User logged in:', token);
  };

  const logout = () => {
    // код для выхода из системы и удаления cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('User logged out');
  };

  useEffect(() => {
    // код для чтения cookie при загрузке приложения (если нужно)
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token) {
      console.log('User already logged in:', token);
      // выполните здесь необходимые действия, такие как обновление состояния аутентификации
    }
  }, []);

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
