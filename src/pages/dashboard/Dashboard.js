import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const DashboardLayout = () => {
  const Navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token)
    }else{
      Navigate("/")
    }
  console.log(token)
  }, [])
  
  return (
    <div className="flex w-screen h-screen">
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-semibold mb-4">E Menu</h1>
        <div className="mb-2">
          <Link to="edit" className="w-full flex text-left px-4 py-2 bg-gray-700 rounded-md">Edit Your Menu </Link>
        </div>
        <div className="mb-2">
          <Link to="view" className="w-full flex text-left px-4 py-2 bg-gray-700 rounded-md">View Your Menus</Link>
        </div>
        <div className="mb-2">
          <Link to="info" className="w-full flex text-left px-4 py-2 bg-gray-700 rounded-md">Information</Link>
        </div>
      </aside>

      {/* Main Content */}
      {/* relative */}
      <main className="w-[75%] px-2 h-screen overflow-hidden bg-gray-100">
        {/* Main content goes here */}
        <Outlet/>
      </main>
    </div>
  );
}

export default DashboardLayout;
