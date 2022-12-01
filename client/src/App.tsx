import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import UserHome from './pages/UserHome';
import CreateCake from './pages/CreateCake';
import OrderConfirmation from './pages/OrderConfirmation';
import PlaceOrder from './pages/PlaceOrder';
import ViewOrders from './pages/ViewOrders';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
          <Route element={<Welcome setLoggedIn={setLoggedIn} />} />
          <Route element={<UserHome setLoggedIn={setLoggedIn} />}>
            <Route path="create-cake" element={<CreateCake />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="user-info" element={<PlaceOrder />} />
            <Route path="view-orders" element={<ViewOrders />} />
          </Route>
      </Routes>
      {
        !loggedIn ? <Welcome setLoggedIn={setLoggedIn} /> : <UserHome setLoggedIn={setLoggedIn} />
      }
    </div>
  )
}

export default App;
