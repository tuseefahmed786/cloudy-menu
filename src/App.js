import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from './pages/dashboard/Dashboard';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import EditMenu from './pages/dashboard/edit/EditMenu';
import ViewMenu from './pages/dashboard/view/ViewMenu';
import Info from './pages/dashboard/info/Info';
import FetchMenu from './pages/fetchmenu/FetchMenu';
function App() {
  return (
  <>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='/:restaurant' element={<FetchMenu/>}/>
          <Route path='dashboard' element={<DashboardLayout />}>
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
