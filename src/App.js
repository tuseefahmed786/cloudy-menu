import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from './pages/dashboard/Dashboard';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import EditMenu from './pages/dashboard/edit/EditMenu';
import ViewMenu from './pages/dashboard/view/ViewMenu';
import Info from './pages/dashboard/info/Info';
function App() {

  return (
    <div className="App bg-gray-100 min-h-screen flex items-center justify-center">
      {/* <Restaurant/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route path='edit' element={<EditMenu />} />
            <Route path='view' element={<ViewMenu />} />
            <Route path='info' element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
