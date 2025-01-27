import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '../pages/dashboard/Dashboard';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import EditMenu from '../pages/dashboard/edit/EditMenu';
import ViewMenu from '../pages/dashboard/view/ViewMenu';
import Info from '../pages/dashboard/info/Info';
import FetchMenu from '../pages/fetchmenu/FetchMenu';
import LandingApp from '../pages/landing/LandingApp';
import HeaderLan from '../pages/landing/HeaderLan';
import PerProduct from '../pages/fetchmenu/PerProduct';
import RestaurantInfo from '../pages/fetchmenu/MenuInfo';
import BusinessInfo from '../pages/dashboard/info/BusinessInfo';
import UploadLogo from '../pages/dashboard/info/UploadLogo';
import Subscription from '../pages/dashboard/subscription/Subscription';
import Billing from '../pages/dashboard/billing/Billing';
import HomeDashboard from '../pages/dashboard/Home DS/HomeDashboard';
import PaymentDone from '../pages/dashboard/subscription/PaymentDone';
import SocialLinksForm from '../pages/dashboard/info/SocialLinksForm';
import CustomersList from '../customers/CustomersList';

// Routes array for createBrowserRouter
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLan />,
    children: [
      { index: true, element: <LandingApp /> },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/customers',
    element: <CustomersList />,
  },
  {
    path: '/:restaurant/:category/:product',
    element: <PerProduct />,
  },
  {
    path: '/:restaurant/:category',
    element: <FetchMenu />,
  },
  {
    path: '/:restaurant',
    element: <FetchMenu />,
  },
  {
    path: '/:restaurant/info',
    element: <RestaurantInfo />,
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="home" /> },
      { path: 'home', element: <HomeDashboard /> },
      { path: 'edit', element: <EditMenu /> },
      { path: 'view', element: <ViewMenu /> },
      { path: 'subscription', element: <Subscription /> },
      { path: 'billing', element: <Billing /> },
      { path: 'paymentdone', element: <PaymentDone /> },
      {
        path: 'info',
        element: <Info />,
        children: [
          { index: true, element: <BusinessInfo /> },
          { path: 'logo', element: <UploadLogo /> },
          { path: 'social', element: <SocialLinksForm /> },
        ],
      },
    ],
  },
]);


