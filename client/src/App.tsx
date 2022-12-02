import React, { useState } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import UserHome from './pages/UserHome';
import MakeCake from './pages/MakeCake';
import OrderConfirmation from './pages/OrderConfirmation';
import PlaceOrder from './pages/PlaceOrder';
import ViewOrders from './pages/ViewOrders';
import UpperBar from './pages/UpperBar';

const App = () => {

  return (
    <div>
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/user" element={<UpperBar />}>
            <Route index element={<UserHome />} />
            <Route path="make-cake" element={<MakeCake />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="view-orders" element={<ViewOrders />} />
          </Route>
      </Routes>
    </div>
  )
}

export default App;
