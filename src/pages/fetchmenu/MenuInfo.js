import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import path from "../../assests/path.png";
import { useSelector } from "react-redux";
import backIcon from '../../assests/back.png'
const RestaurantInfo = () => {
  const { restaurant } = useParams();
  const navigate = useNavigate();
  const menuData = useSelector((state) => state.menuSlice.menuData);
  console.log(menuData)
  return (
    <>
      <div className="flex p-1 max-w-[25rem] pt-10 mx-auto h-screen justify-center items-start">
        <div className="w-full bg-white pb-3 px-2 py-2 shadow-lg rounded-lg">
          <div className="flex flex-col">
            <div className="">
              <div className="rounded relative">
                <img
                  src={menuData?.findrestaurant?.cover || path}
                  className="rounded-2xl max-h-28 object-cover w-full h-full"
                  alt="banner"
                />
                <img className="absolute hover:cursor-pointer top-1 right-2" onClick={()=> navigate(-1)} src={backIcon} alt="back" />
                <div className="absolute -bottom-6 left-3 rounded w-16 h-16">
                  <img
                    src={menuData?.findrestaurant?.logo || path}
                    className="w-full h-full rounded-full object-cover"
                    alt="banner"
                  />
                </div>
              </div>
            </div>
            <div className="px-3 pt-6">
              <div>
                <h1 className="text-lg font-medium">
                  {menuData?.findrestaurant?.name || "Put Your Cafe Name"}
                </h1>
                <p className="text-xs pb-2">   {menuData?.findrestaurant?.location || "Enter Your Cafe Location"}</p>
                <a
                  target="_blank"
                  href={
                    menuData?.socialLink?.whatsappLink ||
                    "https://wa.me/+971543286045"
                  }
                  className="border border-black rounded-2xl px-2 py-1 text-xs font-bold"
                >
                  Chat to Shop
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="py-3 px-3">
              <h3 className="text-sm font-bold">About US</h3>
              <p className="text-sm">
                {menuData?.findrestaurant?.about || "Please Enter About Your Cafe"}
              </p>
            </div>
            <div className="px-3 flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  width="16px"
                  height="16px"
                  viewBox="0 0 395.71 395.71"
                >
                  <g>
                    <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738   c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388   C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191   c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z" />
                  </g>
                </svg>
                <a
                  target="_blank"
                  className="text-xs underline"
                  href={
                    menuData?.socialLink?.googleMapLink ||
                    "https://www.linkedin.com/company/cloud-menu-ae"
                  }
                >
                  Our Location
                </a>
              </div>

              <div className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  width="18px"
                  height="18px"
                  viewBox="0 0 64 64"
                >
                  <title />
                  <path d="M44,7H20A13,13,0,0,0,7,20V44A13,13,0,0,0,20,57H44A13,13,0,0,0,57,44V20A13,13,0,0,0,44,7ZM33,55V38a1,1,0,0,0-1-1H27V31h5a1,1,0,0,0,1-1V22a5,5,0,0,1,5-5h8v6H42a3,3,0,0,0-3,3v4a1,1,0,0,0,1,1h6v6H40a1,1,0,0,0-1,1V55ZM55,44A11,11,0,0,1,44,55H41V39h6a1,1,0,0,0,1-1V30a1,1,0,0,0-1-1H41V26a1,1,0,0,1,1-1h5a1,1,0,0,0,1-1V16a1,1,0,0,0-1-1H38a7,7,0,0,0-7,7v7H26a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h5V55H20A11,11,0,0,1,9,44V20A11,11,0,0,1,20,9H44A11,11,0,0,1,55,20Z" />
                </svg>
                <a
                  className="text-xs underline"
                  target="_blank"
                  href={
                    menuData?.socialLink?.facebookLink ||
                    "https://www.linkedin.com/company/cloud-menu-ae"
                  }
                >
                  Facebook
                </a>
              </div>

              <div className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
                    stroke="#33363F"
                    stroke-width="2"
                  />
                  <circle cx="16.5" cy="7.5" r="1.5" fill="#33363F" />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#33363F"
                    stroke-width="2"
                  />
                </svg>
                <a
                  className="text-xs underline"
                  target="_blank"
                  href={
                    menuData?.socialLink?.instagramLink ||
                    "https://www.instagram.com/cloudmenuae"
                  }
                >
                  {" "}
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantInfo;
