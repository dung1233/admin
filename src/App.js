import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
const App = () => {
  return (
     <Router>
      <Routes>
        {/* Route Layout */}
        <Route path="/" element={<Layout />}>
          {/* Các trang con */}
          <Route index element={<Commerce />} />
          <Route path="Product" element={<Product />} />
          <Route path="Menulist" element={<Menulist />} />
          <Route path="Details" element={<Details/>} />
          <Route path="login" element={<Login />} />
          <Route path="Catenory" element={<Catenory />} />
          <Route path="Orderlist" element={<Oderlist />} />
          <Route path="/OrderDetails/:orderId" element={<Oderdetails />} />
          <Route path="Restaurant" element={<Restaurant />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App