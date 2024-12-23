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
import BusinessInfo from './pages/dashboard/info/BusinessInfo';
import UploadLogo from './pages/dashboard/info/UploadLogo';
import Subscription from './pages/dashboard/subscription/Subscription';
import Billing from './pages/dashboard/billing/Billing';
import HomeDashboard from './pages/dashboard/Home DS/HomeDashboard';
import PaymentDone from './pages/dashboard/subscription/PaymentDone';
import SocialLinksForm from './pages/dashboard/info/SocialLinksForm';
import CustomersList from './customers/CustomersList';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* navbar */}
          <Route element={<HeaderLan />}>
            <Route path='/' index element={<LandingApp />} />
          </Route>
          {/* user login/register */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/customers' element={<CustomersList/>}/>
          {/*fetch menu edit/update/delete */}
          <Route path="/:restaurant/:category/:product" element={<PerProduct />} />
          <Route path="/:restaurant/:category" element={<FetchMenu />} />
          <Route path="/:restaurant" element={<FetchMenu />} />
          <Route path="/:restaurant/info" element={<RestaurantInfo />} />
          {/* Dashboard /info/edit/view */}
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Navigate to="home" />} />
            <Route path='home' element={<HomeDashboard/>} />
            <Route path='edit' element={<EditMenu />} />
            <Route path='view' element={<ViewMenu />} />
            <Route path='subscription' element={<Subscription/>}/>
            <Route path='Billing' element={<Billing/>}/>
            <Route path='PaymentDone' element={<PaymentDone/>}/>

            
            <Route path='info' element={<Info />} >
              <Route index element={<BusinessInfo />} />
              <Route path='logo' element={<UploadLogo />} />
              <Route path='social' element={<SocialLinksForm />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
