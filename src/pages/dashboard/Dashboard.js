import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import slugify from 'slugify'
const DashboardLayout = () => {
  const Navigate = useNavigate()
  const [fetchMenuLink, setFetchMenuLink] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Navigate("/login")
    }
    const storedRes = localStorage.getItem('resData');
    
    if (storedRes && storedRes !== "null") { 
      try {
        const resObject = JSON.parse(storedRes);
        if (resObject && resObject.name) { 
          const restaurantSlug = slugify(resObject.name, { lower: true });
          const menuLink = `/${restaurantSlug}`;
          setFetchMenuLink(menuLink);
        } else {
          console.error("The 'name' property is missing in resData.");
        }
      } catch (error) {
        console.error("Failed to parse storedRes as JSON:", error);
      }
    } else {
      console.log("No valid resData found in localStorage.");
    }
    

  }, [])

  return (
    <div className="flex w-screen h-screen">
      <aside className="w-1/4 bg-[#ffc65c] text-white p-4">
        <h1 className="text-2xl font-semibold text-black mb-4">E Menu</h1>
        <div className="mb-2">
          <Link to="edit" className="w-full flex text-left px-4 py-2 border-2 border-[white]  text-black rounded-md">Edit Your Menu </Link>
        </div>
        <div className="mb-2">
          <Link to={fetchMenuLink} className="w-full flex text-left px-4 py-2 border-2 border-[white]  text-black rounded-md">View Your Menus</Link>
        </div>
        <div className="mb-2">
          <Link to="info" className="w-full flex text-left px-4 py-2 border-2 border-[white]  text-black rounded-md">Information</Link>
        </div>
      </aside>

      <main className="w-[75%] px-2 h-screen overflow-hidden bg-gray-100">
        {/* Main content goes here */}
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;


// const fetchRestaurantData = async () => {
//   try {
//     const response = await axios('http://localhost:3002/', {
//       headers: {
//         'Authorization': `${token}`,
//       },
//     });
//     setRestaurantName(response.data); // Set the restaurant name from the response
//   } catch (error) {
//     console.error('Error fetching restaurant data:', error);
//   }
// };
//       fetchRestaurantData();