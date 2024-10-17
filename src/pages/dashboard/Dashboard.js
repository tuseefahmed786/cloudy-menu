import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import slugify from 'slugify'
import logo from '../../assests/favicon.png'
import axios from 'axios';
const DashboardLayout = () => {
  const Navigate = useNavigate()
  const [fetchMenuLink, setFetchMenuLink] = useState('')
  const [isActive, setIsActive] = useState("edit")
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Navigate("/login")
    }

    const isValid = async () => {
      try {
        const response = await axios.get('https://menuserver-eight.vercel.app/verifytoken',
          {
            headers: {
              'Authorization': `${token}`
            }
          }
        );
      } catch (error) {
        Navigate("/login")
      }
    }
    isValid()
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
console.log(isActive)
  return (
    <div className="flex flex-col sm:flex-row  sm:w-screen sm:h-screen">
      <aside className="sm:w-1/4 sm:bg-[#12dc5d] text-white p-4">
       <div className='flex justify-start gap-3 items-center'>
        <img src={logo} alt='Logo' className='w-11 border rounded'/>
       <h1 className='text-black text-xl'>Cloud Menu</h1>
       </div>
       <div className='scrollx flex sm:flex-col overflow-scroll sm:overflow-hidden pt-4'>

       <div onClick={(e)=> setIsActive(e.target.id)} className={`${ isActive == "edit"  && "border-b-2 border-b-black"} sm:mb-2 whitespace-nowrap sm:w-full  flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 sm:border-[white]  text-[#000000] sm:rounded-md`}>
          <Link to="edit" id='edit'>Edit Your Menu </Link>
        </div>
  
        <div onClick={(e)=> setIsActive(e.target.id)} className={`${ isActive == "info"  && "border-b-2 border-b-black"} sm:mb-2 whitespace-nowrap sm:w-full  flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 sm:border-[white]  text-[#000000] sm:rounded-md`}>
          <Link to="info" id="info">Information</Link>
        </div>
        <div id="view" className="sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:px-4 sm:py-2 border-2 border-[white]  text-[#000000] rounded-md">
          <Link to={fetchMenuLink} className="">View Your Menus &#x2197; </Link>
        </div>
        <div onClick={(e)=> setIsActive(e.target.id)} className={`${ isActive == "qr"  && "border-b-2 border-b-black"} sm:mb-2 whitespace-nowrap sm:w-full  flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2 sm:border-[white]  text-[#000000] sm:rounded-md`}>
          <Link to="view" id="qr">Download QR</Link>
        </div>

       </div>
      </aside>

      <main className="sm:w-[75%] sm:px-2 sm:h-screen sm:overflow-hidden bg-white sm:bg-gray-100">
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
