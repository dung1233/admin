// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Component kiểm tra trạng thái đăng nhập
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // Chuyển hướng tới trang login nếu chưa đăng nhập
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
