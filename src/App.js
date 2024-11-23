import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Commerce from './compoment/pages/Products/Commerce';
import Product from './compoment/pages/Products/Product';
import Login from './compoment/pages/Login/Login';
import Layout from './compoment/pages/layou';
import Menulist from './compoment/pages/Products/Menulist';
import Details from './compoment/pages/Products/Details';
import Catenory from './compoment/pages/Products/Catenory';
import Oderlist from './compoment/pages/Oder/Oderlist';
import Oderdetails from './compoment/pages/Oder/Oderdetails';
import Restaurant from './compoment/pages/Products/Restaurant';
import { AuthProvider, useAuth } from '../src/compoment/pages/Login/AuthContext'; // Import AuthProvider và hook

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route không yêu cầu đăng nhập */}
          <Route path="/login" element={<Login />} />

          {/* Layout với các route yêu cầu đăng nhập */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            {/* Các route con */}
            <Route index element={<Commerce />} />
            <Route path="Product" element={<Product />} />
            <Route path="Menulist" element={<Menulist />} />
            <Route path="Details" element={<Details />} />
            <Route path="Catenory" element={<Catenory />} />
            <Route path="Orderlist" element={<Oderlist />} />
            <Route path="/OrderDetails/:orderId" element={<Oderdetails />} />
            <Route path="Restaurant" element={<Restaurant />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Component kiểm tra trạng thái đăng nhập
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Chuyển hướng về login nếu chưa đăng nhập
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
