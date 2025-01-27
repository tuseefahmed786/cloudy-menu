import React from 'react';
import {RouterProvider } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { router } from './router/router';

function App() {
  return (
   <RouterProvider router={router} />
  );
}

export default App;