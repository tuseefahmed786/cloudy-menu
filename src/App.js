import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from './pages/dashboard/Dashboard';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import EditMenu from './pages/dashboard/edit/EditMenu';
import ViewMenu from './pages/dashboard/view/ViewMenu';
import Info from './pages/dashboard/info/Info';
import FetchMenu from './pages/fetchmenu/FetchMenu';
import LandingApp from './pages/landing/LandingApp'
import HeaderLan from './pages/landing/HeaderLan';
import PerProduct from './pages/fetchmenu/PerProduct'
import RestaurantInfo from './pages/fetchmenu/MenuInfo';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderLan />}>
            <Route path='/' index element={<LandingApp />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path="/:restaurant/:category/:product" element={<PerProduct />} />
          <Route path="/:restaurant/:category" element={<FetchMenu />} />
          <Route path="/:restaurant" element={<FetchMenu />} />
          <Route path="/:restaurant/info" element={<RestaurantInfo />} />
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Navigate to="info" />} />

            <Route path='edit' element={<EditMenu />} />
            <Route path='view' element={<ViewMenu />} />
            <Route path='info' element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
