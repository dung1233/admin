// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Tạo context
const AuthContext = createContext();

// Custom hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider để cung cấp trạng thái xác thực cho ứng dụng
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('jwtToken') // Kiểm tra token trong localStorage
  );

  const login = (token) => {
    localStorage.setItem('jwtToken', token); // Lưu token
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken'); // Xóa token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
