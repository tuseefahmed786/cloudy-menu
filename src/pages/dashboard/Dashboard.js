import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import slugify from 'slugify'
import logo from '../../assests/favicon.png'
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
      <aside className="w-1/4 bg-[#12dc5d] text-white p-4">
        <img src={logo} alt='Logo' className='md:w-11 border rounded mb-4'/>
        <div className="mb-2">
          <Link to="edit" className="w-full flex text-left px-4 py-2 border-2 border-[white]  text-[#000000] rounded-md">Edit Your Menu </Link>
        </div>
        <div className="mb-2">
          <Link to={fetchMenuLink} className="w-full flex text-left px-4 py-2 border-2 border-[white]  text-[#000000] rounded-md">View Your Menus &#x2197; </Link>
        </div>
        <div className="mb-2">
          <Link to="info" className="w-full flex text-left px-4 py-2 border-2 border-[white]  text-[#000000] rounded-md">Information</Link>
        </div> 
        <div className="mb-2">
          <Link to="view" className="w-full flex text-left px-4 py-2 border-2 border-[white]  text-[#000000] rounded-md">Download QR</Link>
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