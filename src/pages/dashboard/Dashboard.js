import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import slugify from 'slugify'
import logo from '../../assests/favicon.png'
import axios from 'axios';
import menu from "../../assests/menu-button.png"
import info from "../../assests/info.png"
import qr from "../../assests/qr.png"
import view from "../../assests/view.png"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { setRestaurantData } from '../../redux/slice/infoSlice';

const DashboardLayout = () => {
  const Navigate = useNavigate()
  const [fetchMenuLink, setFetchMenuLink] = useState('')
  const [isActive, setIsActive] = useState("")
  const restaurantData = useSelector((state) => state.info.data);
  const location = useLocation();
  const dispatch = useDispatch()

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
        setIsActive(location.pathname.split('/').pop());

      } catch (error) {
        Navigate("/login")
      }
    }
    isValid()

    const getUserData = async () => {
      const restaurantData = await axios.get("https://menuserver-eight.vercel.app/api/restaurantData",{
        headers:{
          'Authorization': `${token}`
        }
      })
      dispatch(setRestaurantData(restaurantData.data.restaurant)) 
    }
    getUserData()
  }, []) // check isValid token and validations 

  useEffect(() => {
    const name = restaurantData.name
    if (name) {
      const restaurantSlug = slugify(name, { lower: true });
      const menuLink = `/${restaurantSlug}`;
      setFetchMenuLink(menuLink);
    }
  }, [restaurantData?.name]);

  return (
    <div className="flex flex-col sm:w-screen overflow-hidden sm:h-screen">
      <div className='flex justify-start gap-3 items-center bg-[#ffffff] border'>
        <div className='flex justify-start gap-1 sm:gap-3 px-2 sm:px-3 py-1 sm:py-2 items-center border-r'>
          <img src={logo} alt='Logo' className='w-11 border rounded' />
          <h1 className='text-black hidden sm:block'>Cloud Menu</h1>
        </div>
        <div className='flex justify-start flex-col'>
          <h1 className='text-black text-base font-semibold'>{fetchMenuLink.slice(1)}</h1>
          <Link to={fetchMenuLink} className='text-[9px] sm:text-xs sm:block hover:underline text-[#616161]'>https://emenu-sandy.vercel.app{fetchMenuLink}</Link>
        </div>
        <div className='flex justify-end items-center flex-grow gap-2 sm:gap-3 px-2 sm:px-4'>
          <h1 className='text-black text-base font-semibold'>En / Ar
          </h1>
          <div className='bg-[#f8f9fa] px-2 rounded py-2'>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="#203461" className="text-[#203461]" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="7" r="4"></circle><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path></svg>
          </div>
        </div>
      </div>
      <div className='flex flex-grow flex-col sm:flex-row'>
        {/* //#12dc5d */}
        <aside className="sm:w-1/5 sm:bg-[#ffffff] text-white p-4 border-r">
          <div className='scrollx flex sm:flex-col overflow-scroll sm:overflow-hidden'>

            <Link to="edit" >
              <div onClick={(e) => setIsActive(e.target.id)} id='edit' className={`${isActive == "edit" ? "border-b-2 border-b-black sm:text-white sm:bg-green-500" : "sm:bg-[#f1f4f9] "} gap-2 items-center sm:border-[white] sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2  text-[#000000] sm:rounded-lg`}>
                <img src={menu} className='hidden sm:block w-4' alt='' />
                Edit Your Menu
              </div> </Link>

            <Link to="info" >
              <div id="info" onClick={(e) => setIsActive(e.target.id)} className={`${isActive == "info" ? "border-b-2 border-b-black sm:text-white sm:bg-green-500" : "sm:bg-[#f1f4f9] "} gap-2 items-center  sm:border-[white] sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2  text-[#000000] sm:rounded-lg`}>
                <img src={info} className='hidden sm:block w-4' alt='' />
                Information
              </div></Link>
            <Link to={fetchMenuLink}>  <div id="view" className="sm:mb-2 border-b border-b-transparent sm:bg-[#f1f4f9] whitespace-nowrap sm:w-full items-center gap-2 flex text-left mr-4 sm:px-4 sm:py-2 border-2 border-[white]  text-[#000000] rounded-lg">
              <img src={view} className='hidden sm:block w-4' alt='' />

              View Your Menus &#x2197;
            </div></Link>
            <Link to="view" >
              <div id="view" onClick={(e) => setIsActive(e.target.id)} className={`${isActive == "view" ? "border-b-2 border-b-black sm:text-white sm:bg-green-500" : "sm:bg-[#f1f4f9] "}  sm:border-[white] items-center  gap-2 sm:mb-2 whitespace-nowrap sm:w-full flex text-left mr-4 sm:mr-0 sm:px-4 sm:py-2 sm:border-2  text-[#000000] sm:rounded-lg`}>
                <img src={qr} className='hidden sm:block w-4' alt='icon' />
                Download QR
              </div></Link>

          </div>
        </aside>

        <main className="sm:w-[80%] sm:px-2 sm:h- sm:overflow-hidden bg-white sm:bg-gray-100">
          {/* Main content goes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
